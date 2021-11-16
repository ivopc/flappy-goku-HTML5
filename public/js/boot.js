import Game from "./Game.js";
import AssetLoader from "./lib/AssetLoader.js";

async function init () {
    const assets = await AssetLoader.fetch([
        // json
        { key: "layout", url: "data/layout.json", type: "json" },
        { key: "gameconfig", url: "data/game.json", type: "json" },

        // ui
        { key: "start-background", url: "img/start.png", type: "image" },
        { key: "gameover-background", url: "img/gameover.png", type: "image" },
        { key: "btn-start", url: "img/btn_start.png", type: "image" },

        // in-game sprites
        { key: "game-background", url: "img/background.png", type: "image" },
        { key: "goku", url: "img/goku.png", type: "image" },
        { key: "sphere", url: "img/sphere.png", type: "image" },
        { key: "tile", url: "img/tile.png", type: "image" },

        //
    ]);
    const game = new Game(document.querySelector("#game"));
    game.setAssets(AssetLoader.cache);
    game.start();
};

document.addEventListener("DOMContentLoaded", init);