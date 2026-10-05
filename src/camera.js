import * as THREE from "three";

/**
 * Creates the scene's perspective camera, looking at origin
 * (copied from Project 1)
 * @param {number} aspect: viewport aspect ratio (width / height)
 * @returns {THREE.PerspectiveCamera}
 * 
 * @author Peter Hajj
 */
export function createCamera(aspect) {
  const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 500);
  camera.position.set(40, 20, 20)
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  return camera;
}

export function perspectiveCamera(aspect) {
  const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 500);
  camera.position.z = 35;
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  return camera;
}

export function orthographicCamera(aspect) {
  const camera = new THREE.OrthographicCamera(-aspect * 20, aspect * 20, 20, -20, 0.1, 500);
  camera.position.set(0, 50, 0);
  camera.up.set(0, 0, -1);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  return camera;
}
