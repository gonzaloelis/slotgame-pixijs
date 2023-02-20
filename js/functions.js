function renderBackground(){
    let frames = []
    for (let i = 0; i <= image_frames; i++) {
        if (i < 10) {
           let texture = PIXI.Texture.fromImage("./assets/images/Background/Background_0000" + i + ".png");
            frames.push(texture);
        } else {
           let texture = PIXI.Texture.fromImage("./assets/images/Background/Background_000" + i + ".png");
            frames.push(texture);
        }
    }
    let animatedSpriteBackground = new PIXI.extras.AnimatedSprite(frames);
    animatedSpriteBackground.play();
    app.stage.addChild(animatedSpriteBackground);
}

function renderLogo(){
    let topContainer = new PIXI.Container();
    let frames = []

    for (let i = 0; i <= image_frames; i++) {
        if (i < 10) {
           let texture = PIXI.Texture.fromImage("./assets/images/DE-FUSE_Logo/DE-FUSE_Logo_0000" + i + ".png");
            frames.push(texture);
        } else {
           let texture = PIXI.Texture.fromImage("./assets/images/DE-FUSE_Logo/DE-FUSE_Logo_000" + i + ".png");
            frames.push(texture);
        }
    }
    let animatedSpriteLogo = new PIXI.extras.AnimatedSprite(frames);
    animatedSpriteLogo.play();
    topContainer.addChild(animatedSpriteLogo);
    topContainer.pivot.x = getRealSize(PIXI.loader.resources.logo.texture).w/2;
    topContainer.pivot.y = 0;
    topContainer.x = app.screen.width/2;
    topContainer.y = -10;
    app.stage.addChild(topContainer);
}

function renderBoardFrame(){
    let reelBorderBackground = new PIXI.Sprite.fromImage('./assets/images/reel-background1.png');
    let reelSize = getRealSize(PIXI.loader.resources.reel.texture);
    let reelBorderSize = getRealSize(PIXI.loader.resources.reelborder.texture);

    reelBorderContainer = new PIXI.Container();
    reelBorderContainer.addChild(reelBorderBackground);

    reelBorderContainer.pivot.x = reelBorderSize.w/2;
    reelBorderContainer.pivot.y = 0;

    reelBorderContainer.x = app.screen.width/2;
    reelBorderContainer.y = getRealSize(PIXI.loader.resources.logo.texture).h - 84.5;
    reelBorderContainer.scale.y = 0.97;

    let reelBackground = new PIXI.Sprite.fromImage("./assets/images/reel-background3.png");
    reelBackground.pivot.x = reelSize.w/2;
    reelBackground.pivot.y = reelSize.h/2;
    reelBackground.x = reelBorderSize.w/2;
    reelBackground.y = reelBorderSize.h/2 - 15;
    reelBackground.scale.set(0.974, 0.97);
    reelBorderContainer.addChild(reelBackground);

    app.stage.addChild(reelBorderContainer);
}

function renderWinner(){
    let reelSize = getRealSize(PIXI.loader.resources.reel.texture);
    let reelBorderSize = getRealSize(PIXI.loader.resources.reelborder.texture);

    winContainer = new PIXI.Container();
    frames = []
    realSize = getRealSize(PIXI.loader.resources.logo.texture);
    for (let i = 0; i <= image_frames; i++) {
        if (i < 10) {
            let texture = PIXI.Texture.fromImage("./assets/images/Anticipation/Anticipation_0000" + i + ".png");
            frames.push(texture);
        } else {
            let texture = PIXI.Texture.fromImage("./assets/images/Anticipation/Anticipation_000" + i + ".png");
            frames.push(texture);
        }
    }

    animatedSpriteWin = new PIXI.extras.AnimatedSprite(frames);
    animatedSpriteWin.stop();
    animatedSpriteWin.visible = false;
    winContainer.addChild(animatedSpriteWin);

    winReelContainer = new PIXI.Container();
    winContainer.addChild(winReelContainer);

    winContainer.pivot.x = 0;
    winContainer.pivot.y = 0;
    winContainer.x = reelBorderSize.w / 2 - 250 - (258 + 17) * 0.975 * 0;
    winContainer.y = -8;

    reelBorderContainer.addChild(winContainer);
}

