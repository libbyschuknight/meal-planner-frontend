'use strict';

// Declare app level module which depends on views, and components

// var app = angular.module('MealsApp', [
//   'ngRoute'
// ]).config(['$routeProvider', function($routeProvider) {
//   $routeProvider.otherwise({redirectTo: '/index'});
// }]);


var app = angular.module('MealsApp', ['ngRoute'])

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when("/index", {
    controller: "MainController",
    templateUrl: "views/home.html"
  })
  .when("/MealDetails/:id", {
    controller: "MealController",
    templateUrl: "views/MealDetails.html"
  })
   .when("/Register", {
    controller: "RegisterController",
    templateUrl: "views/Register.html"
  })
   .when("/Login", {
    controller: "LoginController",
    templateUrl: "views/Login.html"
  })
   .when("/WeekPlanner", {
    controller: "MainController",
    templateUrl: "views/WeekPlanner.html"
  })
   .when("/ShoppingList", {
    controller: "MealController",
    templateUrl: "views/ShoppingList.html"
  })
    .when("/addAMeal", {
    controller: "MealController",
    templateUrl: "views/addAMeal.html"
  })
   .when("/Logout", {
  controller: "LogoutController",
    templateUrl: "views/Logout.html"
  })
  .otherwise({redirectTo: '/index'

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



