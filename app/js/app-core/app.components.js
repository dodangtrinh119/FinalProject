/**
 * Created by nmtuan on 05-Jun-16.
 */
var app = angular.module('app');

app.component('signIn', {
    templateUrl: 'view/sign-in.html',
    controller: 'signInController',
});

app.component('signUp', {
    templateUrl: 'view/sign-up.html',
    controller: 'signUpController',
});

//Profile Component
app.component('profile', {
    templateUrl: 'view/profile.html',
    controller: 'profileController',
});