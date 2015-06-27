// var menuApp = angular.module('MealsApp');

app.controller('LoginController', function ($scope, $http, $window) {
// angular.module('MealsApp', []).controller('LoginController', function ($scope, $http, $window) {
    $scope.login = function () {


        var data = {
            grant_type: 'password',
            username: $scope.username,
            password: $scope.password,
        };

        var postdata = JSON.stringify(data)
        console.log(postdata)

        var q = "grant_type=password&username=" + encodeURIComponent($scope.username) + "&password=" + encodeURIComponent($scope.password);


        $http({
            method: 'POST',
            url: 'http://roameals.azurewebsites.net/Token',
            data: q,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data) {
            $window.sessionStorage.setItem('tokenKey', data.access_token);
            console.log("sucess.......");
            console.log("Token", data.access_token);
            $window.location.href = '#Index';
        }).error(function (data) {
            console.log("Error..." + data);
             //$window.location.href = '#Login';
             $scope.errormessage="Incorrect UserName or Password";
        });




    };
	$scope.Register=function()
    {
	 $window.location.href = '#Register';
    };


});


