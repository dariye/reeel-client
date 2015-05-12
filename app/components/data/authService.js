'use strict';

angular.module('reeelApp')
  .factory('Auth', [function() {

    var currentUser = Parse.User.current();

    return {
      isLoggedIn: function(){
        if(currentUser){
          return true;
        }else{
          return false;
        }
      },
      user: currentUser
    };
    }]);
