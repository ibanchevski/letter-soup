function SolvePuzzleCtrl($scope, $stateParams, puzzleService, Notification, $cookies, $state) {
	var vm = this;
	var puzzleCode = $stateParams.puzzleCode;
	var student = $cookies.get('_u');
	var correctWords = [];
	var selectedWord = [];
	var selectedLetters = [];
	var dragging = false;

	vm.puzzleCode = puzzleCode;
	vm.selectedWord = '';
	vm.numberOfWords = 0;
	vm.correctWords = 0;
	vm.puzzle;

	if (student === undefined) {
		Notification.error('Моля, въведете кода на пъзела отново!');
		$state.go('login');
		return;
	}

	puzzleService
		.generatePuzzle(puzzleCode)
		.then(function (puzzle) {
			for (var i = 0; i < puzzle.puzzle.length; i++) {
				for (var j = 0; j < puzzle.puzzle[i].length; j++) {
					var letter = puzzle.puzzle[i][j];
					puzzle.puzzle[i][j] = {
						letter: letter,
						row: i,
						col: j,
						selected: false,
						correct: false
					};
				}
			}
			vm.puzzle = puzzle.puzzle;
			correctWords = puzzle.correctWords;
			vm.numberOfWords = puzzle.correctWords.length;
		}, function (error) {
			Notification.error(error);
		});
	
	vm.onWordClick = function (letter) {
		letter.selected = true;
		dragging = true;
		selectedLetters.length = 0;
		selectedLetters.push(letter);
	};

	vm.onWordEnter = function (letter) {
		if (dragging) {
			letter.selected = true;
			selectedLetters.push(letter);
		}
	};

	vm.onWordUp = function (letter) {
		var word = '';
		var correctWord;
		letter.selected = false;
		dragging = false;

		selectedLetters.map(function (letter) {
			word += letter.letter;
		});

		for (var i = 0; i < correctWords.length; i++) {
			if (word === correctWords[i]) {
				correctWord = true;
				break;
			}
		}

		if (correctWord === true) {
			vm.correctWords++;
			selectedLetters.map(function (letter) {
				letter.correct = true;
			});
		} else {
			selectedLetters.map(function (letter) {
				letter.selected = false;
			});
		}
	};

	vm.submitPuzzle = function() {
		
	};
}
SolvePuzzleCtrl.$inject = ['$scope', '$stateParams', 'puzzleService', 'Notification', '$cookies', '$state'];
angular.module('letterSoup').controller('SolvePuzzleCtrl', SolvePuzzleCtrl);