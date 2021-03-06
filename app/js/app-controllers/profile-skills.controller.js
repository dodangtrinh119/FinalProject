/**
 * Created by nmtuan on 28-Apr-16.
 */
appControllers.controller('skillsController', ['$scope',
    function ($scope) {
        //Remove Skill
        $scope.removeSkill = function (index) {
            ga('send', {
                hitType: 'event',
                eventCategory: 'RemoveSkill',
                eventAction: 'click',
                eventLabel: 'Remove Skill'
            });
            $scope.skills.splice(index, 1);
            $scope.profile.setRemoteProperty('skills', angular.copy($scope.skills));
        };

        //Add Skill
        $scope.showSkillAdd = false;
        $scope.skillAddShow = function () {
            
            $scope.skillAdd = {
                name: '', endorsers: 0
            };
            $scope.showSkillAdd = true;
        };
        $scope.skillAddConfirm = function () {
            ga('send', {
                hitType: 'event',
                eventCategory: 'AddSkill',
                eventAction: 'click',
                eventLabel: 'Add Skill'
            });
            var i = 0;
            for (; i < $scope.skills.length; ++i)
                if ($scope.skillAdd.endorsers > $scope.skills[i].endorsers)
                    break;
            $scope.skills.splice(i, 0, $scope.skillAdd);
            $scope.profile.setRemoteProperty('skills', angular.copy($scope.skills));
            $scope.showSkillAdd = false;
        };
    }]);
