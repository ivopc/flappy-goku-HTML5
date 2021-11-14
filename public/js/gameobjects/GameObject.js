import Game from "../Game.js";
import Scene from "../scenes/Scene.js";

class GameObject {
    constructor (game, scene, dimension, position) {
        /**
         * @type {number}
         */
        this.uuid = Date.now();
        /**
         * @type {Game}
         */
        this.game = game;
        /**
         * @type {Scene}
         */
        this.scene = scene;
        /**
         * @type {number}
         */
        this.x = position.x;
        /**
         * @type {number}
         */
        this.y = position.y;
        /**
         * @type {number}
         */
        this.width = dimension.width;
        /**
         * @type {number}
         */
        this.height = dimension.height;
    }

    create () {}

    update () {}

    /**
     * Remove the current `GameObject` from scene.
     * @method
     * @returns {void}
     */
    destroy () {
        this.scene.gameObjects.splice(this.scene.gameObjects.findIndex(gameObject => gameObject.uuid === this.uuid), 1);
    }
};

export default GameObject;