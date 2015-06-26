
app.controller("main-controller", ["$scope", "meals", function($scope, meals) {
  meals.success(function(data) {
      $scope.mealsInfo = data;
    });
}]);