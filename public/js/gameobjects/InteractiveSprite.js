import Sprite from "./Sprite.js";

import { betweenRange } from "../lib/math.js";

class InteractiveSprite extends Sprite {
    clickRangeCheck (clickX, clickY) {
        return betweenRange(clickX, this.x, this.width) && betweenRange(clickY, this.y, this.height);
    }

    onClick () {}
};

export default InteractiveSprite;