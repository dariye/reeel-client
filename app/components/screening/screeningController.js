'use strict';

angular.module('reeelApp')
  .controller('ScreeningController', ['$rootScope', '$scope', '$state', '$stateParams', 'User', 'Screening', '$timeout', '$location', function($rootScope, $scope, $state, $stateParams, User, Screening, $timeout, $location){
 
  /**
   * Dynamic routing
   */
  $state.id = $stateParams.screeningId;
  /**
   * Debugging
   */
  console.log($scope.screenings = Screening.getAllScreening());
  console.log(Screening);
  
  $scope.currentUser = $rootScope.currentUser;
  /**
   * File Uploader
   */
  var uploader = $('#photo')[0];
 
  /**
   * Create Screening
   */
  $scope.createScreening = function () {
    
    if($scope.title && $scope.date && $scope.synopsis && $scope.genre && $scope.location && $scope.release && $scope.rating && $scope.duration && $scope.director && $scope.star, $scope.location) {
      /**
       * Convert datetime to unix timestamp
       */
      // $scope.date = Date.parse($scope.date)/1000
      
      if(uploader.files.length > 0){
        var file = uploader.files[0];
        var name = uploader.files[0].name;
        var photo = new Parse.File(name, file);
      }
      Screening.createScreening($scope.title, $scope.date, $scope.synopsis, photo, $scope.release, $scope.rating, $scope.duration, $scope.genre, $scope.director, $scope.star, $scope.location, $scope.screeningType); 
      $rootScope.go('screening.index');
    }else {
      $rootScope.notify = { type: 'warning', message: 'Please check missing form fields'};
      return;
    }
  }
   
  /**
  * Retrieve Screening Details
  */
  if($state.id){
    (Screening.getScreeningWithId($state.id).then(function(screening){
      $scope.title = screening._serverData.screeningTitle;
      $scope.date = screening._serverData.screeningDate;
      $scope.synopsis = screening._serverData.screeningSynopsis;
      $scope.genre = screening._serverData.screeningGenre;
      $scope.release = screening._serverData.screeningReleaseDate;
      $scope.rating = screening._serverData.screeningContentRating;
      $scope.duration = screening._serverData.screeningDuration;
      $scope.director = screening._serverData.screeningDirectorInfo;
      $scope.location = screening._serverData.screeningLocation;
      $scope.star = screening._serverData.screeningStarInfo;
      $scope.screeningType = screening._serverData.screeningFee;
      $scope.photopath = screening._serverData.screeningPoster._name;
      $timeout(function(){$scope.$apply();}, 150);
    },function(error){
      console.log('Error: ' + error.code + ' ' + error.message);
    }));
  }
  
  /**
   * Update Screening Information
   */
  $scope.updateScreening = function(){
    
      /**
       * Convert datetime to unix timestamp
       */
      // $scope.date = Date.parse($scope.date)/1000
      
    if(uploader.files.length > 0){
      var file = uploader.files[0];
      var name = uploader.files[0].name;
      var photo = new Parse.File(name, file);
    }
    Screening.updateScreening($state.id, $scope.title, $scope.date, $scope.synopsis, photo, $scope.release, $scope.rating, $scope.duration, $scope.genre, $scope.director, $scope.star, $scope.location, $scope.screeningType);
    $timeout(function(){ $rootScope.go('screening.index'); $scope.$apply(); }, 150);
  }
  
  Screening.getAllUserScreenings().then(function(screenings){
    $scope.screenings = screenings;
    $timeout(function(){$scope.$apply();}, 150);
  });
  /**
   * Delete Screening
   */
  $scope.deleteScreening = function(){
    
    var confirmation = window.confirm('Are you sure you want to delete' +  ' ' + $scope.title);
    var temp_title = $scope.title;
    if(confirmation){
      Screening.deleteScreening($state.id);
      $timeout(function(){ $location.path('/landing'); $scope.$apply(); }, 150); 
      $rootScope.notify = { type: 'success', message: 'Successfully deleted' + ' ' + temp_title };
    }else{
      $rootScope.notify = { type: 'notice', message: 'Sssshew that was close' };
      return;
    }
  }

  }]);
