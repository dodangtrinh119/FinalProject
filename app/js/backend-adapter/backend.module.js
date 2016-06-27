/**
 * Created by nmtuan on 05-Jun-16.
 */
var appBackend = angular.module('appBackend', []);

//Initialize Firebaes Backend
appBackend.config(function () {
    firebase.initializeApp({
        apiKey: "AIzaSyCcx3Xbp4Zmm79i2fn4vB5Sp4yiyECzxz8",
        authDomain: "project-4733900774328663952.firebaseapp.com",
        databaseURL: "https://project-4733900774328663952.firebaseio.com",
        storageBucket: "",
    });
});

//Register data service

//Register auth service
appBackend.factory('authService', function () {


});
