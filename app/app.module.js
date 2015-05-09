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

.run(['ParseSDK', 'FileUploader', 'User', 'Screening', '$rootScope', '$state', '$stateParams', function(ParseSDK, FileUploader, User, Screening, $rootScope, $state, $stateParams) {
    
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
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
        console.log('to', toState, toParams);
    });
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams) {
        console.log('success', toState, toParams);
        $rootScope.currentUser = Parse.User.current();
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
      $rootScope.currentUser = Parse.User.current();
      $rootScope.notify = { type: 'success', message: 'Logged out successfully'};
      $rootScope.go('landing');
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


