import * as PIXI from 'pixi.js'
import { Layer, Stage } from '@pixi/layers'

import * as PLAYER from './player';
import * as WORLDGEN from './worldGen';


const groundLevel = 100;
let keys = {};
const movementSpeed = 8;
const movementLimit = 500;

window.onload = () => {

    let app = new PIXI.Application({
        resizeTo: window,
        backgroundColor:0xb5c69a,
        view: document.getElementById('main-canvas')
    });

    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    const shopContainer = new PIXI.Container();
    app.stage.addChild(shopContainer);
    WORLDGEN.Init(app, groundLevel, shopContainer);

    
    const player = PLAYER.Init(app, groundLevel); //player generation


    app.ticker.add(gameloop);

    function gameloop() {
        PLAYER.Movement(player, movementSpeed, movementLimit, shopContainer);
    }
}

