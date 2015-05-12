'use strict';

angular.module('reeelApp')
  .controller('ProfileController', ['ParseSDK', 'FileUploader', 'User', '$rootScope', '$scope', '$timeout', function(ParseSDK, FileUploader, User, $rootScope, $scope, $timeout) {
  
  var currentUser = $scope.currentUser = $rootScope.currentUser;
  /**
   * get username and email
   */
  $scope.username = User.getUsername();
  $scope.email = User.getEmail();

  $scope.updateUser = function(){
    User.updateUser($scope.username, $scope.email, $scope.password);
  }
  /**
   * File Uploader
   */
  var uploader = $('#photo')[0];
  var profilePhoto = Parse.User.current().get('photo');

  /**
   * profile data
   */

  $('img#profilePhoto')[0].src = profilePhoto.url();
  // $scope.profilePicture = User.getPhoto();
  $scope.name = User.getName();
  $scope.address = User.getAddress();
  $scope.phone = User.getPhone();
  $scope.profileEmail = User.getProfileEmail();
  $scope.description = User.getDescription();
  $scope.city = User.getCity();
   

  $scope.updateUserWithProfile = function() {
    if(uploader.files.length > 0){
      var file = uploader.files[0];
      var name = uploader.files[0].name;
      var photo = new Parse.File(name, file);
    }
    User.updateUserWithProfile(photo, $scope.name, $scope.address, $scope.phone, $scope.profileEmail, $scope.description, $scope.city);
  }

  }]);

