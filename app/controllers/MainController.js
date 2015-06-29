// var app = angular.module('MealsApp'); - this is in app.js, don't need here - LIBBY
app.controller("MainController",
  ["$scope", "$http", "meals", "userAuthenticationService", "$window","$rootScope", function($scope, $http, meals, userAuthenticationService, $window,$rootScope) {
    meals.success(function(data) {
      $scope.mealsInfo = data;


      var userResponse = userAuthenticationService.GetUserName();
      userResponse.success(function(data)
      {
        $scope.UserName = data.Email;
      })
      .error(function(data){
        // have made this error message below an emptu string so we don't have "error" coming up on the home page when viewing with no user logged in

         //  $window.location.href = '#Login';
      });

 	$scope.searchMeals = function() {
  		console.log($scope.search);
  		console.log($scope.mealsInfo);

  	}()


    });

      $scope.getShoppingList = function() {
        $scope.arrayOfIng = "test";
      var authoriz = 'Bearer ' + $window.sessionStorage.getItem('tokenKey');
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
        console.log($scope.arrayOfIng);
    	})

      .error(function(data){
        console.log("error: ", data);
      })
  }


$scope.arrayOfIng=" ";

  var logindisplay=function(event, dataforme)
  {
    // console.log("y is this not working",dataforme)
    $scope.UserName=dataforme
  }
   var logoutdisplay=function(event, dataforme )
  {
    $scope.UserName=" ";
  }
  $rootScope.$on("logged-in", logindisplay);
  $rootScope.$on("logged-out", logoutdisplay);


  // $scope.hideRow = function() {

  // }


}]);

