import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Create a scene, camera, and renderer first.
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create controller
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Add damping effect for smoother movement
controls.dampingFactor = 0.05; // Adjust the damping factor as needed
controls.rotateSpeed = 0.5; // Adjust the rotation speed as needed

// Create a directionalLight for better visibility of the object
const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.z = 3;
scene.add(directionalLight);

// Create a background
//var skyGeo = new THREE.SphereGeometry(100000, 25, 25); 

// Create a loader for your 3D model (if needed).
const loader = new GLTFLoader();

// Declaring ramenModel as a global variable
let ramenModel;
//ramenModel.castShadow = true;
let floatingUp = true;
const floatSpeed = 0.0005;
loader.load('gltf/ShinRamen.gltf', function (gltf) {
    // Access the loaded GLTF model here
    ramenModel = gltf.scene;

    ramenModel.scale.set(6, 6, 6);
    ramenModel.rotation.set(Math.PI / 8, 0, 0);

    scene.add(ramenModel);

    // Position the camera after adding the object to the scene
    camera.position.z = 1;

    console.log("ramen added to scene");
}, undefined, function (error) {
    console.error(error);
});

// Define a function for handling window resizing
function handleResize() {
    // Update the camera's aspect ratio based on the original height
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    // Update the renderer's size to match the new width and original height
    renderer.setSize(newWidth, newHeight);
}
// Attach the event listener for window resizing
window.addEventListener('resize', handleResize);

// Define your animate function.
function animate() {
    requestAnimationFrame(animate);

    if (ramenModel) {
        if (ramenModel.position.y >= 0.05) {
            floatingUp = false; // Change direction when reaching a certain height
        } else if (ramenModel.position.y <= 0) {
            floatingUp = true; // Change direction when reaching the ground
        }

        // Move the ramenModel up or down based on the floating direction
        if (floatingUp) {
            ramenModel.position.y += floatSpeed;
        } else {
            ramenModel.position.y -= floatSpeed;
        }
    }
    ramenModel.rotation.y += 0.002;

    renderer.render(scene, camera);
}

// Call the animate function to start rendering.
animate();