'use strict';

angular.module('reeelApp')
  .controller('LoginController', ['$rootScope', '$scope', '$state', 'User', function($rootScope, $scope, $state, User) {
  
    /**
     * Check if user is already logged in
     * Redirect to 'profile' state if already logged in
     */
    if ($rootScope.currentUser){
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
      $rootScope.go('profile');
    }else {
      $rootScope.notify = { type: 'warning', message: 'Please enter fields correcty' };
      return;
    }
  }
             
  }]);


