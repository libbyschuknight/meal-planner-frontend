var menuApp = angular.module('MealsApp');

menuApp.controller('LoginCtrl', function ($scope, $http, $window) {

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
            $window.location.href = 'http://roameals.azurewebsites.net/app/Index.html';
        }).error(function (data) {
            console.log("Error..." + data);
        });




    };
	$scope.Register=function()
    {
	 $window.location.href = 'http://roameals.azurewebsites.net/app/Register.html';
    };


});


