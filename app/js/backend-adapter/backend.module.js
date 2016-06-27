/**
 * Created by nmtuan on 05-Jun-16.
 */
var appBackend = angular.module('appBackend', []);

//Initialize Firebaes Backend
appBackend.config(function () {
    firebase.initializeApp({
        apiKey: "AIzaSyAp025r7cre9NQp8gBWx7gaC_9E8yRpxyM",
        authDomain: "finalterm-41c3f.firebaseapp.com",
        databaseURL: "https://finalterm-41c3f.firebaseio.com",
        storageBucket: "finalterm-41c3f.appspot.com",
    });
});

//Register data service
appBackend.factory('dataService', function () {
    var dataLogic = {};

    dataLogic.createDataRef = function (firebaseRef) {
        return new DataRef(firebaseRef);
    };
    dataLogic.createFirebaseRef = function (refUrl) {
        return firebase.database().ref(refUrl);
    };
    
    dataLogic.bind = function (firebaseRef, callback) {
        if (firebaseRef && callback)
            firebaseRef.on('value', callback);

        return callback;
    };
    dataLogic.unbind = function (firebaseRef, listener) {
        if (firebaseRef && listener)
            firebaseRef.off('value', listener);
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
                        userInfo.displayName = user.displayName;
                        userInfo.name = Utils.splitsStringToName(user.displayName);
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
