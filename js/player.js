import * as PIXI from 'pixi.js';

let keys = {};


export function Init(app, groundLevel) {

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

    return player;
}


window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);


function keyDown(e) {
    keys[e.keyCode] = true;        
    // console.log(e.keyCode);

}

function keyUp(e) {
    keys[e.keyCode] = false;        
    // console.log(keys[e.keyCode]);

}

export function Movement(player, movementSpeed, movementLimit, shopContainer) {
    if (keys["68"] || keys["39"]) {
        player.x += movementSpeed;
    }else if (keys["65"] || keys["37"]){
        player.x += -movementSpeed;
    }

    if (player.position.x >= movementLimit){
        player.position.x -= movementSpeed;

        shopContainer.position.x -= movementSpeed;
    }
    else if (player.x <= -movementLimit){
        player.x += movementSpeed;

        shopContainer.position.x += movementSpeed;
    }
}