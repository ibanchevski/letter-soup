function userService($q, $http) {
    function createTempUser(userNames) {
        var deferred = $q.defer();
        $http
            .post('/api/user', {user: userNames})
            .then(function(resp) {
                deferred.resolve(resp.data);
            }, function(error) {
                if (error.status === 404) {
                    deferred.reject('Грешка при свързването със сървъра!');
                    return;
                }
                deferred.reject(error.data);
            });
        return deferred.promise;
    }

    return {
        createTempUser: createTempUser
    }
}
userService.$inject = ['$q', '$http'];
angular.module('letterSoup').factory('userService', userService);