function renderBigWinner(){
    let reelSize = getRealSize(PIXI.loader.resources.reel.texture);
    let reelBorderSize = getRealSize(PIXI.loader.resources.reelborder.texture);

    winBigContainer = new PIXI.Container();
    frames = []
    realSize = getRealSize(PIXI.loader.resources.logo.texture);
    for (let i = 0; i <= image_frames; i++) {
        if (i < 10) {
            let texture = PIXI.Texture.fromImage("./assets/images/Anticipation/Anticipation_0000" + i + ".png");
            frames.push(texture);
        } else {
            let texture = PIXI.Texture.fromImage("./assets/images/Anticipation/Anticipation_000" + i + ".png");
            frames.push(texture);
        }
    }

    animatedSpriteBigWin = new PIXI.extras.AnimatedSprite(frames);
    animatedSpriteBigWin.rotation = Math.PI / 2;
    animatedSpriteBigWin.anchor.x = 0.5;
    animatedSpriteBigWin.anchor.y = 0.5;
    animatedSpriteBigWin.scale.y = (reelSize.w / reelSize.h);
    animatedSpriteBigWin.scale.x = 1;
    animatedSpriteBigWin.stop();
    animatedSpriteBigWin.visible = false;

    winBigReelContainer = new PIXI.Container();
    winBigContainer.addChild(winBigReelContainer);

    winBigContainer.addChild(animatedSpriteBigWin);
    winBigContainer.pivot.x = 0;
    winBigContainer.pivot.y = -80;
    winBigContainer.x = reelBorderSize.w / 2;
    winBigContainer.y = reelSize.h / 2 + (reelSize.h / 3) * 0;

    reelBorderContainer.addChild(winBigContainer);
}

function renderOverlay() {
    overlayContainer = new PIXI.Container();

    let overlayBackground = new PIXI.Sprite.from(PIXI.loader.resources.overlay.texture);
    overlayContainer.addChild(overlayBackground);

    freeSpinWinSprite = new PIXI.Sprite.from(PIXI.loader.resources.freespin.texture);
    freeSpinWinSprite.anchor.x = 0.5;
    freeSpinWinSprite.anchor.y = 0.5;
    freeSpinWinSprite.x = app.screen.width / 2;
    freeSpinWinSprite.y = app.screen.height / 2;
    overlayContainer.addChild(freeSpinWinSprite);

    bigWinSprite = new PIXI.Sprite.from(PIXI.loader.resources.bigwin.texture);
    bigWinSprite.anchor.x = 0.5;
    bigWinSprite.anchor.y = 0.5;
    bigWinSprite.x = app.screen.width / 2;
    bigWinSprite.y = app.screen.height / 2;
    overlayContainer.addChild(bigWinSprite);

    overlayContainer.visible = false;
    app.stage.addChild(overlayContainer);
}

