function PuzzleSolversCtrl(puzzleSolversService, $stateParams) {
    var vm = this;
    var puzzleId = $stateParams.puzzleId;
    
    vm.error = '';
    vm.solvers;

    puzzleSolversService
        .getSolvers(puzzleId)
        .then(function(response) {
            vm.solvers = response.solvers;
            vm.puzzleTitle = response.puzzle.title;
            vm.allWords = response.puzzle.words.length;
        }, function(error) {
            vm.error = error;
        });
}
PuzzleSolversCtrl.$inject = ['puzzleSolversService', '$stateParams'];
angular.module('letterSoup').controller('PuzzleSolversCtrl', PuzzleSolversCtrl);