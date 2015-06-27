var app = angular.module('MealsApp');
app.controller("MainController",
  ["$scope", "meals", "userAuthenticationService", function($scope, meals, userAuthenticationService) {
    meals.success(function(data) {
      $scope.mealsInfo = data;
      console.log($scope.mealsInfo);

      var userResponse = userAuthenticationService.GetUserName();
      userResponse.success(function(data)
      {
        $scope.UserName = data.Email;
      })
      .error(function(data){
        // have made this error message below an emptu string so we don't have "error" coming up on the home page when viewing with no user logged in
        $scope.UserName = "";
      });
    });
}]);
