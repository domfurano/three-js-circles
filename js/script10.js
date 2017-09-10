var program = (function () {
    var canvas;
    var context;
    var TWO_PI = Math.PI * 2;
    var HALF_PI = Math.PI / 2;
    var CLIENT_X = 0;
    var CLIENT_Y = 0;
    function adjustWindow() {
        window.moveTo(0, 0);
        window.resizeTo(screen.width, screen.height);
    }
    function adjustCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    function drawBackground() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    ///////////////////////////
    /**** Event Callbacks ****/
    ///////////////////////////

    function keyDown(event) {
        console.log(event.keyCode);
    }
    function onClick(event) {
        CLIENT_X = event.clientX;
        CLIENT_Y = event.clientY;
    }
    function onOver(event) {
        CLIENT_X = event.clientX;
        CLIENT_Y = event.clientY;
    }

    //////////////////////////
    /**** CUSTOM OBJECTS ****/
    //////////////////////////

    function Triangle(x_0, y_0, x_1, y_1, x_2, y_2) {
        this.x_0 = x_0;
        this.y_0 = y_0;
        this.x_1 = x_1;
        this.y_1 = y_1;
        this.x_2 = x_2;
        this.y_2 = y_2;

        this.draw = function () {

        };
    }

    document.addEventListener('DOMContentLoaded', function () {
        canvas = document.getElementById('canvas');
        context = canvas.getContext('2d');
        adjustCanvas();
        window.onresize = function () {
            adjustCanvas();

        };
        window.addEventListener('click', onClick, false);
        window.addEventListener('mousemove', onOver, false);
        window.addEventListener('keydown', keyDown, false);

        /////////////////////////
        /**** Initial Setup ****/
        /////////////////////////

        var initalX = canvas.width / 2;
        var initalY = canvas.height / 2;
        var currentColor = randomRGBA();
        var targetColor = randomRGBA();
        var triangles = [[0, canvas.width]];
        var numStops = 11;
        var pulseIndex = 1;
        var color_2 = randomRGBA();
        var degs = 0;

        function animate() {
            // window.requestAnimationFrame(animate);
            // drawBackground();

            /////////////////////////////////////////////////////////////////////////
            ////    C  O  D  E                                                   ////
            /////////////////////////////////////////////////////////////////////////

            var halfWidth = canvas.width / 2;
            var halfHeight = canvas.height / 2;
            var color_1 = "black";

            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(CLIENT_X, CLIENT_Y);
            context.lineTo(0, canvas.height);
            context.lineTo(0, 0);
            context.closePath();

            var gradient = context.createLinearGradient(0, halfHeight, CLIENT_X, halfHeight);
            for (var i = 1; i < numStops; i++) {
                if (i == pulseIndex) {
                    gradient.addColorStop(i * 0.1, color_2);
                } else {
                    gradient.addColorStop(i * 0.1, color_1);
                }
            }

            context.fillStyle = gradient;
            context.fill();

            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(CLIENT_X, CLIENT_Y);
            context.lineTo(canvas.width, 0);
            context.lineTo(0, 0);
            context.closePath();
            gradient = context.createLinearGradient(halfWidth, 0, halfWidth, CLIENT_Y);
            for (var i = 1; i < numStops; i++) {
                if (i == pulseIndex) {
                    gradient.addColorStop(i * 0.1, color_2);
                } else {
                    gradient.addColorStop(i * 0.1, color_1);
                }
            }

            context.fillStyle = gradient;
            context.fill();

            context.beginPath();
            context.moveTo(canvas.width, 0);
            context.lineTo(CLIENT_X, CLIENT_Y);
            context.lineTo(canvas.width, canvas.height);
            context.lineTo(canvas.width, 0);
            context.closePath();
            gradient = context.createLinearGradient(canvas.width, halfHeight, CLIENT_X, halfHeight);
            for (i = 1; i < numStops; i++) {
                if (i == pulseIndex) {
                    gradient.addColorStop(i * 0.1, color_2);
                } else {
                    gradient.addColorStop(i * 0.1, color_1);
                }
            }

            context.fillStyle = gradient;
            context.fill();

            context.beginPath();
            context.moveTo(0, canvas.height);
            context.lineTo(CLIENT_X, CLIENT_Y);
            context.lineTo(canvas.width, canvas.height);
            context.lineTo(0, canvas.height);
            context.closePath();
            gradient = context.createLinearGradient(halfWidth, canvas.height, halfWidth, CLIENT_Y);
            for (i = 1; i < numStops; i++) {
                if (i == pulseIndex) {
                    gradient.addColorStop(i * 0.1, color_2);
                } else {
                    gradient.addColorStop(i * 0.1, color_1);
                }
            }

            if (pulseIndex <= 1) {
                pulseIndex = numStops;
                color_2 = randomRGBA();
            } else {
                pulseIndex--;
            }

            context.fillStyle = gradient;
            context.fill();



            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(CLIENT_X, CLIENT_Y);
            context.moveTo(canvas.width, 0);
            context.lineTo(CLIENT_X, CLIENT_Y);
            context.moveTo(canvas.width, canvas.height);
            context.lineTo(CLIENT_X, CLIENT_Y);
            context.moveTo(0, canvas.height);
            context.lineTo(CLIENT_X, CLIENT_Y);
            context.closePath();
            context.strokeStyle = "white";
            context.lineWidth = 2;
            context.stroke();

            if (degs >= 360) {
                degs = 0;
            } else {
                degs += 2;
            }

            // var broBama = document.getElementById('brobama');
            // broBama.style.top = CLIENT_Y - broBama.height / 2 + 'px';
            // broBama.style.left = CLIENT_X - broBama.width / 2 + 'px';
            // broBama.style.transform = 'rotate(' + degs + 'deg)';

            /////////////////////////////////////////////////////////////////////////
            ////    E  N  D     C  O  D  E                                       ////
            /////////////////////////////////////////////////////////////////////////
        }

        window.setInterval(animate, 64);
    });
} (window));
