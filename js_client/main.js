var jeu = {
    scene : null,
    world : world,
    player : player,
    cursors : null
};

function preload() {
    jeu.scene = this;
    jeu.scene.load.image("tiles", "tilesheet.png");
    jeu.scene.load.tilemapTiledJSON("map", "jeuPlateforme.json");
    jeu.scene.load.atlas("player", "player.png", "playerAtlas.json");
    jeu.scene.load.image("spark", "particle.png");
    jeu.scene.load.audio("gemmeSound", "gemmeSound.ogg");

    jeu.scene.load.image("validation", "yellow_boxCheckmark.png");
    jeu.scene.load.image("panel", "yellow_panel.png");

    // Sert à réinisialiser le jeu lorsque le personnage meurt.
    jeu.world.gameOver = false;
    jeu.player.isAlive = true;
}

function create() {
    jeu.world.initialiserWorld();
    jeu.player.initialiserPlayer();
    jeu.player.generatePlayerAnimations();
    jeu.world.gererCollider();
    jeu.cursors = jeu.scene.input.keyboard.createCursorKeys();

    jeu.world.gererCamera();
}
function update(time, delta) {
    jeu.player.gererDeplacement();
    ajusterTailleEcran();
}

function ajusterTailleEcran(){  // Pour qu'il soit responsive.
    var canvas = document.querySelector("canvas");

    var fenetreWidth = window.innerWidth;
    var fenetreHeight = window.innerHeight;
    var fenetreRatio = fenetreWidth / fenetreHeight;

    var jeuRatio = config.width/config.height;

    if (fenetreRatio < jeuRatio){
        canvas.style.width = fenetreWidth + "px";
        canvas.style.height = (fenetreWidth/jeuRatio) + "px";
    } else {
        canvas.style.width = (fenetreHeight * jeuRatio) + "px";
        canvas.style.height = (fenetreHeight - "-10px" )+ "px";
    }
}
