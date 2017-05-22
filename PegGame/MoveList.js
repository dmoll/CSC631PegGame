/**
 * Author: David Moll - dmoll@emich.edu
 * COSC 631 Assignment #3
 * 
 * This file contains a list of all possible moves for the "Peg Game", as
 * descibed here:  http://shop.crackerbarrel.com/toys-games/games/travel-games/peg-game/606154
 * 
 * And the assignment is given here: http://www.emunix.emich.edu/~evett/E-Commerce/Assgn_pegGame.htm
 * 
 * This move list is adapted from a paper by Cynthia J. Martincic at St. Vincent College.  
 * The paper was accessed here:  http://proc.iscap.info/2015/cases/3636.pdf
 * 
 * Move List:
 * 
 * Board Layout:
 *         1
 *      2    3
 *    4   5    6
 *   7   8   9   10
 * 11   12  13  14  15
 * 
 * Position     Possible Moves
 *  1           4 (over 2), 6 (over 3)
 *  2           7 (over 4), 9 (over 5)
 *  3           8 (over 5), 10 (over 6)
 *  4           1 (over 2), 6 (over 5), 11 (over 7), 13 (over 8)
 *  5           12 (over 8), 14 (over 9)
 *  6           1 (over 3), 4 (over 5), 13 (over 9), 15 (over 10)
 *  7           2 (over 4), 9 (over 8)
 *  8           3 (over 5), 10 (over 9)
 *  9           7 (over 8), 2 (over 5)
 *  10          3 (over 6), 8 (over 9)
 *  11          4 (over 7), 13 (over 12)
 *  12          5 (over 8), 14 (over 13)
 *  13          4 (over 8), 11 (over 12), 6 (over 9), 15 (over 14) 
 *  14          12 (over 13), 5 (over 9)
 *  15          13 (over 14), 6 (over 10)
 * 
 * And since javascript makes it easy to create arrays,
 * we can stick this move list in a global array.
 * 
 * The refinement of the move list array was also suggested by the work done by Cory Gross here:
 * http://coryg89.github.io/technical/2013/06/06/recreating-the-peg-game-at-cracker-barrel-in-html5/
 * 
 * Although I'm not a fan of inlining the "object" that he used creation, so I created a "class" to hold the 
 * move information.
 */

var MOVE_LIST = [];

// each element of this array is going to be an array, 
// because there are no rules in javascript!
MOVE_LIST[0] = [new ValidPegMove(4, 2), new ValidPegMove(6, 3)];
MOVE_LIST[1] = [new ValidPegMove(7, 4), new ValidPegMove(9, 5)];
MOVE_LIST[2] = [new ValidPegMove(8, 5), new ValidPegMove(10, 6)];
MOVE_LIST[3] = [new ValidPegMove(1, 2), new ValidPegMove(6, 5),
                new ValidPegMove(11, 7), new ValidPegMove(13, 8)];
MOVE_LIST[4] = [new ValidPegMove(12, 8), new ValidPegMove(14, 9)];
MOVE_LIST[5] = [new ValidPegMove(1, 3), new ValidPegMove(4, 5),
                new ValidPegMove(13, 9), new ValidPegMove(15, 10)];
MOVE_LIST[6] = [new ValidPegMove(2, 4), new ValidPegMove(9, 8)];
MOVE_LIST[7] = [new ValidPegMove(3, 5), new ValidPegMove(10, 9)];
MOVE_LIST[8] = [new ValidPegMove(7, 8), new ValidPegMove(2, 5)];
MOVE_LIST[9] = [new ValidPegMove(3, 6), new ValidPegMove(8, 9)];
MOVE_LIST[10] = [new ValidPegMove(4, 7), new ValidPegMove(13, 12)];
MOVE_LIST[11] = [new ValidPegMove(5, 8), new ValidPegMove(14, 13)];
MOVE_LIST[12] = [new ValidPegMove(4, 8), new ValidPegMove(11, 12),
                new ValidPegMove(6, 9), new ValidPegMove(15, 14)];
MOVE_LIST[13] = [new ValidPegMove(12, 13), new ValidPegMove(5, 9)];
MOVE_LIST[14] = [new ValidPegMove(13, 14), new ValidPegMove(6, 10)];

/**
 * Class to hold valid moves.  This class will fill the MOVE_LIST array.
 * @param {Hole that a peg is going to jump to.} targetHole 
 * @param {Peg that is being jumped over} overPeg 
 * @returns {An instantiated ValidPegMove object} 
 */
function ValidPegMove(targetHole, overPeg) {
    this.targetHole = targetHole;
    this.overPeg = overPeg;
}