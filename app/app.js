'use strict';

// Declare app level module which depends on views, and components

var app = angular.module('MealsApp', [ 'ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/index'});

// var app = angular.module('MealsApp', [
//   'ngRoute'
// ]).config(['$routeProvider', function($routeProvider) {
//   $routeProvider.otherwise({redirectTo: '/index'});
// }]);


var app = angular.module('MealsApp', ['ngRoute'])

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when("/", {
    controller: "main-controller",
    templateUrl: "views/home.html"
  })
  .when("/meal-details/:id", {
    controller: "meal-controller",
    templateUrl: "views/meal-details.html"
  })
  .otherwise({redirectTo: '/'
  });

}]);


// app.config(['$routeProvider', function($routeProvider) {
//   $routeProvider
//   .when("/", {
//     controller: "main-controller",
//     templateUrl: "views/home.html"
//   })
//   .otherwise({redirectTo: '/'
//   });
// }]);



