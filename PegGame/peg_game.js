// Create a an array to hold the coordinates of the centers 
// of all of the circles

// Globals, because why not, it's a small project

var PEG_RADIUS = 15;
var CIRCLE_COLLECTION = [];
var PEG_SELECTED = 0;

/**
 * Circle object to represent the pegs on the game board
 * @param {x coordinate of the circle's origin} x 
 * @param {y coordinate of the circle's origin} y 
 * @param {color of the peg in the circle} color 
 * @param {boolean indicating if this circle has a peg in it} hasPeg 
 * @returns {instantiated Circle object} 
 */
function Circle(x, y, color, hasPeg) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.hasPeg = hasPeg;
}

/**
 * Returns a random color that will look good
 * behind black text.
 * @returns {Text containing a random light CSS color.} 
 */
function getRandomColor() {
    var color = "White";

    var randInt = Math.floor((Math.random() * 5) + 1);
    switch (randInt) {
        case 1:
            color = "Aqua";
            break;
        case 2:
            color = "Yellow";
            break;
        case 3:
            color = "LightPink";
            break;
        case 4:
            color = "Lime";
            break;
        case 5:
            color = "Orange";
            break;
    }

    return color;
}

/**
 * Runs when the body of the pegs.html loads.
 * Draws the game board. 
 */
function initalizeBoard() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    // coordinates of the center of the canvas
    var center = {
        x: canvas.width / 2,
        y: canvas.height / 2
    };

    // store the coordinates of the points of the triangles 
    var triangleTop = {
        x: canvas.width / 2,
        y: canvas.height * 0.25
    }

    var triangleLeft = {
        x: canvas.width / 5,
        y: canvas.height * 0.8
    }

    var triangleRight = {
        x: canvas.width * 0.8,
        y: canvas.height * 0.8
    }

    var pegRowOffset = 50;
    var pegColumnOffset = 50;

    // Draw the triangle for the board
    ctx.beginPath();
    ctx.moveTo(triangleTop.x, triangleTop.y);
    ctx.lineTo(triangleLeft.x, triangleLeft.y);
    ctx.lineTo(triangleRight.x, triangleRight.y);
    ctx.closePath();
    ctx.stroke();

    // First, define all the circles we want to draw
    var circleOne = new Circle(triangleTop.x, triangleTop.y + pegRowOffset, getRandomColor());
    // second row
    var circleTwo = new Circle(triangleTop.x - pegColumnOffset / 2, triangleTop.y + (2 * pegRowOffset), getRandomColor());
    var circleThree = new Circle(triangleTop.x + pegColumnOffset / 2, triangleTop.y + (2 * pegRowOffset), getRandomColor());
    // third row
    var circleFour = new Circle(triangleTop.x - pegColumnOffset, triangleTop.y + (3 * pegRowOffset), getRandomColor());
    var circleFive = new Circle(triangleTop.x, triangleTop.y + (3 * pegRowOffset), getRandomColor());
    var circleSix = new Circle(triangleTop.x + pegColumnOffset, triangleTop.y + (3 * pegRowOffset), getRandomColor());
    // fourth row
    var circleSeven = new Circle(triangleTop.x - (1.5 * pegColumnOffset), triangleTop.y + (4 * pegRowOffset), getRandomColor());
    var circleEight = new Circle(triangleTop.x - (0.5 * pegColumnOffset), triangleTop.y + (4 * pegRowOffset), getRandomColor());
    var circleNine = new Circle(triangleTop.x + (0.5 * pegColumnOffset), triangleTop.y + (4 * pegRowOffset), getRandomColor());
    var circleTen = new Circle(triangleTop.x + (1.5 * pegColumnOffset), triangleTop.y + (4 * pegRowOffset), getRandomColor());
    // fifth row
    var circleEleven = new Circle(triangleTop.x - (2 * pegColumnOffset), triangleTop.y + (5 * pegRowOffset), getRandomColor());
    var circleTwelve = new Circle(triangleTop.x - (1 * pegColumnOffset), triangleTop.y + (5 * pegRowOffset), getRandomColor());
    var circleThirteen = new Circle(triangleTop.x - (0 * pegColumnOffset), triangleTop.y + (5 * pegRowOffset), getRandomColor());
    var circleFourteen = new Circle(triangleTop.x + (1 * pegColumnOffset), triangleTop.y + (5 * pegRowOffset), getRandomColor());
    var circleFifteen = new Circle(triangleTop.x + (2 * pegColumnOffset), triangleTop.y + (5 * pegRowOffset), getRandomColor());

    // We want to store all of these circles in an array
    CIRCLE_COLLECTION.push(circleOne);
    CIRCLE_COLLECTION.push(circleTwo);
    CIRCLE_COLLECTION.push(circleThree);
    CIRCLE_COLLECTION.push(circleFour);
    CIRCLE_COLLECTION.push(circleFive);
    CIRCLE_COLLECTION.push(circleSix);
    CIRCLE_COLLECTION.push(circleSeven);
    CIRCLE_COLLECTION.push(circleEight);
    CIRCLE_COLLECTION.push(circleNine);
    CIRCLE_COLLECTION.push(circleTen);
    CIRCLE_COLLECTION.push(circleEleven);
    CIRCLE_COLLECTION.push(circleTwelve);
    CIRCLE_COLLECTION.push(circleThirteen);
    CIRCLE_COLLECTION.push(circleFourteen);
    CIRCLE_COLLECTION.push(circleFifteen);

    // set circle one to be empty to start
    CIRCLE_COLLECTION[0].color = "White";

    var openHole = 1;
    // fill the holes with pegs
    initializeBoardWithPegs(openHole, CIRCLE_COLLECTION);

    // Now draw the circles on the game board
    drawGameCircles(CIRCLE_COLLECTION, ctx);

}

function initializeBoardWithPegs(openHole, circles) {
    for (var i = 0; i < circles.length; i++) {
        if ((i + 1) === openHole) {
            continue;
        }

        circles[i].hasPeg = true;
    }
}

/**
 * Draw the circles on the game board.
 * @param {An array of circles to draw.} circles 
 * @param {Context of the active canvas} context 
 * @returns {no return value} 
 */
function drawGameCircles(circles, context) {
    // Draw the circles for the board
    // Since we have an array, we can loop over the array to draw the circles
    for (var i = 0; i < circles.length; i++) {

        // and draw/fill the circle 
        context.beginPath();
        context.arc(circles[i].x, circles[i].y, PEG_RADIUS, 0, 2 * Math.PI, false);
        context.fillStyle = circles[i].color;
        context.fill();
        context.strokeStyle = "Black";
        context.stroke();

        // and we can put the peg # in the circle
        // peg # is the array index + 1

        // we want the text centered, so we need to grab some information about it
        var pegNumber = (i + 1).toString();
        var textWidth = context.measureText(pegNumber).width;
        // we're going to guess at height, see:  http://stackoverflow.com/questions/10260176/filling-a-canvas-shape-with-text
        var textHeight = context.measureText("w").width;
        // now that we know the size of the text, we can offset it so it is centered in the circle
        context.fillStyle = "rgba(0,0,0,1)";
        context.fillText(pegNumber, circles[i].x - (textWidth / 2), circles[i].y + (textHeight / 2));
    }
}