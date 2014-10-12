/*
 * Host Edit controller
 *
 **/

'use strict';

angular.module('app.controllers')

.controller('HostEditCtrl',['$scope','$ionicPopup','$stateParams','$state','DatabaseService',function($scope,$ionicPopup,$stateParams,$state,DatabaseService){

	$scope.id = $stateParams.id;

	$scope.model = {};	

	$scope.load = function(){
		DatabaseService.get($scope.id,function(item){
			$scope.model = item;
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

	$scope.save = function(){

		var id = $scope.id;
		var name = $scope.model.name;
		var target = $scope.model.target;
		
		$scope.model.credentials = $scope.model.credentials === undefined?{}:$scope.model.credentials;

		var credentials = {
			name:$scope.model.credentials.name,
			password:$scope.model.credentials.password,
		};		

		DatabaseService.update(id,name,target,credentials,function(){
			$scope.showAlert('Info','Host Updated',function(){
				$state.go('app.host');
			});
		});
	};
}]);