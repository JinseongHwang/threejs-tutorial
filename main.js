/** References
 * - https://threejs.org/docs/index.html
 * - https://github.com/mrdoob/three.js/
 * - https://code.tutsplus.com/ko/tutorials/webgl-with-threejs-basics--net-35688
 * - https://ahnheejong.name/articles/my-first-octahedron/
 * - https://itecnote.com/tecnote/javascript-how-to-overlay-html-text-buttons-on-three-js/
 */

const save = (blob, filename) => {
    const exportBtn = document.getElementById('exportBtn');
    const form = document.getElementsByTagName('form')[0];
    form.action = URL.createObjectURL(blob);
    exportBtn.download = filename;
}

const saveString = (text, filename) => {
    save(new Blob([text], {type: 'text/plain'}), filename);
};

const exportToObj = (scene) => {
    alert('Run export! (incomplete)');
    const exporter = new OBJExporter();
    const result = exporter.parse(scene);
    saveString(result, 'object.obj');
};

const width = window.innerWidth;
const height = window.innerHeight;

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

// Scene 생성
const scene = new THREE.Scene;

// 물체
const torusGeometry = new THREE.TorusGeometry(10, 3, 16, 100);
const torusMaterial = new THREE.MeshLambertMaterial({color: 0x1ec876, wireframe: true});
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
scene.add(torus);

// 카메라
const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
camera.position.y = 16;
camera.position.z = 40;
camera.lookAt(torus.position);
scene.add(camera);

// 배경
const skyboxGeometry = new THREE.BoxGeometry(10000, 10000, 10000);
const skyboxMaterial = new THREE.MeshBasicMaterial({color: 0x000000, side: THREE.BackSide});
const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
scene.add(skybox);

// 조명
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 100, 100);
scene.add(pointLight);

// 회전
const speed = 0.003;
(function update() {
    renderer.render(scene, camera);
    torus.rotation.x -= speed;
    torus.rotation.z -= speed;
    requestAnimationFrame(update);
}()); // function call with declaration

window.onload = () => {
    const exportBtn = document.getElementById('exportBtn');
    exportBtn.addEventListener('click', () => exportToObj(scene));
}