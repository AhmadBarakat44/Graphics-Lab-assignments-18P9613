import * as Three from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { ObjectHandler } from './sceneobjectshandler';
import { Player } from './player'
import { FruitSpawner } from './FruitSpawner';
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
var timerinterval;
const timer_t = document.querySelector("#time");
const score_t = document.querySelector("#score");
const splashscreen = document.querySelector("#splashscreen");
const high_score_t = document.querySelector("#highscore");
const start_button = document.querySelector("#start")
start_button.onclick = startgame;
const player = new Player();
const spawner = new FruitSpawner();
ObjectHandler.document = document;
ObjectHandler.camera = camera;
ObjectHandler.addobject(spawner);
ObjectHandler.start();
camera.position.setZ(-1000);
//scene data//



//main animation loop//

function animate()
{
    requestAnimationFrame(animate);
    ObjectHandler.update();
    controls.update();
    renderer.render(ObjectHandler.scene,camera);
    diffculityramp();
}
animate();
//main animation loop//

//gameplay functions//
var scorePeriod = 10;
var diffculity = 0;
function diffculityramp()
{
    if(player.score >= (diffculity + 1) * scorePeriod)
    {
        console.log("i got called");
        diffculity ++;
        spawner.speed += .3;
        spawner.period = spawner.period / 1.1;
    }  
}
function startgame()
{
    ObjectHandler.addobject(player);
    player.mesh.position.set(0,-200,0);
    player.timer = 60000;
    player.score = 0;
    score_t.innerHTML = ("score: " + player.score);
    splashscreen.style.opacity = "0%";
    timerinterval = setInterval(() => {
        player.timer -= 1000;
        timer_t.innerHTML = ("time left: " + gettime(player.timer));
        if(player.timer <= 0){endgame();}
    }, 1000);
}
function endgame()
{
    score_t.innerHTML = "";
    timer_t.innerHTML = "";
    clearInterval(timerinterval);
    ObjectHandler.removeobject(player);
    splashscreen.style.opacity = "100%"
    high_score_t.innerHTML = "your final score was: " + player.score;
}
//gameplay functions//

//helper functions//
function degToRad(deg)
{
    return (deg*Math.PI)/180;
}
function gettime(timer)
{
    let remainder = timer;
    let mins = Math.floor(timer/60000);
    let seconds = 0;
    let mSeconds = 0;
    remainder -= mins * 60000;
    if(remainder >= 0)
    {
        seconds = Math.floor(remainder/1000);
        remainder -= seconds * 1000;
        if(remainder >= 0)
        {
            mSeconds = remainder;
        }
    }
    return (mins + " : " + seconds);
}
//helper functions//