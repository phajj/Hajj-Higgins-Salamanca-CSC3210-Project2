import * as THREE from "three";
import { createCamera } from "./camera.js";
import { terrain } from "./terrain.js";

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Camera
const camera = createCamera(window.innerWidth / window.innerHeight);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 2, 0, 0);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

// Keep the camera and renderer in sync with the window size
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

//Add terrain to the scene
const t = new terrain();
scene.add(t);

const clock = new THREE.Clock();

/**
 * Render loop, called once per frame
 */
function animate() {
  requestAnimationFrame(animate);

  // Update the time uniform every frame to animate the wave
  t.update(clock.getElapsedTime());

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
