import * as PIXI from 'pixi.js'
import { Layer, Stage } from '@pixi/layers'

import * as PLAYER from './player';
import * as WORLDGEN from './worldGen';


const groundLevel = 100;
const movementSpeed = 8;

let movementLimit = 500;


// console.log("limit: "+movementLimit, window.innerWidth);

window.onload = () => {

    let app = new PIXI.Application({
        resizeTo: window,
        backgroundColor:0xb5c69a,
        view: document.getElementById('main-canvas')
    });

    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    const foregroundContainer = new PIXI.Container();
    app.stage.addChild(foregroundContainer);

    WORLDGEN.Init(foregroundContainer, groundLevel); //world asset generation

    
    const player = PLAYER.Init(foregroundContainer, groundLevel); //player generation


    app.ticker.add(gameloop);

    function gameloop() {
        PLAYER.Movement(player, foregroundContainer.getChildAt(1));
    }

    //for actions when the user resizes the broswer
    const initalHeight = window.innerHeight;
    window.addEventListener('resize', () => {
        if (movementLimit > window.innerWidth){
            movementLimit = window.innerWidth
        }

        foregroundContainer.position.y = -(initalHeight - window.innerHeight); //ajusts the foreground to be at the bottom of the screen
        
    })  
}

