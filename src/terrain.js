import * as THREE from "three";

/**
 *Terrain is a custom THREE.Mesh that renders a plane with dynamic wave displacement
 *using custom vertex and fragment shaders.
 *@author Laura Salamanca
 */
export class terrain extends THREE.Mesh {
  constructor() {
    const planeGeometry = new THREE.PlaneGeometry(40, 40, 50, 50);

    //Vertex Shader
    const vertexShader = `
  uniform float uTime;         // Global animation time passed from JS
  uniform vec3 uSatellitePosition; // Satellite position in world space
  uniform float uLiftRadius;   // How far (in world x, z) the satellite's influence reaches
  uniform float uLiftHeight;   // How much the terrain rises (in world y) directly beneath the satellite
  varying float vDisplacement; // Variable passed to Fragment Shader

  void main() {
    vec3 pos = position;

    // Compute dynamic wave displacement using position and time
    float wave = sin(pos.x * 5.0 + uTime * 3.0) * cos(pos.y * 5.0 + uTime * 2.0);
    pos.z += wave * 0.25; // Displace vertex position along local Z-axis

    // Compare the waved vertex to the satellite's position
    vec4 worldPos = modelMatrix * vec4(pos, 1.0);
    float xzDistance = distance(worldPos.xz, uSatellitePosition.xz);

    // Raise the vertex's world y when its x and z match the satellite's, fading out toward uLiftRadius
    float lift = (1.0 - smoothstep(0.0, uLiftRadius, xzDistance)) * uLiftHeight;
    worldPos.y += lift;

    // Send the calculated displacement height to the fragment shader
    vDisplacement = pos.z + lift;

    // World -> View -> Clip Space (model matrix was already applied above)
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

    // Fragment Shader
    const fragmentShader = `
  uniform float uTime;
  varying float vDisplacement; // Interpolated height from Vertex Shader

  void main() {
    // Map height range (-0.25 to 0.25) to a normalized range (0.0 to 1.0)
    float normalizedHeight = (vDisplacement + 0.25) / 0.5;

    // Color gradient interpolation: Deep Blue (valleys) to Bright Cyan (peaks)
    vec3 colorLow = vec3(0.02, 0.08, 0.40);
    vec3 colorHigh = vec3(0.00, 0.95, 0.85);
    vec3 finalColor = mix(colorLow, colorHigh, normalizedHeight);

    // Output final RGBA pixel color
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      wireframe: true,
      color: 0xff0000,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0.0 },
        uSatellitePosition: { value: new THREE.Vector3() },
        uLiftRadius: { value: 5.0 },
        uLiftHeight: { value: 3.0 },
        uAmplitude: { value: 1.5 },
        uFrequency: { value: 0.2 },
      },
    });

    super(planeGeometry, material);

    // Tilts terrain to lay flat along the x axis
    this.rotation.x = -Math.PI / 2;
  }

  /**
   * Updates the terrain's wave displacement based on the elapsed time.
   * @param elapsedTime The elapsed time since the start of the animation, used to update the wave displacement in the shaders.
   * @param satellitePosition The satellite's world position, used to raise the terrain beneath it.
   */
  update(elapsedTime, satellitePosition) {
    this.material.uniforms.uTime.value = elapsedTime;
    this.material.uniforms.uSatellitePosition.value.copy(satellitePosition);
  }
}
