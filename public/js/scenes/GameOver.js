import Scene from "./Scene.js";
import Sprite from "../gameobjects/Sprite.js";

class GameOver extends Scene {
    create () {
        super.create();
        const layout = this.game.assets.json["layout"]["gameover"];
        this.add(new Sprite(
            this.game, 
            this, 
            { x: layout["background"].x, y: layout["background"].y }, 
            layout["background"].texture
        ));
    }
};

export default GameOver;