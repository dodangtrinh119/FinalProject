/**
 * Created by nmtuan on 06-Jun-16.
 */
appControllers.controller('profileController', ['$scope', '$location', '$anchorScroll', '$routeParams', 'authService', 'dataService',
    function ($scope, $location, $anchorScroll, $routeParams, authService, dataService) {

        $scope.scrollTo = function (id) {
            var old = $location.hash();
            $location.hash(id);
            $anchorScroll();
            $location.hash(old);
        };

        var listenerRef = null;
        var hasParam = ($routeParams.profileId)? true : false;
        var currentUser = authService.getCurrentUser();
        var loadData = function (userId) {
            listenerRef = dataService.bind('users/' + userId, function (snapshot) {
                if (snapshot.exists()) {

                    $scope.profile = dataService.CreateDataRef(snapshot.ref);

                    var data = snapshot.val();

                    $scope.coverImage = data.coverImg;
                    $scope.profileImage = data.profileImg;
                    $scope.name = data.name;
                    $scope.headline = data.headline;
                    $scope.workInfo = data.workInfo;
                    $scope.isInfluencer = data.isInfluencer;
                    $scope.followers = data.followers;
                    $scope.profileUrl = data.profileUrl;

                    $scope.postsUrl = data.postsUrl;
                    $scope.posts = (data.posts != undefined)? data.posts : [];

                    $scope.summary = data.summary;

                    $scope.experience = (data.experience != undefined)? data.experience : [];
                    $scope.showExperienceEdit = new Array($scope.experience.length).fill(false);
                    $scope.experience.forEach(function (exp) {
                        if (exp.startPeriod)
                            exp.startPeriod = new Date(exp.startPeriod);
                        else
                            exp.startPeriod = new Date();

                        if (exp.endPeriod == null) {
                            exp.duration = "";
                            return;
                        }
                        exp.endPeriod = new Date(exp.endPeriod);

                        var yearDiff = exp.endPeriod.getYear() - exp.startPeriod.getYear();
                        var monthDiff = exp.endPeriod.getMonth() - exp.startPeriod.getMonth();
                        if (monthDiff < 0) {
                            yearDiff -= 1;
                            monthDiff += 12;
                        }

                        exp.duration = "";
                        if (yearDiff != 0) exp.duration += yearDiff + " years";
                        if (monthDiff != 0) exp.duration += " " + monthDiff + " months";
                    });

                    $scope.caredCauses = (data.caredCauses != undefined)? data.caredCauses : [];
                    $scope.supportedOrganizations = (data.supportedOrganizations != undefined)? data.supportedOrganizations : [];

                    $scope.skills = (data.skills != undefined)? data.skills : [];

                    $scope.education = (data.education != undefined)? data.education : [];
                    $scope.showEducationEdit = new Array($scope.education.length).fill(false);
                    $scope.education.forEach(function (edu) {
                        if (edu.startPeriod)
                            edu.startPeriod = new Date(edu.startPeriod);
                        else
                            edu.startPeriod = new Date();

                        if (edu.endPeriod)
                            edu.endPeriod = new Date(edu.endPeriod);
                    });

                    $scope.$applyAsync();
                }
                else if (hasParam) {
                    dataService.unbind('users/' + userId, listenerRef);
                    $location.path('/profile');
                    $scope.$applyAsync();
                }
            })
        };

        $scope.editable = false;
        if (hasParam) {
            if (currentUser && currentUser.uid == $routeParams.profileId) {
                $location.path('/profile');
                $scope.$apply();
            }
            else
                loadData($routeParams.profileId);
        }
        else {
            $scope.editable = true;
            if (currentUser)
                loadData(authService.getCurrentUser().uid)
            else {
                authService.onAuthStateChanged(function (user) {
                    if (user)
                        loadData(user.uid);
                })
            }
        };
    }]);
