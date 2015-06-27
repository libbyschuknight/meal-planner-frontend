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
      url: "http://roameals.azurewebsites.net/api/MealPlans/AddTo",
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
    .error(function(data) {
      console.log("add meal error", data);
    })
  }


$scope.getMealPlan = function() {
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
        console.log("GETTING MEAL PLAN");
        mealPlan = data;
        console.log(mealPlan);

        })
      .error(function(data){
        console.log("error: ", data);
      })
  }

  $scope.addAMeal = function() {
      var authoriz = 'Bearer ' + $window.sessionStorage.getItem('tokenKey');
      var data = {
        Name : $scope.mealName,
        Description : $scope.description,
        Ingredients : [{Name : $scope.ingredientName,
                        Quantity : $scope.quantity,
                        Measurement : $scope.measurement}],
        User : { Email : ""}
      }
      var mealData = JSON.stringify(data);
      $http({
        method: 'POST',
        url: 'http://roameals.azurewebsites.net/api/Meals',
        data: mealData,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authoriz
        }
      })
      .success(function(data){
        console.log("ADDING A MEAL");
        console.log(data);
        })
      .error(function(data){
        console.log("error: ", data);
      })
  }

}]);



