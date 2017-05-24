/**
 * peg_game.js - contains most of the board setup methods
 * 
 * Author: David Moll - dmoll@emich.edu
 * COSC 631 Assignment #3
 */
// Globals, because why not, it's a small project

var PEG_ROW_OFFSET = 50;
var PEG_COLUMN_OFFSET = 50;
var PEG_RADIUS = 15;
var PEG_COLLECTION = [];
var HOLE_COLLECTION = [];
var PEG_SELECTED = 0;
var ANY_MOVES_REMAINING = true;
var PEGS_REMAINING = 0;
var GAME_START_OPTION = "FirstPeg";
var MOVING = false;
var TRIANGLE;


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
 * Create a triangle shape with coordinates of the three vertices.
 * @param {x, y coords of top vertex} Top 
 * @param {x, y coords of left vertex} Left 
 * @param {x, y coords of right vertex} Right 
 * @returns {} 
 */
function Triangle(top, left, right) {
    this.top = top;
    this.left = left;
    this.right = right;
}

/**
 * Runs when the body of the pegs.html loads.
 * Draws the game board. 
 */
function initalizeBoard() {
    window.PEG_COLLECTION = [];
    window.HOLE_COLLECTION = [];
    window.PEG_SELECTED = 0;
    window.ANY_MOVES_REMAINING = true;
    window.PEGS_REMAINING = 0;

    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    window.TRIANGLE = defineTrianglePosition(canvas);

    drawGameTriangle(canvas, TRIANGLE);

    createPegCollection();
    createHoleCollection();

    // set which peg is empty to begin with based on the game start option        
    var openHole;

    if (window.GAME_START_OPTION === "RandomPeg") {
        openHole = getRandomStartPeg();
        PEG_COLLECTION[openHole - 1].color = "White";
    } else {
        // set circle one to be empty to start
        PEG_COLLECTION[0].color = "White";
        openHole = 1;
    }
    // fill the holes with pegs
    initializeBoardWithPegs(openHole, PEG_COLLECTION);

    // Now draw the circles on the game board
    drawGameCircles(PEG_COLLECTION, ctx);
    drawHoleNumbers(HOLE_COLLECTION, ctx);

    // Clear the game over message
    document.getElementById("gameOverDisplay").textContent = "";

}

function redrawBoard(canvas, ctx) {
    console.log("Clearing and redrawing game board");
    clear();
    drawGameTriangle(canvas, TRIANGLE);
    drawGameCircles(PEG_COLLECTION, ctx);
    drawHoleNumbers(HOLE_COLLECTION, ctx);
}

/**
 * Clears the board contents. 
 */
function clear() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function defineTrianglePosition(canvas) {
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

    return new Triangle(triangleTop, triangleLeft, triangleRight);
}

/**
 * Draw the triangle for the game board.
 * @param {Canvas we're working with.} canvas 
 * @param {} ctx 
 * @returns {} 
 */
function drawGameTriangle(canvas, triangle) {
    var ctx = canvas.getContext("2d");
    // store the coordinates of the points of the triangles 

    // Draw the TRIANGLE for the board
    ctx.beginPath();
    ctx.moveTo(TRIANGLE.top.x, TRIANGLE.top.y);
    ctx.lineTo(triangle.left.x, triangle.left.y);
    ctx.lineTo(triangle.right.x, triangle.right.y);
    ctx.closePath();
    ctx.stroke();
}

/**
 * Set up starting state of all the pegs and holes on the board.
 * @param {Number of the hole in the board that starts out empty.} openHole 
 * @param {Array of circles representing the holes on the boards.} circles 
 * @returns {} 
 */
function initializeBoardWithPegs(openHole, circles) {
    for (var i = 0; i < circles.length; i++) {
        if ((i + 1) === openHole) {
            continue;
        }

        circles[i].hasPeg = true;
        window.PEGS_REMAINING++;
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
        drawCircle(context, circles[i], true);        
    }
}

function drawCircle(context, circle, fill) {
    // and draw/fill the circle 
    context.beginPath();
    context.arc(circle.x, circle.y, PEG_RADIUS, 0, 2 * Math.PI, false);
    if (fill) {
        context.fillStyle = circle.color;
        context.fill();
    }
    context.strokeStyle = "Black";
    context.stroke();  
}

function drawHoleNumbers(circles, context) {
    // we can put the peg # in the circle
    // peg # is the array index + 1
    for (var i = 0; i < circles.length; i++) {
        // we want the text centered, so we need to grab some information about it
        drawCircle(context, circles[i], false);
        var circleNum = i + 1;
        var pegNumber = (circleNum).toString();
        var textWidth = context.measureText(pegNumber).width;
        // we're going to guess at height, see:  http://stackoverflow.com/questions/10260176/filling-a-canvas-shape-with-text
        var textHeight = context.measureText("w").width;
        // now that we know the size of the text, we can offset it so it is centered in the circle
        context.fillStyle = "rgba(0,0,0,1)";
        context.fillText(pegNumber, circles[i].x - (textWidth / 2), circles[i].y + (textHeight / 2));
    }
}

