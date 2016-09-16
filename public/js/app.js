var app = angular
            .module('stateless-sessions', [
              'ngCookies',
              'ngRoute',
              'ngStorage',
              'ngMessages',
              'angular-loading-bar',
              'ui.bootstrap',
              'appRoutes',
              'ngSanitize',
              'toastr'])
  .factory('authInterceptor', function($q, $location, $window, $localStorage){
    return {
      request: function(config){
        config.headers = config.headers || {};
        var token = $localStorage.mean_token;

        if(token){
          config.headers["x-access-token"] = token;
        }
        return config;
      },

      responseError: function(response){
        if(response.status == 401){
          $location.path('/auth/login');
        }
        return $q.reject(response);
      }
   };
  })
  .config(['cfpLoadingBarProvider','$httpProvider', function(cfpLoadingBarProvider, $httpProvider){
    $httpProvider.interceptors.push('authInterceptor');
    cfpLoadingBarProvider.includeSpinner   = false;
    cfpLoadingBarProvider.includeBar       = true;
  }])
  .run(['$rootScope', '$location', function($rootScope, $location) {
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
      if($rootScope.currentUser === undefined  && next.requireAuth) {
        $location.path( "/" );
      }
    });
  }]);