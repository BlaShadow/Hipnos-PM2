/*
 * Host Create controller
 *
 **/

'use strict';

angular.module('app.controllers')

.controller('HostCreateCtrl',['$scope','$state','$ionicPopup','DatabaseService',function($scope,$state,$ionicPopup,DatabaseService){

	$scope.model = {};

	$scope.save = function(){

		var name = $scope.model.name;
		var target = $scope.model.target;
		
		$scope.model.credentials = $scope.model.credentials === undefined?{}:$scope.model.credentials;

		var credentials = {
			name:$scope.model.credentials.name,
			password:$scope.model.credentials.password,
		};

		DatabaseService.createHost(name,target,credentials,function(){

			$scope.showAlert('Info','Host saved',function(){
				$state.go('app.host');
			});
		});
	};

	$scope.showAlert = function(title,mmessage,callback) {
	    var alertPopup = $ionicPopup.alert({
	        title: title,
	        template: mmessage
	    });

	    alertPopup.then(function() {
			if(callback !== undefined){
				callback();
			}
	    });
	};
}]);