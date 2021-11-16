import EventManager from "./managers/EventManager.js";
import SceneManager from "./managers/SceneManager.js";
import AssetLoader from "./lib/AssetLoader.js";

class Game {
    constructor (canvas) {
        /**
         * @type {HTMLCanvasElement}
         */
        this.canvas = canvas;
        /**
         * @type {CanvasRenderingContext2D}
         */
        this.ctx = canvas.getContext("2d");
        /**
         * @type {Object}
         */
        /**
         * @type {AssetLoader.cache}
         */
        this.assets;
        this.loop;
        this.framerate;
        this.manager = {
            /**
             * @type {EventManager}
             */
            event: new EventManager(this),
            /**
             * @type {SceneManager}
             */
            scene: new SceneManager(this)
        };
    }

    start () {
        this.setupGameConfig();
        this.manager.scene.start("Presentation");
        this.manager.event.listen();
        this.createGameLoop();
    }

    update () {
        this.manager.scene.getCurrent().update();
    }

    createGameLoop () {
        this.loop = setInterval(() => this.update(), 20);
    }

    clearCanvas () {
        this.ctx.clearRect(
            0, 
            0, 
            this.assets.json["gameconfig"].dimension.width, 
            this.assets.json["gameconfig"].dimension.height
        );
    }

    setupGameConfig () {
        document.title = this.assets.json["gameconfig"].title;
        this.canvas.width = this.assets.json["gameconfig"].dimension.width;
        this.canvas.height = this.assets.json["gameconfig"].dimension.height;
        this.framerate = this.assets.json["gameconfig"].framerate;
    }

    setAssets (assets) {
        this.assets = assets;
    }
};

export default Game;