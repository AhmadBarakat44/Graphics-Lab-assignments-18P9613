import * as Three from 'three';

export class Brick extends Object
{
    value;
    color;
    spawner;
    start()
    {
        this.name = "brick"
        this.geometry = new Three.BoxGeometry(30,15,50);
        this.material = new Three.MeshStandardMaterial({
            color: this.color
        });
        this.mesh = new Three.Mesh(this.geometry,this.material);
        this.boundingbox = new Three.Box3().setFromObject(this.mesh);
    }
    update()
    {
        this.boundingbox.copy(this.mesh.geometry.boundingBox).applyMatrix4(this.mesh.matrixWorld);
    }
    assignevents(){}
    handlecollision(obj)
    {
        if(obj.name == null){return;}
        if(obj.name.toString().includes("ball"))
        {
            this.spawner.removebrick(this);
        }
    }
}