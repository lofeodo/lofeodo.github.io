import * as THREE from 'three';
import gsap from 'gsap';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"


import { scrollToSection } from './scrollToFunction.js';
window.scrollToSection = scrollToSection;

// Scene
const scene = new THREE.Scene();

// Create a sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: "#ffffff",
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: window.innerWidth / 4,
  height: window.innerWidth / 4
}

// Light  
const light = new THREE.PointLight(0xffffff, 0.1, 100);
light.intensity = 150;
light.position.set( 0, 0, 10 );
scene.add(light);

const light2 = new THREE.PointLight(0xffffff, 0.1, 100);
light2.intensity = 200;
light2.position.set( 0, 0, -50 );
scene.add(light2);

// Camera
const camera = new THREE.PerspectiveCamera(
  45, 
  sizes.width / sizes.height,
  0.1,
  100);
const cameraDistance = 7.9;
camera.position.set(0, 0, cameraDistance);
scene.add(camera);

// Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(5);
renderer.domElement.style.clipPath = 'circle(50% at 50% 50%)';
renderer.render(scene, camera);

updateWebGlMargin();

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;
controls.enablePan = false;
controls.enableZoom = false;

// Resize
window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth / 4;
  sizes.height = window.innerWidth / 4;
  updateWebGlMargin();

  // Update camera
  camera.updateProjectionMatrix();
  camera.aspect = sizes.width / sizes.height;
  renderer.setSize(sizes.width, sizes.height);
});

// Dragging

// let mouseDown = false;
// let previousMouseY = 0;
// window.addEventListener('mousedown', (e) => {
//   mouseDown = true;
//   previousMouseY = e.y;
//   console.log("mouse down");
// });

// window.addEventListener('mouseup', () => {
//   mouseDown = false;
//   previousMouseY = 0;
//   console.log("mouse up");
// });

// window.addEventListener('mousemove', (e) => {
//   if (mouseDown)
//   {
//     if (previousMouseY != 0){
//       const deltaY = e.y - previousMouseY;
//       const newScrollY = previousScrollValue + deltaY * 5;
//       window.scrollTo(0, newScrollY);
//       previousScrollValue = getScrollY();
//       updateColor();
//     }
//     previousMouseY = e.y;
//   }
// });

// Scrolling

let previousOrientation = 0;
let previousScrollValue = getScrollY();
window.addEventListener('scroll', () => {
  const scrollValue = getScrollY();
  const scrollDelta = scrollValue - previousScrollValue;
  let orientation = getCameraOrientation();
  orientation += (scrollDelta * 0.015);
  orientation %= (2 * Math.PI);

  const yzHypothenuse = Math.sqrt(cameraDistance**2 - camera.position.x**2);
  let newY = Math.sin(orientation) * yzHypothenuse;
  let newZ = Math.cos(orientation) * yzHypothenuse;

  if ( Math.PI / 2 < orientation && orientation < Math.PI )
  {
    newY *= -1;
  }
  else if ( Math.PI < orientation && orientation < 3 * Math.PI / 2 )
  {
    newY *= -1;
  }

  camera.position.set(camera.position.x, newY, newZ);
  camera.lookAt(scene.position);

  previousScrollValue = scrollValue;
  previousOrientation = orientation;
  updateColor();
});

function getCameraOrientation()
{
  let y = camera.position.y;
  let z = camera.position.z;

  if ( Math.PI / 2 < previousOrientation && previousOrientation < Math.PI )
  {
    y *= -1;
  }
  else if ( Math.PI < previousOrientation && previousOrientation < 3 * Math.PI / 2 )
  {
    y *= -1;
  }

  let orientation = Math.atan2(y,z);
  if (orientation < 0)
  {
    orientation += 2 * Math.PI;
  }

  return orientation;
}

function updateColor(){
  const normalizedX = Math.abs( camera.position.x ) / cameraDistance * 255;
  const normalizedY = Math.abs( camera.position.y ) / cameraDistance * 255;
  const normalizedZ = Math.abs( camera.position.z ) / cameraDistance * 255;
  let rgb = [
    Math.round(normalizedX),
    Math.round(normalizedY),
    Math.round(normalizedZ)
  ]

  let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
  gsap.to(mesh.material.color, {r: newColor.r, g: newColor.g, b: newColor.b});
}

function getScrollY(){
  return window.scrollY || document.documentElement.scrollTop;
}

// Loop

const loop = () => {
  controls.update();
  previousOrientation = getCameraOrientation();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
}

loop();

// Sphere placement

function updateWebGlMargin(){
  const r = sizes.width / 2;
  const rHypothenuse = Math.sqrt(2) * r;
  const diagonalMargin = rHypothenuse - r;
  const margin = - 2 - Math.sqrt( diagonalMargin ** 2 / 2 ) + "px";
  document.documentElement.style.setProperty('--webGlMargin', margin);
}

// GSAP effects

const tl = gsap.timeline({ defaults: { duration: 0.75 } });
tl.fromTo('.navigation', {y: "-300%"}, {y: "0%"});
tl.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, {z: 1, x: 1, y: 1});

const textDiv = document.querySelector('.page.hero .text');

tl.duration( 2 );
tl.fromTo(textDiv, {x: "10%", opacity: "0%"}, {x: "0%", opacity: "100%"});