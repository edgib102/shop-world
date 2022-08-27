import * as PIXI from 'pixi.js';

let keys = {};
const movementLimit2 = 2600;
const movementScreenLimitBuffer = 25;
const movementSpeed = 8;

let rightLimit = 0;
let leftLimit = 0;
DeclareMovementLimits();


export function Init(foregroundContainer, groundLevel) {

    if (true){
        const debugLines = new PIXI.Graphics();

        let debugWidth = 1

        console.log(screen.width/2)

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

    player.position.x = window.innerWidth/2 - 100/2 //teleports player to the global coords

    player.endFill();
    
    foregroundContainer.addChild(player);

    window.addEventListener('resize', () => {
        player.position.x = window.innerWidth/2 - (100/2)

        DeclareMovementLimits();
    });

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



export function Movement(player, shopContainer) {
    if (keys["68"] || keys["39"]) {
        player.x += movementSpeed;
    }else if (keys["65"] || keys["37"]){
        player.x += -movementSpeed;
    }


    if (player.position.x >= rightLimit){ //if player position is more than the starting spawn point plus the movement limit
        player.position.x -= movementSpeed;
        shopContainer.position.x -= movementSpeed;

    }
    else if (player.x <= leftLimit){ //if player position is more than the starting spawn point minus the movement limit
        player.x += movementSpeed;
        shopContainer.position.x += movementSpeed;

    }
}

function DeclareMovementLimits() {

    if(window.innerWidth/2 + movementLimit2 < window.innerWidth){

        rightLimit = (window.innerWidth/2 +movementLimit2)- 100; //sets limit to spawn pos + limit var minus the character width to it wont go off screen
        leftLimit = (window.innerWidth/2 -movementLimit2);

    }else{
        rightLimit = window.innerWidth - 100 - movementScreenLimitBuffer //limits the movement to the screen, minus the width of the character and a buffer
        leftLimit = 0 + movementScreenLimitBuffer
    }
    
}
