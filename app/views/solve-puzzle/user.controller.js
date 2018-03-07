function SolvePuzzleUserCtrl(userService, Notification, $cookies, $state) {
    var vm = this;
    vm.names = '';
    vm.school = '';
    vm.city = '';
    vm.class = '';

    if ($cookies.get('_u') !== undefined) {
        $state.go('solve.puzzle');
        return;
    }

    vm.createUser = function() {
        // In one hour
        var expD = new Date(new Date().setHours(new Date().getHours() + 1));
        userService
            .createTempUser({
                name: vm.names,
                school: vm.school,
                city: vm.city,
                class: vm.class
            })
            .then(function(userToken) {
                if ($cookies.get('_u') !== undefined) {
                    $cookies.remove('_u');
                }
                $cookies.put('_u', userToken, {expires: expD});
                $state.go('solve.puzzle');
            }, function(error) {
                Notification.error(error);
            });
    };
}
SolvePuzzleUserCtrl.$inject = ['userService', 'Notification', '$cookies', '$state'];
angular.module('letterSoup').controller('SolvePuzzleUserCtrl', SolvePuzzleUserCtrl);