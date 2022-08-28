import * as PIXI from 'pixi.js';

let keys = {};
const movementLimit2 = 400;
const movementScreenLimitBuffer = 25;
const movementSpeed = 8;

let rightLimit = 0;
let leftLimit = 0;

export function Init(foregroundContainer, groundLevel) {

    if (false){ //debug lines
        const debugLines = new PIXI.Graphics();

        let debugWidth = 1

        debugLines.beginFill(0xff0000);
        debugLines.drawRect(window.innerWidth/2 -debugWidth/2, 0, debugWidth, 1000) //centerline
        debugLines.drawRect(window.innerWidth/2 + movementLimit2 - debugWidth/2, 0, debugWidth, 1000) //left limit
        debugLines.drawRect(window.innerWidth/2 - movementLimit2 - debugWidth/2, 0, debugWidth, 1000) //right limit
        debugLines.endFill(); 

        foregroundContainer.addChild(debugLines);

    }

    const player = new PIXI.Graphics();
    
    player.beginFill(0x272223);
    player.drawRect(
        0, //sets spawn pos to 0
        window.innerHeight - 150 - groundLevel, //height spawn pos
        100, //width
        150 //height
    );

    player.position.x = window.innerWidth/2 - player.width/2 //teleports player to the global coords

    player.endFill();

    
    foregroundContainer.addChild(player);

    window.addEventListener('resize', () => {
        player.position.x = window.innerWidth/2 - player.width/2

        DeclareMovementLimits(player.width);
    });

    DeclareMovementLimits(player.width);

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


export function Movement(player, massShopContainer) {
    if (keys["68"] || keys["39"]) {
        player.x += movementSpeed;
    }else if (keys["65"] || keys["37"]){
        player.x += -movementSpeed;
    }


    if (player.position.x >= rightLimit){ //if player position is more than the starting spawn point plus the movement limit
        player.position.x -= movementSpeed;

        for(let index = 0; index < massShopContainer.children.length; index++) {
            massShopContainer.children[index].position.x -= movementSpeed;
        }

    }
    else if (player.x <= leftLimit){ //if player position is more than the starting spawn point minus the movement limit
        player.x += movementSpeed;

        for(let index = 0; index < massShopContainer.children.length; index++) {
            massShopContainer.children[index].position.x += movementSpeed;
        }
    }
}

function CheckClosestElement(playerPosition){

}

function DeclareMovementLimits(playerWidth) {

    if(window.innerWidth/2 + movementLimit2 < window.innerWidth){

        rightLimit = (window.innerWidth/2 +movementLimit2)- playerWidth; //sets limit to spawn pos + limit var minus the character width to it wont go off screen
        leftLimit = (window.innerWidth/2 -movementLimit2);

    }else{
        rightLimit = window.innerWidth - playerWidth - movementScreenLimitBuffer //limits the movement to the screen, minus the width of the character and a buffer
        leftLimit = 0 + movementScreenLimitBuffer
    }
    
}
