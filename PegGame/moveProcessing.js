/**
 * moveProcessing.js - contains most of the event handling
 * code (and supporting functions) to deal with the actual gameplay.
 * 
 * basic drag and drop routines on the canvas adapted from:
 * http://html5.litten.com/how-to-drag-and-drop-on-an-html5-canvas/
 * 
 * Author: David Moll - dmoll@emich.edu
 * COSC 631 Assignment #3
 */

/**
 * Main event handler for the Peg game.
 * Determines if a circle was clicked and what to do next.
 * @param {Click event} evt  
 */
function canvasClicked(evt) {
    // if there are no moves left, don't do anything
    if (!window.ANY_MOVES_REMAINING) {
        return;
    }

    var canvas = document.getElementById("myCanvas");    
    var circleClicked = findCircleClicked(canvas, evt, PEG_COLLECTION);

    //printCircleInfo();

    //console.log("The circle clicked is: " + circleClicked);
   
    if (circleClicked > 0) {

        // If the user hasn't selected a peg yet, we need to note that
        // they have selected a peg and find the list of valid moves
        if (window.PEG_SELECTED === 0) {
            // record that this peg was selected
            window.PEG_SELECTED = circleClicked;

            // draw a bright green ring around the selected circle
            //highlightClickedCircle(canvas, PEG_COLLECTION[circleClicked - 1]);            
            window.MOVING = true;
            canvas.onmousemove = moveCircle;

            console.log("Circle picked up was " + circleClicked);
        }
    }
}

/**
 * Process the mousemove event by moving the circle
 * for the peg around the screen.
 * @param {mouse move event} event 
 */
function moveCircle(event) {
    var canvas = document.getElementById("myCanvas");
    var circlePosition = getCursorPosition(canvas, event);

    var ctx = canvas.getContext("2d");
    PEG_COLLECTION[window.PEG_SELECTED - 1].x = circlePosition.x;
    PEG_COLLECTION[window.PEG_SELECTED - 1].y = circlePosition.y;
    clear();
    redrawBoard(canvas, ctx);

    //redraw the circle we're moving so it's on top
    // and make it partially transparent so we can see the numbers of the holes
    var globalTransparencyValue = ctx.globalAlpha;
    ctx.globalAlpha = 0.5;
    drawCircle(ctx, PEG_COLLECTION[window.PEG_SELECTED - 1], true);
    ctx.globalAlpha = globalTransparencyValue;
}

/**
 * mousedown event handler, processes the player's move
 * @param {mouse down event} evt 
 */
function dropCircle(evt) {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    window.MOVING = false;
    canvas.onmousemove = null;

    // The user previously chose a peg, so check to see if
    // they have selected a valid move
    var circleSelected = findCircleClicked(canvas, evt, HOLE_COLLECTION);

    console.log("Circle dropped on hole: " + circleSelected);

    var goodMove = checkIfMoveIsValid(circleSelected, window.PEG_SELECTED);
    if (goodMove) {
        // valid move messages are for debugging only
        //var successMessage = "Moving from " + window.PEG_SELECTED + " to " + circleClicked + " is a valid move!";
        //document.getElementById("moveInfo").textContent = successMessage;

        // clear the invalid move message if this was a good move
        document.getElementById("moveInfo").textContent = "";

        console.log("Moving peg " + window.PEG_SELECTED + " to hole " + circleSelected);
        performMove(circleSelected, window.PEG_SELECTED);

    } else {
        resetMove(window.PEG_SELECTED);
        // we don't want to print an error message if the user drops the circle between pegs
        if (circleSelected > 0  && circleSelected !== window.PEG_SELECTED) {
            var errorMessage = "Moving from " + window.PEG_SELECTED + " to " + circleSelected + " is not a valid move!";
            document.getElementById("moveInfo").textContent = errorMessage;            
        }
    }

    // Even if they didn't select a good move, reset the board state
    // to nothing selected

    // clear the ring from the selected peg
    //clearClickedCircle(canvas, PEG_COLLECTION[window.PEG_SELECTED - 1]);

    // reset the selected peg
    window.PEG_SELECTED = 0;

    // redraw the board
    redrawBoard(canvas, ctx);

    window.ANY_MOVES_REMAINING = areThereMovesRemaining();

    // if there are no moves left, display the game ending message
    if (!window.ANY_MOVES_REMAINING) {
        displayGameOverMessage();
    }
}

/**
 * If the game has ended, check how many pegs are left and display an appropriate message. 
 */
