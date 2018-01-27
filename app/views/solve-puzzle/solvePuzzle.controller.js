function SolvePuzzleCtrl() {
	var vm = this;
	vm.numberOfWords = 10;
	vm.puzzle = [
		['d', 'a', 'j'],
		['z', 's', 'j'],
		['d', 'a', 'x']
	];
}
SolvePuzzleCtrl.$inject = [];
angular.module('letterSoup').controller('SolvePuzzleCtrl', SolvePuzzleCtrl);