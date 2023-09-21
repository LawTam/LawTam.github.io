import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Create a scene, camera, and renderer first.
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create and configure the orbit controls.
// const controls = new OrbitControls(camera, renderer.domElement);

// Position the camera.
camera.position.z = 1;

    // a light is required for MeshPhongMaterial to be seen
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight.position.z = 3
    scene.add(directionalLight)

    const loader = new THREE.GLTFLoader();
    let object;
    let floatingUp = true; // Flag to control the floating direction
    let floatSpeed = 0.01; // Initial floating speed
    const maxFloatSpeed = 0.03; // Maximum floating speed
    const acceleration = 0.0005; // Acceleration rate
    const deceleration = 0.0005; // Deceleration rate

    // Load the GLTF model
    loader.load('gltf/your_model.gltf', function (gltf) {
        // Access the loaded GLTF model here
        object = gltf.scene;

        // Scale and position the object as needed
        object.scale.set(0.5, 0.5, 0.5);
        object.position.set(0, 0, 0); // Start at the ground level

        // Add the loaded object to your scene
        scene.add(object);

        // Start the rendering loop
        animate();
    }, undefined, function (error) {
        console.error(error);
    });

// Define your animate function
function animate() {
    // Floating effect (up and down along the Y-axis)
    if (object) {
        if (object.position.y >= 2) {
            floatingUp = false; // Change direction when reaching a certain height
        } else if (object.position.y <= 0) {
            floatingUp = true; // Change direction when reaching the ground
        }

        // Modify the floating speed based on direction change
        if (floatingUp) {
            floatSpeed += acceleration;
        } else {
            floatSpeed -= deceleration;
        }

        // Ensure the speed doesn't go below zero or exceed the maximum
        floatSpeed = Math.max(0, Math.min(floatSpeed, maxFloatSpeed));

        // Move the object up or down based on the floating direction and speed
        if (floatingUp) {
            object.position.y += floatSpeed;
        } else {
            object.position.y -= floatSpeed;
        }

        // Rotate the object around its Y-axis to make it spin
        object.rotation.y += 0.01; // Adjust the rotation speed as needed
    }
}

// Call the animate function to start rendering.
animate();