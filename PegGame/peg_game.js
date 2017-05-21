function drawBoard() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

// Create a an array to hold the coordinates of the centers 
// of all of the circles
    var circleCoords = [];

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
    var pegRadius = 15;
    var pegColumnOffset = 50;

// Draw the triangle for the board
    ctx.beginPath();
    ctx.moveTo(triangleTop.x, triangleTop.y);
    ctx.lineTo(triangleLeft.x, triangleLeft.y);
    ctx.lineTo(triangleRight.x, triangleRight.y);
    ctx.closePath();
    ctx.stroke();

// Draw the circles for the board
// first row
    var circleOne = { x: triangleTop.x, y: triangleTop.y + pegRowOffset }
    circleCoords.push(circleOne);
    ctx.beginPath();
    ctx.arc(circleOne.x, circleOne.y, pegRadius, 0, 2 * Math.PI, false);
    ctx.stroke();

// second row - two circles
    ctx.beginPath();
    ctx.arc(triangleTop
        .x -
        pegColumnOffset / 2,
        triangleTop.y + (2 * pegRowOffset),
        pegRadius,
        0,
        2 * Math.PI,
        false);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(triangleTop
        .x +
        pegColumnOffset / 2,
        triangleTop.y + (2 * pegRowOffset),
        pegRadius,
        0,
        2 * Math.PI,
        false);
    ctx.stroke();

// third row - three circles
    ctx.beginPath();
    ctx.arc(triangleTop.x - pegColumnOffset, triangleTop.y + (3 * pegRowOffset), pegRadius, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(triangleTop.x, triangleTop.y + (3 * pegRowOffset), pegRadius, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(triangleTop.x + pegColumnOffset, triangleTop.y + (3 * pegRowOffset), pegRadius, 0, 2 * Math.PI, false);
    ctx.stroke();

//third row - four circles
    ctx.beginPath();
    ctx.arc(triangleTop.x - (1.5 * pegColumnOffset),
        triangleTop.y + (4 * pegRowOffset),
        pegRadius,
        0,
        2 * Math.PI,
        false);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(triangleTop.x - (0.5 * pegColumnOffset),
        triangleTop.y + (4 * pegRowOffset),
        pegRadius,
        0,
        2 * Math.PI,
        false);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(triangleTop.x + (0.5 * pegColumnOffset),
        triangleTop.y + (4 * pegRowOffset),
        pegRadius,
        0,
        2 * Math.PI,
        false);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(triangleTop.x + (1.5 * pegColumnOffset),
        triangleTop.y + (4 * pegRowOffset),
        pegRadius,
        0,
        2 * Math.PI,
        false);
    ctx.stroke();

// fifth row - five circles
    ctx.beginPath();
    ctx.arc(triangleTop.x - (2 * pegColumnOffset),
        triangleTop.y + (5 * pegRowOffset),
        pegRadius,
        0,
        2 * Math.PI,
        false);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(triangleTop.x - pegColumnOffset, triangleTop.y + (5 * pegRowOffset), pegRadius, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(triangleTop.x, triangleTop.y + (5 * pegRowOffset), pegRadius, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(triangleTop.x + pegColumnOffset, triangleTop.y + (5 * pegRowOffset), pegRadius, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(triangleTop.x + (2 * pegColumnOffset),
        triangleTop.y + (5 * pegRowOffset),
        pegRadius,
        0,
        2 * Math.PI,
        false);
    ctx.stroke();
}