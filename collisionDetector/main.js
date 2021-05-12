// setup canvas

const canvas = document.querySelector('canvas'); // Acessing canvas element without id
const ctx = canvas.getContext('2d'); //the object that directly represents the drawing area of the canvas and allows us to draw 2D shapes on it

const width = canvas.width = window.innerWidth; //width and height of the browser viewport 
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num; // returns a random number between the specified values
}

function Ball(x, y, velX, velY, color, size) { //Modelling a ball with Ball constructor
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
}
Ball.prototype.draw = function() {
    ctx.beginPath(); //draw a shape on the paper.
    ctx.fillStyle = this.color; //what color we want the shape to be
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); // xand y coordinates , radius and starting and ending angle in degree
    ctx.fill();
}
testBall = new Ball(50, 100, 4, 4, 'blue', 10);
testBall.x
testBall.size
testBall.color
testBall.draw()
Ball.prototype.update = function() {
    Ball.prototype.collisionDetect = function() {
        for (let j = 0; j < balls.length; j++) {
            if (!(this === balls[j])) {
                const dx = this.x - balls[j].x;
                const dy = this.y - balls[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + balls[j].size) {
                    balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
                }
            }
        }
    }
    if ((this.x + this.size) >= width) { //wall collision horizontally
        this.velX = -(this.velX);
    }

    if ((this.x - this.size) <= 0) { //in between ball collison horizontally
        this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
}
let balls = [];

while (balls.length < 11) {
    let size = random(4, 15);
    let ball = new Ball(
        // ball position always drawn at least one ball width
        // away from the edge of the canvas, to avoid drawing errors
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-5, 7),
        random(-5, 7),
        'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
        size
    );

    balls.push(ball);
}

function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillRect(0, 0, width, height); //(the four parameters provide a start coordinate, and a width and height for the rectangle drawn)

    for (let i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
    }

    requestAnimationFrame(loop); //request that your animation function be called before the browser performs the next repaint
}
loop();