import * as Three from 'three';
import { ObjectHandler } from './sceneobjectshandler';
export class Fruit extends Object
{
    speed;
    now;
    lifetime = 20000;
    value;
    strikes = 0;
    constructor()
    {
       super();
    }
    start()
    {
        this.geometry = new Three.BoxGeometry(50,50,50);
        this.mesh = new Three.Mesh(this.geometry,this.material);
        this.now = new Date().getTime();
        this.boundingbox = new Three.Box3().setFromObject(this.mesh);
    }
    update()
    {
        this.mesh.position.y -= this.speed
        this.boundingbox.copy(this.mesh.geometry.boundingBox).applyMatrix4(this.mesh.matrixWorld);
        let currentTime = new Date().getTime();
        if(currentTime > this.now + this.lifetime)
        {
            ObjectHandler.removeobject(this);
        }
    }
    assignevents()
    {
        //add any event listeners here
    }
    handlecollision(obj)
    {
        if(obj.name == null){return;}
        if(obj.name.toString().includes("player"))
        {
            const pickUpAudio = new Three.Audio(ObjectHandler.listener);
            ObjectHandler.audioloader.load('./game assets/collect.wav',function (buffer)
            {
                pickUpAudio.setBuffer(buffer);
                pickUpAudio.setVolume(0.3);
                pickUpAudio.play();
            });
            ObjectHandler.removeobject(this);
        }
    }
}