/**
 * Reset the board with the First Peg as the empty one
 */
function resetBoard() {
    window.GAME_START_OPTION = "FirstPeg";
    clear();
    initalizeBoard();
}

/**
 * Reset the board with a random peg empty 
 */
function randomStart() {
    window.GAME_START_OPTION = "RandomPeg";
    clear();
    initalizeBoard();
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
 * Choose a random number from 1 to 15 to be the starting empty peg
 * @returns {Random number from 1 to 15 inclusive} 
 */
function getRandomStartPeg() {
    return Math.floor((Math.random() * 15) + 1);
}

function createPegCollection() {
    // First, define all the circles we want to draw
    var circleOne = new Circle(TRIANGLE.top.x, TRIANGLE.top.y + PEG_ROW_OFFSET, getRandomColor());
    // second row
    var circleTwo = new Circle(TRIANGLE.top.x - PEG_COLUMN_OFFSET / 2, TRIANGLE.top.y + (2 * PEG_ROW_OFFSET), getRandomColor());
    var circleThree = new Circle(TRIANGLE.top.x + PEG_COLUMN_OFFSET / 2, TRIANGLE.top.y + (2 * PEG_ROW_OFFSET), getRandomColor());
    // third row
    var circleFour = new Circle(TRIANGLE.top.x - PEG_COLUMN_OFFSET, TRIANGLE.top.y + (3 * PEG_ROW_OFFSET), getRandomColor());
    var circleFive = new Circle(TRIANGLE.top.x, TRIANGLE.top.y + (3 * PEG_ROW_OFFSET), getRandomColor());
    var circleSix = new Circle(TRIANGLE.top.x + PEG_COLUMN_OFFSET, TRIANGLE.top.y + (3 * PEG_ROW_OFFSET), getRandomColor());
    // fourth row
    var circleSeven = new Circle(TRIANGLE.top.x - (1.5 * PEG_COLUMN_OFFSET), TRIANGLE.top.y + (4 * PEG_ROW_OFFSET), getRandomColor());
    var circleEight = new Circle(TRIANGLE.top.x - (0.5 * PEG_COLUMN_OFFSET), TRIANGLE.top.y + (4 * PEG_ROW_OFFSET), getRandomColor());
    var circleNine = new Circle(TRIANGLE.top.x + (0.5 * PEG_COLUMN_OFFSET), TRIANGLE.top.y + (4 * PEG_ROW_OFFSET), getRandomColor());
    var circleTen = new Circle(TRIANGLE.top.x + (1.5 * PEG_COLUMN_OFFSET), TRIANGLE.top.y + (4 * PEG_ROW_OFFSET), getRandomColor());
    // fifth row
    var circleEleven = new Circle(TRIANGLE.top.x - (2 * PEG_COLUMN_OFFSET), TRIANGLE.top.y + (5 * PEG_ROW_OFFSET), getRandomColor());
    var circleTwelve = new Circle(TRIANGLE.top.x - (1 * PEG_COLUMN_OFFSET), TRIANGLE.top.y + (5 * PEG_ROW_OFFSET), getRandomColor());
    var circleThirteen = new Circle(TRIANGLE.top.x - (0 * PEG_COLUMN_OFFSET), TRIANGLE.top.y + (5 * PEG_ROW_OFFSET), getRandomColor());
    var circleFourteen = new Circle(TRIANGLE.top.x + (1 * PEG_COLUMN_OFFSET), TRIANGLE.top.y + (5 * PEG_ROW_OFFSET), getRandomColor());
    var circleFifteen = new Circle(TRIANGLE.top.x + (2 * PEG_COLUMN_OFFSET), TRIANGLE.top.y + (5 * PEG_ROW_OFFSET), getRandomColor());

    // We want to store all of these circles in an array
    PEG_COLLECTION.push(circleOne);
    PEG_COLLECTION.push(circleTwo);
    PEG_COLLECTION.push(circleThree);
    PEG_COLLECTION.push(circleFour);
    PEG_COLLECTION.push(circleFive);
    PEG_COLLECTION.push(circleSix);
    PEG_COLLECTION.push(circleSeven);
    PEG_COLLECTION.push(circleEight);
    PEG_COLLECTION.push(circleNine);
    PEG_COLLECTION.push(circleTen);
    PEG_COLLECTION.push(circleEleven);
    PEG_COLLECTION.push(circleTwelve);
    PEG_COLLECTION.push(circleThirteen);
    PEG_COLLECTION.push(circleFourteen);
    PEG_COLLECTION.push(circleFifteen);
}

function createHoleCollection() {
    for (var i = 0; i < PEG_COLLECTION.length; i++) {
        var hole = new Circle(PEG_COLLECTION[i].x, PEG_COLLECTION[i].y, "White", PEG_COLLECTION[i].hasPeg);
        HOLE_COLLECTION.push(hole);
    }
}