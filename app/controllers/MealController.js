app.controller("MealController", ["$scope", "meals", '$routeParams', function($scope, meals, $routeParams) {
  meals.success(function(data) {
    $scope.detail = data[$routeParams.id];
    console.log($scope.detail);
  });
}]);