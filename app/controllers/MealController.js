app.controller("MealController", ["$scope", "$http", "meals", '$routeParams', '$window', function($scope, $http, meals, $routeParams, $window) {
  meals.success(function(data) {
    $scope.detail = data[$routeParams.id];
    console.log($scope.detail);
  });

  $scope.AddToMealPlan = function() {

  	var authoriz = 'Bearer ' + $window.sessionStorage.getItem('tokenKey');
    var meal = $scope.detail;
    var id = meal.Id;
    console.log(id);
    console.log("ttttttttttttttttttttttttttttttttttttt"); 
    console.log(authoriz) 

$http({
      url: "http://localhost:62555/api/MealPlans/AddTo",
      method: "POST",
      data: meal,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authoriz
      }
    })
    .success(function(data){
      console.log("yolo swag");

    })
  }
}]);



