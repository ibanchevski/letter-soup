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
			var selectedLetters = [];
			var mouseDown = 0;
			document.onmousedown = function() {
				mouseDown++;
			}

			document.onmouseup = function() {
				mouseDown--;
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
					// Bind click event
					letterBox.bind('click', selectLetter);
					letterBox.bind('mouseleave', function(event) {
						if (mouseDown === 1) {
							if (event.target.visited === true) {
								event.target.visited = false;
								return event.target.style = '';
							}
							event.target.style = 'background-color: red';
							event.target.visited = true;
							selectedLetters.push(event.target.innerHTML);
						}
					});
					letterBox.bind('mouseup', function(event) {
						if (event.target.visited === true) {
							event.target.visited = false;
							return event.target.style = '';
						}
						event.target.style = 'background-color: red';
						event.target.visited = true;
						selectedLetters.push(event.target.innerHTML);
						console.log(selectedLetters);
						console.log(selectedLetters.join(''));
					});
				}
			}

			function selectLetter(event) {
				// Get the id of the clicked letter
				// console.log(event.target.id);
				var selectedLeterId = event.target.id;
				selectedLetters.push(selectedLeterId);
			}
		}
	}
}
Puzzle.$inject = ['$compile'];
angular.module('letterSoup').directive('puzzle', Puzzle);