var menuApp = angular.module('MealsApp');
menuApp.controller('RegisterCtrl', function ($scope, $http,$window) {

    $scope.register = function () {

        var data = {
            Email: $scope.text,
            Password: $scope.pswd,
            ConfirmPassword: $scope.conpswd
        };
        var postdata = JSON.stringify(data);

        console.log(postdata);

        $http.post("http://roameals.azurewebsites.net/api/Account/Register", postdata)
        .success(function () {
            console.log("sucess.......")
              $window.location.href = 'http://roameals.azurewebsites.net/app/Login.html';
        })
        .error(function (data) {
            console.log("Error..." + data);
        });

    };
});

    var DisplayLogin=function()
    {
         var authoriz = 'Bearer ' + $window.sessionStorage.getItem('tokenKey');
         $http({
            method: 'GET',
            url: 'http://roameals.azurewebsites.net/api/Account/UserInfo',
             headers: { 'Content-Type': 'application/json',
                       'Authorization': authoriz }
         }).success(function(data)
         {
             alert(data.Email);
             console.log(data);
         }).error(function (data) {
             console.log("error getting user info");
         });
    };





