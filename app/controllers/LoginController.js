// var menuApp = angular.module('MealsApp');

app.controller('LoginController', function ($scope, $http, $window,$rootScope, userAuthenticationService) {
    
    localStorage.loggedin = "block";
     localStorage.loggedout = "none";
    $scope.login = function () {

        var data = {
            grant_type: 'password',
            username: $scope.username,
            password: $scope.password,
        };

        var postdata = JSON.stringify(data)
        console.log(postdata)

        var q = "grant_type=password&username=" + encodeURIComponent($scope.username) + "&password=" + encodeURIComponent($scope.password);
console.log("This is Q", q)

        $http({
            method: 'POST',
            url: 'http://roameals.azurewebsites.net/Token',
            data: q,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data) {
            $window.sessionStorage.setItem('tokenKey', data.access_token);
            console.log("sucessfully logedIn.......");
            $scope.errormessage="";
            console.log("Token", data.access_token);
                console.log(data.userName)
            $rootScope.$emit("logged-in", data.userName)

            var userResponse = userAuthenticationService.GetUserName();
              userResponse.success(function(data)
              {
                console.log("nameee", data.Name)
                $scope.UserName = data.Name;
                $rootScope.$emit("logged-in", data.Name)
                localStorage.loggedin = "none";
                localStorage.loggedout = "block";

              })
            

           
            $window.location.href = '#Index';
        }).error(function (data) {
            console.log("Error Logging in ..." + data);
             console.log(data.error_description)
             $scope.errormessage=data.error_description;
        });




    };
	$scope.Register=function()
    {
	 $window.location.href = '#Register';
    };


});


