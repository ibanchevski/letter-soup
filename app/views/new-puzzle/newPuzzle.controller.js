function NewPuzzleCtrl(CollectionService, puzzleService, Notification, $state) {
    var vm = this;
    
    vm.collections;
    vm.currentCollection;
    vm.puzzleWords = [];
    vm.puzzleSize = 10;

    CollectionService
        .getCollection()
        .then(function(collections) {
            vm.collections = collections;
            vm.currentCollection = collections[0];
        }, function(error) {
            // TODO: Handle error
        });
    
    vm.addWordToPuzzle = function(word) {
        // Add to puzzle words
        vm.puzzleWords.push(word);
        var updatedWords = [];
        var currWordsLen = vm.currentCollection.words.length;
        for (var i = 0; i < currWordsLen; i++) {
            if (vm.currentCollection.words[i] !== word) {
                updatedWords.push(vm.currentCollection.words[i]);
            }
        }
        vm.currentCollection.words = updatedWords;
    };

    vm.removeWord = function(word) {
        var updatedWords = []
        for (var i = 0; i < vm.puzzleWords.length; i++) {
            if (vm.puzzleWords[i] !== word) {
                updatedWords.push(vm.puzzleWords[i]);
            }
        }
        vm.puzzleWords = updatedWords;
    };

    vm.createPuzzle = function() {
        puzzleService
            .createPuzzle(vm.puzzleSize, vm.puzzleWords)
            .then(function() {
                Notification.success("Пъзелът беше създаден успешно!");
                $state.go('teacher.puzzels');
            }, function(error) {
                Notification.error({
                    title: "Грешка",
                    message: error
                });
            });
    };
}
NewPuzzleCtrl.$inject = ['CollectionService', 'puzzleService', 'Notification', '$state'];
angular.module('letterSoup').controller('NewPuzzleCtrl', NewPuzzleCtrl);