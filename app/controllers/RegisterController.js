//var menuApp = angular.module('MealsApp');
app.controller('RegisterController', function ($scope, $http,$window) {
console.log("eferer")
    $scope.register = function () {

        var data = {
            Email: $scope.text,
            Password: $scope.pswd,
            ConfirmPassword: $scope.conpswd
        };
        var postdata = JSON.stringify(data);

        console.log(postdata);

        $http.post("http://localhost:62555/api/Account/Register", postdata)
        .success(function () {
            console.log("sucess.......")
              $window.location.href = '#Login';
        })
        .error(function (data) {
            console.log("Error..." + data);
        });

    };
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

			console.log("fuck yeah")
			console.log(data)

    	})





    }
});



    // var DisplayLogin=function()
    // {
    //      var authoriz = 'Bearer ' + $window.sessionStorage.getItem('tokenKey');
    //      $http({
    //         method: 'GET',
    //         url: 'http://roameals.azurewebsites.net/api/Account/UserInfo',
    //          headers: { 'Content-Type': 'application/json',
    //                    'Authorization': authoriz }
    //      }).success(function(data)
    //      {
    //          alert(data.Email);
    //          console.log(data);
    //      }).error(function (data) {
    //          console.log("error getting user info");
    //      });
    // }





