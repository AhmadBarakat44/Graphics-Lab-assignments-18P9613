import * as Three from 'three';
import { ObjectHandler } from './sceneobjectshandler';
import { Paddle } from './paddle';

//camera settings//
const near = 0.1;
const far = 10000;
const left = window.innerWidth/ -2;
const right = window.innerWidth/ 2;
const bottom = window.innerHeight/ -2;
const top = window.innerHeight/ 2;
const aspect = window.innerWidth / window.innerHeight;
//camera settings//

//threejs prerequesits//
const camera = new Three.OrthographicCamera(left,right,top,bottom,near,far);
const renderer = new Three.WebGLRenderer({
    canvas: document.querySelector('#canvas'),
})
renderer.setPixelRatio(devicePixelRatio);
renderer.setSize(window.innerWidth , window.innerHeight);
//threejs prerequesits//

//scene data//
const splashscreen = document.querySelector("#splashscreen");
const start_button = document.querySelector("#start");
start_button.onclick = startgame;
const paddle = new Paddle();
ObjectHandler.document = document;
ObjectHandler.camera = camera;
ObjectHandler.skybox = new Three.Color( 0x000000 );
ObjectHandler.bgmpath = '/game assets/BGM.mp3';
ObjectHandler.addobject(paddle);
ObjectHandler.start();
camera.position.setZ(-1000);
//scene data//


//main animation loop//
function animate()
{
    requestAnimationFrame(animate);
    ObjectHandler.update();
    //controls.update();
    renderer.render(ObjectHandler.scene,camera);
}
animate();
//main animation loop//

function startgame()
{
    splashscreen.style.opacity = "0%";
}