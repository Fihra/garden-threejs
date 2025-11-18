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
  color: 0x124f21
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);

plane.rotation.x = -Math.PI /2;

scene.add(plane);

console.log("plane: ", planeGeometry.parameters.width);

for(let i = 0; i < 100; i++) {
  const randomX = Math.random(0, plane.position.x) * 100;
  const randomY = Math.random(0, plane.position.y) * 10;
  // console.log("X: ", randomX);
  // console.log("Y: ", randomY);
  
  const geometry = new THREE.BoxGeometry(0.5, 0.5, 2);
  geometry.translate(randomX, randomY, 1);

  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  bamboos.push(cube);
}

for(let tree of bamboos){
  scene.add(tree);
}

camera.position.z = 10;
camera.position.y = 10;
// camera.up.set(0, 0, 1);
camera.lookAt(0, 0, 0);

function animate() {
  renderer.render(scene, camera);
}
