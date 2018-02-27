function Puzzle($compile) {
	return {
		restrict: 'E',
		scope: {
			puzzleMatrix: '=matrix',
			saveWordIn: '=wordModel'
		},
		replace: true,
		templateUrl: '/views/solve-puzzle/puzzleMatrix.html',
		link: function(scope, elem, attr) {
			var puzzleHolder = angular.element(document.querySelector('#puzzle-holder'))[0];
			var selectedLetters = [];
			var mouseDown = 0;
			var selectedWord;
			
			document.onmousedown = function() {
				mouseDown++;
			}

			document.onmouseup = function() {
				mouseDown--;

				if (selectedLetters.length < 1) {
					return;
				}
				// Convert the letters array into a word,
				// add it to the given model and empty the array
				scope.saveWordIn = selectedLetters.join('');
				scope.$apply();
				selectedLetters.length = 0;
			}

			for (var i = 0; i < scope.puzzleMatrix.length; i++) {
				// Each row
				for (var j = 0; j < scope.puzzleMatrix[i].length; j++) {
					// Each element of the row
					var letter = scope.puzzleMatrix[i][j];
					var letterBox = angular.element(`<span id="letter-${i}-${j}">${letter}</span>`);
					puzzleHolder.append(letterBox[0]);
					if (j === scope.puzzleMatrix[i].length - 1) {
						// End of the row
						puzzleHolder.append(angular.element('<br>')[0]);
					}

					letterBox.bind('mouseleave', function(event) {
						if (mouseDown === 1) {
							selectLetter(event);
						}
					});
					
					letterBox.bind('mouseup', selectLetter);
				}
			}

			function selectLetter(event) {
				// Deselect letter (if selected)
				if (event.target.visited === true) {
					event.target.visited = false;
					event.target.className = '';

					// Remove the letter from the letters array
					selectedLetters.splice(selectedLetters.lastIndexOf(event.target.innerHTML), 1);
					return;
				}

				// Make the letter visually selected and push it 
				// to the array from where a word would be composed
				event.target.className = 'selectedLetter';
				event.target.visited = true;
				selectedLetters.push(event.target.innerHTML);
			}
		}
	}
}
Puzzle.$inject = ['$compile'];
angular.module('letterSoup').directive('puzzle', Puzzle);