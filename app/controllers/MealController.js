app.controller("MealController", ["$scope", "meals", '$routeParams', function($scope, meals, $routeParams) {
  meals.success(function(data) {
    $scope.detail = data[$routeParams.id];
    console.log($scope.detail);
  });

  $scope.AddToMealPlan = function() {
    var meal = $scope.detail;
    var id = meal.Id;
    var authoriz = 'Bearer ' + $window.sessionStorage.getItem('tokenKey');

    $http({
      method: "POST",
      url: "http://roameals.azurewebsites.net/api/MealPlans/AddTo",
      data: id,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authoriz
      }
    })
    .success(function(data){
      console.log(data);
    })
  }
}]);







