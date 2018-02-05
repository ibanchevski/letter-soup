function LoginCtrl() {
    var vm = this;
    vm.render = 'enter';

    vm.setRender = function(render) {
        vm.render = render;
    };
}
LoginCtrl.$inject = [];
angular.module('letterSoup').controller('LoginCtrl', LoginCtrl);