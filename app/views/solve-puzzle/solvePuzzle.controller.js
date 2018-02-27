function SolvePuzzleCtrl($scope) {
	var vm = this;
	vm.numberOfWords = 10;
	vm.puzzle = [
		['d', 'a', 'j'],
		['z', 's', 'j'],
		['d', 'a', 'x']
	];
	vm.selectedWord = '';

	$scope.$watch(function() {
		return vm.selectedWord;
	}, function(newWord, oldWord) {
		if (newWord) {
			// TODO: Validate selected word
		}
	});
}
SolvePuzzleCtrl.$inject = ['$scope'];
angular.module('letterSoup').controller('SolvePuzzleCtrl', SolvePuzzleCtrl);