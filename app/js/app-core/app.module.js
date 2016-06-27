/**
 * Created by nmtuan on 05-Jun-16.
 */
var app = angular.module('app', ['ngRoute', 'appControllers', 'appBackend']);

app.config(['$locationProvider', '$routeProvider',
    function ($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider
            .when('/landing', {
                templateUrl: 'view/landing.html'
            })
            .when('/sign-in', {
                template: '<sign-in></sign-in>'
            })
            .when('/sign-up', {
                template: '<sign-up></sign-up>'
            })
            .when('/profile', {
                template: '<profile></profile>'
            })
            .when('/profile/:profileId', {
                template: '<profile></profile>'
            })
            .otherwise({
                redirectTo: '/landing'
            });
    }]);

app.run(['$rootScope', '$location', 'authService', function ($rootScope, $location, authService) {
    authService.onAuthStateChanged(function (user) {
        $rootScope.$applyAsync(function () {
            if (user)
                $location.path('/profile').replace();
            else
                $location.path('/sign-in').replace();
        });
    });

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        if (authService.getCurrentUser()) {
            if ($location.path() == '/sign-in' || $location.path() == '/landing')
                event.preventDefault();
        }
        else if (!current.includes('/profile') && $location.path().includes('/profile'))
            event.preventDefault();
    });
}]);

//Load Components
$.loadScript('js/app-core/app.components.js');