const image_frames = 89;
var app
var reels = [];
var slotTextures = [];
var slotAnimations = [];
var reelContainer;
var running = false;
var tweening = [];
const res_imgs = [];
var reelBorderContainer;

var winContainer;
var animatedSpriteWin;
var winReelContainer;

var winBigContainer;
var animatedSpriteBigWin;
var winBigReelContainer;

var overlayContainer;
var freeSpinWinSprite;
var bigWinSprite;
var slotArray = [];

var win_position = 0;
var bigwin_position = 0;

var payline_frames = [];

const MOVE_OFFSET = 55; // offset for tween
const SIZE_CHILDREN_REEL = 5; // default size of children in reelContainer

var REEL_OFFSET_X = 0;
var REEL_OFFSET_Y = 5;
var SYMBOL_SIZE = 258;
var SPACE_OFFSET_REEL = 17;

class Resources {
    constructor(balance, level, win) {
        this.balance = 100035;
        this.level = 1;
        this.coin = 0.03;
        this.win = 0;
        this.bet = 10;
        this.lines = 5;
        this.playing = false;
        this.addLevel = function () {
            //Add stake with one point till it equals to three
            if (playerResources.level >= 1 && playerResources.level <= 2) {
                playerResources.level ++;
            }
        };
        this.minusLevel = function minusLevel() {
            //Reduce stake one point till it equals to 1
            if (playerResources.level > 1) {
                playerResources.level --;
            }
        };
        this.addCoin = function () {
            //Add stake with one point till it equals to three
            if (playerResources.coin) {
                playerResources.coin++;
                playerResources.coin = playerResources.coin.toFixed(2);
            }
        };
        this.minusCoin = function () {
            //Reduce stake one point till it equals to 1
            if (playerResources.coin > 1) {
                playerResources.coin--;
                playerResources.coin = playerResources.coin.toFixed(2);
            }
        };
        this.reduceBalance = function (){
            //Reduce Balance when player prss on spin button
            this.balance = this.balance - this.level;
        }
        this.addBalance = function (){
            //Reduce Balance when player prss on spin button
            this.balance = this.balance - this.coin;
        }
    }
}
var playerResources = new Resources();

const img_src = [
    "./assets/images/AK 47/AK 47_000",
    "./assets/images/A Bombsite Logo/A Bombsite Logo_000",
    "./assets/images/AWP sniper/AWP sniper_000",
    "./assets/images/C4Bomb/C4Bomb_000",
    "./assets/images/Defuse kit/Defuse kit_000",
    "./assets/images/Desert eagle/Desert eagle_000",
    "./assets/images/Flashbang/Flashbang_000",
    "./assets/images/Hand granade/Hand granade_000",
    "./assets/images/Knife/Knife_000",
    "./assets/images/M4 carbine/M4 carbine_000",
    "./assets/images/WILD/WILD_000",
    "./assets/images/SWAT Police/SWAT Police_000",
    "./assets/images/Terrorist/Terrorist_000",
];

slotTextures = [
    PIXI.Texture.fromImage("./assets/images/AK 47/AK 47_00000.png"),
    PIXI.Texture.fromImage("./assets/images/A Bombsite Logo/A Bombsite Logo_00000.png"),
    PIXI.Texture.fromImage("./assets/images/AWP sniper/AWP sniper_00000.png"),
    PIXI.Texture.fromImage("./assets/images/C4Bomb/C4Bomb_00000.png"),
    PIXI.Texture.fromImage("./assets/images/Defuse kit/Defuse kit_00000.png"),
    PIXI.Texture.fromImage("./assets/images/Desert eagle/Desert eagle_00000.png"),
    PIXI.Texture.fromImage("./assets/images/Flashbang/Flashbang_00000.png"),
    PIXI.Texture.fromImage("./assets/images/Hand granade/Hand granade_00000.png"),
    PIXI.Texture.fromImage("./assets/images/Knife/Knife_00000.png"),
    PIXI.Texture.fromImage("./assets/images/M4 carbine/M4 carbine_00000.png"),
    PIXI.Texture.fromImage("./assets/images/WILD/WILD_00000.png"),
    PIXI.Texture.fromImage("./assets/images/SWAT Police/SWAT Police_00000.png"),
    PIXI.Texture.fromImage("./assets/images/Terrorist/Terrorist_00000.png"),
];

PIXI.loader
    .add("background", "./assets/images/background.png")
    .add("autoplay", "./assets/images/autoplay.png")
    .add("maxbet", "./assets/images/maxbet.png")
    .add("minus", "./assets/images/minus.png")
    .add("help", "./assets/images/help.png")
    .add("setting", "./assets/images/setting.png")
    .add("logo", "./assets/images/logo.png")
    .add("footer", "./assets/images/footer-background.png")
    .add("reelborder", "./assets/images/reel-background1.png")
    .add("reel", "./assets/images/reel-background3.png")
    .add("spin", "./assets/images/spin.png")
    .add("bigwin", "./assets/images/big_win.png")
    .add("freespin", "./assets/images/free_spin.png")
    .add("overlay", "./assets/images/overlay.png")
    .add("./assets/images/AK 47/AK 47_00000.png")
    .add("./assets/images/A Bombsite Logo/A Bombsite Logo_00000.png")
    .add("./assets/images/AWP sniper/AWP sniper_00000.png")
    .add("./assets/images/C4Bomb/C4Bomb_00000.png")
    .add("./assets/images/Defuse kit/Defuse kit_00000.png")
    .add("./assets/images/Desert eagle/Desert eagle_00000.png")
    .add("./assets/images/Flashbang/Flashbang_00000.png")
    .add("./assets/images/Hand granade/Hand granade_00000.png")
    .add("./assets/images/Knife/Knife_00000.png")
    .add("./assets/images/M4 carbine/M4 carbine_00000.png")
    .add("./assets/images/WILD/WILD_00000.png")
    .add("./assets/images/SWAT Police/SWAT Police_00000.png")
    .add("./assets/images/Terrorist/Terrorist_00000.png")
    .add(res_imgs)

for (let j = 0; j <= image_frames; j++) {
    if (j < 10) {
       let texture = PIXI.Texture.fromImage("./assets/images/Pay-Line/Pay-Line_0000" + j + ".png");
        payline_frames.push(texture);
    } else {
       let texture = PIXI.Texture.fromImage("./assets/images/Pay-Line/Pay-Line_000" + j + ".png");
        payline_frames.push(texture);
    }
}
