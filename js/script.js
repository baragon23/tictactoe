var ticTacToeApp = angular.module("ticTacToeApp", []);

ticTacToeApp.controller("BoardController", function($scope) {
	var exTurn = true;
	var ohTurn = false;
	var moves = 0;
	var score = {
		"ex": 0,
		"oh": 0 
	};

	/*
     *     273                 84
     *        \               /
     *          1 |   2 |   4  = 7
     *       -----+-----+-----
     *          8 |  16 |  32  = 56
     *       -----+-----+-----
     *         64 | 128 | 256  = 448
     *       =================
     *         73   146   292
     *
     */

	var wins = [7, 56, 448, 73, 146, 292, 273, 84];

	$scope.boxes = [
		{ ex: false, oh: false, value: 1 },
		{ ex: false, oh: false, value: 2 },
		{ ex: false, oh: false, value: 4 },
		{ ex: false, oh: false, value: 8 },
		{ ex: false, oh: false, value: 16 },
		{ ex: false, oh: false, value: 32 },
		{ ex: false, oh: false, value: 64 },
		{ ex: false, oh: false, value: 128 },
		{ ex: false, oh: false, value: 256 }
	];

	$scope.changeBackground = function(box, index) {
		//console.log(box.ex);

		//X's turn to play
		if (exTurn == true) {
			box.ex = true;
			exTurn = false;
			ohTurn = true;

			score.ex += $scope.boxes[index].value;
			//console.log($scope.boxes[index].value);

			//check if win for X
			if (isWin(score.ex)) {
				alert("X wins");
			}
		}
		//O's turn to play
		else if (exTurn == false) {
			box.oh = true;
			ohTurn = false;
			exTurn = true;
			score.oh += $scope.boxes[index].value;

			//check if win for O
			if (isWin(score.oh)) {
				alert("O wins");
			}
		}
	};

	//checks if the score being passed is a winning 
	//score and returns true or false
	var isWin = function(score) {
		for (var i = 0; i < wins.length; i++) {
			if (wins[i] == score) {
				return true;
			}
		}
		return false;
	}
});