function displayGameOverMessage() {
    var gameOverMessage;

    switch (window.PEGS_REMAINING) {
        case 1:
            gameOverMessage = "Victory!";
            break;
        case 2:
            gameOverMessage = "So close!  Try again!";
            break;
        case 3:
            gameOverMessage = "You are improving!  Try again!";
            break;
        default:
            gameOverMessage = "Better luck next time";
            break;        
    }

    document.getElementById("gameOverDisplay").textContent = gameOverMessage;
}

/**
 * Determine if the user has any possible moves remaining.
 * 
 * This function essentially determines if the game has ended.
 * 
 * @returns {true if there are possible moves left on the board, false otherwise.} 
 */
function areThereMovesRemaining() {
    
    for (var i = 0; i < PEG_COLLECTION.length; i++) {

        // the circle number is the index plus 1
        var circleNum = i + 1;

        // for each circle, check if it has a peg
        if (PEG_COLLECTION[i].hasPeg) {
            // if it has a peg, check if that peg can move
            var validMovesForCurrentPeg = MOVE_LIST[i];

            // iterate over the possible moves for that peg and check if each is valid
            for (var j = 0; j < validMovesForCurrentPeg.length; j++) {
                if (checkIfMoveIsValid(validMovesForCurrentPeg[j].targetHole, circleNum)) {
                    return true;
                }
            }
        }
    }

    // if we get here there are no valid moves left
    return false;
}

/**
 * Move the peg to an open hole on the board.
 * @param {Number of the open hole to move to.} destinationCircle 
 * @param {Number of the peg to be moved.} startCircle  
 */
function performMove(destinationCircle, startCircle){
    
    // TODO: there's some repeated code here and in checkIfMoveIsValid
    // can this be abstracted out?
    var validMoveList = MOVE_LIST[startCircle - 1];

    for (var i = 0; i < validMoveList.length; i++) {
        var pegMove = validMoveList[i];

        // find the right destination
        if (pegMove.targetHole === destinationCircle) {
            // get our source circle
            var currentPeg = PEG_COLLECTION[startCircle - 1];

            // so we can remove the peg from the hole we're jumping over
            var jumpedCircle = PEG_COLLECTION[pegMove.overPeg - 1];
            jumpedCircle.hasPeg = false;
            jumpedCircle.color = "White";

            // and move the peg to the hole we're jumping to
            var destination = PEG_COLLECTION[destinationCircle - 1];
            destination.hasPeg = true;
            destination.color = currentPeg.color;

            // now empty out the currentPeg
            currentPeg.hasPeg = false;
            currentPeg.color = "White";
            window.PEGS_REMAINING--;

            // and set the peg's coordinates to the hole we moved to
            destination.x = HOLE_COLLECTION[destinationCircle - 1].x;
            destination.y = HOLE_COLLECTION[destinationCircle - 1].y;

            // and reset the peg we were "moving" to be back in it's hole
            var startingHole = HOLE_COLLECTION[startCircle - 1];
            currentPeg.x = startingHole.x;
            currentPeg.y = startingHole.y;
        }
    }

}

/**
 * If the user didn't make a valid move, place
 * the peg back in the hole it started in.
 * @param {Peg the user was trying to move} peg 
 */
function resetMove(peg) {
    var chosenPeg = PEG_COLLECTION[peg - 1];
    var initialHole = HOLE_COLLECTION[peg - 1];

    chosenPeg.x = initialHole.x;
    chosenPeg.y = initialHole.y;
}

/**
 * Uses the state of the board (stored in the global variable PEG_COLLECTION)
 * to determine if the current move is valid.
 * @param {Hole user is trying to move to} destinationCircle
 * @param {Peg user is trying to move} startCircle
 * @returns {true if the user can move the peg} 
 */
function checkIfMoveIsValid(destinationCircle, startCircle) {

    // if no circle was selected, do nothing
    if (destinationCircle < 0 || startCircle < 0) {
        return false;
    }

    // first check, if the destination is not empty the move is not valid
    if (PEG_COLLECTION[destinationCircle - 1].hasPeg)
        return false;    
    
    var validMoveList = MOVE_LIST[startCircle - 1];    

    for (var i = 0; i < validMoveList.length; i++) {
        var pegMove = validMoveList[i];

        // first check if this is a valid destination
        if (pegMove.targetHole === destinationCircle) {
            // now check if the hole we're jumping over has a peg
            if (PEG_COLLECTION[pegMove.overPeg - 1].hasPeg) {
                return true;                
            }
        }
    }

    return false;
}

