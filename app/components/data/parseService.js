'use strict';

angular.module('ParseService', [])
  .factory('ParseSDK', function () {  
    /**
    * Initialize Parse with API ID and API Key
    */
    Parse.initialize('R0o50fZOPQuUPEsL5L4wSs0ToG9PF26eQRQD8W0s', 'pMmUHQgNHNOloNqWSkE9RkxwRUrPsOqJz0aOQoFW');

    return { ParseInitialized: true };

});
