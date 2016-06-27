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
                startPeriod: new Date(), endPeriod: new Date(), duration: 'Duration', location: '',
                description: ''
            };
            $scope.experienceAdd.endPeriod.setDate($scope.experienceAdd.endPeriod.getDate() + 1);
            $scope.showExperienceAdd = true;
        };
        $scope.experienceAddConfirm = function () {
            $scope.experience.push($scope.experienceAdd);
            var cloneExp = angular.copy($scope.experience);
            cloneExp.forEach(function (exp) {
                if (exp.startPeriod)
                    exp.startPeriod = exp.startPeriod.toDateString();
                if (exp.endPeriod)
                    exp.endPeriod = exp.endPeriod.toDateString();
            });
            $scope.profile.setRemoteProperty('experience', cloneExp);
            $scope.showExperienceAdd = false;
        };

        //Edit Experience
        $scope.experienceEditShow = function (index) {
            $scope.experienceEdit = angular.copy($scope.experience[index]);
            $scope.showExperienceEdit[index] = true;
        };
        $scope.experienceEditConfirm = function (index) {
            $scope.experience[index] = $scope.experienceEdit;
            var cloneExp = angular.copy($scope.experience);
            cloneExp.forEach(function (exp) {
                if (exp.startPeriod != null)
                    exp.startPeriod = exp.startPeriod.toDateString();
                if (exp.endPeriod != null)
                    exp.endPeriod = exp.endPeriod.toDateString();
            });
            $scope.profile.setRemoteProperty('experience', cloneExp);
        };
    }]);