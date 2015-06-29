'use strict';

// Declare app level module which depends on views, and components

// var app = angular.module('MealsApp', [
//   'ngRoute'
// ]).config(['$routeProvider', function($routeProvider) {
//   $routeProvider.otherwise({redirectTo: '/index'});
// }]);


var app = angular.module('MealsApp', ['ngRoute'])

app.config(['$routeProvider' , function($routeProvider) {

        // var currentImgSrcSanitizationWhitelist = $compileProvider.imgSrcSanitizationWhitelist();
        // var newImgSrcSanitizationWhiteList = currentImgSrcSanitizationWhitelist.toString().slice(0,-1)
        // '|chrome-extension:'
        // currentImgSrcSanitizationWhitelist.toString().slice(-1);

        // console.log("Changing imgSrcSanitizationWhiteList from "+currentImgSrcSanitizationWhitelist+" to "+newImgSrcSanitizationWhiteList);
        // $compileProvider.imgSrcSanitizationWhitelist(newImgSrcSanitizationWhiteList);


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
    controller: "MealController",
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
    templateUrl: "views/home.html"
  })
    .when("/SearchedMeals", {
  controller: "MainController",
    templateUrl: "views/SearchedMeals.html"
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



