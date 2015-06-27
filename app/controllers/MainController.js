var app = angular.module('MealsApp');
app.controller("MainController",
  ["$scope", "meals", "userAuthenticationService", function($scope, meals, userAuthenticationService) {
    meals.success(function(data) {
      $scope.mealsInfo = data;

      var userResponse = userAuthenticationService.GetUserName();
      userResponse.success(function(data)
      {
        $scope.UserName = data.Email;
      })
      .error(function(data){
        $scope.UserName = "Error";
      });
    });
}]);
