/*
 *
 *
 **/

'use strict';

angular.module('app.services')

.service('LocalStorage',['$window',function(_windowa) {

    var dbName = 'Hipnos';

    var db = {
        data:[],
        lastID:0,
    };

    var getDB = function(){

        var dbObject = _windowa.localStorage[dbName] || db;

        return typeof(dbObject) === typeof('')?JSON.parse(dbObject):dbObject;
    };

    var commit = function(db) {
        _windowa.localStorage[dbName] = JSON.stringify(db);

        console.log('Database Updated');
    };

    var wrapGetHost = function(id){
        var db = getDB();

        var item = db.data.filter(function(item){
            return parseInt(item.id) === parseInt(id);
        });

        return item[0];
    };

    this.addHost = function(value) {
        var db = getDB();

        value.id = db.lastID;

        db.data.push(value);

        //increase id
        db.lastID = db.lastID + 1;

        commit(db);
    };

    this.update = function(id,data){
        var db = getDB();

        data.id = id;

        //remove old item
        db.data = db.data.filter(function(current){
            return parseInt(current.id) !== parseInt(id);
        });

        db.data.push(data);

        commit(db);
    };

    this.getHost = function(id) {
        return wrapGetHost(id);
    };

    this.removeHost = function(id){
        var db = getDB();

        var items = db.data.filter(function(item){
            return parseInt(item.id) !== parseInt(id);
        });

        db.data = items;

        commit(db);
    };

    this.saveExecution = function(id,data){
        var db = getDB();
        var item = wrapGetHost(id);

        item.execution = data;

        //remove old item
        db.data = db.data.filter(function(current){
            return parseInt(current.id) !== parseInt(id);
        });

        //add it again
        db.data.push(item);

        //percist changes
        commit(db);
    };

    this.allHost = function(){
        return getDB().data;
    };

}]);