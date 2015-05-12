'use strict';

angular.module('reeelApp')
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$anchorScrollProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $anchorScrollProvider) {
   /**
   * Authorization
   */
  var authenticated = function(){
     
  };

  $stateProvider
    .state('landing', {
      url: '/',
      controller: 'LandingController',
      templateUrl: 'components/landing/landingView.html'
    })
    .state('user', {
      abstract: true,
      templateUrl: 'components/user/userView.html'
    })
    .state('signup', { 
      url: '/signup',
      parent: 'user',
      controller: 'SignupController',
      templateUrl: 'components/user/signup/signupView.html'
    })
    .state('login', {
      url: '/login',
      parent: 'user',
      controller: 'LoginController',
      templateUrl: 'components/user/login/loginView.html'
    })
    .state('recover', {
      url: '/recover',
      parent: 'user',
      controller: 'RecoverPasswordController',
      templateUrl: 'components/user/recover/recoverpasswordView.html'
    })
    .state('profile', {
      url: '/profile',
      parent: 'user',
      controller: 'ProfileController',
      templateUrl: 'components/user/profile/profileView.html',
      resolve: {
        authenticated: ['Auth', function(Auth) {
          return Auth.isLoggedIn();
        }]
      }
    })
    .state('screening', {
      abstract: true,
      templateUrl: 'components/screening/screeningView.html'
    })
    .state('screening.create', {
      url: '/screening/new',
      parent: 'screening',
      controller: 'ScreeningController',
      templateUrl: 'components/screening/create/createScreeningView.html',
      resolve: {
        authenticated: ['Auth', function(Auth){
          return Auth.isLoggedIn();
        }]
      }
    })
    .state('screening.update', {
      url: '/screening/update/:screeningId',
      parent: 'screening',
      controller: 'ScreeningController',
      templateUrl: 'components/screening/update/updateScreeningView.html',
      resolve: {
        authenticated: ['Auth', function(Auth){
          return Auth.isLoggedIn();
        }],
        screeningId: ['$stateParams', function($stateParams){
          return $stateParams.screeningId;
        }]
      }
    }); 
  $urlRouterProvider.otherwise("/");
  $locationProvider.html5Mode(true).hashPrefix('!');
  
  /**
   * Page refresh: http://stackoverflow.com/questions/25401114/livereload-html5-pushstate-with-angularjs-ui-router-and-yeoman
   */
}]);
