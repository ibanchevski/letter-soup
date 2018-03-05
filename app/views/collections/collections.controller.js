function CollectionsCtrl(CollectionService) {
    var vm = this;
    vm.collections;
    vm.error = '';
    CollectionService
        .getCollection()
        .then(function(collections) {
            collections = collections.sort(function(coll, nextColl) {
                return nextColl.words.length - coll.words.length;
            });
            vm.collections = collections;
        }, function(error) {
            vm.error = error;
        });
}
CollectionsCtrl.$inject = ['CollectionService'];
angular.module('letterSoup').controller('CollectionsCtrl', CollectionsCtrl);