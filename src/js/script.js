import * as THREE from "three";
import { Scene } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

const renderer = new THREE.WebGL1Renderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.append(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

// const gridHelper = new THREE.GridHelper(30);
// scene.add(gridHelper);

camera.position.set(-10, 30, 30);
orbit.update();

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.y = 10;
scene.add(box);

const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
scene.add(plane);

const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
const sphereMaterial = new THREE.MeshBasicMaterial({
  color: 0x0000ff,
  wireframe: false,
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.y = 5;
scene.add(sphere);

const gui = new dat.GUI();

const options = {
  sphereColor: "#ffea00",
  boxColor: "#00ff00",
  planeColor: "#ffffff",
};

gui
  .addColor(options, "sphereColor")
  .onChange((e) => sphere.material.color.set(e));

gui.addColor(options, "boxColor").onChange((e) => box.material.color.set(e));
gui
  .addColor(options, "planeColor")
  .onChange((e) => plane.material.color.set(e));

function animate(time) {
  box.rotation.x += 1 / time;
  box.rotation.y += 1 / time;
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(() => animate(200));
