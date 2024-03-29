'use strict';

/**
 * @ngdoc function
 * @name reeelApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the reeelApp
 */
angular.module('reeelApp')
  .controller('LandingController', ['$rootScope', '$scope', 'User', 'Screening', '$timeout', function($rootScope, $scope, User, Screening, $timeout) {
    console.log(Screening.getAllScreening());
    var currentUser = $scope.currentUser = $rootScope.currentUser;
    console.log(currentUser);

    Screening.getAllScreening().then(function(screenings){
      $scope.screenings = screenings;
      $timeout(function(){$scope.$apply();}, 150);
    });

  }]);
