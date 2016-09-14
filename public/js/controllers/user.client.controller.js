app.controller('UserController', ['$rootScope','$scope','$http','$location','$window','$localStorage','$modal','$log','Upload','Auth','User','Project','toastr','leafletData','Geocoder', function($rootScope,$scope,$http,$location,$window,$localStorage,$modal,$log,Upload,Auth,User,Project,toastr,leafletData,Geocoder) {

  var userId =  $rootScope.currentUser._id;

  User.getProfile(userId, function(success, data){
    if(success){
      $scope.userDetails = data.user;
      $rootScope.fullname = data.user.fullname;
      $rootScope.username = data.user.username;
    }
  });

  User.getAllUsers().then( function(response){
    $scope.allUsers = response.data;
  });

}]);