app.controller("MealController", ["$scope", "$http", "meals", '$routeParams', '$window', function($scope, $http, meals, $routeParams, $window) {

  meals.success(function(data) {
    $scope.detail = data[$routeParams.id];
  });

  if ($window.sessionStorage.length == 0) {
    $window.location.href = '#Login';
  }



  ////////// Add meal to Weekly Plan

  $scope.AddToMealPlan = function (day) {
    var authoriz = 'Bearer ' + $window.sessionStorage.getItem('tokenKey');
    var meal = $scope.detail;
    var id = meal.Id;

    $http({
      url: "http://roameals.azurewebsites.net/api/MealPlans/AddTo?day=" + day,
      method: "POST",
      data: meal,
      uri: day,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authoriz
      }
    })
      .success(function (data) {
    })
      .error(function (data) {
      console.log("add meal error", data);
    })
  }



  //////// Get a meal plan code

  $scope.getMealPlan = function () {
    var authoriz = 'Bearer ' + $window.sessionStorage.getItem('tokenKey');
    $http({
      method: 'GET',
      url: 'http://roameals.azurewebsites.net/api/MealPlans',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authoriz
      }
    })
      .success(function (data) {
      $scope.showMealPlan = data;
      console.log("show meal plan data", $scope.showMealPlan);
    })
      .error(function (data) {
      console.log("error: ", data);
    })
  }()

  $scope.showMealPlan = "";




  //////// Add a meal code

  var IngredientList = [];
  var localName = $scope.ingredientName;
  var localQuantity = $scope.quantity;
  var localMeasurement = $scope.measurement;

  $scope.newIngred = function () {
    var ingredient = {
      Name: $scope.ingredientName,
      Quantity: $scope.quantity,
      Measurement: $scope.measurement
    }
    IngredientList.push(ingredient);
    $scope.ingredientName = "";
    $scope.quantity = "";
    $scope.measurement = "";
  }


  $scope.addAMeal = function () {
    var authoriz = 'Bearer ' + $window.sessionStorage.getItem('tokenKey');

    var ingredient = {
      Name: localName,
      Quantity: localQuantity,
      Measurement: localMeasurement
    }

    IngredientList.push(ingredient);
    var data =
      {
        Name: $scope.mealName,
        Description: $scope.description,
        ImageUrl: $scope.imageurl,
        Ingredients: IngredientList
      };

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
      .success(function (data) {
      IngredientList.length = 0;
      location.reload();
    })
      .error(function (data) {
      console.log("error: ", data);
    });
  };



  /////////// Delete a meal code

  $scope.deleteMeal = function (index) {
     var authoriz = 'Bearer ' + $window.sessionStorage.getItem('tokenKey');
     $http({
      method: 'POST',
      url: 'http://roameals.azurewebsites.net/api/MealPlans/DeleteFromMealPlan/' + index,
      data: index,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authoriz
      }}).success(function(data)
      {
         //console.log("deleted successfully ");
          location.reload();
      }).error(function(data)
      {
         console.log("error deleting ", data);
      });
  };



  /////////// Vote "Like" code

  $scope.plusOne = function(mealId) {
  var authoriz = 'Bearer ' + $window.sessionStorage.getItem('tokenKey');
   $http({
    method: 'POST',
    url: 'http://roameals.azurewebsites.net/api/Vote/Like/'+mealId,
    data: mealId,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authoriz
    }}).success(function(data)
    {
       location.reload();

    }).error(function(data)
    {
       console.log("error voting", data);
    });

  };

  ///////// Vote "Dislike" code

  $scope.minusOne = function(mealId) {
  var authoriz = 'Bearer ' + $window.sessionStorage.getItem('tokenKey');

   $http({
    method: 'POST',
    url: 'http://roameals.azurewebsites.net/api/Vote/Dislike/'+mealId,
    data: mealId,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authoriz
    }}).success(function(data)
    {
       location.reload();

    }).error(function(data)
    {
       console.log("error voting", data);
    });
  };

}]);