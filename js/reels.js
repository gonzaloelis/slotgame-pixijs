function generateRandomSlots(){
    let rendered_slots = [];
    for (let col = 0; col < 5; col++) {
        let selected_large_slot = false;
        let _slot_row = [];
        for (let row = 0; row < 4; row++) {
            let slot_number = Math.floor(Math.random() * slotTextures.length);
            if (row > 1 && slot_number > 10) {
                slot_number = Math.floor(Math.random() * (slotTextures.length - 2));
            }

            if ( selected_large_slot )
                slot_number = -1;
            _slot_row.push(slot_number);

            if (slot_number > 10)
                selected_large_slot = true
            else
                selected_large_slot = false;
        }

        rendered_slots[col] = _slot_row;
    }

    return rendered_slots;
}

function renderSlots( selected_slot_ids, animation ){
    for (let i = 0; i < 5; i++) {
        const rc = new PIXI.Container();
        rc.x = REEL_OFFSET_X + i * SYMBOL_SIZE + i * SPACE_OFFSET_REEL;
        rc.y = REEL_OFFSET_Y;
        reelContainer.addChild(rc);

        reel = {
            container: rc,
            symbols: [],
            position: 0,
            previousPosition: 0,
            blur: new PIXI.filters.BlurFilter()
        };

        reel.blur.blurX = 0;
        reel.blur.blurY = 0;
        rc.filters = [reel.blur];

        //Build the symbols
        for (let j = 0; j < 4; j++) {
            let selected_slot = selected_slot_ids[i][j];

            const symbol = new PIXI.Sprite(slotTextures[selected_slot]);

            if( selected_slot == 0 ){
                symbol.y -= 15;
                symbol.x -= 30;
            }
            if( selected_slot == 5 )
                symbol.x += 55;
            if( selected_slot == 10 ) {
                symbol.y -= 17;
            }
            reel.symbols.push(symbol);
            if( selected_slot < 0 )
                symbol.visible = false;

            rc.addChild(symbol);
        }

        reels.push(reel);
    }
}

function adjustContainerPosition(){
    let reelSize = getRealSize(PIXI.loader.resources.reel.texture);
    let reelBorderSize = getRealSize(PIXI.loader.resources.reelborder.texture);

    reelContainer.pivot.x = reelSize.w / 2;
    reelContainer.pivot.y = reelSize.h / 2;
    reelContainer.x = reelBorderContainer.x;
    reelContainer.y = reelBorderContainer.y + reelBorderSize.h / 2 - 28;
    reelContainer.scale.set(0.973, 0.938);

    const reel_mask = new PIXI.Graphics();
    reel_mask.beginFill(0xFF3300);
    reel_mask.drawRect(
        reelContainer.x - reelSize.w / 2, 
        reelContainer.y - reelSize.h / 2 + 23, 
        reelContainer.x + reelSize.w / 2, 
        reelContainer.y + reelSize.h / 2 - 175 - 23, 
    );
    reel_mask.endFill();
    reelContainer.mask = reel_mask;
}

function displayPayline(payline_path) {
    var paylines =  new PIXI.Container();

    let _f_animat = new PIXI.extras.AnimatedSprite(payline_frames);
    _f_animat.x = -50;
    _f_animat.y = payline_path[0] * SYMBOL_SIZE;
    _f_animat.scale.x = 0.5;
    _f_animat.play();
    paylines.addChild(_f_animat);

    for (var i = 0; i < (payline_path.length - 1); i++) {

        let _animat = new PIXI.extras.AnimatedSprite(payline_frames);
        _animat.x = i * (SYMBOL_SIZE + SPACE_OFFSET_REEL);
        _animat.y = payline_path[i] * SYMBOL_SIZE - SYMBOL_SIZE / 2;

        var _angle = 0;
        if ( (payline_path[i+1] - payline_path[i]) == 0) {
            _animat.scale.x = 1.2;
            _animat.x -= 15;
            _animat.y += SYMBOL_SIZE / 2;
        } else if ( (payline_path[i+1] - payline_path[i]) == 1) {
            _angle = Math.PI / 4;
            _animat.scale.x = 1.5;
            _animat.x += SYMBOL_SIZE / 2;
            _animat.y += SYMBOL_SIZE / 2 - 60;
        } else if ( (payline_path[i+1] - payline_path[i]) == 2) {
            _angle = Math.PI / 2.9;
            _animat.scale.x = 2.2;
            _animat.x += SYMBOL_SIZE / 2;
            // _animat.y -= SYMBOL_SIZE / 2;
        } if ( (payline_path[i+1] - payline_path[i]) == -1) {
            _angle = -Math.PI / 4;
            _animat.scale.x = 1.5;
            _animat.x -= SYMBOL_SIZE / 2 - 75;
            _animat.y += SYMBOL_SIZE + 40;
        } else if ( (payline_path[i+1] - payline_path[i]) == -2) {
            _angle = -Math.PI / 2.9;
            _animat.scale.x = 2.2;
            _animat.x -= SYMBOL_SIZE / 2 - 50;
            _animat.y += SYMBOL_SIZE * 1.5;
        }
        _animat.rotation = _angle;
        _animat.play();

        paylines.addChild(_animat);
    }

    let _t_animat = new PIXI.extras.AnimatedSprite(payline_frames);
    _t_animat.x = SYMBOL_SIZE * payline_path.length - SYMBOL_SIZE / 2 + 10;
    _t_animat.y = payline_path[4] * SYMBOL_SIZE;
    _t_animat.scale.x = 0.5;
    _t_animat.play();
    paylines.addChild(_t_animat);

    paylines.pivot.x = reelContainer.x;
    paylines.pivot.y = reelContainer.y;
    paylines.x = reelContainer.x;
    paylines.y = reelContainer.y;

    reelContainer.addChild(paylines);
}

