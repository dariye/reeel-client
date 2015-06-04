'use strict';

angular.module('reeelApp')
  .factory('Auth', [function() {
    return {
      isLoggedIn: function(){
        if(Parse.User.current()){
          return true;
        }else{
          return false;
        }
      },
      user: function(){ 
        return Parse.User.current();
      }
    };
    }]);
