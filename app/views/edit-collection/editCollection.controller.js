function EditCollectionCtrl($stateParams, CollectionService, Notification, $state) {
    var vm = this;
    var collectionId = $stateParams.collectionId;
    var _collection;

    vm.collection;
    vm.newWord = '';

    // Pull collection data
    CollectionService
        .getCollection(collectionId)
        .then(function(collection) {
            _collection = collection;
            vm.collection = collection;
        }, function(error) {
            console.log(error);
            Notification.error({
                title: 'Възникна грешка!',
                message: error
            });
            $state.go('teacher.collections');
        });

    // TODO: Refactor - can be done easily
    vm.removeWord = function(index) {
        var words = vm.collection.words;
        var updatedWords = [];
        
        words[index] = '';
        for (var i = 0; i < words.length; i++) {
            if (words[i] !== '') {
                updatedWords.push(words[i]);
            }
        }
        vm.collection.words = updatedWords;
    }

    vm.addWord = function() {
        if (vm.editForm.addWord.$valid === false) {
            Notification.error({
                title: "Грешка!",
                message: "Думите в колекцията могат да съдържат само букви (без интервал)!"
            });
            return;
        }

        if (vm.newWord !== '' && vm.newWord !== undefined) {
            vm.collection.words.push(vm.newWord);
            vm.newWord = '';
        }
    };

    vm.removeAllWords = function() {
        vm.collection.words = [];
    };

    vm.submit = function() {
        if (vm.collection.words.length === 0) {
            Notification.error({
                title: "Грешка",
                message: "Моля, добавете думи в колекцията."
            });
            return;
        }

        CollectionService
            .updateCollection(_collection._id, vm.collection)
            .then(function(response) {
                Notification.success({
                    title: 'Готово!',
                    message: response
                });
                $state.go('teacher.collections');
            }, function(error) {
                console.log(error);
                Notification.error({
                    title: "Грешка",
                    message: error
                });
            });
    };
}
EditCollectionCtrl.$inject = ['$stateParams', 'CollectionService', 'Notification', '$state'];
angular.module('letterSoup').controller('EditCollectionCtrl', EditCollectionCtrl);