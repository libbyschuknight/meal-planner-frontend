
app.controller("MainController",
  ["$scope", "$http", "meals", "userAuthenticationService", "$window","$rootScope", function($scope, $http, meals, userAuthenticationService, $window,$rootScope) {
   angular.element(document).ready(function () {

if($window.sessionStorage.getItem('tokenKey') != null){

          localStorage.loggedin = "none";
          localStorage.loggedout = "block";
        }
        else
        {
          localStorage.loggedin = "block";
          localStorage.loggedout = "none";
        }

        var sup = document.getElementById("signup");
        sup.style.display = localStorage.loggedin;
        var sin = document.getElementById("signin");
        sin.style.display = localStorage.loggedin;
        var sout = document.getElementById("signout");
        sout.style.display = localStorage.loggedout;

    var userResponse = userAuthenticationService.GetUserName();
      userResponse.success(function(data)
      {
        $scope.UserName = data.Name;
      })
      .error(function(data){
      });

    meals.success(function(data) {
      $scope.mealsInfo = data;



    //////// Search For Meals Code

   	$scope.searchMeals = function() {
    		console.log("search meals", $scope.search);
    		console.log("meals info", $scope.mealsInfo);
    	}()
    });


    /////// Get Shopping List Code

    $scope.getShoppingList = function() {
      $scope.arrayOfIng = "test";
      var authoriz = 'Bearer ' + $window.sessionStorage.getItem('tokenKey');
      $http({
      method: 'GET',
      url: 'http://roameals.azurewebsites.net/api/MealPlans/ShoppingList',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authoriz
      }
    })
      .success(function(data){
        $scope.arrayOfIng = data;
  	})
      .error(function(data){
      })
    }()


    $scope.arrayOfIng=" ";
    var logindisplay=function(event, dataforme)
    {
      $scope.UserName=dataforme
    }
    var logoutdisplay=function(event, dataforme )
    {
      $scope.UserName=" ";
    }
    $rootScope.$on("logged-in", logindisplay);
    $rootScope.$on("logged-out", logoutdisplay);
    })

    $scope.toggleCSS = function () {
      window.print();
    }
}]);