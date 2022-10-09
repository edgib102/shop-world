import * as PIXI from 'pixi.js'

const interactionLimit = 150
let inRange = true

const targetNumber = 700;


export function Proximity_Interaction(player, massShopContainer, debugContainer){

    let interactableElementContainer = FindClosest(player.position.x, massShopContainer);

    if (true){ //debug lines
        const debugLines = new PIXI.Graphics();

        let debugWidth = 1

        debugLines.beginFill(0xff0000);
        debugLines.drawRect(player.position.x + player.width/2 - debugWidth/2, 0, debugWidth, 1000) //centerline
        debugLines.drawRect(player.position.x + player.width/2 + interactionLimit - debugWidth/2, 0, debugWidth, 1000) //left limit
        debugLines.drawRect(player.position.x + player.width/2 - interactionLimit - debugWidth/2, 0, debugWidth, 1000) //right limit
        debugLines.endFill(); 

        debugContainer.addChild(debugLines);

        setTimeout(() => {
            debugLines.destroy(true);
        }, 1)

    }

    let text = new PIXI.Text(interactableElementContainer.info.name, {fontFamily:'Silkscreen', fill: 0x272223 });

    if( //if players interaction radius is in range of shop do something
        player.position.x - interactionLimit + player.width/2 < interactableElementContainer.position.x + interactableElementContainer.width/2  &&
        player.position.x + interactionLimit + player.width/2 > interactableElementContainer.position.x + interactableElementContainer.width/2 
    ){
        interactableElementContainer.addChild(text);

        text.position.y -= 50;

        setTimeout(() => { //completley scuffed setup, change later
            text.destroy(true);
        }, 1) 

    }
}

function FindClosest(targetNumber, massShopContainer) {
    var current = massShopContainer.children[0]
    var difference = Math.abs (targetNumber - current.position.x);

    for (var val = 0; val < massShopContainer.children.length; val++) {

        var newdiff = Math.abs (targetNumber - massShopContainer.children[val].position.x);

        if (newdiff < difference) {
            difference = newdiff;
            current = massShopContainer.children[val];
            
        }
    }   
    return current;
}
