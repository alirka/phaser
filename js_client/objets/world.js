var world ={
    tilemap:null,
    tileset:null,
    downLayer:null,
    worldLayer:null,
    topLayer:null,
    overlapLayer:null,
    positionDebut:null,
    score:null,
    scoreText:0,
    gameOver : false,

    initialiserWorld:function(){
        this.tilemap = jeu.scene.make.tilemap({key : "map"});
        this.tileset = this.tilemap.addTilesetImage("tilesheet", "tiles");
        this.downLayer = this.tilemap.createStaticLayer("bot", this.tileset, 0,0);
        this.worldLayer = this.tilemap.createStaticLayer("world", this.tileset, 0,0);
        this.topLayer = this.tilemap.createStaticLayer("top", this.tileset, 0,0);
        this.overlapLayer = this.tilemap.createDynamicLayer("overlap", this.tileset, 0,0);

        this.positionDebut = this.tilemap.findObject("Objects", obj => obj.name === "debut");
        this.worldLayer.setCollisionByProperty({Collides : true});

        jeu.scene.physics.world.setBounds(0, 0, this.tilemap.widthInPixels, this.tilemap.heightInPixels); // permet
        // de promener le joueur sur toute la map

        var policeTitre ={
            fontSize:"32px",
            color:"#ff0000",
            fontFamily:"Indie Flower"
        };
        this.scoreText = jeu.scene.add.text(16, 16, "Score : 0", policeTitre);
        this.scoreText.setScrollFactor(0);  // Permet au texte de suivre le personnage.
    },

    gererCollider : function () {
        this.overlapLayer.setTileIndexCallback(50, this.collectGemme, this); // Quand on appelle un ID dans le json,
        // on rajoute toujours +1
        this.overlapLayer.setTileIndexCallback(53, this.collectGemme, this);
        this.overlapLayer.setTileIndexCallback(71, this.killPlayer, this);
        jeu.scene.physics.add.collider(jeu.player.aplayer, this.worldLayer);
        jeu.scene.physics.add.overlap(jeu.player.aplayer, this.overlapLayer);
    },

    gererCamera : function () {
        jeu.scene.cameras.main.startFollow(jeu.player.aplayer);   // permet de suivre le joueur
        jeu.scene.cameras.main.setBounds(0, 0, this.tilemap.widthInPixels, this.tilemap.heightInPixels);  // permet
        // de ne pas dépasser le décor du jeu.
    },
    collectGemme : function (player, tile) {
        jeu.scene.sound.play("gemmeSound");
        this.genererParticules(tile.getCenterX(), tile.getCenterY());
        this.addScoreGemme(tile.properties.item);
        // console.log(tile.properties);  // Pour voir les propriétés des Gemmes
        this.scoreText.setText("Score : " + this.score); // Permet de mettre à jour le score.
        this.overlapLayer.removeTileAt(tile.x, tile.y).destroy();

    },
    addScoreGemme : function(item){
        if (item === "gemmeOrange"){
        this.score +=10;
        }else if (item === "gemmeBleu"){
            this.score +=20;
        }
        console.log("Score " + this.score)
    },

    genererParticules : function (posX, posY) { // Création de particules lorsqu'on touche une gemme.
        var particules = jeu.scene.add.particles("spark");

        var configParticules = {
            x : posX,
            y : posY,
            speed : 200,
            angle :{min:180, max:360},
            lifeSpan :{min:300, max:400},
            scale : {start:0.1, end:0.1},
            blendMonde : "ADD"
        };

        var emitter = particules.createEmitter(configParticules);

        jeu.scene.time.delayedCall(300, function () {
            particules.destroy();
        })
    },
    killPlayer : function () {
        if (!this.gameOver){
            this.gameOver = true;
            jeu.player.killPlayer();
            jeu.scene.add.sprite(jeu.scene.cameras.main.midPoint.x, jeu.scene.cameras.main.midPoint.y, "panel").setScale(5,3);
            var restartBouton = jeu.scene.add.sprite(jeu.scene.cameras.main.midPoint.x, jeu.scene.cameras.main.midPoint.y+100, "validation").setInteractive();
            restartBouton.on("pointerup", function () {
               jeu.scene.scene.restart();
            });
            // Le texte de la mort pour recommencer.
            var policeTitre ={
                fontSize:"52px",
                color:"#fff",
                fontFamily:"Indie Flower"
            };
            this.scoreText = jeu.scene.add.text(jeu.scene.cameras.main.midPoint.x-200, jeu.scene.cameras.main.midPoint.y-100, "Tu es mort \n Recommencer ?", policeTitre);
        }

    }
};