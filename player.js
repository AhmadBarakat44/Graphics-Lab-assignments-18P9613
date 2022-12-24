import * as Three from 'three';
export class Player extends Object
{
    speed = 10;
    score = 0;
    timer;
    score_T;
    timer_t; 
    constructor()
    {
       super();
    }
    start()
    {
        this.name = "player";
        this.geometry = new Three.BoxGeometry(100,100,100);
        const sprite = new Three.TextureLoader().load('./assets/bowl.png');
        this.material = new Three.MeshStandardMaterial({
            map: sprite
        });
        this.material.alphaMap = new Three.TextureLoader().load('./assets/bowl_alpha.png');
        this.material.transparent = true;
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
        this.score_T = this.document.querySelector("#score");
        this.timer_t = this.document.querySelector("#time");
    }

    handleinputs()
    {
        let M = this.mesh;
        let S = this.speed;
        this.document.addEventListener('keydown', function(event) {
            if(event.keyCode == 37) {
                //console.log("left");
               M.position.x += S;
            }
            else if(event.keyCode == 39) {
                //console.log("right");
                M.position.x -= S;
            }
        });
    }
    handlecollision(obj)
    {
        if(obj.name == null){return;}
        if(obj.name.toString().includes("fruit"))
        {
            requestAnimationFrame(this.handlecollision);
            this.score += obj.value;
            this.score_T.innerHTML = ("score: " + this.score);
            this.timer += 5000;
            this.timer_t.innerHTML = ("time left: " + this.gettime());
        }
        
    }
    gettime()
    {
        let remainder = this.timer;
        let mins = Math.floor(this.timer/60000);
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
}