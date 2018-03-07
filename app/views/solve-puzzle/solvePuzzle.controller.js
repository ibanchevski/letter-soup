function SolvePuzzleCtrl($scope, $stateParams, puzzleService, Notification) {
	var vm = this;
	var puzzleCode = $stateParams.puzzleCode;
	
	vm.puzzleCode = puzzleCode;
	vm.selectedWord = '';
	
	vm.numberOfWords = 0;
	vm.correctWords = 0;
	vm.teacher = {
		name: "Пенка Димитрова",
		school: "Пенчо Славейков 63"
	}
	vm.puzzle;

	puzzleService
		.generatePuzzle(puzzleCode)
		.then(function(puzzle) {
			console.log(puzzle);
			vm.puzzle = puzzle.puzzle;
			vm.numberOfWords = puzzle.correctWords.length;
		}, function(error) {
			Notification.error(error);
		});

	$scope.$watch(function() {
		return vm.selectedWord;
	}, function(newWord, oldWord) {
		if (newWord) {
			// TODO: Validate selected word
		}
	});
}
SolvePuzzleCtrl.$inject = ['$scope', '$stateParams', 'puzzleService', 'Notification'];
angular.module('letterSoup').controller('SolvePuzzleCtrl', SolvePuzzleCtrl);