'use strict';

angular.module('reeelApp')
  .controller('RecoverPasswordController', ['$rootScope', '$scope', 'User', function($rootScope, $scope, User){
  
  $scope.requestPasswordReset = function () {
    if ($scope.email) {
      User.requestPasswordReset($scope.email);
      $rootScope.go('login');
    }else {
      $rootScope.notify = {type: 'warning', message: 'Please enter your email'};
      return;
    }
  }

  }]);
