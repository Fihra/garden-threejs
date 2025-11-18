import * as THREE from "three";

const bamboos = [];

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xcccccc
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);

for(let i = 0; i < 10; i++) {
  const randomX = Math.random(0, 85);
  const randomY = Math.random(0, 55);
  
  const geometry = new THREE.BoxGeometry(0.5, 0.5, 8);
  geometry.translate(1, 2, 10);

  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  bamboos.push(cube);
  // scene.add(cube);

}

for(let tree of bamboos){
  scene.add(tree);
}

camera.position.z = 10;
camera.position.y = 10;
camera.up.set(0, 0, 1);
camera.lookAt(0, 0, 0);

function animate() {
  renderer.render(scene, camera);
}
