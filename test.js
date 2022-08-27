import * as PIXI from 'pixi.js'
import { Layer, Stage } from '@pixi/layers'
import * as display from "@pixi/display"

let app = new PIXI.Application({
    width:window.innerWidth, 
    height:window.innerHeight,
    backgroundColor:0xb5c69a,
    view: document.getElementById('main-canvas')
});

app.stage = new Stage();

let layer = new Layer();
layer.group.enableSort = true;
app.stage.addChild(layer);


const loader = PIXI.Loader.shared;

loader.baseUrl = "images" // sets default path
loader.add(["untitled.png", "voxel.png"]);

loader.load(); //loads images

loader.onComplete.add(() => {
    const sprite1 = PIXI.Sprite.from(loader.resources['untitled.png'].texture);

    sprite1.width = sprite1.width *0.2;
    sprite1.height = sprite1.height *0.2;

    sprite1.parentLayer = layer;
    
    app.stage.addChild(sprite1);



    const sprite2 = PIXI.Sprite.from(loader.resources['voxel.png'].texture);

    sprite2.width = sprite2.width *0.2;
    sprite2.height = sprite2.height *0.2;

    
    sprite2.parentLayer = layer;
 
    app.stage.addChild(sprite2);

    
    sprite1.zOrder = 2;
    sprite2.zOrder = 1;

    console.log(layer._sortedChildren);
});

