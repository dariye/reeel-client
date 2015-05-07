'use strict';

angular.module('reeelApp')
  .controller('SignupController', ['$rootScope', '$scope','$state', 'User', function($rootScope, $scope, $state, User) {
  /**
     * Check if user is already logged in
     * Redirect to 'profile' state if already logged in
     */
    if ($rootScope.currentUser){
      $rootScope.notify = { type: 'warning', message: 'Already logged in' };
      $rootScope.go('profile');
    } 
  console.log(User);
  /**
   * $scope.currentUser
   */
  $scope.currentUser = $rootScope.currentUser;
  
  $scope.signUp = function() {

    if($scope.username && $scope.email && ($scope.password == $scope.password_confirmation)) {
      User.signUp($scope.username, $scope.email, $scope.password);
      $rootScope.go('profile');
    }else {
      $rootScope.notify = { type: 'warning', message: 'Please check the form fields' };
      return;
    }
  }

 }]);
