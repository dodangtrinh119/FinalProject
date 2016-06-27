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
            .otherwise({
                redirectTo: '/landing'
            });
    }]);

app.run(['$rootScope', '$location', 'authService', function ($rootScope, $location, authService) {

}]);


//Load Components
$.loadScript('js/app-core/app.components.js');