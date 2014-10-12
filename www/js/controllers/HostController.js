/*
 * host controller
 *
 **/

'use strict';

angular.module('app.controllers')

.controller('HostListCtrl',['$scope','$state','$location','DatabaseService',function($scope,$state,$location,DatabaseService){

	$scope.targets = [];

    $scope.add = function(){
        $state.go('app.hostAdd');
    };

	$scope.load = function(){
		DatabaseService.list(function(result){
			$scope.targets = result;
		});
	};

	$scope.navigate = function(url){

		$location.path(url);
	};
}]);

