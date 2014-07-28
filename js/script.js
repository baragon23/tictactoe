var ticTacToeApp = angular.module("ticTacToeApp", ["firebase"]);

ticTacToeApp.controller("BoardController", function($scope, $firebase) {
	var fireReference = new Firebase("https://epictictactoe.firebaseio.com");
	
	$scope.remoteCellList = $firebase(new Firebase("https://epictictactoe.firebaseio.com" + "/remoteCellList"));
	$scope.remoteExTurn = $firebase(new Firebase("https://epictictactoe.firebaseio.com" + "/remoteExTurn"));
	$scope.remoteOhTurn = $firebase(new Firebase("https://epictictactoe.firebaseio.com" + "/remoteOhTurn"));
	$scope.remoteMoves = $firebase(new Firebase("https://epictictactoe.firebaseio.com" + "/remoteMoves"));
	$scope.remoteScore = $firebase(new Firebase("https://epictictactoe.firebaseio.com" + "/remoteScore"));


	$scope.exTurn = true;
	$scope.ohTurn = false;
	$scope.gameMoves = 0;

	console.log($scope.gameMoves);
	$scope.score = {
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

	$scope.remoteCellList.$bind($scope, "boxes");
	$scope.remoteExTurn.$bind($scope, "exTurn");
	$scope.remoteOhTurn.$bind($scope, "ohTurn");
	$scope.remoteMoves.$bind($scope, "gameMoves");
	$scope.remoteScore.$bind($scope, "score");

	$scope.remoteMoves.$set({gameMoves: 0});
	$scope.remoteExTurn.$set({exTurn: 0});
	$scope.remoteOhTurn.$set({ohTurn: 0});
	//$scope.clickCounter.$set({clickCounter: $scope.clickCount}) ;

	$scope.$watch('boxes', function() {});

	$scope.playGame = function(box, index) {
		console.log(box.ex);

		if ($scope.gameMoves == 9) {
			// don't do anything, it's game over
		}
		// X's turn to play
		else if ($scope.exTurn == true) {
			box.ex = true;
			$scope.exTurn = false;
			$scope.ohTurn = true;
			$scope.gameMoves++;

			$scope.score.ex += $scope.boxes[index].value;

			//check if win for X
			if (isWin($scope.score.ex)) {
				//every box gets X
				winsFill(true, false);
			}
		}
		//O's turn to play
		else {
			box.oh = true;
			$scope.ohTurn = false;
			$scope.exTurn = true;
			$scope.gameMoves++;

			$scope.score.oh += $scope.boxes[index].value;
			//console.log($scope.score.oh);
			//var ohScore = $scope.score.oh;

			//check if win for O
			if (isWin($scope.score.oh)) {
				//every box gets O
				winsFill(false, true);
			}
		}
	};

	//called when a winner is determined and fills the
	//board with all X or all O
	var winsFill = function(exBool, ohBool) {
		
		for (var i = 0; i < 9; i++) {
			console.log("someone won");
			$scope.boxes[i].ex = exBool;
			$scope.boxes[i].oh = ohBool;
		}
		$scope.gameMoves = 9; //stops game from being played
	};

	//reset the board so we can play again
	$scope.resetBoard = function() {
		$scope.exTurn = true;
		$scope.ohTurn = false;
		$scope.gameMoves = 0;
		$scope.score = {
			"ex": 0,
			"oh": 0 
		};
		//loop through boxes array and reset the styles
		for (var i = 0; i < 9; i++) {
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
				//console.log("Weird: " + (wins[i] & $scope.score) + " Win array: " + wins[i] + " score: " + $scope.score);
				return true;
			}
		}
		return false;
	}

});



