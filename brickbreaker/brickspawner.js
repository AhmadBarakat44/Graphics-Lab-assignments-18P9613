import * as Three from 'three';
import { ObjectHandler } from '../sceneobjectshandler';
import { Brick } from './brick';

export class BrickSpawner extends Object
{
    bricks = [];
    level = 0;
    levels_t
    start()
    {
        this.geometry = new Three.BoxGeometry(0,0,0);
        this.material = new Three.MeshStandardMaterial({
            color: 0x000000
        });
        this.mesh = new Three.Mesh(this.geometry,this.material);

    }
    update()
    {
        if(this.bricks.length == 0)
        {
            this.spawnBricks(30,20);
            this.level++;
            this.levels_t.innerHTML =  "level: " + this.level.toString();
        }
    }
    assignevents()
    {
        this.levels_t = this.document.querySelector("#level");
        this.levels_t.innerHTML =  "level: " + this.level.toString();
    }
    spawnBricks(x,y)
    {
        for(let i = 0 ; i < x ; i++)
        {
            for(let j = 0 ; j < y ; j++)
            {
                if(Math.random() > 0.5)
                {
                    let b = new Brick();
                    b.color = this.generateRGB()
                    b.value = Math.ceil(this.clamp(Math.random()*100 , 1 , 100));
                    b.spawner = this;
                    this.addbrick(b);
                    b.mesh.position.set(i * 35 - 500, j * 20 - 25, 0);
                }
            }
        }
    }
    addbrick(b)
    {
        ObjectHandler.addobject(b);
        this.bricks.push(b);
    }
    removebrick(b)
    {
        ObjectHandler.removeobject(b);
        var index = this.bricks.indexOf(b);
        this.bricks.splice(index,1);
    }
    generateRGB()
    {
        var R;
        var B;
        var G;
        R = Math.floor(this.clamp(Math.random()*0xFF , 0x44 , 0xFF));
        G = Math.floor(this.clamp(Math.random()*0xFF , 0x44 , 0xFF));
        B = Math.floor(this.clamp(Math.random()*0xFF , 0x44 , 0xFF));
        var RGB = R * 0x10000 + G * 0x100 + B;
        return RGB; 
    }
    clamp (num, min, max)
    {
        return Math.min(Math.max(num, min), max);
    }
}