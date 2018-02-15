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
        })
        .state('teacher', {
            // url: '/dashboard',
            templateUrl: '/views/templates/teacherLayout.html',
            controller: 'TeacherLayoutCtrl',
            contorllerAs: 'layout'
        })
        .state('teacher.dashboard', {
            url: '/dashboard',
            templateUrl: '/views/dashboard/dashboard.html',
            controller: 'DashboardCtrl',
            contorllerAs: 'dashboard'
        });
});