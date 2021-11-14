import Game from "../Game.js";
import Scene from "../scenes/Scene.js";

class SceneManager {
    constructor (game) {
        /**
         * @type {Game}
         */
        this.game = game;
        /**
         * @type {Scene}
         */
        this.current;
    }

    async start (sceneFile) {
        const SceneKlass = await import(`../scenes/${sceneFile}.js`);
        const scene = new SceneKlass.default(this.game);
        scene.create();
        this.setCurrent(scene);
    }

    async switch (scene) {
        this.current.destroy();
        await this.start(scene);
    }

    /**
     * 
     * @returns {Scene}
     */
    getCurrent () {
        return this.current;
    }

    setCurrent (scene) {
        this.current = scene;
    }
};

export default SceneManager;