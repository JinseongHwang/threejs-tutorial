/** References\
 * - https://threejs.org/docs/index.html
 * - https://github.com/mrdoob/three.js/
 * - https://code.tutsplus.com/ko/tutorials/webgl-with-threejs-basics--net-35688
 * - https://ahnheejong.name/articles/my-first-octahedron/
 */

const width = window.innerWidth;
const height = window.innerHeight;

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

// Scene 생성
const scene = new THREE.Scene;

// 물체
const torusGeometry = new THREE.TorusGeometry(100, 30, 160, 1000);
const torusMaterial = new THREE.MeshBasicMaterial({color: 0x1ec876});
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
scene.add(torus);

// 카메라
const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
camera.position.y = 160;
camera.position.z = 400;
camera.lookAt(torus.position);
scene.add(camera);

// 배경
const skyboxGeometry = new THREE.BoxGeometry(10000, 10000, 10000);
const skyboxMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide });
const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
scene.add(skybox);

// 조명
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 300, 200);
scene.add(pointLight);

// 회전
const clock = new THREE.Clock;
(function update() {
    renderer.render(scene, camera);
    torus.rotation.y -= clock.getDelta();
    requestAnimationFrame(update)
}()); // function call with declaration