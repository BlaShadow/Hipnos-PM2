/*
 *
 *
 **/

'use strict';

angular.module('app.services')

.service('RequestService',['Base64','$http','$q',function(Base64,$http,$q){

	var def = $q;

	this.execute = function(target,user,password){

		var data = Base64.encode(user + ':' + password);

		$http.defaults.headers.common.Authorization = 'Basic ' + data;

		return $http({
			url:target,
			method:'GET',
		}).then(function(response){
			return response.data;
		},function(error){
			return def.reject(error);
		});
	};
}]);