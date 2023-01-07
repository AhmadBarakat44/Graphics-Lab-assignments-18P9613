import * as Three from 'three';
import { ObjectHandler } from '../sceneobjectshandler';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { Paddle } from './paddle';
import { Ball } from './ball';
import { BrickSpawner } from './brickspawner';

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
const controls = new OrbitControls(camera , renderer.domElement);
//threejs prerequesits//

//scene data//
const splashscreen = document.querySelector("#splashscreen");
const start_button = document.querySelector("#start");
const high_score_t = document.querySelector("#highscore");
start_button.onclick = startgame;
const player = new Paddle();
const ball  = new Ball();
const spwaner = new BrickSpawner();
ObjectHandler.document = document;
ObjectHandler.camera = camera;
ObjectHandler.skybox = new Three.Color( 0x000000 );
ObjectHandler.bgmpath = './game assets/BGM.mp3';
ObjectHandler.start();
ObjectHandler.addobject(spwaner);
camera.position.setZ(-1000);
//scene data//

//main animation loop//
function animate()
{
    if(ball.lives == 0){endgame();}
    requestAnimationFrame(animate);
    ObjectHandler.update();
    controls.update();
    renderer.render(ObjectHandler.scene,camera);
}
animate();
//main animation loop//

function startgame()
{
    splashscreen.style.opacity = "0%";
    ObjectHandler.addobject(player);
    player.mesh.position.set(0,-250,0);
    ObjectHandler.addobject(ball);
    ball.lives = 3;
    ball.lives_t.innerHTML = "lives : " + ball.lives.toString();
    ball.score = 0;
    spwaner.level = 1;
}
function endgame()
{
    spwaner.bricks.forEach(b => {
        spwaner.removebrick(b);
    });
    spwaner.spawnBricks(30,20);
    ball.lives = 3;
    ObjectHandler.removeobject(player);
    ObjectHandler.removeobject(ball);
    splashscreen.style.opacity = "100%";
    high_score_t.innerHTML = "your highscore was: " + ball.score;
}
