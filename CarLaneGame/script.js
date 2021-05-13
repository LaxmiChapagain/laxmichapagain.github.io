const canvas = document.querySelector('#gamebox'); // Acessing canvas element without id
const ctx = canvas.getContext('2d'); //the object that directly represents the drawing area of the canvas and allows us to draw 2D shapes on it
const carImg = new Image; //The Image() constructor creates a new HTMLImageElement instance
const roadImg = new Image;
const gameObjects = [];

//buttons
var upButton = document.querySelector("#up");

var rightButton = document.querySelector("#right");
var leftButton = document.querySelector("#left");
var downButton = document.querySelector("#down");


carImg.src = "car.png";
roadImg.src = "road.png";

const input = { delx: 0, dely: 0 }; // For changing position of car

const width = canvas.width = window.innerWidth * 0.7; //width and height of the browser viewport 
const height = canvas.height = window.innerHeight * 0.7;

function Car(x, y) { //Modelling a car with Car constructor
    this.x = x;
    this.y = y;
}

function Road(a, b) { //Modelling a road with Road constructor
    this.a = a;
    this.b = b;

}

Car.prototype.draw = function() {
    ctx.drawImage(carImg, this.x, this.y, carImg.width * 0.10, carImg.height * 0.10);
}
Road.prototype.draw = function() {

    ctx.drawImage(roadImg, this.a, this.b, roadImg.width, roadImg.height);
}
Car.prototype.update = function() {
    this.x += input.delx;
    this.y += input.dely;
    // this.draw();
}

Road.prototype.update = function() {}

function resetInput() { // resets input
    input.delx = 0;
    input.dely = 0;
}

function setup() { // initializing car and road object
    var car = new Car(canvas.width * 0.5, canvas.height - 50);
    var road = new Road(0, 0);

    gameObjects.push(road);
    gameObjects.push(car);


    for (var i = 0; i < gameObjects.length; i++) {
        (gameObjects[i]).draw();
    };

    rightButton.addEventListener('click', function() {
        input.delx = 50;
        loop();
    });

    leftButton.addEventListener('click', function() {
        input.delx = -50;
        loop();
    });

    downButton.addEventListener('click', function() {
        input.dely = 50;
        loop();
    });

    upButton.addEventListener('click', function() {
        input.dely = -50;
        loop();
    });

}


function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillRect(0, 0, width, height); //(the four parameters provide a start coordinate, and a width and height for the rectangle drawn)

    for (var i = 0; i < gameObjects.length; i++) {
        (gameObjects[i]).update();
        (gameObjects[i]).draw();
    };

    resetInput();
    requestAnimationFrame(loop);
    //request that your animation function be called before the browser performs the next repaint
}

//game
loop();
setup();