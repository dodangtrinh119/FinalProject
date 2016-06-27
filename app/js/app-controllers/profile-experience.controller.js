/**
 * Created by nmtuan on 28-Apr-16.
 */
appControllers.controller('experienceController', ['$scope',
    function ($scope) {
        //Remove Experience
        $scope.removeExperience = function (index) {
            $scope.experience.splice(index, 1);
            $scope.profile.setRemoteProperty('experience', angular.copy($scope.experience));
        };

        //Add Experience
        $scope.showExperienceAdd = false;
        $scope.experienceAddShow = function () {
            $scope.experienceAdd = {
                companyName: '', companyUrl: '', companyLogo: '', title: '',
                startPeriod: 'From', endPeriod: 'To', duration: 'Duration', location: '',
                description: ''
            };
            $scope.showExperienceAdd = true;
        };
        $scope.experienceAddConfirm = function () {
            $scope.experience.push($scope.experienceAdd);
            $scope.profile.setRemoteProperty('experience', angular.copy($scope.experience));
            $scope.showExperienceAdd = false;
        };

        //Edit Experience
        $scope.experienceEditShow = function (index) {
            $scope.experienceEdit = JSON.parse(JSON.stringify($scope.experience[index]));
            $scope.showExperienceEdit[index] = true;
        };
        $scope.experienceEditConfirm = function (index) {
            $scope.experience[index] = $scope.experienceEdit;
            $scope.profile.setRemoteProperty('experience', angular.copy($scope.experience));
        };
    }]);