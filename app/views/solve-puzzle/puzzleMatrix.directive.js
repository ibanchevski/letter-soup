function Puzzle($compile) {
	return {
		restrict: 'E',
		scope: {
			puzzleMatrix: '=matrix'
		},
		replace: true,
		templateUrl: '/views/solve-puzzle/puzzleMatrix.html',
		link: function(scope, elem, attr) {
			var puzzleHolder = angular.element(document.querySelector('#puzzle-holder'))[0];
			console.log(puzzleHolder);
			console.log(scope.puzzleMatrix);
			for (var i = 0; i < scope.puzzleMatrix.length; i++) {
				// Each row
				for (var j = 0; j < scope.puzzleMatrix[i].length; j++) {
					// Each element of the row
					var letter = scope.puzzleMatrix[i][j];
					var letterBox = angular.element(`<span id="letter-${i}-${j}" style="border: 1px solid; margin: 30px; padding: 4px">${letter}</span>`);
					puzzleHolder.append(letterBox[0]);
					if (j === scope.puzzleMatrix[i].length - 1) {
						// End of the row
						puzzleHolder.append(angular.element('<br>')[0]);
					}
					// Bind click event
					letterBox.bind('click', selectLetter);
				}
			}

			function selectLetter(event) {
				// Get the id of the clicked letter
				console.log(event.target.id);
			}
		}
	}
}
Puzzle.$inject = ['$compile'];
angular.module('letterSoup').directive('puzzle', Puzzle);