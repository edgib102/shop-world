// import { Layer } from '../node_modules/@pixi/layers/global.d.ts'

import * as PIXI from 'pixi.js'
import { Layer, Stage } from '@pixi/layers'


const groundLevel = 100;
let keys = {};
const movementSpeed = 8;
const movementLimit = 500;

window.onload = () => {

    let app = new PIXI.Application({
        // resizeTo: window,
        backgroundColor:0xb5c69a,
        view: document.getElementById('main-canvas')
    });

    app.stage = new Stage();

    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    let shopLayer = new Layer();
    shopLayer.group.enableSort = true;
    app.stage.addChild(shopLayer);
    // let playerLayer = new Layer();


    // const loader = PIXI.Loader.shared;

    // loader.baseUrl = "images" // sets default path

    // // loader.add(["grass.png", "Cloud 1.png", "Cloud 2.png","Cloud 3.png","Cloud 4.png","Cloud 5.png",]);

    // loader.load(); //loads images

    const player = new PIXI.Graphics();
    
    player.beginFill(0x272223);
    player.drawRect(
        window.innerWidth/2 - 100/2, //width spawn pos
        window.innerHeight - 150 - groundLevel, //height spawn pos
        100, //width
        150 //height
    );


    player.endFill();
    
    app.stage.addChild(player);



    const ground = new PIXI.Graphics();
    
    ground.beginFill(0xb19e3f);
    ground.drawRect(0, window.innerHeight - groundLevel, window.innerWidth, groundLevel); //
    ground.endFill();

    app.stage.addChild(ground);

        //debug lines
        if (false){
            const debugLines = new PIXI.Graphics();

            let debugWidth = 1

            console.log(screen.width/2)

            debugLines.beginFill(0xff0000);
            debugLines.drawRect(window.innerWidth/2 -debugWidth/2, 0, debugWidth, 1000) //centerline
            debugLines.drawRect(window.innerWidth/2 + movementLimit - debugWidth/2, 0, debugWidth, 1000) //left limit
            debugLines.drawRect(window.innerWidth/2 - movementLimit - debugWidth/2, 0, debugWidth, 1000) //right limit
            debugLines.endFill(); 

            app.stage.addChild(debugLines);

        }



    const colors = [0xf2d3ac, 0xe7a76c, 0xc28462, 0x905b54, 0x513a3d, 0x6a422c, 0x996336]

    const shopContainer = new PIXI.Container();
    app.stage.addChild(shopContainer);



    for (let index = 0; index < 20; index++) {
        const store = new PIXI.Graphics();

            store.beginFill(colors[Math.floor(Math.random() * colors.length)]);
            store.drawRect(100 * index * 5,window.innerHeight - 250 - groundLevel,400,250);
            store.endFill();

            store.zOrder = -1;

            store.parentLayer = shopLayer;
            shopContainer.addChild(store);

    }


    console.log(shopContainer._sortedChildren);

    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);

    app.ticker.add(gameloop);
    

    function keyDown(e) {
        keys[e.keyCode] = true;        
        // console.log(e.keyCode);

    }

    function keyUp(e) {
        keys[e.keyCode] = false;        
        // console.log(keys[e.keyCode]);

    }

    function gameloop() {
        
      if (keys["68"] || keys["39"]) {
          player.x += movementSpeed;
      }else if (keys["65"] || keys["37"]){
          player.x += -movementSpeed;
      }

      //check if hitting movement limit
      // console.log(screen.width/2)
      // console.log(player.width + movementLimit)
      // console.log(-player.width - movementLimit)

      if (player.position.x >= movementLimit){
          player.position.x -= movementSpeed;

          shopContainer.position.x -= movementSpeed;
      }
      else if (player.x <= -movementLimit){
          player.x += movementSpeed;

          shopContainer.position.x += movementSpeed;
      }
    }

}
