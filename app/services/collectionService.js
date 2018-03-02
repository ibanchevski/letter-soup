function collectionService($q, $http) {
    function createCollection(collectionObj) {
        var deferred = $q.defer();

        if (!collectionObj) {
            deferred.reject(new Error('No collection provided!'));
            return;
        }

        $http
            .post('/api/collection', { "collection": collectionObj })
            .then(function(res) {
                deferred.resolve(res.data);
            }, function(error) {
                // The server is not running
                if (error.status === 404) {
                    deferred.reject('Възникна грешка при свързването със сървъра. Моля, опитайте по-късно!');
                    return;
                }
                deferred.reject(error.data);
            });


        return deferred.promise;
    }

    function getAllCollections() {
        var deferred = $q.defer();

        $http
            .get('/api/collection/all')
            .then(function (res) {
                deferred.resolve(res.data);
            }, function (error) {
                // The server is not running
                if (error.status === 404) {
                    deferred.reject('Възникна грешка при свързването със сървъра. Моля, опитайте по-късно!');
                    return;
                }
                deferred.reject(error.data);
            });


        return deferred.promise;
    }

    function getCollectionById(id) {
        var deferred = $q.defer();

        $http
            .get('/api/collection/' + id)
            .then(function(res) {
                deferred.resolve(res.data);
            }, function(error) {
                if (error.status === 404) {
                    deferred.reject('Възникна грешка при свързването със сървъра. Моля, опитайте по-късно!');
                    return;
                }
                deferred.reject(error.data);
            });

        return deferred.promise;
    }

    return {
        createCollection: createCollection,
        getAllCollections: getAllCollections,
        getCollectionById: getCollectionById
    }
}
collectionService.$inject = ['$q', '$http'];
angular.module('letterSoup').factory('CollectionService', collectionService);