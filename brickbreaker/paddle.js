import * as Three from 'three';

export class Paddle extends Object
{
    speed = 10;
    start()
    {
        this.name = "paddle"
        this.geometry = new Three.BoxGeometry(100,20,100);
        this.material = new Three.MeshStandardMaterial({
            color: 0xffffff
        });
        this.mesh = new Three.Mesh(this.geometry,this.material);
        this.boundingbox = new Three.Box3().setFromObject(this.mesh);
    }
    update()
    {
        this.boundingbox.copy(this.mesh.geometry.boundingBox).applyMatrix4(this.mesh.matrixWorld);
    }
    assignevents()
    {
        this.handleinputs();
    }
    handleinputs()
    {
        let M = this.mesh;
        let S = this.speed;
        this.document.addEventListener('keydown', function(event) {
            if(event.keyCode == 37) {
                if(M.position.x > 620)
                {
                    return;
                }
                M.position.x += S;
            }
            else if(event.keyCode == 39) {
                if(M.position.x < -620)
                {
                    return;
                }
                M.position.x -= S;
            }
        });
    }
    handlecollision(obj)
    {
        if(obj.name == null){return;}
    }
}