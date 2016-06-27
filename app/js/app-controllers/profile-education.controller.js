/**
 * Created by nmtuan on 28-Apr-16.
 */
appControllers.controller('educationController', ['$scope',
    function ($scope) {
        //Remove Education
        $scope.removeEducation = function (index) {
            $scope.education.splice(index, 1);
            $scope.profile.setRemoteProperty('education', angular.copy($scope.education));
        };

        //Add education
        $scope.showEducationAdd = false;
        $scope.educationAddShow = function () {
            $scope.educationAdd = {
                schoolName: '', schoolUrl: '', schoolLogo: '', degree: '', field: '',
                startPeriod: new Date(), endPeriod: new Date()
            };
            $scope.educationAdd.endPeriod.setDate($scope.educationAdd.endPeriod.getDate() + 1);
            $scope.showEducationAdd = true;
        };
        $scope.educationAddConfirm = function () {
            $scope.education.push($scope.educationAdd);
            var cloneEdu = angular.copy($scope.education);
            cloneEdu.forEach(function (edu) {
                if (edu.startPeriod)
                    edu.startPeriod = edu.startPeriod.toDateString();
                if (edu.endPeriod)
                    edu.endPeriod = edu.endPeriod.toDateString();
            });
            $scope.profile.setRemoteProperty('education', cloneEdu);
            $scope.showEducationAdd = false;
        };

        //Edit Education
        $scope.educationEditShow = function (index) {
            $scope.educationEdit = angular.copy($scope.education[index]);
            $scope.showEducationEdit[index] = true;
        };
        $scope.educationEditConfirm = function (index) {
            $scope.education[index] = $scope.educationEdit;
            var cloneEdu = angular.copy($scope.education);
            cloneEdu.forEach(function (edu) {
                if (edu.startPeriod)
                    edu.startPeriod = edu.startPeriod.toDateString();
                if (edu.endPeriod)
                    edu.endPeriod = edu.endPeriod.toDateString();
            });
            $scope.profile.setRemoteProperty('education', cloneEdu);
        };
    }]);