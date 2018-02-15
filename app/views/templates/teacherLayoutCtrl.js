function TeacherLayoutCtrl($cookies, $state, $transitions, authenticationService, Notification) {
    var token = $cookies.get('_t');

    if (token === undefined) {
        $state.go('login');
        return;
    }

    $state.go('teacher.dashboard');

    // Validates the token and changes the state
    // by given state change function and new state name
    function validateToken(transitioner, state) {
        return authenticationService
            .validateToken(token)
            .then(function (valid) {
                if (valid === false) {
                    Notification.error({
                        title: 'Грешка!',
                        message: 'Възникна грешка! Моля, влезте в профила отново.'
                    });
                    return transitioner(state);
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
    validateToken($state.go, 'login');

    // Validate the token on all child routes
    $transitions.onStart({ to: 'teacher.**' }, function(trans) {
        var stateService = trans.router.stateService;
        return validateToken(stateService, 'login');
    });

}
TeacherLayoutCtrl.$inject = ['$cookies', '$state', '$transitions', 'authenticationService', 'Notification'];
angular.module('letterSoup').controller('TeacherLayoutCtrl', TeacherLayoutCtrl);