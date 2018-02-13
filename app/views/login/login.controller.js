function LoginCtrl($cookies, $state, authenticationService, Notification) {
    var vm = this;
    vm.render = 'enter';
    vm.email = '';
    vm.password = '';
    vm.rememberMe = false;

    vm.setRender = function(render) {
        vm.render = render;
    };

    vm.login = function() {
        authenticationService
            .authenticateTeacher(vm.email, vm.password)
            .then(function(token) {
                if (vm.rememberMe === false) {
                    // Put session cookie
                    $cookies.put('_t', token);
                } else {
                    // Put cookie that expires in 8 hours
                    var exp = new Date();
                    exp.setHours(exp.getHours() + 8);
                    $cookies.put('_t', token, { expires:  exp});
                }
            }, function(error) {
                Notification.error({
                    title: 'Грешка!',
                    message: error
                });
            });
    };
}
LoginCtrl.$inject = ['$cookies', '$state', 'authenticationService', 'Notification'];
angular.module('letterSoup').controller('LoginCtrl', LoginCtrl);