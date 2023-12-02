import * as THREE from 'three';

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene();

// Group
const group = new THREE.Group()
group.rotation.x = 2
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 'pink'})
)
group.add(cube1)

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
cube3.position.set(-2,0,0)
group.add(cube3)


// Axes helper
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)


// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

camera.lookAt(group.position)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)


// Animation
const animation = () => {
    // Update Object
    cube1.rotation.x += 0.01
    cube2.rotation.y += -0.01
    cube3.rotation.y += 0.01

    // Render
    renderer.render(scene, camera)

    window.requestAnimationFrame(animation)
}
animation()