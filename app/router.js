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
        .state('solve', {
            url: '/puzzle/puzzleCode',
            params: { puzzleCode: null  },
            templateUrl: '/views/solve-puzzle/puzzle.html',
            controller: 'SolvePuzzleCtrl',
            controllerAs: 'solve'
        })
        .state('teacher', {
            url: '/teacher',
            templateUrl: '/views/templates/teacherLayout.html',
            controller: 'TeacherLayoutCtrl',
            controllerAs: 'layout'
        })
        .state('teacher.dashboard', {
            url: '/dashboard',
            templateUrl: '/views/dashboard/dashboard.html',
            controller: 'DashboardCtrl',
            controllerAs: 'dashboard'
        })
        .state('teacher.collections', {
            url: '/collections',
            templateUrl: '/views/collections/collections.html',
            controller: 'CollectionsCtrl',
            controllerAs: 'collections'
        })
        .state('teacher.newCollection', {
            url: '/new-collection',
            templateUrl: '/views/new-collection/newCollection.html',
            controller: 'NewCollectionCtrl',
            controllerAs: 'collection'
        })
        .state('teacher.editCollection', {
            url: '/edit-collection/:collectionId',
            params: { collectionId: null },
            templateUrl: '/views/edit-collection/editCollection.html',
            controller: 'EditCollectionCtrl',
            controllerAs: 'edit'
        });
});