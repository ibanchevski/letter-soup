function puzzleService($http, $q) {
    function validatePuzzleCode(code) {
        var deferred = $q.defer();

        $http.get('/api/puzzle/' + String(code))
            .then(
                res => deferred.resolve(res.data),
                err => err.status === '404' 
                    ? deferred.reject('Грешка при свързването! Моля, опитайте пак.')
                    : deferred.reject(err.data)
            );

        return deferred.promise;
    }

    function createPuzzle(size, words, title) {
        var deferred = $q.defer();

        $http
            .post('/api/puzzle', { size: size, words: words, title: title })
            .then(function(res) {
                deferred.resolve(res.data);
            }, function(error) {
                if (error.status === '404') {
                    deferred.reject('Грешка при свързването! Моля, опитайте пак.');
                    return;
                }
                deferred.reject(error.data);
            });

        return deferred.promise;
    }
    
    return {
        validatePuzzleCode: validatePuzzleCode,
        createPuzzle: createPuzzle
    }
}
puzzleService.$inject = ['$http', '$q'];
angular.module('letterSoup').factory('puzzleService', puzzleService);