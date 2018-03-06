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

    function updateCollection(id, collection) {
        var deferred = $q.defer();

        if (!id) {
            throw new Error('No collection id provided!');
            return;
        }

        if (!collection) {
            throw new Error('No collection provided!');
            return;
        }

        $http
            .put('/api/collection/' + id, {collection: collection})
            .then(function(response) {
                deferred.resolve(response.data);
            }, function(error) {
                if (error.status === 404) {
                    deferred.reject('Възникна грешка при свързването със сървъра. Моля, опитайте по-късно!');
                    return;
                }
                deferred.reject(error.data);
            });

        return deferred.promise;
    }

    function getCollection(id) {
        var deferred = $q.defer();
        var apiRoute = '/api/collection';
        
        if (id) {
            apiRoute += `/${id}`;
        }

        $http
            .get(apiRoute)
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

    function deleteCollection(id) {
        var deferred = $q.defer();

        $http
            .delete('/api/collection/' + id)
            .then(function() {
                deferred.resolve();
            }, function(error) {
                if (error.status === 404) {
                    deferred.reject('Възникна грешка при свързването със сървъра. Моля, опитайте по-късно!');
                    return;
                }
                deferred.reject(error.data);
            });

        return deferred.promise;
    }

    function generateLink(collectionId) {
        var deferred = $q.defer()

        $http
            .put('/api/collection/' + collectionId + '/link')
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
        getCollection: getCollection,
        updateCollection: updateCollection,
        deleteCollection: deleteCollection,
        generateLink: generateLink
    }
}
collectionService.$inject = ['$q', '$http'];
angular.module('letterSoup').factory('CollectionService', collectionService);