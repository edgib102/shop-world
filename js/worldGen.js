import * as PIXI from 'pixi.js'

export function Init(app, groundLevel, shopContainer){

    const ground = new PIXI.Graphics();
    
    ground.beginFill(0xb19e3f);
    ground.drawRect(0, window.innerHeight - groundLevel, window.innerWidth, groundLevel); //
    ground.endFill();

    app.stage.addChild(ground);

    const colors = [0xf2d3ac, 0xe7a76c, 0xc28462, 0x905b54, 0x513a3d, 0x6a422c, 0x996336]

    for (let index = 0; index < 20; index++) {
        const store = new PIXI.Graphics();

            store.beginFill(colors[Math.floor(Math.random() * colors.length)]);
            store.drawRect(100 * index * 5,window.innerHeight - 250 - groundLevel,400,250);
            store.endFill();

            shopContainer.addChild(store);
    }

    //for actions when the user resizes the broswer
    window.addEventListener('resize', () => {
        shopContainer.position.y = window.innerHeight - window.innerHeight;
        // console.log(shopContainer.position.y)
    })    

}

