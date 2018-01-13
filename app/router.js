angular.module('letterSoup').config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('login');
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: '/views/login/login.html',
            controller: 'LoginCtrl',
            controllerAs: 'login'
        })
        .state('register', {
            url: '/register',
            templateUrl: '/views/register/register.html',
            controller: 'RegisterCtrl',
            controllerAs: 'register'
        });
});