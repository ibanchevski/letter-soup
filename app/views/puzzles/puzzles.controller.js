function CreatedPuzzlesCtrl(puzzleService, Notification) {
    var vm = this;

    vm.error = '';
    vm.puzzles = [];

    function pullPuzzles() {
        puzzleService
            .getPuzzles()
            .then(function (puzzles) {
                vm.puzzles = puzzles;
            }, function (error) {
                vm.error = error;
            });
    }
    pullPuzzles();

    vm.generateNewCode = function(puzzleId) {
        puzzleService
            .generateNewCode(puzzleId)
            .then(function() {
                pullPuzzles();
            }, function(error) {
                console.log(error);
            });
    };

    vm.deletePuzzle = function(puzzleId) {
        if (!confirm("Изтриване на пъзела?")) {
            return;
        }
        puzzleService
            .deletePuzzle(puzzleId)
            .then(function() {
                pullPuzzles();
            }, function(error) {
                Notification.error(error);
            });
    }
}
CreatedPuzzlesCtrl.$inject = ['puzzleService', 'Notification'];
angular.module('letterSoup').controller('CreatedPuzzlesCtrl', CreatedPuzzlesCtrl);