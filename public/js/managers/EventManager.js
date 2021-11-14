import InteractiveSprite from "../gameobjects/InteractiveSprite.js";

class EventManager {
    constructor (game) {
        /**
         * @type {Game}
         */
        this.game = game;
    }

    /**
     * Add inputs event listener related to DOM that native gameloop cannot detect alone.
     * @method
     * @returns {void}
     */
    listen ()  {
        this.game.canvas.addEventListener("click", event => this.onClick(event));
    }

    /**
     * `click` DOM Event handler
     * @param {Event}
     * @method
     * @returns {void}
     */
    onClick ({ clientX, clientY }) {
        this.game.manager.scene.getCurrent()
            .gameObjects
                .filter(gameObject => gameObject instanceof InteractiveSprite)
                .filter(interactiveSprite => interactiveSprite.clickRangeCheck(clientX, clientY))
                .forEach(clickable => clickable.onClick());
    }
};

export default EventManager;