// setup canvas

const canvas = document.querySelector('canvas'); // Acessing canvas element without id
const ctx = canvas.getContext('2d'); //the object that directly represents the drawing area of the canvas and allows us to draw 2D shapes on it

const width = canvas.width = window.innerWidth; //width and height of the browser viewport 
const height = canvas.height = window.innerHeight;
const ballImg = new Image;
//ballImg.src = "data:image/jpeg;base64,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";
ballImg.src = "images/ant.jpg";
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
    // ctx.beginPath(); //draw a shape on the paper.
    // ctx.fillStyle = this.color; //what color we want the shape to be
    // ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); // xand y coordinates , radius and starting and ending angle in degree
    // ctx.fill();
    ctx.drawImage(ballImg, this.x, this.y);
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