var app = angular.module('MealsApp');
app.controller("MainController",
  ["$scope", "$http", "meals", "userAuthenticationService", "$window", function($scope, $http, meals, userAuthenticationService, $window) {
    meals.success(function(data) {
      $scope.mealsInfo = data;
      // console.log($scope.mealsInfo);

      var userResponse = userAuthenticationService.GetUserName();
      userResponse.success(function(data)
      {
        $scope.UserName = data.Email;
      })
      .error(function(data){
        // have made this error message below an emptu string so we don't have "error" coming up on the home page when viewing with no user logged in
        $scope.UserName = "";
         //  $window.location.href = '#Login';
      });
    });



      $scope.getShoppingList = function() {
      var authoriz = 'Bearer ' + $window.sessionStorage.getItem('tokenKey');
      $http({
        method: 'GET',
        url: 'http://roameals.azurewebsites.net/api/MealPlans',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authoriz
        }
      })
      .success(function(data){
        console.log("SHOPPING LIST SUCCESS");
        console.log(data);
        })
      .error(function(data){
        console.log("error: ", data);
      })
  }
}]);

