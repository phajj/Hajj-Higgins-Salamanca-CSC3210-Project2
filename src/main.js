import * as THREE from "three";
import { perspectiveCamera, orthographicCamera } from "./camera.js";
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


// Cameras (perspective and orthographic)
const perspCam = perspectiveCamera(window.innerWidth / window.innerHeight);
const orthoCam = orthographicCamera(window.innerWidth / window.innerHeight);
let camera = perspCam;

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 2, 0, 0);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

// Keep both cameras and the renderer in sync with the window size
window.addEventListener("resize", () => {
  const aspect = window.innerWidth / window.innerHeight;

  perspCam.aspect = aspect;
  perspCam.updateProjectionMatrix();

  orthoCam.left = -aspect * 20;
  orthoCam.right = aspect * 20;
  orthoCam.updateProjectionMatrix();

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

// Keyboard input handling
var wPresssed = false;
var aPresssed = false;
var sPresssed = false;
var dPresssed = false;

/**
 * Handles keyboard input for perspectiveCamera movement:
 * w a s d
 * Listened to Jackson's logic D:
 */
function keyboardInput() {
  // Handle keydown events to start movement
  window.addEventListener("keydown", (event) => {
    if (event.key.toLocaleLowerCase() === "w") 
      wPresssed = true;
    if (event.key.toLocaleLowerCase() === "a") 
      aPresssed = true;
    if (event.key.toLocaleLowerCase() === "s") 
      sPresssed = true;
    if (event.key.toLocaleLowerCase() === "d") 
      dPresssed = true;
    });
  
  // Handle keyup events to stop movement
  window.addEventListener("keyup", (event) => {
    if (event.key.toLocaleLowerCase() === "w") 
      wPresssed = false;
    if (event.key.toLocaleLowerCase() === "a")
      aPresssed = false;
    if (event.key.toLocaleLowerCase() === "s") 
      sPresssed = false;
    if (event.key.toLocaleLowerCase() === "d")
      dPresssed = false;
    });
}

/**
 * Moves the perspectiveCamera based on which keys are currently held.
 * Called every frame from animate() so multiple keys can be held at once.
 */
function updateMovement() {
  if (wPresssed)
    perspCam.position.z -= 0.1;
  if (aPresssed)
    perspCam.position.x -= 0.1;
  if (sPresssed)
    perspCam.position.z += 0.1;
  if (dPresssed)
    perspCam.position.x += 0.1;
}


/**
 * Switches between the perspective and orthographic cameras. Takes keypresses:
 * 1 = perspective camera
 * 2 = orthographic camera
 * c = toggle between both
 */
function switchCam() {
  window.addEventListener("keydown", (event) => {
    switch (event.key.toLocaleLowerCase()) {
      case "1":
        if (camera instanceof THREE.OrthographicCamera) {
          camera = perspCam;
        }
        break;
      case "2":
        if (camera instanceof THREE.PerspectiveCamera) {
          camera = orthoCam;
        }
        break;
      case "c":
        if (camera instanceof THREE.PerspectiveCamera) {
          camera = orthoCam;
        } else {
          camera = perspCam;
        }
        break;
    }
  })
}

keyboardInput();
switchCam();

/**
 * Render loop, called once per frame
 */
function animate() {
  rotate();

  // Update the time uniform every frame to animate the wave
  satellite.getWorldPosition(satelliteWorldPosition);
  t.update(CLOCK.getElapsedTime(), satelliteWorldPosition);

  updateMovement();
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
