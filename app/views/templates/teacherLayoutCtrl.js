function TeacherLayoutCtrl($scope, $cookies, $state, $transitions, authenticationService, Notification) {
    var vm = this;
    
    vm.logOut = function () {
        $cookies.remove('_t');
        $state.go('login');
    };

    if ($cookies.get('_t') === undefined) {
        $state.go('login');
        return;
    }

    // Validates the token and changes the state
    // by given state change function and new state name
    function validateToken(transitioner, state, cb) {
        return authenticationService
            .validateToken($cookies.get('_t'))
            .then(function (valid) {
                if (valid === false) {
                    Notification.error({
                        title: 'Грешка!',
                        message: 'Възникна грешка! Моля, влезте в профила отново.'
                    });
                    if ($cookies.get('_t') !== undefined) {
                        $cookies.remove('_t');
                    }
                    return transitioner(state);
                }
                if (typeof cb === 'function') {
                    cb();
                }
            }, function onError() {
                Notification.error({
                    title: 'Грешка!',
                    message: 'Възникна грешка! Моля, влезте в профила отново.'
                });
                return transitioner(state);
            });
    }

    // Validate the token on every controller load (page refresh)
    validateToken($state.go, 'login', function() {
        $state.go('.dashboard');
    });

    // Validate the token on all child routes
    $transitions.onStart({ to: 'teacher.**' }, function(trans) {
        var stateService = trans.router.stateService;
        if ($cookies.get('_t') === undefined) {
            return stateService.target('login', null, { location: "replace", reload: true });
        }
        return validateToken(stateService.target, 'login');
    });

    // Watch for state changes and update the nav
    $scope.$watch(function() {
        return $state.current.name
    }, function(newState, oldState) {
        $scope.currentNavState = newState.substring(newState.indexOf('.') + 1);
    });
}
TeacherLayoutCtrl.$inject = ['$scope', '$cookies', '$state', '$transitions', 'authenticationService', 'Notification'];
angular.module('letterSoup').controller('TeacherLayoutCtrl', TeacherLayoutCtrl);