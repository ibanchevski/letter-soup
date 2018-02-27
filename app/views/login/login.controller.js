function LoginCtrl($cookies, $state, authenticationService, Notification, puzzleService) {
    var vm = this;
    var tokenCookie = $cookies.get('_t');
    vm.render = 'enter';
    vm.email = '';
    vm.password = '';
    vm.rememberMe = false;
    vm.puzzleCode = '';

    vm.setRender = function(render) {
        vm.render = render;

        // Null-ate all vars
        vm.email = '';
        vm.password = '';
        vm.rememberMe = false;
        vm.puzzleCode = '';
    };
    
    vm.login = function() {
        authenticationService
            .authenticateTeacher(vm.email, vm.password)
            .then(function(token) {
                if ($cookies.get('_t') !== undefined) {
                    $cookies.remove('_t');
                }
                if (vm.rememberMe === false) {
                    // Put session cookie
                    $cookies.put('_t', token);
                } else {
                    // Put cookie that expires in 8 hours
                    var exp = new Date();
                    exp.setHours(exp.getHours() + 8);
                    $cookies.put('_t', token, { expires:  exp});
                }
                $state.go('teacher');
            }, function(error) {
                Notification.error({
                    title: 'Грешка!',
                    message: error
                });
            });
    };

    vm.validatePuzzleCode = function() {
        puzzleService
            .validatePuzzleCode(vm.puzzleCode)
            .then(function onResponse(isValid) {
                if (isValid === false) {
                    Notification.error({
                        title: 'Грешка!',
                        message: 'Въведеният код е невалиден!'
                    });
                    return;
                }
                $state.go('solve', { puzzleCode: vm.puzzleCode });
            }, function onError(error) {
                Notification.error({
                    title: 'Грешка!',
                    message: error
                });
            });
    };

    // Log in directly if the teacher has token cookie
    if (tokenCookie !== undefined) {
        $state.go('teacher');
    }
}
LoginCtrl.$inject = ['$cookies', '$state', 'authenticationService', 'Notification', 'puzzleService'];
angular.module('letterSoup').controller('LoginCtrl', LoginCtrl);