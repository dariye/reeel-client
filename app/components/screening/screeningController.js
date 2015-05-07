'use strict';

angular.module('reeelApp')
  .controller('ScreeningController', ['$rootScope', '$scope', '$state', 'User', 'Screening', function($rootScope, $scope, $state, User, Screening){
  
  /**
   * get all screenings
   */

  console.log($scope.screenings = Screening.getAllScreening());
  
  }]);
