app.controller("MealController", ["$scope", "$http", "meals", '$routeParams', '$window', function($scope, $http, meals, $routeParams, $window) {

  meals.success(function(data) {

    $scope.detail = data[$routeParams.id];
    $scope.likes = data[$routeParams.id].Likes
    $scope.dislikes = data[$routeParams.id].Dislikes

  });

  if (accessToken != undefined || accessToken != null) {
    CheckUser();
  } else if($window.sessionStorage.length == 0) {
    $window.location.href = '#Login';
  }


  // for selecting meal from meal details page
  $scope.AddToMealPlan = function (day) {
   console.log("day add to meal", day)
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

    }).success(function (data) {
      location.reload();

    })
      .error(function (data) {
      console.log("add meal error", data);
    })
  }


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
    })
      .error(function (data) {
      console.log("error: ", data);
    })
  }()

  $scope.showMealPlan = "";

  var IngredientList = [];
  $scope.displayIngredient=[];

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
 $scope.displayIngredient.push(ingredient);
    $scope.ingredientName = null;
    $scope.quantity = null;
    $scope.measurement = null;
    console.log(IngredientList);
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

    // console.log(IngredientList);


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

      console.log("ADDING A MEAL");

      IngredientList.length = 0;
       $scope.displayIngredient.length=0;
      location.reload();
    })
      .error(function (data) {
      console.log("error: ", data);
    });
  };

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
           console.log("Meal PLan", data);
           $scope.showMealPlan = data;

      }).error(function(data)
      {
         console.log("error deleting ", data);
      });
  };

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
       $scope.likes = data;


    }).error(function(data)
    {
      $scope.voteError = data.Message;
       });

  }



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
      $scope.dislikes = data;
    }).error(function(data)
    {
       $scope.voteError = data.Message;
    });
  };


}]);



