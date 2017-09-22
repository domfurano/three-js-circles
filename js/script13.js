(function () {
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

    function Sky() {
        this.color0 = "rgba(126, 192, 238, 1.0)";
        this.color1 = "rgba(25, 25, 112, 0.0)";

        this.draw = function (occlusion) {
            context.fillStyle = "black";
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = fadeFromToRGBA(this.color0, this.color1, occlusion);
            context.fillRect(0, 0, canvas.width, canvas.height);
        };
    }

    function Star(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = "white";

        this.draw = function (occlusion) {
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, TWO_PI);
            context.closePath();
            context.fillStyle = this.color = "rgba(255, 255, 255, " + (occlusion) + ")";;
            context.fill();
        };

        this.update = function () {
            this.x = Math.ceil(Math.random() * canvas.width);
            this.y = Math.ceil(Math.random() * canvas.height);
        };
    }

    function Aura(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.size = 8;
        this.color1 = "white";
        this.color2 = "black";

        this.draw = function (occlusion) {
            this.color1 = "rgba(255, 255, 255, " + (occlusion / 2) + ")";
            this.color2 = "rgba(255, 255, 255, 0)";

            var gradient = context.createRadialGradient(this.x, this.y, this.radius, this.x, this.y, this.radius + this.size);
            gradient.addColorStop(0, this.color1);
            gradient.addColorStop(1, this.color2);
            context.fillStyle = gradient;

            context.beginPath();
            context.arc(this.x, this.y, this.radius + this.size, 0, TWO_PI);
            context.closePath();

            context.fill();
        };

        this.update = function () {
            this.x = canvas.width / 2;
            this.y = canvas.height / 2;
            this.radius = Math.ceil(Math.min(canvas.height / 12, canvas.width / 12));
        };
    }

    function Sun(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color0 = "rgba(255, 255, 0, 1.0)";
        this.color1 = "rgba(255, 152, 0, 1.0)";

        this.area = function () {
            return Math.PI * this.radius * this.radius;
        };

        this.draw = function (occlusion) {
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, TWO_PI);
            context.closePath();
            context.fillStyle = fadeFromToRGBA(this.color0, this.color1, occlusion);
            context.fill();
        };

        this.update = function () {
            this.x = canvas.width / 2;
            this.y = canvas.height / 2;
            this.radius = Math.ceil(Math.min(canvas.height / 12, canvas.width / 12));
        };
    }

    function Moon(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = "rgba(132, 132, 132, 1.0)";

        this.area = function () {
            return Math.PI * this.radius * this.radius;
        };

        this.draw = function (occlusion) {
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, TWO_PI);
            context.closePath();
            context.fillStyle = "black";
            context.fill();

            context.fillStyle = this.color = "rgba(128, 128, 128, " + (1 - occlusion) + ")";
            context.fill();

            // context.font = "30px Arial";
            // context.fillStyle = "white";
            // context.fillText((occlusion * 100).toFixed(0) + "%", this.x, this.y);
        };

        this.move = function () {
            this.x = CLIENT_X;
            this.y = CLIENT_Y;
        };

        this.update = function () {
            this.radius = Math.ceil(Math.min(canvas.height / 12, canvas.width / 12));
        };
    }

    function areaOfIntersection(x0, y0, r0, x1, y1, r1) {
        var rr0 = r0 * r0;
        var rr1 = r1 * r1;
        var d = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));

        // Circles do not overlap
        if (d > r1 + r0) {
            return 0;
        }

        // Circle1 is completely inside circle0
        else if (d <= Math.abs(r0 - r1) && r0 >= r1) {
            // Return area of circle1
            return Math.PI * rr1;
        }

        // Circle0 is completely inside circle1
        else if (d <= Math.abs(r0 - r1) && r0 < r1) {
            // Return area of circle0
            return Math.PI * rr0;
        }

        // Circles partially overlap
        else {
            var phi = (Math.acos((rr0 + (d * d) - rr1) / (2 * r0 * d))) * 2;
            var theta = (Math.acos((rr1 + (d * d) - rr0) / (2 * r1 * d))) * 2;
            var area1 = 0.5 * theta * rr1 - 0.5 * rr1 * Math.sin(theta);
            var area2 = 0.5 * phi * rr0 - 0.5 * rr0 * Math.sin(phi);

            // Return area of intersection
            return area1 + area2;
        }
    }

    function distance(sun, moon) {
        var distance = Math.sqrt(Math.pow(moon.x - sun.x, 2) + Math.pow(moon.y - sun.y, 2));
        return distance;
    }

    document.addEventListener('DOMContentLoaded', function () {
        canvas = document.getElementById('canvas');
        context = canvas.getContext('2d');

        adjustCanvas(function () { });

        /////////////////////////
        /**** Initial Setup ****/
        /////////////////////////

        var sky = new Sky();


        function animate() {
            window.requestAnimationFrame(animate);
            drawBackground();

            /////////////////////////////////////////////////////////////////////////
            ////    C  O  D  E                                                   ////
            /////////////////////////////////////////////////////////////////////////

            var intersectionArea = areaOfIntersection(sun.x, sun.y, sun.radius, moon.x, moon.y, moon.radius);

            var sunArea = sun.area();

            var area = Math.min(sunArea, intersectionArea);

            var occlusion = area / (sunArea);

            // var theta = Math.atan((sun.y - moon.y) / (sun.x - moon.x));

            moon.move();

            sky.draw(occlusion);
            stars.forEach(function (star) { star.draw(occlusion); });
            aura.draw(occlusion);
            sun.draw(occlusion);
            moon.draw(occlusion);

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
            stars.forEach(function (star) { star.update(); });
            aura.update();
            sun.update();
            moon.update();
        };

        window.onresize();

        animate();
        // window.setInterval(animate, 64);
    });
})();
