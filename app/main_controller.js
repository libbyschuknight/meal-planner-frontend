
app.controller("main-controller", ["$scope", 'meals', function($scope, meals) {
  meals.succes(function(data) {
      $scope.mealsInfo = data;
    });
}]);