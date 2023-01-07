import * as Three from 'three';
import { ObjectHandler } from '../sceneobjectshandler';
export class Ball extends Object
{
    speed = 3;
    lives = 3;
    direction = 
    {
        x: 0,
        y: 0,
    };
    score = 0;
    collisioncd = 0;
    score_t;
    lives_t;
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
    }
    update()
    {
        this.score_t.innerHTML =  "score: " + this.score.toString();
        if(this.collisioncd > 0){this.collisioncd --;}
        this.boundingbox.copy(this.mesh.geometry.boundingBox).applyMatrix4(this.mesh.matrixWorld);
        this.mesh.position.x += this.speed*this.direction.x;
        this.mesh.position.y += this.speed*this.direction.y;
        if(this.mesh.position.x > 620 ||this.mesh.position.x < -620)
        {
            this.direction.x = - this.direction.x
        }
        if(this.mesh.position.y > 400)
        {
            this.direction.y = - this.direction.y
        }
        if(this.mesh.position.y < -300)
        {
            this.lives--;
            this.lives_t.innerHTML =  "lives: " + this.lives.toString();
            this.resetball();
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
        this.lives_t = this.document.querySelector("#lives");
        this.score_t = this.document.querySelector("#score");
        this.lives_t.innerHTML =  "lives: " + this.lives.toString();
        this.score_t.innerHTML =  "score: 0"
    }
    handlecollision(obj)
    {
        if(obj.name == null){return;}
        if(this.collisioncd == 0)
        {
            var x =  (this.mesh.position.x - obj.mesh.position.x);
            var y =  (this.mesh.position.y - obj.mesh.position.y);
            var mag = Math.sqrt(Math.pow(x,2) + Math.pow(y,2));
            this.direction.x = (x/mag);
            this.direction.y = (y/mag);
            this.collisioncd = 5;
            const hitaudio = new Three.Audio(ObjectHandler.listener);
            ObjectHandler.audioloader.load('./game assets/hit.wav',function (buffer)
            {
                hitaudio.setBuffer(buffer);
                hitaudio.setVolume(0.3);
                hitaudio.play();
            });
            if(obj.name.toString().includes("brick"))
            {
                this.score += obj.value;
            }
        }
    }
}