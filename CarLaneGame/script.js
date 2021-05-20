const canvas = document.querySelector('#gamebox'); // Acessing canvas element without id
const ctx = canvas.getContext('2d'); //the object that directly represents the drawing area of the canvas and allows us to draw 2D shapes on it
const carImg = new Image; //The Image() constructor creates a new HTMLImageElement instance
const roadImg = new Image;
const car2 = new Image;
const gameObjects = [];

//buttons
var upButton = document.querySelector("#up");

var rightButton = document.querySelector("#right");
var leftButton = document.querySelector("#left");
var downButton = document.querySelector("#down");
var startButton = document.querySelector("#start")


carImg.src = "car.png";
roadImg.src = "road.png";
car2.src = "car2.png";

const input = { delx: 0, dely: 0 }; // For changing position of car
//const width = canvas.width = window.innerWidth * 0.37; //width and height of the browser viewport 
//const height = canvas.height = window.innerHeight * 0.37;
const width = canvas.width = 400; //width and height of the browser viewport 
const height = canvas.height = 600;

function Car(x, y) { //Modelling a car with Car constructor
    this.x = x;
    this.y = y;
}

function Car2(c, d) { //Modelling a car with Car constructor
    this.c = c;
    this.d = d;
}
// window.onload is an event that occurs when all the assets
// have been successfully loaded( in this case only the spacebg.png)
window.onload = function() {
    // the initial image height
    var imgHeight = 0;


    // the scroll speed
    //  canvas.height must be divisible by scroll speed

    var scrollSpeed = 10;

    // this is the primary animation loop that is called 60 times per second
    function animation() {
        // draw image 1
        ctx.drawImage(roadImg, 0, imgHeight);
        // draw image 2
        ctx.drawImage(roadImg, 0, imgHeight - canvas.height);
        // update image height
        imgHeight += scrollSpeed;

        // reseting the images when the first image entirely exits the screen
        if (imgHeight === canvas.height)
            imgHeight = 0;

        // this function creates a 60fps animation by scheduling a
        // loop function call before the
        // next redraw every time it is called
        window.requestAnimationFrame(animation);
    }

    // this initiates the animation by calling the loop function for the first time
    animation();

}



Car.prototype.draw = function() {
    ctx.drawImage(carImg, this.x, this.y, carImg.width * 0.10, carImg.height * 0.10);

}
Car2.prototype.draw = function() {
    ctx.drawImage(car2, this.c, this.d, car2.width * 0.10, car2.height * 0.10);
}

//Road.prototype.draw = function() {


Car.prototype.update = function() {
    this.x += input.delx;
    this.y += input.dely;

}

//Road.prototype.update = function() {}

function resetInput() { // resets input
    input.delx = 0;
    input.dely = 0;
}

function setup() { // initializing car and road object

    var car = new Car(canvas.width * 0.5, canvas.height - 50);
    var cartwo = new Car2(0, 10);

    //var road = new Road(0, 0);


    gameObjects.push(car);
    //gameObjects.push(road);
    //gameObjects.push(cartwo);



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
        this.style.color = '#2B5998';
        input.dely = -50;
        loop();
    });
    startButton.addEventListener('click', function() {
        gameObjects[1].x = canvas.width * 0.45;
        gameObjects[1].y = canvas.height - 50;
        loop();

    });
}


function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillRect(0, 0, width, height);
    //(the four parameters provide a start coordinate, and a width and height for the rectangle drawn)

    for (var i = 0; i < gameObjects.length; i++) {
        (gameObjects[i]).update();
        (gameObjects[i]).draw();



    }
    window.requestAnimationFrame(loop); //request that your animation function be called before the browser performs the next repaint


    resetInput();


};

//game
loop();
setup();