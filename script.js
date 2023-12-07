import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene();

// Group
const group = new THREE.Group()
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 'pink'})
)
scene.add(cube1)

/* BufferGeometry
const geometry = new THREE.BufferGeometry()
const count = 500
const positionsArray = new Float32Array(count * 3 * 3)
for(let i = 0; i < count * 3 * 3; i++){
    positionsArray[i] = Math.random() - 0.5
}
const positionsAtribute = new THREE.BufferAttribute(positionsArray, 3)
geometry.setAttribute('position', positionsAtribute)
const material = new THREE.MeshBasicMaterial({color: 'pink', wireframe: true})
const cube1 = new THREE.Mesh(geometry, material)
group.add(cube1)
*/

// Sphere with BufferGeometry 
/* const geometry = new THREE.BufferGeometry();
const radius = 1; // Le rayon de la sphère
const widthSegments = 32; // Nombre de segments horizontaux
const heightSegments = 32; // Nombre de segments verticaux

const positions = [];
const phiLength = Math.PI * 2;
const thetaLength = Math.PI;

for (let latNumber = 0; latNumber <= heightSegments; latNumber++) {
    const theta = latNumber * thetaLength / heightSegments;
    const sinTheta = Math.sin(theta);
    const cosTheta = Math.cos(theta);

    for (let longNumber = 0; longNumber <= widthSegments; longNumber++) {
        const phi = longNumber * phiLength / widthSegments;
        const sinPhi = Math.sin(phi);
        const cosPhi = Math.cos(phi);

        const x = cosPhi * sinTheta;
        const y = cosTheta;
        const z = sinPhi * sinTheta;
        const u = 1 - (longNumber / widthSegments);
        const v = 1 - (latNumber / heightSegments);

        positions.push(radius * x);
        positions.push(radius * y);
        positions.push(radius * z);
    }
}

const positionNumComponents = 3;
geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), positionNumComponents));

const material = new THREE.MeshBasicMaterial({ color: 'pink', wireframe: true });
const sphere = new THREE.Mesh(geometry, material);
group.add(sphere);
*/

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 'red'})
)
cube2.position.set(2,0,0)
group.add(cube2)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 'orange'})
)
cube3.position.set(-3,0,0)
group.add(cube3)

/* Cursor
const cursor = {
    x : 0,
    y : 0
}
window.addEventListener('mousemove', (eventCursor) => {
    cursor.x = eventCursor.clientX / window.innerWidth - 0.5
    cursor.y = - (eventCursor.clientY / window.innerHeight - 0.5)
})*/

// Axes helper
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)


/* Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}*/

window.addEventListener('resize', () => {
    /* Update sizes 
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight */

    // Update camera 
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    // Update renderer 
    renderer.setSize(window.innerWidth, window.innerHeight)

})
window.addEventListener('dblclick', () => {
    if (!document.fullscreenElement){
        canvas.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
})

// Camera
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight)
// const aspectRatio = window.innerWidth / window.innerHeight
// const camera = new THREE.OrthographicCamera(-5 * aspectRatio, 5 * aspectRatio, 3 * aspectRatio, -3 * aspectRatio, 1, 1000 )
// camera.position.x = 1
// camera.position.y = 1
camera.position.z = 3
scene.add(camera)

// Controls 
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
// controls.target.y = 0
// controls.update()

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animation
const clock = new THREE.Clock()

const animation = () => {
    // Time
    const elapsedTime = clock.getElapsedTime()
    
    // Update Object
    cube3.position.y = Math.sin(elapsedTime) * 2
        // gsap.to(cube3.position, {duration : Math.cos(elapsedTime), delay: Math.cos(elapsedTime), x: 2})

    cube2.position.x = Math.cos(elapsedTime) * 2
    cube2.position.y = Math.sin(elapsedTime) * 2

    // cube1.rotation.y = elapsedTime

    /* Update Camera with JS
    camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
    camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
    camera.position.y = Math.sin(cursor.y * Math.PI * 2) * 3
    camera.lookAt(group.position) */

    // Update Camera with Built-in Controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    window.requestAnimationFrame(animation)
}
animation()