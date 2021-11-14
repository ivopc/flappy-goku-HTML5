const canvas = document.querySelector("canvas"),
    ctx = canvas.getContext("2d");

let bird,
    obstacles = [],
    spheres = {
        top: [],
        bottom: []
    },
    dead = false,
    gameState = "presentation";

let imgs = {};

const imageLoader = (images, callback) => {

    let total = images.length,
        current = 0;

    for (let i = 0; i < total; i ++) {
        var img = new Image();
        img.src = images[i].src;
        img.addEventListener("load", () => {
            if (++current == total)
                callback();
        });

        imgs[images[i].key] = img;
    };
};

const clearCanvas = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const render = function () {
    ctx.drawImage(imgs.background, 0, 0);
};

const loop = {};

const presentation = function () {
    clearCanvas();
    ctx.drawImage(imgs.start, 0, 0);
};

const gameOver = function () {

    gameState = "gameover";

    clearCanvas();
    ctx.drawImage(imgs.gameover, 0, 0);

    clearTimeout(loop.game);
    clearTimeout(loop.addObstacleLoop);
};

const restart = function () {
    obstacles = [];
    spheres = {
        top: [],
        bottom: []
    };
    dead = false;

    start();
};

const start = function () {

    gameState = "playing";

    bird = new GameObject(33, 34, "goku", 10, 120);
    bird.gravity = 0.05;

    loop.game = setInterval(update, 20);
    loop.addObstacleLoop = setInterval(addObstacle, 2300);
};

const update = function () {

    if (dead)
        return gameOver();

    for (let i = 0; i < obstacles.length; i ++) {
        if (bird.crashWith(obstacles[i])) {
            dead = true;
        };
    };

    // não está funcionando

    for (let i = 0; i < spheres.top; i++) {
        if (bird.crashWith(spheres.top[i])) {
            dead = true;
        };
    };

    for (let i = 0; i < spheres.bottom; i++) {
        if (bird.crashWith(spheres.bottom[i])) {
            dead = true;
        };
    };

    clearCanvas();
    render();

    if (bird.y < 0)
        dead = true;

    for (i = 0; i < obstacles.length; i ++) {
        obstacles[i].x += -1;
        obstacles[i].update();
    };

    for (i = 0; i < spheres.top.length; i ++) {
        spheres.top[i].x += -1;
        spheres.top[i].update();
    };

    for (i = 0; i < spheres.bottom.length; i ++) {
        spheres.bottom[i].x += -1;
        spheres.bottom[i].update();
    };

    bird.newPos();
    bird.update();
};

const addObstacle = function () {
    let x, height, gap, minHeight, maxHeight, minGap, maxGap;

    x = canvas.width;
    minHeight = 20;
    maxHeight = 200;
    const possibles_heights = [50, 100, 150, 200];
    //height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
    height = possibles_heights[Math.floor(Math.random()*possibles_heights.length)];
    minGap = 50;
    maxGap = 200;
    gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);

    obstacles.push(new GameObject(50, height, "tile", x, 0));

    const sphere_top = parseInt(height / 50);

    if (sphere_top == 0)
        sphere_top = 1;

    for (let i = 0; i < sphere_top; i ++) {
        spheres.top.push(new GameObject(50, 50, "sphere", x, i == 0 ? 0 : i * 50));
    };

    const sphere_bottom = parseInt((x - height - gap) / 50);

    obstacles.push(new GameObject(50, x - height - gap, "tile", x, height + gap));

    for (let i = 0; i < sphere_bottom; i++) {
        spheres.bottom.push(
            new GameObject(
                50, 
                50, 
                "sphere", 
                x, 
                i == 0 ? height + gap : (height + gap) * i + 1 * 50
            )
        );
    };
};

const GameObject = function (width, height, src, x, y, type) {

    this.ctx = ctx;

    this.type = type;
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    this.src = src;
    this.gravity = 0;
    this.gravitySpeed = 0;
};

GameObject.prototype.update = function () {
    if (this.type == "text") {
        this.ctx.font = this.width + " " + this.height;
        this.ctx.fillStyle = color;
        this.ctx.fillText(this.text, this.x, this.y);
    } else {
        this.ctx.drawImage(imgs[this.src], this.x, this.y, this.width, this.height);
    };
};

GameObject.prototype.newPos = function () {
    this.gravitySpeed += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY + this.gravitySpeed;
    this.hitBottom();
};

GameObject.prototype.hitBottom = function () {
    var rockbottom = canvas.height - this.height;

    if (this.y > rockbottom) {
        this.y = rockbottom;
        this.gravitySpeed = 0;
        dead = true;
    };
};

GameObject.prototype.crashWith = function (collider) {
    var myleft = this.x,
        myright = this.x + (this.width),
        mytop = this.y,
        mybottom = this.y + (this.height),
        otherleft = collider.x,
        otherright = collider.x + (collider.width),
        othertop = collider.y,
        otherbottom = collider.y + (collider.height),

        crash = true;

    if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
        crash = false;
    };

    return crash;
};

document.addEventListener("keydown", function () {
    if (gameState == "playing")
        bird.gravity = -0.2;
});

document.addEventListener("keyup", function () {
    if (gameState == "playing")
        bird.gravity = 0.05;
});

canvas.addEventListener("click", function () {

    switch (gameState) {
        case "presentation": {
            start();
            break;
        };

        case "gameover": {
            restart();
            break;
        };
    };
});

imageLoader([
    {key: "start", src: "start.png"},
    {key: "gameover", src: "gameover.png"},
    {key: "background", src: "background.png"},
    {key: "goku", src: "goku_min.png"},
    {key: "sphere", src: "sphere_min.png"},
    {key: "tile", src: "tile.png"}
], () => {
    presentation();
});