var ticTacToeApp = angular.module("ticTacToeApp", ["firebase"]);

ticTacToeApp.controller("BoardController", function($scope, $firebase) {
	var fireReference = new Firebase("https://epictictactoe.firebaseio.com");
	
	var exTurn = true;
	var ohTurn = false;
	var moves = 0;
	var score = {
		"ex": 0,
		"oh": 0 
	};

	$scope.remoteCellList = $firebase(new Firebase("https://epictictactoe.firebaseio.com" + "/remoteCellList"));
	$scope.remoteExTurn = $firebase(new Firebase("https://epictictactoe.firebaseio.com" + "/remoteExTurn"));
	$scope.remoteOhTurn = $firebase(new Firebase("https://epictictactoe.firebaseio.com" + "/remoteOhTurn"));
	$scope.remoteMoves = $firebase(new Firebase("https://epictictactoe.firebaseio.com" + "/remoteMoves"));
	$scope.remoteScore = $firebase(new Firebase("https://epictictactoe.firebaseio.com" + "/remoteScore"));


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



	$scope.playGame = function(box, index) {
		//console.log(box.ex);

		if (moves == 9) {
			//don't do anything, it's game over
		}
		//X's turn to play
		else if (exTurn == true) {
			box.ex = true;
			exTurn = false;
			ohTurn = true;
			moves++;

			score.ex += $scope.boxes[index].value;

			//check if win for X
			if (isWin(score.ex)) {
				//every box gets X
				winsFill(true, false);
			}
		}
		//O's turn to play
		else {
			box.oh = true;
			ohTurn = false;
			exTurn = true;
			moves++;

			score.oh += $scope.boxes[index].value;

			//check if win for O
			if (isWin(score.oh)) {
				//every box gets O
				winsFill(false, true);
			}
		}
	};

	//called when a winner is determined and fills the
	//board with all X or all O
	var winsFill = function(exBool, ohBool) {
		for (var i = 0; i < $scope.boxes.length; i++) {
			$scope.boxes[i].ex = exBool;
			$scope.boxes[i].oh = ohBool;
		}
		moves = 9; //stops game from being played
	};

	//reset the board so we can play again
	$scope.resetBoard = function() {
		exTurn = true;
		ohTurn = false;
		moves = 0;
		score = {
			"ex": 0,
			"oh": 0 
		};
		//loop through boxes array and reset the styles
		for (var i = 0; i < $scope.boxes.length; i++) {
			$scope.boxes[i].ex = false;
			$scope.boxes[i].oh = false;
		}
	};

	//checks if the score being passed is a winning 
	//score and returns true or false
	var isWin = function(score) {
		for (var i = 0; i < wins.length; i++) {
			//bitwise operator returns what matches in the binary 'slots' for each number
			if ((wins[i] & score) === wins[i]) {
				console.log("Weird: " + (wins[i] & score) + " Win array: " + wins[i] + " score: " + score);
				return true;
			}
		}
		return false;
	}

	$scope.remoteCellList.$bind($scope, "boxes");
	$scope.remoteExTurn.$bind($scope, "exTurn");
	$scope.remoteOhTurn.$bind($scope, "ohTurn");
	$scope.remoteMoves.$bind($scope, "moves");
	$scope.remoteScore.$bind($scope, "score");

	$scope.$watch('boxes', function() {});
	$scope.$watch('exTurn', function() {});
	$scope.$watch('ohTurn', function() {});
	$scope.$watch('moves', function() {});
	$scope.$watch('score', function() {});

	//$scope.clickCounter.$set({clickCounter: $scope.clickCount});
});




