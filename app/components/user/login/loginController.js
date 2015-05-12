'use strict';

angular.module('reeelApp')
  .controller('LoginController', ['$rootScope', '$scope', '$state', 'User', '$location', function($rootScope, $scope, $state, User, $location) {
  
    var currentUser = $scope.currentUser = $rootScope.currentUser;

    /**
     * Check if user is already logged in
     * Redirect to 'profile' state if already logged in
     */
    if (currentUser){
      $rootScope.notify = { type: 'warning', message: 'Already logged in' };
      $rootScope.go('landing');
    }
   /**
   * $scope.username as username
   * $scope.password as password
   */

  $scope.logIn = function() {
    if ($scope.username && $scope.password) {
      User.logIn($scope.username, $scope.password);
      console.log('in log in');
      $location.path('/profile');
    }else {
      $rootScope.notify = { type: 'warning', message: 'Please enter fields correcty' };
      return;
    }
  }
             
  }]);


