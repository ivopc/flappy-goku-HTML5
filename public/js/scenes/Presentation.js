import Scene from "./Scene.js";
import Sprite from "../gameobjects/Sprite.js";
import InteractiveSprite from "../gameobjects/InteractiveSprite.js";

class Presentetation extends Scene {
    create () {
        super.create();
        const layout = this.game.assets.json["layout"]["presentation"];
        this.add(new Sprite(
            this.game, 
            this, 
            { x: layout["background"].x, y: layout["background"].y }, 
            layout["background"].texture
        ));
        const startButton = new InteractiveSprite(
            this.game, 
            this, 
            { x: layout["start-btn"].x, y: layout["start-btn"].y },
            layout["start-btn"].texture
        );
        startButton.onClick = () => this.game.manager.scene.switch("Gameplay");
        this.add(startButton);
    }
};

export default Presentetation;