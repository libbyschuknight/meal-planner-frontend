// var app = angular.module('MealsApp'); - this is in app.js, don't need here - LIBBY

app.controller("MainController",
  ["$scope", "$http", "meals", "userAuthenticationService", "$window","$rootScope", function($scope, $http, meals, userAuthenticationService, $window,$rootScope) {
   angular.element(document).ready(function () {

if($window.sessionStorage.getItem('tokenKey') != null){

          localStorage.loggedin = "none";
          localStorage.loggedout = "block";
        }
        else
        {
          localStorage.loggedin = "block";
          localStorage.loggedout = "none";
        }

        var sup = document.getElementById("signup");
        sup.style.display = localStorage.loggedin;
        var sin = document.getElementById("signin");
        sin.style.display = localStorage.loggedin;
        var sout = document.getElementById("signout");
        sout.style.display = localStorage.loggedout;



    var userResponse = userAuthenticationService.GetUserName();
      userResponse.success(function(data)
      {
        console.log(data)
        $scope.UserName = data.Name;
      })
      .error(function(data){
          console.log("broke user response")
      });

    meals.success(function(data) {
      $scope.mealsInfo = data;
    });


    $scope.getShoppingList = function() {
      $scope.arrayOfIng = "test";
      var authoriz = 'Bearer ' + $window.sessionStorage.getItem('tokenKey');
      //console.log('authoriz', authoriz);
      $http({
      method: 'GET',
      url: 'http://roameals.azurewebsites.net/api/MealPlans/ShoppingList',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authoriz
      }
    })
      .success(function(data){
        $scope.arrayOfIng = data;
  	})
      .error(function(data){

      })
    }()


  $scope.arrayOfIng=" ";
    var logindisplay=function(event, dataforme)
    {
      $scope.UserName=dataforme
    }
     var logoutdisplay=function(event, dataforme )
    {
      $scope.UserName=" ";
    }
    $rootScope.$on("logged-in", logindisplay);
    $rootScope.$on("logged-out", logoutdisplay);
  })


  $scope.toggleCSS = function () {
    window.print();
  }



  // for selecting a meal from the home page meal boxes
  $scope.AddToMealPlanHome = function (day, id) {
    var authoriz = 'Bearer ' + $window.sessionStorage.getItem('tokenKey');
    // var meal = $scope.mealsInfo;
    // console.log("meal AddToMealPlanHome", meal)
    // var idPlusOne = id + 1;
    var meal = $scope.mealsInfo[id]
    // console.log("meal id", meal)

    $http({
      url: "http://roameals.azurewebsites.net/api/MealPlans/AddTo?day=" + day,
      method: "POST",
      data: meal,
      uri: day,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authoriz
      }
    })
      .success(function (data) {
           location.reload();
      // console.log("yolo swag", data);
    })
      .error(function (data) {
      console.log("add meal error", data);
    })
  }

}]);


