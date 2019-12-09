var player ={
    aplayer : null,
    isJumping : false,
    isAlive : true,

    initialiserPlayer : function () {
        this.aplayer = jeu.scene.physics.add.sprite(jeu.world.positionDebut.x, jeu.world.positionDebut.y, "player", "female_stand");
        this.aplayer.setCollideWorldBounds(true);  // Bloque le player pour ne pas qu'il sort de l'écran
        this.aplayer.setOrigin(0.5,1);
    },
    generatePlayerAnimations : function() {
        jeu.scene.anims.create({
            key: "playerWalk",
            frames: jeu.scene.anims.generateFrameNames("player", {prefix: "female_walk", start: 1, end: 2}),
            frameRate: 5,
            repeat: -1
        });
        jeu.scene.anims.create({
            key: "playerIdle",
            frames: [{key : "player", frame:"female_stand"}, {key : "player", frame:"female_idle"}],
            frameRate: 2,
            repeat: -1
        });
    },

    gererDeplacement : function () {  // Ici on permet au joueur de déplacer le player, sauf que si il meurt, le
        // player ne bouge plus.
        if(this.isAlive){
            if (jeu.cursors.left.isDown) {
                this.aplayer.setVelocityX(-200);
                this.aplayer.setFlip(true, false);
            } else if (jeu.cursors.right.isDown) {
                this.aplayer.setVelocityX(200);
                this.aplayer.setFlip(false, false);
            } else {
                this.aplayer.setVelocityX(0);
            }
            if (jeu.cursors.up.isDown && this.aplayer.body.onFloor()) {  // onFloor c'est pour éviter de faire un grand
                // saut qui donne l'impression de voler.
                this.aplayer.setVelocityY(-450);
            }

            this.isJumping = !this.aplayer.body.onFloor();

            if (this.isJumping) {
                this.aplayer.setTexture("player", "female_jump");
            } else if (jeu.cursors.right.isDown || jeu.cursors.left.isDown) {
                this.aplayer.anims.play("playerWalk", true);
            } else {
                this.aplayer.anims.play("playerIdle", true);  // Permet d'avoir une animation lorsque le joueur ne bouge
                // pas.
            }
        } else {
            this.aplayer.setVelocityX(0);
        }
    },
    killPlayer : function () {
        this.aplayer.setTexture("player", "female_hurt");
        this.isAlive = false;
    }

};