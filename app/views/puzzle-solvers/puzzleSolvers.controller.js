function PuzzleSolversCtrl(puzzleSolversService, $stateParams) {
    var vm = this;
    var puzzleId = $stateParams.puzzleId;
    
    vm.error = '';
    vm.solvers;

    puzzleSolversService
        .getSolvers(puzzleId)
        .then(function(solvers) {
            vm.solvers = solvers;
        }, function(error) {
            vm.error = error;
        });
}
PuzzleSolversCtrl.$inject = ['puzzleSolversService', '$stateParams'];
angular.module('letterSoup').controller('PuzzleSolversCtrl', PuzzleSolversCtrl);