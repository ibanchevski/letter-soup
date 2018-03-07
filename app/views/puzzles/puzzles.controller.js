function CreatedPuzzlesCtrl(puzzleService) {
    var vm = this;

    vm.error = '';
    vm.puzzles = [];

    puzzleService
        .getPuzzles()
        .then(function(puzzles) {
            vm.puzzles = puzzles;
        }, function(error) {
            vm.error = error;
        });
}
CreatedPuzzlesCtrl.$inject = ['puzzleService'];
angular.module('letterSoup').controller('CreatedPuzzlesCtrl', CreatedPuzzlesCtrl);