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
        storageBucket: "project-4733900774328663952.appspot.com",
    });
});

//Register data service
appBackend.factory('dataService', function () {
    var dataLogic = {};

    dataLogic.CreateDataRef = function (refUrl) {
        return new DataRef(refUrl);
    };

    dataLogic.bind = function (refUrl, callback) {
        var ref = firebase.database().ref(refUrl);
        return ref.on('value', callback);
    };
    dataLogic.unbind = function (refUrl, listener) {
        var ref = firebase.database().ref(refUrl);
        ref.off('value', listener);
    };
    dataLogic.set = function (refUrl, value) {
        var ref = firebase.database().ref(refUrl);
        ref.set(value);
    };
    dataLogic.exists = function (refUrl, callback) {
        firebase.database().ref(refUrl).once('value').then(function (snapshot) {
            callback(snapshot.exists());
        });
    };

    return dataLogic;
});


//Register auth service
appBackend.factory('authService', ['$location', 'dataService', function ($location, dataService) {
    var authLogic = {};

    authLogic.onAuthStateChanged = function (callback) {
        firebase.auth().onAuthStateChanged(callback);
    };

    authLogic.createUser = function (email, password, userInfo, errorCallback) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function (user) {
                userInfo.profileUrl = $location.host() + "/index.html#!/profile/" + user.uid;
                dataService.set('users/' + user.uid, userInfo);
            })
            .catch(errorCallback);
    };

    authLogic.loginUser = function (account, password, errorCallback) {
        firebase.auth().signInWithEmailAndPassword(account, password).catch(errorCallback);
    };
    
    authLogic.loginWithGoogle = function (errorCallback) {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {

            var user = result.user;

            dataService.exists('users/' + user.uid, function (existed) {
                if (!existed) {
                    var userInfo = new UserInfo();
                    if (user.displayName) {
                        userInfo.name[0] = user.displayName.substr(0, user.displayName.indexOf(' '));
                        userInfo.name[1] = user.displayName.substr(user.displayName.indexOf(' ') + 1);
                    }
                    if (user.photoURL)
                        userInfo.profileImg = user.photoURL;
                    dataService.set('users/' + user.uid, userInfo);
                }
            });
        }).catch(errorCallback);
    };

    authLogic.logoutUser = function () {
        firebase.auth().signOut();
    };

    authLogic.getCurrentUser = function () {
        return firebase.auth().currentUser;
    };

    return authLogic;
}]);
