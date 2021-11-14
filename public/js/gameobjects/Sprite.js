import GameObject from "./GameObject.js";

class Sprite extends GameObject {
    constructor (game, scene, position, imgKey) {
        super(game, scene, { width: 0, height: 0 }, position);
        this.imgData = this.game.assets.img[imgKey];
        this.width = this.imgData.width;
        this.height = this.imgData.height;
    }

    update () {
        this.game.ctx.drawImage(this.imgData, this.x, this.y, this.width, this.height);
    }
};

export default Sprite;