function resetSlots(){
    if( reelContainer.children.length == SIZE_CHILDREN_REEL )
        return;

    count = reelContainer.children.length
    for( let i = SIZE_CHILDREN_REEL; i < count; i++){
        reelContainer.children.pop();
    }
}

//Basic lerp funtion.
function lerp(a1, a2, t) {
    return a1 * (1 - t) + a2 * t;
}

//Backout function from tweenjs.
backout = amount => t => --t * t * ((amount + 1) * t + amount) + 1;

//Function to start playing.
function startPlay() {
    if (running) return;
    running = true;
    resetSlots();

    reelContainer.children[win_position].visible = true;

    // hide winner Frame
    animatedSpriteWin.stop();
    animatedSpriteWin.visible = false;
    winReelContainer.visible = false;

    // hide BigWin Frame
    animatedSpriteBigWin.stop();
    animatedSpriteBigWin.visible = false;
    winBigReelContainer.visible = false;

    // hide overlay to display win
    overlayContainer.visible = false;

    // Add sound when reels running is set to true
    if (running){
        const sound = new Howl({
            src: './assets/sounds/mp3/arcade-game-fruit-machine-jackpot-002-long.mp3'
        });
        sound.play();
    };

    for (let i = 0; i < reels.length; i++) {
        const r = reels[i];
        const extra = Math.floor(Math.random() * 3);
        const target = r.position + MOVE_OFFSET;
        const time = 1000 + i*500+ (extra*200);//2500 + i * 600 + extra * 600;
        tweenTo(r, 'position', target, time, backout(0.3), null, i === reels.length - 1 ? reelsComplete : null);
    }
}

//Reels done handler.
function reelsComplete() {
    running = false;

    if (checkBigWin()) {
        bigwin_position = Math.floor(Math.random() * 3);
        showBigWin(bigwin_position);
        let payline_path = [bigwin_position, bigwin_position, bigwin_position, bigwin_position, bigwin_position];
        displayPayline(payline_path);
    } else {
        win_position = Math.floor(Math.random() * 5);
        showWin(win_position);
    }
}

function checkBigWin() {
    var big_bet = Math.floor(Math.random() * 2);
    return ( big_bet > 0 );
}

function showWin(position) {
    let reelBorderSize = getRealSize(PIXI.loader.resources.reelborder.texture);
    let reelSize = getRealSize(PIXI.loader.resources.reel.texture);

    // display winner Frame
    animatedSpriteWin.play();
    animatedSpriteWin.visible = true;
    winContainer.x = reelBorderSize.w / 2 - 250 + (258 + 17) * 0.975 * (position % 5 - 2);

    reelContainer.children[position].visible = false;

    winReelContainer = new PIXI.Container();
    for (var i = 0; i < 4; i++) {
        var _frames = [];       
        let selected_slot = slotArray[position][i];
        
        const symbol = new PIXI.Sprite(slotTextures[selected_slot]);

        let _animat = implementAnimation( i, position, selected_slot );
        reelContainer.addChild(_animat);
    }

    setTimeout(function(){
        count = reelContainer.children.length;
        for( var ani_index = SIZE_CHILDREN_REEL; ani_index < count; ani_index++ ) {
            reelContainer.children[ani_index].play();
        }
    }, 1000);

    winReelContainer.pivot.x = winContainer.x;
    winReelContainer.pivot.y = winContainer.y;
    winReelContainer.x = winContainer.x + SYMBOL_SIZE / 2;
    winReelContainer.y = winContainer.y + 75;
    // winReelContainer.scale.y = 0.95;

    const reel_mask = new PIXI.Graphics();
    reel_mask.beginFill(0xFF3300);
    reel_mask.drawRect(
        winReelContainer.x, 
        winReelContainer.y, 
        winReelContainer.x + SYMBOL_SIZE * 2, 
        winReelContainer.y + reelSize.h, 
    );
    reel_mask.endFill();
    winReelContainer.mask = reel_mask;
    winContainer.addChild(winReelContainer);

    freeSpinWinSprite.visible = true;
    bigWinSprite.visible = false;
    overlayContainer.visible = true;
}

