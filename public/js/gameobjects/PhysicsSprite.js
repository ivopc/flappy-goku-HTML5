import Sprite from "./Sprite.js";

class PhysicsSprite extends Sprite {
    constructor (game, scene, position, imgKey) {
        super(game, scene, position, imgKey);
        this.speedX = 0;
        this.speedY = 0;
        this.gravity = 0;
        this.gravitySpeed = 0;
    }
};

export default PhysicsSprite;