var config = {
    type : Phaser.AUTO, // Quel type de rendu nous allons avoir, en mettant AUTO, le navigateur va tenter d'utiliser
    // en premier le WebGL, s'il n'est pas disponible, il va utiliser le canvas.
    backgroundColor: "#ccccff",
    width : 800,
    height : 600,
    scene : {
        preload : preload, //Chargement des données, avant le lancement du jeu
        create : create,  // Création du jeu sur la scène
        update : update   // La vie de notre jeu, frame par frame
    },
    physics : {
        default : "arcade",
        arcade : {
            gravity : {y : 500}
        }
    }
};
const game = new Phaser.Game(config);