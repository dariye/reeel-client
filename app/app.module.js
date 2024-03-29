'use strict';

/**
 * @ngdoc overview
 * @name reeelApp
 * @description
 * # reeelApp
 *
 * Main module of the application.
 */
var app = angular.module('reeelApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ParseService',
    'angularFileUpload'
])

.value('$anchorScroll', angular.noop)

.run(['ParseSDK', 'FileUploader', 'User', 'Screening', '$rootScope', '$state', '$stateParams', '$location', 'Auth', function(ParseSDK, FileUploader, User, Screening, $rootScope, $state, $stateParams, $location, Auth) {
    
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.currentUser = Parse.User.current();
    /**
     * Authorization resolve
     * Send unathorized user to login
     */
    $rootScope.$on('$stateChangeError', function() { 
      $state.go('login');
    });
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams,  fromState, fromParams, error) {
        console.log('to', toState, toParams);
        console.log('toState', toState);
        console.log('toParams', toParams);

        console.log('fromState', fromState);
        console.log('fromParams', fromParams);
        console.log('authenticated:', toState.authenticated);
        
    });
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams, error) {
        console.log('success', toState, toParams);
    });
    
    /**
     * Retrieve Screenings Globally
     */
    $rootScope.screenings = [];
    /**
     * Global Method
     * go() method to change routes
     * wraps angular's default $state.go()
     */
    $rootScope.go = function(state){
      $state.go(state);
    }

    /**
     * Global method
     * logOut() method to log user out
     */
     $rootScope.logOut = function () {
      Parse.User.logOut();
      $rootScope.currentUser = null;
      $rootScope.notify = { type: 'success', message: 'Logged out successfully'};
      $location.path('/login');
     }
    /**
     * alert 
     */
    $rootScope.alert = function(){ 
      if($rootScope.notify.type != '') {
        return true;
      }else {
        return false;
      }
    }

    $rootScope.close = function() {
      $rootScope.alert = false;
    }
    /**
     * notify for global notifications and alerts
     * @type object
     * @default {}
     */
    $rootScope.notify = {type: '', message: ''};


}]);


