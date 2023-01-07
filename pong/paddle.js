import * as Three from 'three';
import { ObjectHandler } from '../sceneobjectshandler';

export class Paddle extends Object
{
    speed = 10;
    isplayer = false;
    ball;
    move = 250;
    start()
    {
        this.name = "paddle"
        this.geometry = new Three.BoxGeometry(20,100,100);
        this.material = new Three.MeshStandardMaterial({
            color: 0xffffff
        });
        this.mesh = new Three.Mesh(this.geometry,this.material);
        this.boundingbox = new Three.Box3().setFromObject(this.mesh);
        setInterval(() => {
            if(!this.isplayer)
            {
                var ballpos = this.ball.mesh.position.y;
                var diff = this.mesh.position.y - ballpos;
                if(diff > 0)
                {
                    //move down
                    this.mesh.position.y -= this.speed
                }
                else
                {
                    //move up
                    this.mesh.position.y += this.speed
                }
            }
        }, this.move);
        
    }

    update()
    {
        this.boundingbox.copy(this.mesh.geometry.boundingBox).applyMatrix4(this.mesh.matrixWorld);
    }

    assignevents()
    {
        if(this.isplayer){this.handleinputs();}
    }
    handleinputs()
    {
        let M = this.mesh;
        let S = this.speed;
        this.document.addEventListener('keydown', function(event) {
            if(event.keyCode == 38) {
                if(M.position.y > 300)
                {
                    return;
                }
                M.position.y += S;
            }
            else if(event.keyCode == 40) {
                if(M.position.y < -300)
                {
                    return;
                }
                M.position.y -= S;
            }
        });
    }
    handlecollision(obj)
    {
        if(obj.name == null){return;}
    }
}