
app.controller("main-controller", ["$scope", "meals", function($scope, meals,UserInfo) {
  meals.success(function(data) {
      $scope.mealsInfo = data;
    });
     
}]);