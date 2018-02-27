function newCollectionController(Notification, CollectionService, $state) {
    var vm = this;
    vm.wordFieldValue = '';
    vm.title = '';
    vm.category = '';
    vm.words = [];

    vm.addWord = function() {
        var appearsInArray = vm.words.find(function(word) {
            return word === vm.wordFieldValue;
        });

        if (appearsInArray !== undefined || vm.wordFieldValue === '') {
            return;
        }

        vm.words.push(vm.wordFieldValue);
        vm.wordFieldValue = '';
    };

    vm.saveCollection = function() {
        var collection = {
            title: vm.title,
            words: vm.words,
            category: vm.category
        };

        if (vm.title === '') {
            Notification.error({ title: "Грешка!", message: "Моля, изберет заглавие на колекцията!" });
            return;
        }

        if (vm.words.length === 0) {
            Notification.error({ title: "Грешка!", message: "Моля, въведете думи в колекцията!" });
            return;
        }
        
        CollectionService
            .createCollection(collection)
            .then(function() {
                $state.go('teacher.collections');
            }, function(error) {
                Notification.error({
                    title: 'Грешка!',
                    message: error
                });
            });
    };
}
newCollectionController.$inject = ['Notification', 'CollectionService', '$state'];
angular.module('letterSoup').controller('NewCollectionCtrl', newCollectionController);