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

    function Circle(x, y, color, radius) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = radius;

        this.draw = function () {
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, TWO_PI);
            context.closePath();
            context.fillStyle = this.color;
            context.fill();
        };
    }

    document.addEventListener('DOMContentLoaded', function () {
        canvas = document.getElementById('canvas');
        context = canvas.getContext('2d');
        adjustCanvas();
        window.onresize = adjustCanvas;
        window.addEventListener('click', onClick, false);
        window.addEventListener('mousemove', onOver, false);
        window.addEventListener('keydown', keyDown, false);

        /////////////////////////
        /**** Initial Setup ****/
        /////////////////////////

        var circleWidth = 16;
        var circlesNum = Math.ceil((Math.min(canvas.width, canvas.height) / 2 ) / circleWidth);
        var circles = [];
        var initalX = canvas.width / 2;
        var initalY = canvas.height / 2;
        var currentColor = randomRGBA();
        var targetColor = randomRGBA();
        for (var i = 1; i < circlesNum; i++) {
            circles.push(new Circle(initalX, initalY, currentColor, i * circleWidth));
        }
        i = 1;

        function animate() {
            // window.requestAnimationFrame(animate);
            // drawBackground();

            /////////////////////////////////////////////////////////////////////////
            ////    C  O  D  E                                                   ////
            /////////////////////////////////////////////////////////////////////////

            if (!equalsRGBAnoAlpha(currentColor, targetColor)) {
                currentColor = fadeToRGBA(currentColor, targetColor, 2);
            } else {
                targetColor = randomRGBA();
            }

            circles[0].color = currentColor;
            // for (var i = 1; i < circles.length; i++) {
                circles[i].color = fadeToRGBA(circles[i].color, circles[i - 1].color, circles.length - i);
            // }
            circles[circles.length - 1].draw();

            if (i >= circles.length - 1) {
                i = 1;
            } else {
                i++;
            }

            for (var j = circles.length - 1; j > -1; j--) {
                circles[j].draw();
            }

            /////////////////////////////////////////////////////////////////////////
            ////    E  N  D     C  O  D  E                                       ////
            /////////////////////////////////////////////////////////////////////////
        }
        // animate();
        window.setInterval(animate, 60);
    });
} (window));
