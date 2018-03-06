function authenticationService($q, $http) {
    function registerTeacher(teacherObject) {
        var deferred = $q.defer();

        $http.post('/api/teacher', {teacher: teacherObject})
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

    function authenticateTeacher(email, password) {
        var deferred = $q.defer();

        $http.post('/api/login', {email: email, password: password})
            .then(function(res) {
                // Return the signed token to be saved in a cookie
                deferred.resolve(res.data);
            }, function(error) {
                // The server is not running
                if (error.status === 404) {
                    return deferred.reject('Възникна грешка при свързването със сървъра. Моля, опитайте по-късно!');
                }
                deferred.reject(error.data);
            });

        return deferred.promise;
    }

    function validateToken(token) {
        var deferred = $q.defer();

        $http.get('/api/token/valid', { headers: { 'x-access-token': token } })
            .then(function (res) {
                // Return the token status (valid - true/false)
                deferred.resolve(res.data);
            }, function (error) {
                // The server is not running
                if (error.status === 404) {
                    return deferred.reject('Възникна грешка при свързването със сървъра. Моля, опитайте по-късно!');
                }
                deferred.reject(error.data);
            });

        return deferred.promise;
    }

    return {
        registerTeacher: registerTeacher,
        authenticateTeacher: authenticateTeacher,
        validateToken: validateToken
    }
}
authenticationService.$inject = ['$q', '$http'];
angular.module('letterSoup').factory('authenticationService', authenticationService);