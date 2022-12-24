import * as Three from 'three';
import { Fruit } from './Fruit';
import { ObjectHandler } from './sceneobjectshandler';
export class FruitSpawner extends Object
{
    period = 5000;
    speed = .5;
    now;
    fruitscores = [1 , 2];
    fruitalphas = 
    [
        new Three.TextureLoader().load('./game assets/apple_alpha.png'),
        new Three.TextureLoader().load('./game assets/banana_alpha.png'),
    ];
    fruitsprites = 
    [
        new Three.TextureLoader().load('./game assets/apple.png'),
        new Three.TextureLoader().load('./game assets/banana.png'),
    ];
    constructor()
    {
       super();
    }
    start()
    {
        this.name = "fruitspawner";
        this.geometry = new Three.BoxGeometry(0,0,0);
        this.material = new Three.MeshStandardMaterial({
            color: 0x000000
        });
        this.mesh = new Three.Mesh(this.geometry,this.material);

        this.now = new Date().getTime();
    }
    update()
    {
        let currentTime = new Date().getTime();
        if(currentTime > this.now + this.period)
        {
            let x = (Math.random()*800)-400;
            this.now = currentTime;
            let fruit = new Fruit();
            let F = Math.floor(Math.random()*(this.fruitsprites.length));

            fruit.material = new Three.MeshStandardMaterial({
                map:this.fruitsprites[F]
            });
            fruit.material.transparent = true;
            fruit.material.alphaMap = this.fruitalphas[F];
            fruit.value = this.fruitscores[F];
            fruit.speed = this.speed;
            ObjectHandler.addobject(fruit);
            fruit.mesh.position.set(x,200,0);
            fruit.name = ((this.now).toString() + ": fruit");
        }
        
    }
    assignevents()
    {
        //add any event listeners here
    }
}