function puzzleService($http, $q) {
    function validatePuzzleCode(code) {
        var deferred = $q.defer();

        $http.get('/api/puzzle/' + String(code) + '/valid')
            .then(
                res => deferred.resolve(res.data),
                err => err.status === 404 
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
                if (error.status === 404) {
                    deferred.reject('Грешка при свързването! Моля, опитайте пак.');
                    return;
                }
                deferred.reject(error.data);
            });

        return deferred.promise;
    }
    
    function getPuzzles() {
        var deferred = $q.defer();

        $http
            .get('/api/puzzle')
            .then(function(res) {
                deferred.resolve(res.data);
            }, function(error) {
                if (error.status === 404) {
                    deferred.reject('Грешка при свързването! Моля, опитайте пак.');
                    return;
                }
                deferred.reject(error.data);
            });

        return deferred.promise;
    }

    function generatePuzzle(code) {
        var deferred = $q.defer();

        $http
            .get('/api/user/puzzle/' + code)
            .then(function (res) {
                deferred.resolve(res.data);
            }, function (error) {
                if (error.status === 404) {
                    deferred.reject('Грешка при свързването! Моля, опитайте пак.');
                    return;
                }
                deferred.reject(error.data);
            });

        return deferred.promise;
    }
    
    function submitPuzzle(puzzle) {
        var deferred = $q.defer();

        $http
            .post('/api/user/puzzle', {
                puzzleCode: puzzle.code,
                solvedWords: puzzle.correctWords
            })
            .then(function (res) {
                deferred.resolve(res.data);
            }, function (error) {
                deferred.reject(error);
            });

        return deferred.promise;
    }

    function deletePuzzle(id) {
        var deferred = $q.defer();

        $http
            .delete('/api/puzzle/' + id)
            .then(function (res) {
                deferred.resolve(res.data);
            }, function (error) {
                if (error.status === 404) {
                    deferred.reject('Грешка при свързването! Моля, опитайте пак.');
                    return;
                }
                deferred.reject(error);
            });

        return deferred.promise;
    }

    return {
        validatePuzzleCode: validatePuzzleCode,
        createPuzzle: createPuzzle,
        getPuzzles: getPuzzles,
        generatePuzzle: generatePuzzle,
        submitPuzzle: submitPuzzle,
        deletePuzzle: deletePuzzle
    }
}
puzzleService.$inject = ['$http', '$q'];
angular.module('letterSoup').factory('puzzleService', puzzleService);