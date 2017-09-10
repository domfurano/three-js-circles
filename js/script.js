/**
 * 
 */

'use strict';

window.onload = function() { 
	function adjustWindow() {
		window.moveTo(0, 0);
		window.resizeTo(screen.width, screen.height);
	}

	function adjustCanvas() {
		preCanvas.width = canvas.width = window.innerWidth;
		preCanvas.height = canvas.height = window.innerHeight;
	}

	adjustWindow();

	var canvas = document.getElementById('mainCanvas');
	var context = canvas.getContext('2d');    
	var preCanvas = document.createElement('canvas');
	var ctx = preCanvas.getContext('2d');

	// adjustCanvas();

	

	var PI_2 = Math.PI * 2;
	var MOUSE_X = 0;
	var MOUSE_Y = 0;
	var CHAIN_LENGTH = 100;
	var colorFadeIndex = CHAIN_LENGTH - 1;

	var targetColor = randomRGBA();

	var circles = [];
	for (var i = 0; i < CHAIN_LENGTH; i++) {
		circles[i] = new Circle(canvas.width / 2.0, canvas.height / 2.0, 0.55 - (i / (CHAIN_LENGTH * 2)));
		circles[i].reformColor();
		circles[i].mass = CHAIN_LENGTH >> 2;
		circles[i].radius = i*2;
	}

	function render() {
		context.drawImage(preCanvas, 0, 0);
	}

	function animate() {
		drawBackground();
		drawCircles();
		render();
		requestAnimationFrame(animate);
	}

	function drawBackground() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		context.clearRect(0, 0, canvas.width, canvas.height);
	}

	function drawCircles() {
		for (var i = circles.length - 1; i >= 0; i--) {
			// circles[i].move(i);
			
			if (i != 0) {
				circles[i].color = fadeToRGBA(circles[i].color, circles[i - 1 >= 0 ? i - 1 : null].color, 10);	
			} else {
				circles[i].color = fadeToRGBA(circles[i].color, targetColor, 1);
			}
			circles[i].reformColor();
			if (colorFadeIndex == CHAIN_LENGTH - 1) {
				colorFadeIndex = 0;
			}
			
			circles[i].draw();

		}
		
		colorFadeIndex++;
		if (equalsRGBAnoAlpha(circles[0].color, targetColor)) {
			targetColor = randomRGBA();
		}
		
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

	function Circle(x, y, alpha) {
		this.x = x;
		this.y = y;
		this.radius = 100;
		this.alpha = alpha;
		this.currAlpha = this.alpha;
		this.color = targetColor;
		this.mass = 500;

		this.move = function(index) {
			if (index == 0) {
				var distance = Math.sqrt(Math.pow(this.x - MOUSE_X, 2) + Math.pow(this.y - MOUSE_Y, 2));
				var angle = Math.atan2((MOUSE_Y - this.y), (MOUSE_X - this.x));
				var movement = Math.log(distance * this.mass);
				if (movement < distance) {
					this.x < MOUSE_X ? this.x += Math.cos(angle) * movement : this.x > MOUSE_X ? this.x += Math.cos(angle) * movement : null;
					this.y < MOUSE_Y ? this.y += Math.sin(angle) * movement : this.y > MOUSE_Y ? this.y += Math.sin(angle) * movement : null;
				} else {
					this.x < MOUSE_X ? this.x += Math.cos(angle) * distance : this.x > MOUSE_X ? this.x += Math.cos(angle) * distance : null;
					this.y < MOUSE_Y ? this.y += Math.sin(angle) * distance : this.y > MOUSE_Y ? this.y += Math.sin(angle) * distance : null;
				}/*
		    if (distance < 1) {
			this.currAlpha = 0;
		    } else {
			this.currAlpha = this.alpha;
		    }*/
			} else {
				var distance = Math.sqrt(Math.pow(this.x - circles[index - 1].x, 2) + Math.pow(this.y - circles[index - 1].y, 2));
				var angle = Math.atan2((circles[index - 1].y - this.y), (circles[index - 1].x - this.x));
				var movement = Math.log(distance * this.mass);
				var cosAngle = Math.cos(angle);
				var sinAngle = Math.sin(angle);
				var cosMovement = cosAngle * movement;
				var sinMovement = sinAngle * movement;
				var cosDistance = cosAngle * distance;
				var sinDistance = sinAngle * distance;
				if (movement < distance) {
					this.x < circles[index - 1].x ? this.x += cosMovement : this.x > circles[index - 1].x ? this.x += cosMovement : null;
					this.y < circles[index - 1].y ? this.y += sinMovement : this.y > circles[index - 1].y ? this.y += sinMovement : null;
				} else {
					this.x < circles[index - 1].x ? this.x += cosDistance : this.x > circles[index - 1].x ? this.x += cosDistance : null;
					this.y < circles[index - 1].y ? this.y += sinDistance : this.y > circles[index - 1].y ? this.y += sinDistance : null;
				}
				/*
		    if (distance < 0.01) {
			this.currAlpha = 0;
		    } else {
			this.currAlpha = this.alpha;
		    }

		    this.x = Math.round(this.x);
		    this.y = Math.round(this.y);
				 */
			}
		};

		this.reformColor = function() {
			this.color = 'rgba(' + redRGBA(this.color) + ', ' + greenRGBA(this.color) + ', ' + blueRGBA(this.color) + ', ' + this.currAlpha + ')';
		};

		this.draw = function() {
			ctx.strokeStyle = this.color;
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius, 0, PI_2);
			ctx.closePath();
			ctx.lineWidth = 10;
			ctx.stroke();
		};
	}

	window.onresize = adjustCanvas;
	window.addEventListener('click', onClick, false);
	window.addEventListener('mousemove', onOver, false);
	window.addEventListener('keydown', keyDown, false);
	window.requestAnimationFrame(animate);
};