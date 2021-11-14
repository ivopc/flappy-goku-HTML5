import Scene from "./Scene.js";
import GameObject from "../gameobjects/GameObject.js";
import Sprite from "../gameobjects/Sprite.js";

import Player from "../prefabs/Player.js";

class Gameplay extends Scene {
    create () {
        this.layout = this.game.assets.json["layout"]["gameplay"];
        super.create();
        this.obstacles = [];
        this.spheresTop = [];
        this.spheresBottom = [];
        this.player = new Player(
            this.game, 
            this, 
            { x: this.layout.player.x, y: this.layout.player.y }, 
            this.layout.player.texture
        );
        this.add(this.player);
        document.addEventListener("keydown", () => {
            this.player.gravity = -0.2;
        });
        
        document.addEventListener("keyup", () => {
            this.player.gravity = 0.05;
        });
        setInterval(() => this.createObstacles(), 2300);
    }

    update () {
        super.update();
        console.log(this.obstacles);
        this.obstacles.forEach(obstacle => obstacle.x -= 1);
        if (this.obstacles.some(obstacle => this.player.isColliding(obstacle)))
            this.player.isDead = true;
    }

    createObstacles () {
        let x, height, gap, minHeight, maxHeight, minGap, maxGap;
        x = this.game.assets.json["gameconfig"].dimension.width;
        minHeight = 20;
        maxHeight = 200;
        const possiblesHeights = [50, 100, 150, 200];
        //height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
        height = possiblesHeights[Math.floor(Math.random()*possiblesHeights.length)];
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
        this.obstacles.push(new GameObject(this.game, this, { width: 50, height }, { x, y: 0 }));
    
        /*
        
        width, height, src, x, y
        
        const sphereTop = parseInt(height / 50);
    
        if (sphereTop == 0)
            sphereTop = 1;
        for (let i = 0; i < sphereTop; i ++) {
            this.spheresTop.push(new Sprite(50, 50, "sphere", x, i == 0 ? 0 : i * 50));
        };
    
        const sphereBottom = parseInt((x - height - gap) / 50);*/
    
        this.obstacles.push(new GameObject(this.game, this, { width: 50, height: x - height - gap }, { x, y: height + gap } ));
        /*for (let i = 0; i < sphereBottom; i++) {
            this.spheresBottom.push(
                new Sprite(
                    50, 
                    50, 
                    "sphere", 
                    x, 
                    i == 0 ? height + gap : (height + gap) * i + 1 * 50
                )
            );
        };*/
    }
};

export default Gameplay;