import * as THREE from "three";
import { Scene } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

const renderer = new THREE.WebGL1Renderer();
renderer.shadowMap.enabled = true;

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

camera.position.set(-10, 30, 30);
orbit.update();

const options = {
  // Sphere
  sphereColor: "#ffea00",
  sphereWireframe: false,
  sphereWireframeSize: 50,
  sphereSpeed: 0.01,

  // Box
  boxColor: "#00ff00",

  // Plane
  planeColor: "#ffffff",

  // Ambient Light
  ambientLightColor: "#333333",

  // Spotlight
  penumbra: 0.8,
  angle: 0.1,
  intensity: 1,
};

// OBJECTS //

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.set(-5, 2, -7);
box.castShadow = true;
scene.add(box);

const planeGeometry = new THREE.PlaneGeometry(50, 50);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
scene.add(plane);
plane.receiveShadow = true;

const sphereGeometry = new THREE.SphereGeometry(
  4,
  options.sphereWireframeSize,
  options.sphereWireframeSize
);
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: 0x0000ff,
  wireframe: false,
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.y = 5;
scene.add(sphere);
sphere.castShadow = true;

// LIGHTING //

// const ambientLight = new THREE.AmbientLight(0x333333);
// scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
// scene.add(directionalLight);
// directionalLight.position.set(-30, 50, 0);
// directionalLight.castShadow = true;
// directionalLight.shadow.camera.top = 12;

// const directionalLightHelper = new THREE.DirectionalLightHelper(
//   directionalLight,
//   5
// );
// scene.add(directionalLightHelper);

// const directionalLightShadowHelper = new THREE.CameraHelper(
//   directionalLight.shadow.camera
// );
// scene.add(directionalLightShadowHelper);

const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(100, 100, 0);
spotLight.castShadow = true;
spotLight.angle = 0.15;

// const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLight);

/* GUI */
const gui = new dat.GUI();

const sphereFolder = gui.addFolder("sphere");
sphereFolder
  .addColor(options, "sphereColor")
  .onChange((e) => sphere.material.color.set(e));
sphereFolder
  .add(options, "sphereWireframe")
  .onChange((e) => (sphere.material.wireframe = e));
sphereFolder.add(options, "sphereSpeed", 0, 0.1);

const spotlightFolder = gui.addFolder("spotlight");
spotlightFolder.add(options, "penumbra");
spotlightFolder.add(options, "intensity");
spotlightFolder.add(options, "angle");

gui.addColor(options, "boxColor").onChange((e) => box.material.color.set(e));
gui
  .addColor(options, "planeColor")
  .onChange((e) => plane.material.color.set(e));

gui
  .addColor(options, "ambientLightColor")
  .onChange((e) => ambientLight.color.set(e));

// ANIMATION //
let step = 0;

function animate(time) {
  box.rotation.x += 1 / time;
  box.rotation.y += 1 / time;

  step += options.sphereSpeed;
  sphere.position.y = 10 * Math.abs(Math.sin(step)) + 3;

  spotLight.angle = options.angle;
  spotLight.penumbra = options.penumbra;
  spotLight.intensity = options.intensity;
  // spotLightHelper.update();

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(() => animate(200));
