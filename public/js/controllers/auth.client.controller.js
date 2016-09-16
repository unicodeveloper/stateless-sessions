app.controller('AuthController', ['$rootScope','$scope','$http','$location','$localStorage','Auth','toastr', function($rootScope,$scope,$http,$location,$localStorage,Auth,toastr) {

  $scope.addToCart =  function(){
    var credentials = {
      email: $scope.user.email,
      shirt: $scope.user.shirt,
      bag: $scope.user.bag,
      shoe: $scope.user.shoe,
      iphone: $scope.user.iphone7
    };

    Auth.addToCart(credentials, function(success, data) {
      if(success) {
        $localStorage.id_token = data.token;
        $localStorage.id_user = data.user.email;
        $rootScope.currentUser = $localStorage.id_user;
        toastr.success('Added to Cart Successfully. Check local Storage. Then try to access the /api/checkout route from the terminal', { timeOut: 1000 });
      }
      else {
        toastr.error(data.message, 'Error', { timeOut: 2000 });
      }
    });
  };
}]);