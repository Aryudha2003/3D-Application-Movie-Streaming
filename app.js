import * as THREE from "https://unpkg.com/three@0.165.0/build/three.module.js";

const canvas = document.getElementById("bg3d");
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x080a1a, 5, 18);

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0, 5);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const ambient = new THREE.AmbientLight(0x6a8dff, 1.2);
scene.add(ambient);

const keyLight = new THREE.PointLight(0x77f0ff, 3, 30);
keyLight.position.set(3, 4, 3);
scene.add(keyLight);

const orbGeometry = new THREE.IcosahedronGeometry(1.2, 8);
const orbMaterial = new THREE.MeshStandardMaterial({
  color: 0x4c6fff,
  emissive: 0x1b1f70,
  metalness: 0.35,
  roughness: 0.2,
  wireframe: true,
});
const orb = new THREE.Mesh(orbGeometry, orbMaterial);
scene.add(orb);

const ringGeometry = new THREE.TorusGeometry(2.2, 0.04, 24, 120);
const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x77f0ff, transparent: true, opacity: 0.75 });
const ring = new THREE.Mesh(ringGeometry, ringMaterial);
ring.rotation.x = 1.2;
scene.add(ring);

const particlesCount = 500;
const positions = new Float32Array(particlesCount * 3);
for (let i = 0; i < particlesCount * 3; i += 3) {
  positions[i] = (Math.random() - 0.5) * 20;
  positions[i + 1] = (Math.random() - 0.5) * 14;
  positions[i + 2] = (Math.random() - 0.5) * 20;
}

const particleGeometry = new THREE.BufferGeometry();
particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
const particleMaterial = new THREE.PointsMaterial({ color: 0xa7e8ff, size: 0.02 });
const stars = new THREE.Points(particleGeometry, particleMaterial);
scene.add(stars);

const clock = new THREE.Clock();
function animate() {
  const t = clock.getElapsedTime();
  orb.rotation.x = t * 0.35;
  orb.rotation.y = t * 0.45;

  ring.rotation.z = t * 0.4;
  ring.position.y = Math.sin(t * 0.8) * 0.2;

  stars.rotation.y = t * 0.03;
  camera.position.x = Math.sin(t * 0.2) * 0.35;
  camera.lookAt(0, 0, 0);

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
