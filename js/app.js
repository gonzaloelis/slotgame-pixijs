/* TODO: 
    - Textures:
    - add button choose stake and show current stake - > name stake
    - add showcase Total money  - > name balance
    - add showcase total win - > name win
    - add border to text/restyle
    - Methods:
    - Calculate total and left balance
     - Calculate number of wins
     - Win Logic
     - Stake logic
     - Add tweens pixi, tweens
*/

const size = [1920, 1080];
const ratio = size[0] / size[1];

app = new PIXI.Application(size[0], size[1], {
    transparent: true,
    autoResize: true,
    antialias: true,
    resolution: 1,
});

document.body.appendChild(app.view);

PIXI.loader.load(onAssetsLoaded);

//onAssetsLoaded handler builds the example.
function onAssetsLoaded() {
    renderBackground()
    renderLogo()
    renderFooter()
    renderBoardFrame()
    renderWinner();
    renderBigWinner();

    /*----------------------------ReelContainer------------------------------------*/
    reelContainer = new PIXI.Container();

    slotArray = generateRandomSlots();

    renderSlots( slotArray, false );
    adjustContainerPosition();

    // let payline_path = [0, 0, 0, 0, 0];
    // displayPayline(payline_path);
    // payline_path = [1, 1, 1, 1, 1];
    // displayPayline(payline_path);
    // payline_path = [1, 2, 1, 2, 1];
    // displayPayline(payline_path);
    // payline_path = [2, 0, 2, 0, 2];
    // displayPayline(payline_path);

    // Listen for animate update.
    app.ticker.add(delta => {
        //Update the slots.
        for (let i = 0; i < reels.length; i++) {
            //Update blur filter y amount based on speed.
            //This would be better if calculated with time in mind also. Now blur depends on frame rate.
            var r = reels[i];
            r.blur.blurY = (r.position - r.previousPosition) * 8;
            r.previousPosition = r.position;

            //Update symbol positions on reel.
            for (let j = 0; j < r.symbols.length; j++) {
                const s = r.symbols[j];
                if(running)
                    s.visible = true;
                const prevy = s.y;

                if( slotArray[i][j-1] > 10 || j == 0 && slotArray[i][3] > 10 ){
                    s.visible = false;
                }

                s.y = (r.position + j) % r.symbols.length * SYMBOL_SIZE - SYMBOL_SIZE;
                s.x = Math.round((SYMBOL_SIZE - s.width) / 2);;
                if( slotArray[i][j] == 0 ){
                    s.y -= 45;
                    s.x -= 30;
                }
                if( slotArray[i][j] == 5 )
                    s.x += 55;
                if( slotArray[i][j] == 10 ) {
                    s.y -= 17;
                }

                // console.log(i, j, slotArray[i][j], s.y, prevy);
                if (s.y < 0 && prevy > SYMBOL_SIZE) {
                    //Detect going over and swap a texture. 
                    //This should in proper product be determined from some logical reel.
                    let selected_slot = Math.floor(Math.random() * slotTextures.length);

                    // check overlap
                    if( (slotArray[i][j-1] > 10 && selected_slot) > 10 || (slotArray[i][j+1] > 10 && selected_slot > 10) )
                        selected_slot = Math.floor(Math.random() * (slotTextures.length - 2));
                    if(  selected_slot > 10 && ( slotArray[i][0] > 10 && j == 3 || slotArray[i][3] > 10 && j ==0 ) )
                        selected_slot = Math.floor(Math.random() * (slotTextures.length - 2));

                    slotArray[i][j] = selected_slot;
                    s.texture = slotTextures[selected_slot];
                    s.scale.x = s.scale.y = Math.max(SYMBOL_SIZE / s.texture.width, SYMBOL_SIZE / s.texture.height);
                }
            }
        }
    });

    app.stage.addChild(reelContainer);

    renderOverlay();
}


// Listen for animate update.
app.ticker.add(delta => {
    const now = Date.now();
    const remove = [];
    for (var i = 0; i < tweening.length; i++) {
        const t = tweening[i];
        const phase = Math.min(1, (now - t.start) / t.time);

        t.object[t.property] = lerp(t.propertyBeginValue, t.target, t.easing(phase));
        if (t.change) t.change(t);
        if (phase == 1) {
            t.object[t.property] = t.target;
            if (t.complete)
                t.complete(t);
            remove.push(t);
        }
    }
    for (var i = 0; i < remove.length; i++) {
        tweening.splice(tweening.indexOf(remove[i]), 1);
    }
});

resize();
window.onresize = resize;
