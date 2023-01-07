import * as Three from 'three';
import { ObjectHandler } from '../sceneobjectshandler';
export class Ball extends Object
{
    speed = 3;
    direction = 
    {
        x: 0,
        y: 0,
    };
    score = 
    {
        p1: 0,
        p2: 0,
    }
    p1Scoreboard;
    p2Scoreboard;
    collisioncd = 0;
    start()
    {
        this.name = "ball"
        this.geometry = new Three.SphereGeometry(10);
        this.material = new Three.MeshStandardMaterial({
            color: 0xffffff
        });
        this.mesh = new Three.Mesh(this.geometry,this.material);
        this.boundingbox = new Three.Box3().setFromObject(this.mesh);
        this.resetball();
        setInterval(() => {
            this.speed +=.5
        }, 30000);
    }

    update()
    {
        if(this.collisioncd > 0){this.collisioncd --;}
        this.boundingbox.copy(this.mesh.geometry.boundingBox).applyMatrix4(this.mesh.matrixWorld);
        this.mesh.position.x += this.speed*this.direction.x;
        this.mesh.position.y += this.speed*this.direction.y;
        if(this.mesh.position.x > 720)
        {
            this.score.p2++;
            this.p2Scoreboard.innerHTML = this.score.p2.toString();
            this.resetball();
        }
        if(this.mesh.position.x < -720)
        {
            this.score.p1++;
            this.p1Scoreboard.innerHTML = this.score.p1.toString();
            this.resetball();
        }
        if(this.mesh.position.y > 300 ||this.mesh.position.y < -300)
        {
            this.direction.y = - this.direction.y
        }
    }
    resetball()
    {
        this.mesh.position.set(0,0,0);
        this.speed = 0;
        var x = Math.floor(Math.random()*(180));
        var y = Math.floor(Math.random()*(180));
        var mag = Math.sqrt(Math.pow(x,2) + Math.pow(y,2));
        this.direction.x = (x/mag);
        this.direction.y = (y/mag);
        setTimeout(()=>{this.speed = 3} , 3000);
    }
    assignevents()
    {
        this.p1Scoreboard = this.document.querySelector("#P1Score");
        this.p2Scoreboard = this.document.querySelector("#P2Score");
        this.p2Scoreboard.innerHTML = "0";
        this.p1Scoreboard.innerHTML = "0";
    }
    handlecollision(obj)
    {
        if(obj.name == null){return;}
        if(obj.name.toString().includes("paddle"))
        {
            if(this.collisioncd == 0)
            {
                var x =  (this.mesh.position.x - obj.mesh.position.x);
                var y =  (this.mesh.position.y - obj.mesh.position.y);
                var mag = Math.sqrt(Math.pow(x,2) + Math.pow(y,2));
                this.direction.x = (x/mag);
                this.direction.y = (y/mag);
                this.collisioncd = 20;
                const hitaudio = new Three.Audio(ObjectHandler.listener);
                ObjectHandler.audioloader.load('./game assets/hit.wav',function (buffer)
                {
                    hitaudio.setBuffer(buffer);
                    hitaudio.setVolume(0.3);
                    hitaudio.play();
                });
            }
        }
    }
}