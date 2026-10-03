import * as THREE from "three";
import { perspectiveCamera, orthographicCamera } from "./camera.js";
import { addTestGeometry } from "./testGeometry.js";

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

// TEMPORARY: test geometry for checking camera controls
addTestGeometry(scene);

// Keep both cameras and the renderer in sync with the window size
window.addEventListener("resize", () => {
  const aspect = window.innerWidth / window.innerHeight;

  perspCam.aspect = aspect;
  perspCam.updateProjectionMatrix();

  orthoCam.left = -aspect * 20;
  orthoCam.right = aspect * 20;
  orthoCam.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
})

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
  updateMovement();
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
