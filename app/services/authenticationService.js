function authenticationService($q, $http) {
    function registerTeacher(teacherObject) {
        var deferred = $q.defer();

        $http.post('/teacher', {teacher: teacherObject})
            .then(function(res) {
                deferred.resolve(res.data);
            }, function(error) {
                console.error(error);
                // The server is not running
                if (error.status === 404) {
                    return deferred.reject('Възникна грешка при свързването със сървъра. Моля, опитайте по-късно!');
                }
                deferred.reject(error.data);
            });

        return deferred.promise;
    }

    return {
        registerTeacher: registerTeacher
    }
}
authenticationService.$inject = ['$q', '$http'];
angular.module('letterSoup').factory('authenticationService', authenticationService);