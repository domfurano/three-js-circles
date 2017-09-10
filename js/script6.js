'use strict';


var canvas;
var context;

var grid;

var MOUSE_X = 0;
var MOUSE_Y = 0;


var cellSize = 32;



function adjustWindow() {
    window.moveTo(0, 0);
    window.resizeTo(screen.width, screen.height);
}

function adjustCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function onClick(event) {
    onOver(event);
}

function onOver(event) {
    MOUSE_X = event.clientX;
    MOUSE_Y = event.clientY;
}

function keyDown(event) {
    if (event.keyCode == 78) {
        circles.push(new Circle(MOUSE_X, MOUSE_Y));
    }
}

function Cell(x, y) {
    this.x = x;
    this.y = y;

    this.draw = function (color) {
        context.fillStyle = color;
        context.fillRect(this.x, this.y, cellSize, cellSize);
    };
}

// function Circle(x, y, radius, color) {
//     this.x = x;
//     this.y = y;
//     this.radius = radius;
//     this.color = color;

//     this.draw = function () {

//         context.fillStyle = this.color;
//         // context.fillRect(this.x, this.y, radius, radius);
//         context.strokeStyle = this.color;
//         context.beginPath();
//         context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
//         context.closePath();
//         // context.fill();
//         context.stroke();
//     };
// }

function draw() {
    // context.strokeStyle
}

$(function () {

    // adjustWindow();
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    // canvas.width = 200;
    // canvas.height = 200;
    // adjustCanvas();

    canvas.width = $('#canvas').width();
    canvas.height = $('#canvas').height();

    // CODE

    var iMax = Math.floor(canvas.width / cellSize);
    var jMax = Math.floor(canvas.height / cellSize);

    // Build grid
    grid = new Array();

    var circleCount = 616;
    var circles = new Array();

    var colorA = '#ff9933';
    var colorB = '#0000cc';

    // for (var i = 0; i < circleCount; i++) {
    //     var x = Math.floor(canvas.width / 2);
    //     var y = Math.floor(canvas.height / 2);
    //     circles.push(new Circle(x, y, 128, fadeToRGB(colorA, colorB, Math.floor(i / 4))));
    // }

    for (var i = 0; i < iMax; i++) {
        grid.push(new Array());
        for (var j = 0; j < jMax; j++) {
            grid[i].push(new Cell(i * cellSize, j * cellSize));
        }
    }

    // Draw grid.

    context.lineWidth = 1;

    // context.beginPath();
    // for (var i = 0; i < iMax; i++) {
    // 	for (var j = 0; j < jMax; j++) {
    // 		var cell = grid[i][j];
    // 		context.fillRect(cell.x, cell.y, cellSize, cellSize);
    // 	}
    // }
    // context.closePath();
    // context.stroke();

    function drawBackground() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    var prevTime = Date.now();
    var fps = 0;

    var frameCount = 0;
    function timing() {
        // var now = Date.now();
        // var delta = (now - prevTime) / 1000;
        // prevTime = now;
        // fps = (1 / delta);

		// console.log(frameCount);
		
        // var spanFps = document.getElementById('fps');
        document.title = Math.round(frameCount).toString() + ' FPS';
		
        // context.fillStyle = "Black";
        // context.font = "normal 16pt Arial";

        // context.fillText(fps + " fps", 10, 26);

        frameCount = 0;
    }

    var colorIndex = 0;
    // var targetColor = randomRGB();
    // var currentColor = randomRGB();
    var red = '#ff9933';
    var blue = '#0000cc';
    var currentColor = red;
    // context.fillStyle = currentColor;
    // context.fillRect(0, 0, canvas.width, canvas.height);
    var targetColor = blue;
    function animate() {
        frameCount++;
        // drawBackground();


        var randomX = Math.floor(Math.random() * iMax);
        var randomY = Math.floor(Math.random() * jMax);

        var cell = grid[randomX][randomY];

        // var randomColor = randomRGB();

        if (currentColor == red) {
            targetColor = blue;
        } else if (currentColor == blue) {
            targetColor = red;
        }

        currentColor = fadeToRGB(currentColor, targetColor, 1);

        cell.draw(currentColor);

        // for (var i = 0; i < circles.length; i++) {
        //     var circle = circles[i];
        //     if (i > 0) {
        //         var prevCircle = circles[i - 1];
        //         // circle.color = fadeToRGB(circle.color, prevCircle.color, 10);

        //         var delta_x = prevCircle.x - circle.x;
        //         var delta_y = prevCircle.y - circle.y;

        //         var diff = Math.max(0.5, (i / circles.length));
        //         circle.x += (delta_x * 0.8);
        //         circle.y += (delta_y * 0.8);
        //     } else {
        //         // circle.color = fadeToRGB(circle.color, targetColor, 1);
        //         // if (circle.color === targetColor) {
        //         //     targetColor = randomRGB();
        //         // }

        //         circle.x = MOUSE_X;
        //         circle.y = MOUSE_Y;
        //     }
        // }

        // for (var i = circles.length - 1; i > -1; i--) {

        //     circles[i].draw();
        // }

        // context.fillStyle = 'rgba(255, 153, 51, 0.)';
        // context.beginPath();
        // context.arc(circles[0].x, circles[0].y, circles[0].radius, 0, 2 * Math.PI);
        // context.closePath();
        // context.fill();



        // window.requestAnimationFrame(animate);
    }

    // END CODE

    // window.onresize = adjustCanvas;
    window.addEventListener('click', onClick, false);
    window.addEventListener('mousemove', onOver, false);
    window.addEventListener('keydown', keyDown, false);

    window.setInterval(timing, 1000);

//     window.setInterval(function () {
//         var spanFps = document.getElementById('fps');
//         document.title = spanFps.innerText = Math.round(fps).toString() + ' FPS';
//     }, 1000);

    window.setInterval(animate, 50);
    // animate();

    window.setInterval(function() {
        $('#menu').animate({left:-$('#menu').width()},350);
    }, 1);
});