'use strict';


angular.module('reeelApp')
  .factory('User', ['ParseSDK', '$rootScope', '$state', function(ParseSDK, $rootScope, $state) {
  
  return {
    signUp: function (username, email, password) {
      var user = new Parse.User();

      user.set('username', username);
      user.set('email', email);
      user.set('password', password);
      // /**
      //  * Set ACL Permissions
      //  */
      // var acl = newParse.ACL();
      // acl.setPublicReadAccess(true);

      // var adminRole = new Parse.Role('admin', acl);
      // adminRole.save();

      user.signUp(null, {
        success: function(user) {
          $rootScope.notify = {type: 'success', message: 'Successfully Created Account'};
          $rootScope.currentUser = user;
        },
        error: function (user, error) {
          $rootScope.notify = {type: 'error', message: 'Error: ' + error.code + ' ' + error.message};
        }
      });
    },
    logIn: function(username, password) {
      Parse.User
        .logIn(username, password, {
          success: function(user) {
            $rootScope.notify = {type: 'success', message: 'Successfully Logged In'};
            $rootScope.currentUser = user;
            // $state.reload(); //TODO: find alternate solution
          },
          error: function(user, error) {
            $rootScope.notify = {type: 'error', message: 'Error: ' + error.code + ' ' + error.message};
          }
        });
    },
    requestPasswordReset: function(email) {
      Parse.User.requestPasswordReset(email, {
        success: function() {
          $rootScope.notify = {type: 'alert', message: 'Please check your email for instructions to recover password'};
        },
        error: function(error) {
          $rootScope.nofity = {type: 'error', message: 'Error: ' + error.code + ' ' + error.message};
        }
      });
    },
    updateUser: function(new_username, new_email, new_password){
      var user = Parse.User.current();
      (typeof(new_username) == 'undefined') ? console.log('not updating username') : user.setUsername(new_username); 
      (typeof(new_email) == 'undefined') ? console.log('not updating email') : user.setEmail(new_email);
      (typeof(new_password) == 'undefined') ? console.log('not updating password') : user.setPassword(new_password);
      user.save(null, {
        success: function(user) {
          $rootScope.currentUser = user;
          $rootScope.notify = { type: 'success', message: 'Successfully updated login information' };
          $state.reload(); // TODO: find alternate solution
        },
        error: function(error) {
          $rootScope.notify = { type: 'error', message: 'Error: ' + error.code + ' ' + error.message };
        }
      });
    },
    getUsername: function() {
      var user = Parse.User.current();
      return user.getUsername();
    },
    getEmail: function() {
      var user = Parse.User.current();
      return user.getEmail();
    },
    updateUserWithProfile: function(photo, name, address, phone, email, description, city){
      var user = Parse.User.current();
       (typeof(photo) == 'undefined') ? console.log('not updating with photo') : user.set('photo', photo);
      (typeof(name) == 'undefined') ? console.log('not updating with name') : user.set('name', name); 
      (typeof(address) == 'undefined') ? console.log('not updating with address') : user.set('address', address);
      (typeof(phone) == 'undefined') ? console.log('not updating with phone') : user.set('phone', phone);
      (typeof(email) == 'undefined') ? console.log('not updating with email') : user.set('profileEmail', email); 
      (typeof(description) == 'undefined') ? console.log('not updating with description') : user.set('description', description);
      (typeof(city) == 'undefined') ? console.log('not updating with city') : user.set('city', city);
      user.save(null, {
        success: function(user) {
          $rootScope.currentUser = user;
          $rootScope.notify = { type: 'success', message: 'Successfully updated profile information' };
          $rootScope.$apply(); //TODO: find alternate solution
        },
        error: function(profile, error) {
          $rootScope.notify = { type: 'error', message: 'Error: ' + error.code + ' ' + error.message };
        }
      });
    },
    getPhoto: function() {
      var user = Parse.User.current();
      return user.get('photo');
    },
    getName: function(){
      var user = Parse.User.current();
      return user.get('name');
    },
    getAddress: function(){
      var user = Parse.User.current();
      return user.get('address');
    },
    getDescription: function(){
      var user = Parse.User.current();
      return user.get('description');
    },
    getPhone: function(){
      var user = Parse.User.current();
      return user.get('phone');
    },
    getProfileEmail: function(){
      var user = Parse.User.current();
      return user.get('profileEmail');
    },
    getCity: function(){
      var user = Parse.User.current();
      return user.get('city');
    }
  };
}]);
