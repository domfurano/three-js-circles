var ProgramEleven = (function () {
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

    function Square(fraction) {
        this.fraction = fraction;
        this.coords = [[]];
        this.color = '#ffffff';

        this.move = function() {
            var frac_X = this.fraction * CLIENT_X;
            var frac_Y = this.fraction * CLIENT_Y;

            var delta_X = canvas.width - (canvas.width - CLIENT_X) * this.fraction;
            var delta_Y = canvas.height - (canvas.height - CLIENT_Y) * this.fraction;

            this.coords = [
                [frac_X,  frac_Y],
                [delta_X, frac_Y],
                [delta_X, delta_Y],
                [frac_X, delta_Y]
            ];
        };
        
        this.draw = function (fill, fillColor) {
            context.beginPath();
            context.moveTo(this.coords[0][0], this.coords[0][1]);
            context.lineTo(this.coords[1][0], this.coords[1][1]);
            context.lineTo(this.coords[2][0], this.coords[2][1]);
            context.lineTo(this.coords[3][0], this.coords[3][1]);
            context.lineTo(this.coords[0][0], this.coords[0][1]);
            context.closePath();

            if (fill && fillColor) {
                context.fillStyle = fillColor;
                context.fill();
            } else {
                context.strokeStyle = 'white';
                context.lineWidth = 2;
                context.stroke();
            }            
        };
    }

    function Lines() {
        this.draw = function() {
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(CLIENT_X, CLIENT_Y);
            context.moveTo(canvas.width, 0);
            context.lineTo(CLIENT_X, CLIENT_Y);
            context.moveTo(canvas.width, canvas.height);
            context.lineTo(CLIENT_X, CLIENT_Y);
            context.moveTo(0, canvas.height);
            context.lineTo(CLIENT_X, CLIENT_Y);
            context.moveTo(0, CLIENT_Y);
            context.lineTo(CLIENT_X, CLIENT_Y);
            context.moveTo(CLIENT_X, 0);
            context.lineTo(CLIENT_X, CLIENT_Y);
            context.moveTo(canvas.width, CLIENT_Y);
            context.lineTo(CLIENT_X, CLIENT_Y);
            context.moveTo(CLIENT_X, canvas.height);
            context.lineTo(CLIENT_X, CLIENT_Y);
            context.closePath();
            context.strokeStyle = "white";
            context.lineWidth = 2;
            context.stroke();
        };
    }

    document.addEventListener('DOMContentLoaded', function () {
        canvas = document.getElementById('canvas');
        context = canvas.getContext('2d');

        /////////////////////////
        /**** Initial Setup ****/
        /////////////////////////

        var index = 0;

        var lines = new Lines();
        var squares = [];

        for (var i = 11; i > 0; i--) {
            squares.push(new Square(i / 12));
        }

        function animate() {
            window.requestAnimationFrame(animate);
            drawBackground();

            /////////////////////////////////////////////////////////////////////////
            ////    C  O  D  E                                                   ////
            /////////////////////////////////////////////////////////////////////////

            // lines.draw();
            squares.forEach(function (element) {
                element.move();
                element.draw(false, null);
            });

            for (var i = squares.length - 1; i > -1; i--) {
                squares[i].move();
                if (i === index) {
                    squares[i].draw(false, 'red');
                } else {
                    squares[i].draw(false, 'white');
                }
            }

            // index++;

            index = index % 11;

            /////////////////////////////////////////////////////////////////////////
            ////    E  N  D     C  O  D  E                                       ////
            /////////////////////////////////////////////////////////////////////////
        }

        function clientClick(event) {
            onClick(event);
            
                        
        }


        ///////////////////////////////////////////////////////////////////
        window.addEventListener('click', clientClick, false);
        window.addEventListener('mousemove', onOver, false);
        window.addEventListener('keydown', keyDown, false);

        window.onresize = function () {
            adjustCanvas();
        };

        adjustCanvas();        

        animate();
        // window.setInterval(animate, 64);
    });
} (window));
