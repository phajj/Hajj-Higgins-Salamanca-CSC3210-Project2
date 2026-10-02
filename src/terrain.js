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
  varying float vDisplacement; // Variable passed to Fragment Shader

  void main() {
    vec3 pos = position;

    // Compute dynamic wave displacement using position and time
    float wave = sin(pos.x * 5.0 + uTime * 3.0) * cos(pos.y * 5.0 + uTime * 2.0);
    pos.z += wave * 0.25; // Displace vertex position along local Z-axis

    // Send the calculated displacement height to the fragment shader
    vDisplacement = pos.z;

    // Standard projection matrix transformation: Local -> World -> View -> Clip Space
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
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
        uAmplitude: { value: 1.5 },
        uFrequency: { value: 0.2 },
      },
    });

    super(planeGeometry, material);

    // Tilts terrain at an angle
    this.rotation.x = -Math.PI / 4;
  }

  /**
   * Updates the terrain's wave displacement based on the elapsed time.
   * @param elapsedTime The elapsed time since the start of the animation, used to update the wave displacement in the shaders.
   */
  update(elapsedTime) {
    this.material.uniforms.uTime.value = elapsedTime;
  }
}
