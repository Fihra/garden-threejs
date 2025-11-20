import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import GUI from "lil-gui";
// import { SkeletonUtils } from 'three/examples/jsm/utils/SkeletonUtils.js';
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js';

const bamboos = [];

const cats = [];
const dogs = [];

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


// const gui = new GUI({ title: "Controls", width: 300});
// const cubeOneFolder = gui.addFolder("Cube one");
// cubeOneFolder.add(cats.position, "x").min(-5).max(5).step(0.5).name("pos x");
// cubeOneFolder.addColor(cube.material, "color");


let mixer;
let catMixers = [];
let dogMixers = [];
const clock = new THREE.Clock();

const loader = new GLTFLoader();

loader.load('assets/animated_dog_shiba_inu.glb', function(gltf) {
  const original = gltf.scene;

  for(let i = 0; i < 5; i++){
    const clone = SkeletonUtils.clone(original);
    clone.scale.set(0.1, 0.1, 0.1);

    let randomX = Math.random(0, 10) * 10;
    let randomZ = Math.random(0, 10) * 10;

    clone.position.set(randomX, 1, randomZ);

    dogs.push(clone);
    scene.add(clone);

    const mixer = new THREE.AnimationMixer(clone);
    dogMixers.push(mixer);
    if(gltf.animations.length){
      dogMixers[dogMixers.length-1].clipAction(gltf.animations[0]).play();
    }
  }

})


function randomizer(){
  return Math.random(0, 10) * 25;
}

loader.load('assets/maxwell_the_cat_with_bones_animation.glb', function(gltf) {
  const original = gltf.scene;
  for(let i = 0; i < 50; i++){
    const clone =  SkeletonUtils.clone(original);
    
    clone.scale.set(5, 5, 5);
    let randomX = randomizer();
    let randomY = randomizer();
    let randomZ = randomizer();

    clone.position.set(randomX, randomY, randomZ);

    cats.push(clone);
    scene.add(clone);

    const mixer = new THREE.AnimationMixer(clone);
    catMixers.push(mixer);
    if(gltf.animations && gltf.animations.length > 0 ){    
      const action = mixer.clipAction(gltf.animations[0]);
      action.play();
      // gltf.animations.forEach((clip) => {
      //   const action = mixer.clipAction(clip);
      //   action.play();
      // })
    }

  }

}, undefined, function(error) {
  console.error('GLTF load error:', error);
});

// const planeGeometry = new THREE.PlaneGeometry(10, 10);
// const planeMaterial = new THREE.MeshBasicMaterial({
//   color: 0xFFFFFF
// });
// const plane = new THREE.Mesh(planeGeometry, planeMaterial);

// plane.rotation.x = -Math.PI /2;

// scene.add(plane);

// console.log("plane: ", planeGeometry.parameters.width);

// const pointLight = new THREE.DirectionalLight( 0xff0000, 1, 100 );
// pointLight.position.set( 7, 5, 5 );

// scene.add( pointLight );


const light = new THREE.AmbientLight( 0xFFFFFF, 1 );
scene.add( light );
// const helper = new THREE.AmbientLightHelper( light, 10 );
// scene.add( helper );

// light.position.set(40, 100, 0);


const spotLight = new THREE.DirectionalLight( 0xffffff, 2, 0 );
spotLight.position.set( 10, 10, 10 );
spotLight.target.position.set(0, 0, 0);
spotLight.anagle = Math.PI / 6;
spotLight.distance = 100;
scene.add( spotLight );
scene.add(spotLight.target);
// const spotLightHelper = new THREE.SpotLightHelper( spotLight );
// scene.add( spotLightHelper );

//  light.target.position.set(0, 100, 0);
//  scene.add(light.target);


 const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );
// light.target();
// const sphereSize = 1;
// const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );

// new ThreeMFLoader.DirectionalLightHel

// scene.add( pointLightHelper );

for(let i = 0; i < 100; i++) {
  const randomX = Math.random(0, window.innerWidth) * 100;
  const randomY = Math.random(0, window.innerHeight) * 10;
  // console.log("X: ", randomX);
  // console.log("Y: ", randomY);
  
  const geometry = new THREE.BoxGeometry(0.5, 0.5, 2);
  geometry.translate(randomX, randomY, 1);

  const material = new THREE.MeshPhongMaterial({ color: 'green', flatShading: true });
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

const controls = new MapControls(camera, renderer.domElement);

let time = 0;

function animate() {

  controls.update();

  const delta = clock.getDelta();
  // if (mixer) mixer.update(delta);

  if(catMixers){
    catMixers.forEach(c => c.update(delta));
  }

  if(dogMixers){
    dogMixers.forEach(d => d.update(delta));
  }

  for(let c of cats){
    const randomY = randomizer();
    const randomZ = randomizer();
    c.rotation.y += randomY * 0.01;
    c.rotation.z += randomZ * 0.001;
  }

  for(let d of dogs){
    const randomNum = Math.random(0.000001, 0.000005);
    d.rotation.x += randomNum * 0.1;
  }

  time += 0.01;
  for(let tree of bamboos){
    const randomNum = Math.random(0.000001, 0.000005);
    tree.rotation.x += randomNum;
    // console.log(tree);
    // tree.scale.x = 5 * Math.sin(time);
    // tree.scale.y = 5 * Math.sin(time);
  scene.add(tree);
  }
  renderer.render(scene, camera);
}


// function animate() {
//   cube.rotation.x += 0.01;
//   renderer.render(scene, camera);
// }