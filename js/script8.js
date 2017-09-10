var fireworksScript = (function () {
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
    function keyDown(event) {
        if (event.keyCode == 78) { // n
            alert('');
        }
    }
    function onClick(event) {
        onOver(event);
    }
    function onOver(event) {
        CLIENT_X = event.clientX;
        CLIENT_Y = event.clientY;
    }
    function drawBackground() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function Firework(x, y, a, d, t_f, color, radius, fill) {
        this.x = x;
        this.y = y;
        this.a = a;
        this.t = 0;
        this.color = color;
        this.radius = radius;
        this.fill = fill;

        this.alpha = 1.0;
        this.angle = (Math.random() * 0.25) * Math.PI + Math.PI * (3 / 8);
        this.stage = 0;

        this.velocity = function () {
            return (d * (1 - Math.random() * 0.5) / t_f) - (a * t_f) / 2;
        };
        this.v = this.v_y = this.velocity();

        this.reset = function () {
            this.color = 'red';
            this.x = x;
            this.y = y;
            this.v = this.v_y = this.velocity();
            this.angle = (Math.random() * 0.25) * Math.PI + Math.PI * (3 / 8);
            this.stage = 0;
        };

        this.move = function () {
            switch (this.stage) {
                case 0:
                    // color

                    // radius

                    // velocity
                    // this.v += this.a;

                    // x
                    this.x += Math.cos(this.angle) * this.v;

                    // y
                    this.v_y += this.a;
                    this.y -= Math.sin(this.angle) * this.v_y;

                    // state change
                    if (this.v_y <= -2) {
                        this.color = randomRGBA(1);
                        this.stage = 1;
                        this.t = 0;
                        // context.fillStyle = 'rbga(255, 255, 255, 0.5)';
                        // context.fillRect(0, 0, canvas.width, canvas.height);
                    } else {
                        this.t += 1;
                    }
                    break;
                case 1:
                    if (this.t == 8) {
                        this.stage = 2;
                        this.t = 0;
                    } else {
                        this.t += 1;
                    }
                    break;
                case 2:
                    if (this.t == 256) {
                        this.reset();
                        this.stage = 0;
                        this.t = 0;
                    } else {
                        this.t += 1;
                    }
                    break;
            }

            // direction
        };

        this.draw = function (color) {
            switch (this.stage) {
                case 0:
                    context.beginPath();
                    context.arc(this.x, this.y, this.radius, 0, TWO_PI);
                    context.closePath();
                    if (this.fill) {
                        context.fillStyle = this.color;
                        context.fill();
                    } else {
                        context.strokeStyle = this.color;
                        context.stroke();
                    }
                    break;
                case 1:
                    context.beginPath();
                    context.arc(this.x, this.y, this.radius * 10, 0, TWO_PI);
                    context.closePath();
                    if (this.fill) {
                        context.fillStyle = this.color;
                        context.fill();
                    } else {
                        context.strokeStyle = this.color;
                        context.stroke();
                    }
                    break;
                case 2:
                    context.beginPath();
                    context.moveTo(this.x, this.y);
                    context.quadraticCurveTo(this.x - 100, this.y + 50, this.x - 100, this.y + 100);
                    context.lineWidth = 10;
                    context.strokeStyle = this.color;
                    context.stroke();
                    break;
            }
        };
    }

    $(function () {
        canvas = document.getElementById('canvas');
        context = canvas.getContext('2d');
        // adjustWindow();
        adjustCanvas();
        window.onresize = adjustCanvas;
        window.addEventListener('click', onClick, false);
        window.addEventListener('mousemove', onOver, false);
        window.addEventListener('keydown', keyDown, false);

        ////////////////////////////////////////////////////////////////////////
        ////    C  O  D  E                                                   ///
        ////////////////////////////////////////////////////////////////////////

        // FIREWORKS = [];
        // var MAX_FIREWORKS = 1000;
        // var INITIAL_X = canvas.width / 2;
        // var INITIAL_Y = canvas.height;
        // var MAX_TRAVEL = Math.min(canvas.width, canvas.height);
        // var iteration = 0;
        // function animate() {
        //     window.requestAnimationFrame(animate);
        //     drawBackground();

        //     if (iteration % 32 === 0 && FIREWORKS.length < MAX_FIREWORKS) {
        //         FIREWORKS.push(new Firework(INITIAL_X, INITIAL_Y, -0.5, MAX_TRAVEL, 60, 'rgba(255, 0, 0, 1.0)', 5, true));
        //     }

        //     for (var i = 0; i < FIREWORKS.length; i++) {
        //         var firework = FIREWORKS[i];
        //         firework.move();
        //         firework.draw();
        //     }
        //     iteration++;
        // }

        ////////////////////////////////////////////////////////////////////////
        ////    E  N  D     C  O  D  E                                       ///
        ////////////////////////////////////////////////////////////////////////
        
        // animate();
    });
} (window));
