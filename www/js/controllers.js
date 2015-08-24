angular.module('app.controllers')

.controller('AppCtrl',['$scope','$state',function($scope,$state){

    $scope.add = function(){
        $state.go('app.hostAdd');
    };

    $scope.home = function(){
        $state.go('app.host');
    };
}]);
