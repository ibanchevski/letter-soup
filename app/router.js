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
           url: '/solve/:puzzleCode',
           params: { puzzleCode: null },
           template: '<ui-view></ui-view>',
           controller: function($state, $transitions) {
               var currState = $state.current.name;
               if (currState !== 'solve.user' && currState !== 'solve.puzzle') {
                   $state.go('solve.user');
               }
               $transitions.onStart({from: 'solve.**', to: 'solve'}, function(trans) {
                   return trans.router.stateService.target('login');
               });
           }
        })
        .state('solve.user', {
            url: '/user',
            templateUrl: '/views/solve-puzzle/user.html',
            controller: 'SolvePuzzleUserCtrl',
            controllerAs: 'usr'
        })
        .state('solve.puzzle', {
            url: '/puzzle',
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
        .state('teacher.createPuzzle', {
            url: '/new-puzzle',
            templateUrl: '/views/new-puzzle/newPuzzle.html',
            controller: 'NewPuzzleCtrl',
            controllerAs: 'puzzle'
        })
        .state('teacher.puzzles', {
            url: '/created-puzzles',
            templateUrl: '/views/puzzles/puzzles.html',
            controller: 'CreatedPuzzlesCtrl',
            controllerAs: 'puzzles'
        })
        .state('teacher.editCollection', {
            url: '/edit-collection/:collectionId',
            params: { collectionId: null },
            templateUrl: '/views/edit-collection/editCollection.html',
            controller: 'EditCollectionCtrl',
            controllerAs: 'edit'
        });
});