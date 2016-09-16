var appRoutes = angular.module('appRoutes', []);

appRoutes.config(['$routeProvider', '$locationProvider', '$sceDelegateProvider',function($routeProvider, $locationProvider, $sceDelegateProvider){
  $routeProvider
    .when('/', {
        templateUrl: './views/pages/home.client.view.html',
        requireAuth: false
    })
    .when('/cart/items', {
        templateUrl: './views/account/items.client.view.html',
        controller: 'AuthController',
        requireAuth: false
    })

    .otherwise({ redirectTo: '/' });

    //eliminate the hashbang
    $locationProvider.html5Mode(true);
}]);