function renderFooter(){

    let bottomSize = getRealSize(PIXI.loader.resources.footer.texture);

    //container for footer items
    const footerContainer = new PIXI.Container();
    footerContainer.x = 0;
    footerContainer.y = app.screen.height - bottomSize.h;

    const offset_footer_text_top = 80;

    const numStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 40,
        fontWeight: 'bold',
        fill: '#ffffff',
    });

    const txtStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 30,
        fontWeight: 'bold',
        fill: ['#ffffff', '#00ff99'], // gradient
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 300
    });

    const makeImageButton = (image, audioMP3, audioOGG, x, y, px, py, scale, parent) => {
        const button = PIXI.Sprite.fromImage(image);
        const sound = new Howl({
            src: [audioMP3, audioOGG]
        });
        button.sound = sound;
        button.interactive = true;
        button.buttonMode = true;
        button.on('pointerdown', event => sound.play());
        parent.addChild(button);
        button.x = x;
        button.y = y;
        button.pivot.x = px;
        button.pivot.y = py;
        button.scale.set(scale);
        return button;
    };

    const btnCenterHold = new PIXI.Container();
    btnCenterHold.x = bottomSize.w / 2;
    btnCenterHold.y = bottomSize.h / 2;
    btnCenterHold.pivot.x = bottomSize.w / 2;
    btnCenterHold.pivot.y = bottomSize.h / 2;

    _realSize = getRealSize(PIXI.loader.resources.autoplay.texture);
    const autoplay = makeImageButton(
        './assets/images/autoplay.png',
        './assets/sounds/mp3/multimedia_button_click_006.mp3',
        './assets/sounds/ogg/multimedia_button_click_006.mp3',
        bottomSize.w / 2 - 5 - 49,
        bottomSize.h / 2 + 8,
        _realSize.w,
        _realSize.h / 2,
        1,
        btnCenterHold
    );

    _realSize = getRealSize(PIXI.loader.resources.maxbet.texture);
    const maxbet = makeImageButton(
        './assets/images/maxbet.png',
        './assets/sounds/mp3/multimedia_button_click_006.mp3',
        './assets/sounds/ogg/multimedia_button_click_006.mp3',
        bottomSize.w / 2 - 5 + 48,
        bottomSize.h / 2 + 8,
        0,
        _realSize.h / 2,
        1,
        btnCenterHold
    );

    _realSize = getRealSize(PIXI.loader.resources.spin.texture);
    const spinActive = makeImageButton(
        './assets/images/spin.png',
        './assets/sounds/mp3/zapsplat_foley_money_pouch_fabric_coins_down_on_surface_006_15052.mp3',
        './assets/sounds/ogg/zapsplat_foley_money_pouch_fabric_coins_down_on_surface_006_15052.mp3',
        bottomSize.w / 2 - 5,
        bottomSize.h / 2 + 8,
        _realSize.w / 2,
        _realSize.h / 2,
        1,
        btnCenterHold
    );

    spinActive.addListener('pointerdown', () => {
        if (running) return;
        startPlay();
        playerResources.reduceBalance();
        balanceValue.text = playerResources.balance;
    });

    const btnSettingHold = new PIXI.Container();

    _realSize = getRealSize(PIXI.loader.resources.setting.texture);
    const setButton = makeImageButton(
        './assets/images/setting.png',
        './assets/sounds/mp3/multimedia_button_click_006.mp3',
        './assets/sounds/ogg/multimedia_button_click_006.mp3',
        40,
        bottomSize.h / 2 + 30,
        _realSize.w / 2,
        _realSize.h / 2,
        1,
        btnSettingHold
    );

    _realSize = getRealSize(PIXI.loader.resources.help.texture);
    const helpButton = makeImageButton(
        './assets/images/help.png',
        './assets/sounds/mp3/multimedia_button_click_006.mp3',
        './assets/sounds/ogg/multimedia_button_click_006.mp3',
        110,
        bottomSize.h / 2 + 30,
        _realSize.w / 2,
        _realSize.h / 2,
        1,
        btnSettingHold
    );

    const btnLevelHold = new PIXI.Container();
    btnLevelHold.x = 0;
    btnLevelHold.y = 0;

    //lines
    let lineText = new PIXI.Text('LINES', txtStyle);
    lineText.x = 220;
    lineText.y = offset_footer_text_top;
    lineText.pivot.x = lineText.width / 2;
    lineText.pivot.y = lineText.height / 2;

    let lineValue = new PIXI.Text(`${playerResources.lines}`, numStyle);
    lineValue.x = 220;
    lineValue.y = offset_footer_text_top + 50;
    lineValue.pivot.x = lineValue.width / 2;
    lineValue.pivot.y = lineValue.height / 2;

    //bet
    let betText = new PIXI.Text('BET', txtStyle);
    betText.x = 350;
    betText.y = offset_footer_text_top;
    betText.pivot.x = betText.width / 2;
    betText.pivot.y = betText.height / 2;

    let betValue = new PIXI.Text(`${playerResources.bet}`, numStyle);
    betValue.x = 350;
    betValue.y = offset_footer_text_top + 50;
    betValue.pivot.x = betValue.width / 2;
    betValue.pivot.y = betValue.height / 2;

    //level
    let levelText = new PIXI.Text('LEVEL', txtStyle);
    levelText.x = 520;
    levelText.y = offset_footer_text_top;
    levelText.pivot.x = levelText.width / 2;
    levelText.pivot.y = levelText.height / 2;

    let levelValue = new PIXI.Text(`${playerResources.level}`, numStyle);
    levelValue.x = 520;
    levelValue.y = offset_footer_text_top + 50;
    levelValue.pivot.x = levelValue.width / 2;
    levelValue.pivot.y = levelValue.height / 2;

    //coin button
    _realSize = getRealSize(PIXI.loader.resources.minus.texture);
    const levelDown = makeImageButton(
        './assets/images/minus.png',
        './assets/sounds/mp3/multimedia_button_click_006.mp3',
        './assets/sounds/ogg/multimedia_button_click_006.mp3',
        460,
        offset_footer_text_top + 50,
        _realSize.w / 2,
        _realSize.h / 2,
        1,
        btnLevelHold
    );

    const levelUp = makeImageButton(
        './assets/images/plus.png',
        './assets/sounds/mp3/multimedia_button_click_006.mp3',
        './assets/sounds/ogg/multimedia_button_click_006.mp3',
        580,
        offset_footer_text_top + 50,
        _realSize.w / 2,
        _realSize.h / 2,
        1,
        btnLevelHold
    );

    levelUp.addListener("pointerdown", () => {
        playerResources.addLevel();
        levelValue.text = playerResources.level;
    });

    levelDown.addListener("pointerdown", () => {
        playerResources.minusLevel();
        levelValue.text = playerResources.level;
    });

    const btnCoinHold = new PIXI.Container();
    btnCoinHold.x = 0;
    btnCoinHold.y = 0;

    let coinText = new PIXI.Text('COIN VALUE', txtStyle);
    coinText.x = 1450;
    coinText.y = offset_footer_text_top;
    coinText.pivot.x = coinText.width / 2;
    coinText.pivot.y = coinText.height / 2;

    let coinValue = new PIXI.Text(`${playerResources.coin}`, numStyle);
    coinValue.x = 1450;
    coinValue.y = offset_footer_text_top + 50;
    coinValue.pivot.x = coinValue.width / 2;
    coinValue.pivot.y = coinValue.height / 2;

    const coinDown = makeImageButton(
        './assets/images/minus.png',
        './assets/sounds/mp3/multimedia_button_click_006.mp3',
        './assets/sounds/ogg/multimedia_button_click_006.mp3',
        1350,
        offset_footer_text_top + 50,
        _realSize.w / 2,
        _realSize.h / 2,
        1,
        btnCoinHold
    );

    const coinUp = makeImageButton(
        './assets/images/plus.png',
        './assets/sounds/mp3/multimedia_button_click_006.mp3',
        './assets/sounds/ogg/multimedia_button_click_006.mp3',
        1550,
        offset_footer_text_top + 50,
        _realSize.w / 2,
        _realSize.h / 2,
        1,
        btnCoinHold
    );

    coinUp.addListener("pointerdown", () => {
        playerResources.addCoin();
        coinValue.text = playerResources.coin;
    });

    coinDown.addListener("pointerdown", () => {
        playerResources.minusCoin();
        coinValue.text = playerResources.coin;
    });

    let balanceText = new PIXI.Text('COINS', txtStyle);
    balanceText.x = 1750;
    balanceText.y = offset_footer_text_top;
    balanceText.pivot.x = balanceText.width / 2;
    balanceText.pivot.y = balanceText.height / 2;

    let balanceValue = new PIXI.Text(`${playerResources.balance}`, numStyle);
    balanceValue.x = 1750;
    balanceValue.y = offset_footer_text_top + 50;
    balanceValue.pivot.x = balanceValue.width / 2;
    balanceValue.pivot.y = balanceValue.height / 2;

    const bottom = PIXI.Sprite.fromImage("./assets/images/footer-background.png");

   
    footerContainer.addChild(
        bottom,
        btnSettingHold,
        lineText,
        lineValue,
        betText,
        betValue,
        levelText,
        btnLevelHold,
        levelValue,
        btnCenterHold,
        coinText,
        btnCoinHold,
        coinValue,
        balanceText,
        balanceValue,
    );

    app.stage.addChild(footerContainer);
}

function getRealSize(_texture) {
    const _sprite = new PIXI.Sprite(_texture);
    let _result = {w:_sprite.width, h:_sprite.height};
    return _result;
}

function resize() {
    if (window.innerWidth / window.innerHeight >= ratio) {
        var w = window.innerHeight * ratio;
        var h = window.innerHeight;
    } else {
        var w = window.innerWidth;
        var h = window.innerWidth / ratio;
    }
    app.view.style.width = w + 'px';
    app.view.style.height = h + 'px';
}
