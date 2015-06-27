app.controller("MealController", ["$scope", "meals", '$routeParams', function($scope, meals, $routeParams) {
  meals.success(function(data) {
    $scope.detail = data[$routeParams.id];
    console.log($scope.detail);
  });

  $scope.AddToMealPlan = function() {
    var meal = $scope.detail;

    // var mealData = JSON.stringify(data);
    console.log(meal.Id);

    // $http({
    //   method: "POST",
    //   url:
    // })



  }

}]);