/**
 * Generic method for getting the pixel in a canvas
 * for where the user clicked on the page.
 * Taken from: 
 * http://stackoverflow.com/questions/55677/how-do-i-get-the-coordinates-of-a-mouse-click-on-a-canvas-element/18053642#18053642
 * @param {HTML5 canvas object} canvas 
 * @param {onClick event from a canvas object} event 
 * @returns {relative x, y coordinates on the canvas where the user clicked.} 
 */

function getCursorPosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    //console.log("x: " + x + " y: " + y);

    return { x, y }
}

/**
 * 
 * @param {HTML5 canvas object} canvas 
 * @param {onClick event from a canvas object} event 
 * @param {Array of circle objects} circles
 * @returns {} 
 */
function findCircleClicked(canvas, event, circles) {
    // first, find where the user clicked
    var userClick = getCursorPosition(canvas, event);

    // Now use these coordinates to determine which circle the user clicked
    for (var i = 0; i < circles.length; i++) {
        if (pointInCircle(userClick.x, userClick.y, circles[i].x, circles[i].y, PEG_RADIUS)) {
            return i + 1;            
        }
    }

    return -1;
}

/**
 * Check if a given point is inside a given circle
 * @param {x coordinate of the point to check} x 
 * @param {y coordinate of the point to check} y 
 * @param {x coordinate of the circle's origin} cx 
 * @param {y coordinate of the circle's origin} cy 
 * @param {circle's radius} radius 
 * @returns {true if the point lies within the circle} 
 */
function pointInCircle(x, y, cx, cy, radius) {
    var distancesquared = (x - cx) * (x - cx) + (y - cy) * (y - cy);
    return distancesquared <= radius * radius;
}

/**
 * Print out some information for test purposes 
 */
function printCircleInfo() {
    var circleInfo = "";

    for (var i = 0; i < PEG_COLLECTION.length; i++) {
        var circlePos = i + 1;
        if (PEG_COLLECTION[i].hasPeg) {
            circleInfo = circleInfo + "Circle" + circlePos + " has a peg \r\n";
        } else {
            circleInfo = circleInfo + "Circle" + circlePos + " is empty \r\n";
        }
    }

    document.getElementById("circleOneInfo").setAttribute('style', 'white-space: pre;');
    document.getElementById("circleOneInfo").textContent = circleInfo;
    //    "Circle One coordinates are " +
    //PEG_COLLECTION[0].x +
    //", " +
    //PEG_COLLECTION[0].y;
}

/**
 * Calls overlayCircle with necessary parameters to add a highlight
 * to indicate that this is the circle the user clicked.
 *
 * @param {Canvas we're drawing on} canvas 
 * @param {Circle to add a green highlighted ring} selectedCircle 
 */
function highlightClickedCircle(canvas, selectedCircle) {

    overlayCircle(canvas, selectedCircle, "Lime", 3, false);

}

/**
 * Calls overlayCircle with necessary parameters to clear the 
 * highlighting that is drawn when the user selects a circle.
 *
 * @param {Canvas we're drawing on} canvas 
 * @param {Circle to remove highlighting from} selectedCircle 
 */
function clearClickedCircle(canvas, selectedCircle) {

    overlayCircle(canvas, selectedCircle, "White", 4, true);

}

/**
 * Draw a circle around one of the pegs.  Used to highlight a selected circle
 * Or to clear the highlighting by drawing over the entire circle.
 * @param {Canvas we're drawing on} canvas 
 * @param {Circle to draw around} selectedCircle 
 * @param {Color of the circle to draw} color 
 * @param {How thick the border circle should be} lineThickness 
 * @param {Whether or not to fill in the circle to erase the highlighting.} fillCircle  
 */
function overlayCircle(canvas, selectedCircle, color, lineThickness, fillCircle) {
    var context = canvas.getContext("2d");

    var oldLineWidth = context.lineWidth;

    // we want to draw the new circle just outside the old circle
    var highlightRadius = PEG_RADIUS + (lineThickness * oldLineWidth);
    context.lineWidth = 3 * oldLineWidth;
    // drawn the "selection" circle
    context.beginPath();
    context.arc(selectedCircle.x, selectedCircle.y, highlightRadius, 0, 2 * Math.PI, false);
    context.strokeStyle = color;

    if (fillCircle) {
        context.fillStyle = color;
        context.fill();
    }

    context.stroke();

    context.lineWidth = oldLineWidth;
}
