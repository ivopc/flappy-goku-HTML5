import Game from "../Game.js";
import GameObject from "../gameobjects/GameObject.js";

class Scene {
    constructor (game) {
        /**
         * @type {Game}
         */
        this.game = game;
        /**
         * Scene GameObjects that will render into the gameloop.
         * @type {Array<GameObject>}
         */
        this.gameObjects = [];
    }

    create () {
        this.game.clearCanvas();
    }

    update () {
        this.game.clearCanvas();
        this.gameObjects.forEach(gameObject => gameObject.update());
    }

    destroy () {
        this.gameObjects.forEach(gameObject => gameObject.destroy());
        this.game.clearCanvas();
    }

    add (gameObject) {
        gameObject.create();
        this.gameObjects.push(gameObject);
    }
};

export default Scene;