import * as Three from 'three';
export class Paddle extends Object
{
    speed = 10;
    start()
    {
        this.geometry = new Three.BoxGeometry(100,100,10);
        this.material = new Three.MeshStandardMaterial({
            color: 0xffffff
        });
        this.mesh = new Three.Mesh(this.geometry,this.material);
        this.boundingbox = new Three.Box3().setFromObject(this.mesh);
    }
    update()
    {
        //game loop
    }
    assignevents()
    {
        //add any event listeners here
    }
}