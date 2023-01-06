import * as Three from 'three';
export class ObjectHandler
{
    static scene
    static objects = [];
    static document;
    static audioloader;
    static listener;
    static camera;
    static skybox;
    static bgmpath;
    constructor(){}
    static addobject(obj)
    {
        ObjectHandler.objects.push(obj);
        obj.start();
        if(ObjectHandler.scene != null){ObjectHandler.scene.add(obj.mesh);}
        obj.document = ObjectHandler.document
        obj.assignevents();
    }
    static removeobject(obj)
    {
        var index = ObjectHandler.objects.indexOf(obj);
        ObjectHandler.objects.splice(index,1);
        ObjectHandler.scene.remove(obj.mesh);
    }
    static start()
    {
        ObjectHandler.scene = new Three.Scene();
        //background//
        ObjectHandler.scene.background = this.skybox;
        //background//

        //audio//
        ObjectHandler.listener = new Three.AudioListener();
        ObjectHandler.camera.add(ObjectHandler.listener);
        ObjectHandler.audioloader = new Three.AudioLoader();
        const BGsound = new Three.Audio(ObjectHandler.listener);
        ObjectHandler.audioloader.load(this.bgmpath,function (buffer)
        {
            BGsound.setBuffer(buffer);
            BGsound.setLoop(true);
            BGsound.setVolume(0.3);
            BGsound.play();
        });
        //audio//

        //lighting//
        const ambientLight = new Three.AmbientLight(0xFFFFFF);
        //lighting//

        ObjectHandler.scene.add(ambientLight);
        ObjectHandler.objects.forEach(obj => 
        {
            obj.start();
            ObjectHandler.scene.add(obj.mesh);
            obj.document = ObjectHandler.document
            obj.assignevents();
        });
    }
    static update()
    {
        ObjectHandler.objects.forEach(obj => 
        {
            obj.update();
        });
        this.handlecollisions();
    }
    static handlecollisions()
    {
        ObjectHandler.objects.forEach(obj1 => 
        {
            if(obj1.boundingbox != null)
            {
                ObjectHandler.objects.forEach(obj2 => 
                {
                    if(obj2.boundingbox != null)
                    {
                        if(obj1.boundingbox.intersectsBox(obj2.boundingbox))
                        {
                            if(obj1!= obj2)
                            {
                                obj1.handlecollision(obj2);
                                obj2.handlecollision(obj1);
                            }
                            
                        }
                    }
                });
            }
        });
    }
    static degToRad(deg)
    {
        return (deg*Math.PI)/180;
    }
}
