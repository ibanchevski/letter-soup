function RegisterCtrl($state, authenticationService, Notification) {
    var vm = this;
    vm.repeatedPassword = '';
    vm.subjects = [];
    vm.error = '';
    vm.teacher = {
        "firstName": '',
        "lastName": '',
        "city": '',
        "school": '',
        "email": '',
        "password": '',
        // "subject": ''
    };

    vm.register = function() {
        authenticationService
            .registerTeacher(vm.teacher)
            .then(function(result) {
                // Return to the login page
                $state.go('login');
                Notification.success({
                    title: 'Успешна регистрация!',
                    message: 'Вашата регистрация беше успешна!'
                });
            }, function(error) {
                vm.error = error;
            });
    };
}
RegisterCtrl.$inject = ['$state', 'authenticationService', 'Notification'];
angular.module('letterSoup').controller('RegisterCtrl', RegisterCtrl);