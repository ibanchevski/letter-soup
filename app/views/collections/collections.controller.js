function CollectionsCtrl(CollectionService, Notification) {
    var vm = this;
    vm.collections;
    vm.error = '';

    pullCollections();

    vm.deleteCollection = function (id, collectionIndex) {
        if (confirm("Изтриване на колекцията?") === false) {
            return;
        }

        CollectionService
            .deleteCollection(id)
            .then(function () {
                Notification.success("Колекцията изтрита успешно!");
                
                // Remove collection from list (visually)
                vm.collections.splice(collectionIndex, 1);
            }, function (error) {
                Notification.error({
                    title: 'Грешка!',
                    message: error
                });
            });
    };

    function pullCollections() {
        CollectionService
            .getCollection()
            .then(function (collections) {
                collections = collections.sort(function (coll, nextColl) {
                    return nextColl.words.length - coll.words.length;
                });
                vm.collections = collections;
            }, function (error) {
                vm.error = error;
            });
    }
}
CollectionsCtrl.$inject = ['CollectionService', 'Notification'];
angular.module('letterSoup').controller('CollectionsCtrl', CollectionsCtrl);