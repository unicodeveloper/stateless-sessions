app.factory('Auth', ['$http','$q','$window','$localStorage', function($http, $q, $window, $localStorage) {
  return {

    addToCart: function(credentials, cb) {
      $http.post('/api/cart', credentials).then(function(response ){
        if(response.data.success){
          cb(true, response.data);
        }
        else {
          cb(false, response.data);
        }
      });
    }
  };
}]);