import Sprite from "../gameobjects/Sprite.js";
import { betweenRange } from "../lib/math.js";

class Player extends Sprite {
    constructor (game, scene, position, imgKey) {
        super(game, scene, position, imgKey);
        this.speedX = 0;
        this.speedY = 0;
        this.gravity = 0;
        this.gravitySpeed = 0;
        /**
         * @type {boolean}
         */
        this.isDead = false;
    }

    create () {
        this.gravity = 0.05;
    }

    update () {
        super.update();
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        return;
        const bottomComp = this.game.assets.json["gameconfig"].dimension.height - this.height;
        if (this.y > bottomComp) {
            this.y = bottomComp;
            this.gravitySpeed = 0;
            this.isDead = true;
        };
    }

    isColliding (gameObject) {
        const 
            myLeft = this.x,
            myRight = this.x + this.width,
            myTop = this.y,
            myBottom = this.y + this.height,
            otherLeft = gameObject.x,
            otherRight = gameObject.x + gameObject.width,
            otherTop = gameObject.y,
            otherBottom = gameObject.y + gameObject.height;
        let crash = true;
        if ((myBottom < otherTop) || (myTop > otherBottom) || (myRight < otherLeft) || (myLeft > otherRight)) {
            crash = false;
        };
        return crash;
    }

    set isDead (dead) {
        if (dead) {
            this.destroy();
            this.game.manager.scene.switch("GameOver");
        };
    }
};

export default Player;