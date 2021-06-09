const canvas = document.querySelector('#gamebox') // Acessing canvas element without id
const ctx = canvas.getContext('2d') // the object that directly represents the drawing area of the
    // canvas and allows us to draw 2D shapes on it
const carImg = new Image() // The Image() constructor creates a new
    // HTMLImageElement instance
const roadImg = new Image();
const car2 = new Image();
const obstacleImg = new Image();
const gameObjects = []
const roadSpeed = 5;
var obstacleSpeed = 3;
// buttons
var upButton = document.querySelector('#up');

var rightButton = document.querySelector('#right');
var leftButton = document.querySelector('#left');
var downButton = document.querySelector('#down');
var startButton = document.querySelector('#start');
var stopGame = false;

carImg.src = 'car.png';
roadImg.src = 'road2.png';
car2.src = 'car2.png';
obstacleImg.src = 'car.png';

const input = {
        delx: 0,
        dely: 0
    } // For changing position of car
    // const width = canvas.width = window.innerWidth * 0.37; //width and height of
    // the browser viewport const height = canvas.height = window.innerHeight *
    // 0.37;
const width = (canvas.width = 400); // width and height of the browser viewport
const height = (canvas.height = 400);


function ScoreBoard(initialScore) {
    this.id = "scoreboard";
    this.score = initialScore;
    this.initialTime = (new Date()).getTime();
}

ScoreBoard.prototype.draw = function() {
    var elem = document.getElementById("scoreboard");
    elem.innerText = this.score;
}

ScoreBoard.prototype.update = function() {
    var currentTime = (new Date()).getTime();
    if (currentTime - this.initialTime > 1000) {
        this.score += 1;
        this.initialTime = currentTime;
    }
}


function Road(x, y, scrollSpeed) {
    this.x = x;
    this.y = y;
    this.scrollSpeed = scrollSpeed;
    this.id = 'obstacle' + Math.floor(Math.random() * 100);
}

Road.prototype.draw = function() {
    ctx.drawImage(roadImg, this.x, this.y, canvas.width, canvas.height)

    ctx.drawImage(
        roadImg,
        this.x,
        this.y - canvas.height,
        canvas.width,
        canvas.height
    )
}

Road.prototype.update = function() {
    this.y += this.scrollSpeed
    if (this.y >= canvas.height) {
        this.y = 0
    }
}



function Collider(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
}

Collider.prototype.checkCollision = function(anotherColliderObject) {
    if (this.x < anotherColliderObject.x + anotherColliderObject.width &&
        this.x + this.width > anotherColliderObject.x &&
        this.y < anotherColliderObject.y + anotherColliderObject.height &&
        this.y + this.height > anotherColliderObject.y) return true;

    return false;
};

function Obstacle(speed) {
    this.spawn();
    this.id = 'obstacle' + Math.floor(Math.random() * 100);
    this.speed = speed;
    this.width = obstacleImg.width * 0.1;
    this.height = obstacleImg.height * 0.1;
    this.collider = new Collider(this.x, this.y, this.width, this.height);
}


Obstacle.prototype.draw = function() {
    ctx.drawImage(obstacleImg, this.x, this.y, this.width, this.height);
    this.collider.x = this.x;
    this.collider.y = this.y;
}

Obstacle.prototype.update = function() {
    this.y += this.speed;

    if (this.y >= canvas.height) {
        this.spawn();
    }
}

Obstacle.prototype.spawn = function() {
    // var possiblePositionsOfX = [10, 20, 30, 40];
    var possiblePositionsOfY = [0, -10, -20, -30, -40];
    var randomX = Math.floor(Math.random() * 200) + 50;
    var randomY = Math.floor(Math.random() * possiblePositionsOfY.length);

    this.x = randomX;
    // console.log(randomX);
    this.y = possiblePositionsOfY[randomY];

}

function Car(x, y) {
    // Modelling a car with Car constructor
    this.x = x;
    this.y = y;
    this.id = 'car' + Math.floor(Math.random() * 100);
    this.width = carImg.width * 0.1;
    this.height = carImg.height * 0.1;
    this.collider = new Collider(this.x, this.y, this.width, this.height);
}

Car.prototype.draw = function() {
    ctx.drawImage(carImg, this.x, this.y, this.width, this.height);
    this.collider.x = this.x;
    this.collider.y = this.y;
}

Car.prototype.update = function() {

    if (this.checkCollision()) {
        alert("Game over");
        setup();
        stopGame = true;

    }

    this.x += input.delx;
    this.y += input.dely;
}

Car.prototype.checkCollision = function() {
    for (var i = 0; i < gameObjects.length; i++) {
        var e = gameObjects[i];
        if (e.id != this.id && e.collider) {
            if (this.collider.checkCollision(e.collider)) {
                return true;
            }
        }
    }

    return false;
}

function resetInput() {
    // resets input
    input.delx = 0
    input.dely = 0
}

function setup() {
    // initializing car and road object
    var car = new Car(canvas.width * 0.5, canvas.height - 50)
        // var car = new Car(0, 10);

    var road = new Road(0, 0, roadSpeed)
    var obstacle = new Obstacle(obstacleSpeed);
    var scoreBoard = new ScoreBoard(0);
    // console.log(obstacle);
    gameObjects.length = 0;
    gameObjects.push(road);
    gameObjects.push(obstacle);
    gameObjects.push(car);
    gameObjects.push(scoreBoard);

    for (var i = 0; i < gameObjects.length; i++) {
        gameObjects[i].draw()
    }

    rightButton.addEventListener('click', function() {
        input.delx = 10
            // loop();
    })

    leftButton.addEventListener('click', function() {
        input.delx = -10
            // loop();
    })

    downButton.addEventListener('click', function() {
        input.dely = 10
            // loop();
    })

    upButton.addEventListener('click', function() {
        this.style.color = '#2B5998'
        input.dely = -10
            // loop();
    })

    startButton.addEventListener('click', function() {
        stopGame = false;
        // loop();
    })
}

function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 1)'
    ctx.fillRect(0, 0, width, height)
        //(the four parameters provide a start coordinate, and a width and height for
        // the rectangle drawn)
    for (var i = 0; i < gameObjects.length; i++) {
        gameObjects[i].draw()

        if (stopGame != true) {
            gameObjects[i].update()

        }
    }

    window.requestAnimationFrame(loop) // request that your animation function be called before the
        // browser performs the next repaint

    resetInput()
}

// game
setup()
loop()