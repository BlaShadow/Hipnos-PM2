/*
 * Database Service
 *
 **/

'use strict';

angular.module('app.services')

.service('DatabaseService',['LocalStorage',function(LocalStorage){

	this.update = function(id,name,target,credentials,callback){
		var model = {
			name:name,
			target:target,
			credentials:{
				name:credentials.name,
				password:credentials.password
			},
		};

		LocalStorage.update(id,model);

		callback();
	};
	
	this.createHost = function(name,target,credentials,callback){

		var model = {
			name:name,
			target:target,
			credentials:{
				name:credentials.name,
				password:credentials.password
			}
		};

		LocalStorage.addHost(model);

		callback();
	};

	this.get = function(id,callback){
		callback(LocalStorage.getHost(id));
	};

	this.saveExecution = function(id,dataExecution){
		LocalStorage.saveExecution(id,dataExecution);
	};

	this.removeHost = function(id,callback){
		LocalStorage.removeHost(id);

		callback();
	};

	this.list = function(callback){
		callback(LocalStorage.allHost());
	};
}]);