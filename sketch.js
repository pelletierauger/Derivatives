let looping = true;
let socket, cnvs, ctx, canvasDOM;
let fileName = "./frames/4/sketch";
let maxFrames = 126;
let x, y, t;
let r = 100;
let increment;
let amount = 1500;

function setup() {
    // pixelDensity(1);
    socket = io.connect('http://localhost:8080');
    // cnvs = createCanvas(windowWidth, windowWidth / 16 * 9);
    cnvs = createCanvas(500, 500);
    ctx = cnvs.drawingContext;
    canvasDOM = document.getElementById('defaultCanvas0');
    frameRate(5);
    background(230);
    fill(0);
    // noStroke();
    stroke(50, 0, 15);
    stroke(0);
    frameRate(30);
    strokeWeight(1);
    if (!looping) {
        noLoop();
    }
}

function draw() {
    // background(150, 250, 190);
    // background(230);
    background(255);
    increment = TWO_PI / amount;
    t = frameCount;
    let k = 0;
    let curve = map(sin(frameCount * 0.05), -1, 1, 0.95, 1.05);
    for (let i = 0; i < TWO_PI - increment; i += increment) {
        r = map(sin(i * 5), -1, 1, curve, 1) * 50;
        x = cos(i) * r + 250;
        y = sin(i) * r + 250;
        // y = x * x;
        if (k % 10 == 0) {
            let j = i + increment;
            let r2 = map(sin(j * 5), -1, 1, curve, 1) * 50;
            let x2 = cos(j) * r2 + 250;
            let y2 = sin(j) * r2 + 250;
            // y2 = 
            // ellipse(x, y, 10);
            // stroke(0);
            let slope = (y2 - y) / (x2 - x);
            let x0 = x - 1000;
            let x3 = x2 + 1000;
            let y0 = y - 1000 * slope;
            let y3 = y2 + 1000 * slope;
            line(x0, y0, x3, y3);
            // noStroke();
        }
        // ellipse(x, y, 2);
        k++;
    }
    if (exporting && frameCount < maxFrames) {
        frameExport();
    }
}

function keyPressed() {
    if (keyCode === 32) {
        if (looping) {
            noLoop();
            looping = false;
        } else {
            loop();
            looping = true;
        }
    }
    if (key == 'p' || key == 'P') {
        frameExport();
    }
    if (key == 'r' || key == 'R') {
        window.location.reload();
    }
    if (key == 'm' || key == 'M') {
        redraw();
    }
}