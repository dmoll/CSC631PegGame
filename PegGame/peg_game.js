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

    // First, define all the circles we want to draw
    var circleOne = { x: triangleTop.x, y: triangleTop.y + pegRowOffset }
    // second row
    var circleTwo = { x: triangleTop.x - pegColumnOffset / 2, y: triangleTop.y + (2 * pegRowOffset) };
    var circleThree = { x: triangleTop.x + pegColumnOffset / 2, y: triangleTop.y + (2 * pegRowOffset) };
    // third row
    var circleFour = { x: triangleTop.x - pegColumnOffset, y: triangleTop.y + (3 * pegRowOffset) }
    var circleFive = { x: triangleTop.x, y: triangleTop.y + (3 * pegRowOffset) }
    var circleSix = { x: triangleTop.x + pegColumnOffset, y: triangleTop.y + (3 * pegRowOffset) }
    // fourth row
    var circleSeven = { x: triangleTop.x - (1.5 * pegColumnOffset), y: triangleTop.y + (4 * pegRowOffset) }
    var circleEight = { x: triangleTop.x - (0.5 * pegColumnOffset), y: triangleTop.y + (4 * pegRowOffset) }
    var circleNine = { x: triangleTop.x + (0.5 * pegColumnOffset), y: triangleTop.y + (4 * pegRowOffset) }
    var circleTen = { x: triangleTop.x + (1.5 * pegColumnOffset), y: triangleTop.y + (4 * pegRowOffset) }
    // fifth row
    var circleEleven = { x: triangleTop.x - (2 * pegColumnOffset), y: triangleTop.y + (5 * pegRowOffset) }
    var circleTwelve = { x: triangleTop.x - (1 * pegColumnOffset), y: triangleTop.y + (5 * pegRowOffset) }
    var circleThirteen = { x: triangleTop.x - (0 * pegColumnOffset), y: triangleTop.y + (5 * pegRowOffset) }
    var circleFourteen = { x: triangleTop.x + (1 * pegColumnOffset), y: triangleTop.y + (5 * pegRowOffset) }
    var circleFifteen = { x: triangleTop.x + (2 * pegColumnOffset), y: triangleTop.y + (5 * pegRowOffset) }

    // We want to store all of these circles in an array
    circleCoords.push(circleOne);
    circleCoords.push(circleTwo);
    circleCoords.push(circleThree);
    circleCoords.push(circleFour);
    circleCoords.push(circleFive);
    circleCoords.push(circleSix);
    circleCoords.push(circleSeven);
    circleCoords.push(circleEight);
    circleCoords.push(circleNine);
    circleCoords.push(circleTen);
    circleCoords.push(circleEleven);
    circleCoords.push(circleTwelve);
    circleCoords.push(circleThirteen);
    circleCoords.push(circleFourteen);
    circleCoords.push(circleFifteen);


    // Draw the circles for the board
    // Since we have an array, we can loop over the array to draw the circles
    for (var i = 0; i < circleCoords.length; i++) {
        ctx.beginPath();
        ctx.arc(circleCoords[i].x, circleCoords[i].y, pegRadius, 0, 2 * Math.PI, false);
        ctx.stroke();
    }
    
}