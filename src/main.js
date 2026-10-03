import * as THREE from "three";
import { createCamera } from "./camera.js";
import { terrain } from "./terrain.js";


const TWO_PI = Math.PI * 2; // Used for rotation calculations
const CLOCK = new THREE.Clock();
const PANEL_SPEED = 0.5; // Speed of panel rotation
const SATELLITE_SPEED = .75;
const SUN_SPEED = .25;

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

// Keep the camera and renderer in sync with the window size
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Satellite
const satellite = new THREE.Group();
const satelliteOrigin = new THREE.Group(); // Used for rotating the satellite around the terrain 
satelliteOrigin.add(satellite);
satelliteOrigin.position.set(0, 0, 0);

// Satellite body
const bodyGeometry = new THREE.BoxGeometry(1.2, 1.2, 1.2);
const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
satellite.add(body);

// Solar panels
const panels = new THREE.Group();

const panelGeometry = new THREE.BoxGeometry(3, 3, 1);
const panelMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const leftPanel = new THREE.Mesh(panelGeometry, panelMaterial);
const rightPanel = new THREE.Mesh(panelGeometry, panelMaterial);

rightPanel.position.set(2, 0, 0);
leftPanel.position.set(-2, 0, 0);

panels.add(rightPanel);
panels.add(leftPanel);

satellite.add(panels);
satellite.position.set(15, 10, 0);

scene.add(satelliteOrigin);


// Directional lighting for sun
const sunOrigin = new THREE.Group(); // Used for rotating the sun
const sunLight = new THREE.DirectionalLight(0xffffff, 10);

// Creating sun object
const sunGeometry = new THREE.SphereGeometry(5, 50, 5)
const sunMaterial = new THREE.MeshBasicMaterial({color: 0xFFDF22})
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.position.set(0,40,0);

sunLight.position.copy(sun.position);

sunOrigin.add(sun);
sunOrigin.add(sunLight);

scene.add(sunOrigin);


/**
 * Rotate the panels of the satellite
 */
function rotate() {
  const delta = CLOCK.getDelta();
  panels.rotation.x = (panels.rotation.x + PANEL_SPEED * delta) % TWO_PI;
  sunOrigin.rotation.x = (sunOrigin.rotation.x + SUN_SPEED * delta) % TWO_PI;
  satelliteOrigin.rotation.y = (satelliteOrigin.rotation.y + SATELLITE_SPEED * delta) % TWO_PI;
}
//Add terrain to the scene
const t = new terrain();
scene.add(t);
const satelliteWorldPosition = new THREE.Vector3(); 

/**
 * Render loop, called once per frame
 */
function animate() {
  rotate();

  // Update the time uniform every frame to animate the wave
  satellite.getWorldPosition(satelliteWorldPosition);
  t.update(CLOCK.getElapsedTime(), satelliteWorldPosition);

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
