'use strict';


angular.module('reeelApp')
  .factory('Screening', ['$rootScope', '$state', 'User', function($rootScope, $state, User) {
    
    var Screening = Parse.Object.extend('Screening');

    return {
      createScreening: function(screeningTitle, screeningDate, screeningSynopsis, screeningPoster, screeningReleaseDate, screeningContentRating, screeningDuration, screeningGenre, screeningDirectorInfo, screeningStarInfo, screeningFee, screeningDiscount){
      var screening = new Screening();
      var user = Parse.User.current();

      screening.set('screeningTitle', screeningTitle);
      screening.set('screeningDate', screeningDate);
      screening.set('screeningSynopsis', screeningSynopsis);
      screening.set('screeningPoster', screeningPoster);
      screening.set('screeningReleaseDate', screeningReleaseDate);
      screening.set('screeningContentRating', screeningContentRating);
      screening.set('screeningDuration', screeningDuration);
      screening.set('screeningGenre', screeningGenre);
      screening.set('screeningDirectorInfo', screeningDirectorInfo);
      screening.set('screeningStarInfo', screeningStarInfo);
      screening.set('screeningFee', screeningFee);
      screening.set('screeningDiscount', screeningDiscount);
      
      /**
       * add a user a value in a screening
       */
      screening.set('createdBy', user);

      screening.save(null, {
        success: function(screening) {
          $rootScope.notify = {type: 'success', message: 'Successfully Created Screening'};
          $rootScope.currentUser = user;
        },
        error: function (user, error) {
          $rootScope.notify = {type: 'error', message: 'Error: ' + error.code + ' ' + error.message};
        }
      });

      },
      getAllScreening: function(){
        var user = Parse.User.current();
        var query = new Parse.Query('Screening');
        return query.equalTo('createdBy');  
      },
      updateScreening: function(screeningId, screeningTitle, screeningDate, screeningSynopsis, screeningPoster, releaseDate, contentRating, screeningDuration, screeningGenre, screeningDirectorInfo, screeningStarInfo, screeningFee, screeningDiscount){
      var user = Parse.User.current();
      var query = new Parse.Query('Screening');
      // var screening = fetchedComment.tagName 

      (typeof(screeningTitle) == 'undefined') ? console.log('not creating with screening title') : screening.set('screeningTitle', screeningTitle); 
      (typeof(screeningDate) == 'undefined') ? console.log('not creating with screening date') : screening.set('screeningDate', screeningDate);
      (typeof(screeningSynopsis) == 'undefined') ? console.log('not creating with screeningSynopsis') : screening.set('phone', screeningSynopsis);
      (typeof(email) == 'undefined') ? console.log('not updating with email') : user.set('profileEmail', email); 
      (typeof(description) == 'undefined') ? console.log('not updating with description') : user.set('description', description);
      (typeof(city) == 'undefined') ? console.log('not updating with city') : user.set('city', city);

      }
    
    };

  }]);
