import * as THREE from "three";
import { createCamera } from "./camera.js";

const TWO_PI = Math.PI * 2; // Used for rotation calculations
const CLOCK = new THREE.Clock();
const PANEL_SPEED = 0.5; // Speed of panel rotation

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

// Satellite
const satellite = new THREE.Group();

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
satellite.position.set(0, 0, -2);

scene.add(satellite);


// Directional lighting for sun
const sunRotationSpeed = 2;
const sunOrigin = new THREE.Group(); // Used for rotating the sun
const sunLight = new THREE.DirectionalLight(0xffffff, 10);
const sunGeometry = new THREE.BoxGeometry(5, 5, 5)
const sunMaterial = new THREE.MeshBasicMaterial({color: 0xFFDF22})
const sun = new THREE.Mesh(sunGeometry, sunMaterial);

sun.position.set(0,10,0);
sunLight.position.copy(sun.position);

sunOrigin.add(sun);
sunOrigin.add(sunLight);

scene.add(sunOrigin);


/**
 * Rotate the panels of the satellite
 */
function rotatePanels() {
  const delta = CLOCK.getDelta();
  panels.rotation.x = (panels.rotation.x + PANEL_SPEED * delta) % TWO_PI;
  sunOrigin.rotation.x = (sunOrigin.rotation.x + sunRotationSpeed * delta) % TWO_PI;
}

/**
 * Render loop, called once per frame
 */
function animate() {
  rotatePanels();
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
