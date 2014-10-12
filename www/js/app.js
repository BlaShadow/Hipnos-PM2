// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

'use strict';

angular.module('hipnos', ['ionic','app.controllers'])

.run(['$ionicPlatform',function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
}])

.config(['$httpProvider','$stateProvider','$urlRouterProvider',function($httpProvider,$stateProvider, $urlRouterProvider) {

  $httpProvider.defaults.useXDomain = true;
  $httpProvider.defaults.headers.common = 'Content-Type: application/json';

  delete $httpProvider.defaults.headers.common['X-Requested-With'];

  $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })

    .state('app.host', {
      url: '/host/',
      views: {
        'menuContent' :{
          templateUrl: 'templates/host/list.html',
          controller: 'HostListCtrl',
        }
      }
    })

    .state('app.hostAdd', {
      url: '/host/add/',
      views: {
        'menuContent' :{
          controller: 'HostCreateCtrl',
          templateUrl: 'templates/host/add.html'
        }
      }
    })

    .state('app.hostEdit', {
      url: '/host/edit/:id',
      views: {
        'menuContent' :{
          controller: 'HostEditCtrl',
          templateUrl: 'templates/host/add.html'
        }
      }
    })
    
    .state('app.hostView', {
      url: '/host/view/:id',
      views: {
        'menuContent' :{
          controller: 'HostViewCtrl',
          templateUrl: 'templates/host/view.html'
        }
      }
    })
    .state('app.about', {
      url: '/about',
      views: {
        'menuContent' :{
          templateUrl: 'templates/home/about.html',
        }
      }
    });
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/about');

}]);