function showBigWin(position) {
    let reelBorderSize = getRealSize(PIXI.loader.resources.reelborder.texture);
    let reelSize = getRealSize(PIXI.loader.resources.reel.texture);

    // display BigWin Frame
    // animatedSpriteBigWin.play();
    // animatedSpriteBigWin.visible = true;
    winBigContainer.x = reelBorderSize.w / 2;
    if (position == 2) {
        winBigContainer.pivot.y = -50;
    } else {
        winBigContainer.pivot.y = -80;
    }
    winBigContainer.y = reelSize.h / 2 + (reelSize.h / 3) * (position % 3 - 1);

    winBigReelContainer = new PIXI.Container();
    for (var i = 0; i < 5; i++) {
        var _frames = [];

        highlight_row = ( reels[i].position / MOVE_OFFSET + position + 1 ) % 4;
        let selected_slot = slotArray[i][ highlight_row ];

        const symbol = new PIXI.Sprite(slotTextures[selected_slot]);
        let _animat = implementAnimation( highlight_row, i, selected_slot );
        reelContainer.addChild(_animat);
    }

    setTimeout(function(){
        count = reelContainer.children.length;
        for( var ani_index = SIZE_CHILDREN_REEL; ani_index < count; ani_index++ ) {
            reelContainer.children[ani_index].play();
        }
    }, 1000);

    winBigReelContainer.pivot.x = winBigContainer.x;
    winBigReelContainer.pivot.y = winBigContainer.y+50;
    winBigReelContainer.x = winBigContainer.x - reelSize.w / 2 + 10;
    winBigReelContainer.y = winBigContainer.y - SYMBOL_SIZE / 2 + 10;

    // freeSpinWinSprite.visible = false;
    // bigWinSprite.visible = true;
    // overlayContainer.visible = true;
}

function tweenTo(object, property, target, time, easing, onchange, oncomplete) {
    const tween = {
        object,
        property,
        propertyBeginValue: object[property],
        target,
        easing,
        time,
        change: onchange,
        complete: oncomplete,
        start: Date.now()
    };

    tweening.push(tween);
    return tween;
}

function implementAnimation( row, col, selected_slot )
{
    symbol = reels[col].symbols[row]
    x = symbol.x;
    y = symbol.y

    var _frames = [];
    for (let j = 0; j <= image_frames; j++) {

        if (j < 10) {
            res_imgs.push(img_src[selected_slot] + "0" + j + ".png");
           let texture = PIXI.Texture.fromImage(img_src[selected_slot] + "0" + j + ".png");
            _frames.push(texture);
        } else {
            res_imgs.push(img_src[selected_slot] + j + ".png");
           let texture = PIXI.Texture.fromImage(img_src[selected_slot] + j + ".png");
            _frames.push(texture);
        }
    }

    let _animat = new PIXI.extras.AnimatedSprite(_frames);
    _animat.scale.x = _animat.scale.y = Math.max(SYMBOL_SIZE / symbol.width, SYMBOL_SIZE / symbol.height);

    _animat.x = col * (SYMBOL_SIZE + SPACE_OFFSET_REEL);
    _animat.y = y;


    if( symbol.visible == false )
        _animat.visible = false;

    symbol.visible = false;

    _animat.stop();

    if (selected_slot == 0) {
        _animat.x -= 70;
        _animat.y -= 10;
    }
    if (selected_slot == 5) {
        _animat.x += 0;
    }
    if (selected_slot == 3) {
        _animat.x -= 15;
    }
    if (selected_slot == 4) {
        _animat.x -= 15;
    }

    return _animat;
}