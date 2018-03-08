function puzzleSolversService($q, $http) {
    this.getSolvers = function(puzzleId) {
        var deferred = $q.defer();

        $http
            .get('/api/puzzle/' + puzzleId + '/solvers')
            .then(function(res) {
                deferred.resolve(res.data);
            }, function(error) {
                if (error.status === 404) {
                    deferred.reject('Възникна грешка при свързването със сървъра!');
                    return;
                }
                deferred.reject(error);
            });

        return deferred.promise;
    }
}
puzzleSolversService.$inject = ['$q', '$http'];
angular.module('letterSoup').service('puzzleSolversService', puzzleSolversService);