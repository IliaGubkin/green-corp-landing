const COLORS = ["255,108,80", "5,117,18", "29,39,57", "67,189,81"];

class Bubble {
    constructor(canvas) {
        this.canvas = canvas;
        this.getCanvasSize();
        this.init();
    }

    getCanvasSize() {
        this.canvasWidth = this.canvas.clientWidth;
        this.canvasHeight = this.canvas.clientHeight;

    }

    init() {
        let randomNumber = Math.random() * (COLORS.length);
        let randomIndex = Math.floor(randomNumber);
        this.translateX = generateDecimalBetween(0, this.canvasWidth);
        this.translateY = generateDecimalBetween(0, this.canvasHeight);
        let inTheMiddle = this.translateX > this.canvasWidth / 3.4 && this.translateX < this.canvasWidth * 0.65;
        this.color = COLORS[randomIndex];
        this.alpha = inTheMiddle ? generateDecimalBetween(2, 5) / 10 : generateDecimalBetween(3, 9) / 10;
        this.size = inTheMiddle ? generateDecimalBetween(2, 3) : generateDecimalBetween(3, 5);
        this.velocity = generateDecimalBetween(20, 40);
        this.movementX = generateDecimalBetween(-2, 2) / this.velocity;
        this.movementY = generateDecimalBetween(1, 20) / this.velocity;
    }

    move() {
        this.translateX = this.translateX - this.movementX;
        this.translateY = this.translateY - this.movementY;

        if (this.translateY < 0 || this.translateX < 0 || this.translateX > this.canvasWidth) {
            this.init();
            this.translateY = this.canvasHeight;
        }
    }
}

class CanvasBackground {
    constructor(id) {
        this.canvas = document.getElementById(id);
        this.ctx = this.canvas.getContext("2d");
        this.dpr = window.devicePixelRatio;
    }

    start() {
        this.canvasSize();
        this.generateBubbles();
        this.animate();
    }


    canvasSize() {
        this.canvas.width = this.canvas.offsetWidth * this.dpr;
        this.canvas.height = this.canvas.offsetHeight * this.dpr;
        this.bubble_density = 0.04 * this.canvas.width;
        this.ctx.scale(this.dpr, this.dpr);
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
        this.bubblesList.forEach(bubble => {
            bubble.move();
            this.ctx.translate(bubble.translateX, bubble.translateY);
            this.ctx.beginPath();
            this.ctx.arc(0, 0, bubble.size, 0, 2 * Math.PI);
            this.ctx.fillStyle = `rgba(${bubble.color},${bubble.alpha})`
            this.ctx.fill();
            this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
        });
        requestAnimationFrame(this.animate.bind(this));
    }

    generateBubbles() {
        this.bubblesList = [];
        for (let i = 0; i < this.bubble_density; i++) {
            this.bubblesList.push(new Bubble(this.canvas))
        }
    }
}

const canvasBackground = new CanvasBackground("orb-canvas");
canvasBackground.start();

function generateDecimalBetween(left, right) {
    return (Math.random() * (left - right) + right).toFixed(2);
}