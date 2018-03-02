function EditCollectionCtrl($stateParams, CollectionService, Notification, $state) {
    var vm = this;
    var collectionId = $stateParams.collectionId;

    vm.collection;
    vm.editedCollection = {
        title: '',
        category: '',
        words: []
    };

    // Pull collection data
    CollectionService
        .getCollectionById(collectionId)
        .then(function(collection) {
            vm.collection = collection;
        }, function(error) {
            console.log(error);
            Notification.error({
                title: 'Възникна грешка!',
                message: error
            });
            $state.go('teacher.collections');
        });

    vm.editCollection = function() {
        console.log(vm.editedCollection);
    }
}
EditCollectionCtrl.$inject = ['$stateParams', 'CollectionService', 'Notification', '$state'];
angular.module('letterSoup').controller('EditCollectionCtrl', EditCollectionCtrl);