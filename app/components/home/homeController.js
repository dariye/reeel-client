'use strict';

/**
 * @ngdoc function
 * @name reeelApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the reeelApp
 */
angular.module('reeelApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
