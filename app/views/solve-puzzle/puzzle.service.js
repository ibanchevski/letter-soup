function puzzleService($http, $q) {
    function validatePuzzleCode(code) {
        var deferred = $q.defer();

        $http.get('/api/puzzle/' + String(code) + '/valid')
            .then(
                res => deferred.resolve(res.data),
                err => err.status === '404' 
                    ? deferred.reject('Грешка при свързването! Моля, опитайте пак.')
                    : deferred.reject(err.data)
            );

        return deferred.promise;
    }

    return {
        validatePuzzleCode: validatePuzzleCode
    }
}
puzzleService.$inject = ['$http', '$q'];
angular.module('letterSoup').factory('puzzleService', puzzleService);