function SolvePuzzleCtrl($scope, $stateParams, puzzleService, Notification) {
	var vm = this;
	var puzzleCode = $stateParams.puzzleCode;
	var correctWords = [];

	vm.puzzleCode = puzzleCode;
	vm.selectedWord = '';
	vm.numberOfWords = 0;
	vm.correctWords = 0;
	vm.puzzle;

	puzzleService
		.generatePuzzle(puzzleCode)
		.then(function(puzzle) {
			for (var i = 0; i < puzzle.puzzle.length; i++) {
				for (var j = 0; j < puzzle.puzzle[i].length; j++) {
					var letter = puzzle.puzzle[i][j];
					puzzle.puzzle[i][j] = { letter: letter, incorrect: undefined};
				}
			}
			vm.puzzle = puzzle.puzzle;
			correctWords = puzzle.correctWords;
			vm.numberOfWords = puzzle.correctWords.length;
			console.log(correctWords);
		}, function(error) {
			Notification.error(error);
		});

	$scope.$watch(function() {
		return vm.selectedWord;
	}, function(newWord, oldWord) {
		if (newWord) {
			// TODO: Validate selected word\
			alert(newWord);
			vm.isWordCorrect = false;
		}
	});
	var selectedWord = [];
	var selectedInd = [];
	var dragging = false;
	vm.onWordClick = function(word, index, pindex) {
		selectedWord.length = 0;
		selectedWord.push(word);
		selectedInd.push({ row: pindex, col: index })
		dragging = true;
	}
	vm.onWordEnter = function(word, index, pindex) {
		if (dragging) {
			selectedWord.push(word);
			selectedInd.push({ row: pindex, col: index });
		}
	}
	vm.onWordUp = function(word, index, pindex) {
		dragging = false;
		var correct = false;
		var word = selectedWord.join('');
		console.log(selectedWord.join(''));
		for (var i = 0; i < correctWords.length; i++) {
			if (correctWords[i] === word) {
				correct = true;
				break;
			}
		}
		// Set word status
		for (var i = 0; i < selectedInd.length; i++) {
			var col = selectedInd[i].col;
			var row = selectedInd[i].row;
			vm.puzzle[row][col].incorrect = !correct;
		}
		if (correct === true) {
			vm.correctWords++;
		}
		selectedInd.length = 0;
	}
}
SolvePuzzleCtrl.$inject = ['$scope', '$stateParams', 'puzzleService', 'Notification'];
angular.module('letterSoup').controller('SolvePuzzleCtrl', SolvePuzzleCtrl);