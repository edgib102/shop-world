import * as PIXI from 'pixi.js'

const interactionLimit = 150
let inRange = true

const targetNumber = 700;


export function Proximity_Interaction(player, massShopContainer, debugContainer){

    let interactableElementContainer = FindClosest(player.position.x, massShopContainer);

    // interactableElementContainer.position.y = 100;

    console.log(interactableElementContainer.position.x);


    // let interactableElementContainer = massShopContainer.getChildAt(1)

    // console.log(Math.abs(player.position.x - massShopContainer.getChildAt(0).position.x))

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

    // let text = Generate_Shop_Text(interactableElementContainer);
    let text = new PIXI.Text("Shop Interaction Available");

    if(
        player.position.x - interactionLimit + player.width/2 < interactableElementContainer.position.x &&
        player.position.x + interactionLimit + player.width/2 > interactableElementContainer.position.x 
    ){
        // console.log("interactable");
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
