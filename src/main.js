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
});

/**
 * Handles keyboard input for perspectiveCamera movement:
 * w a s d
 */
function keyboardInput() {
  window.addEventListener("keydown", (event) => {
    switch (event.key.toLocaleLowerCase()) {
      case "w":
        camera.position.z -= 1;
        break;
      case "a":
        camera.position.x -= 1;
        break;
      case "s":
        camera.position.z += 1;
        break;
      case "d":
        camera.position.x += 1;
        break;
    }
  })
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
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
