//var menuApp = angular.module('MealsApp');
app.controller('RegisterController', function ($scope, $http,$window, $rootScope, userAuthenticationService) {

    /////// User Sign Up Code

    $scope.register = function () {
        var data = {
            Email: $scope.text,
            Password: $scope.pswd,
            ConfirmPassword: $scope.conpswd,
            Name: $scope.name
        };

        var postdata = JSON.stringify(data);
        console.log(postdata);
        $http.post("http://roameals.azurewebsites.net/api/Account/Register", postdata)
        .success(function () {
            var q = "grant_type=password&username=" + encodeURIComponent($scope.text) + "&password=" + encodeURIComponent($scope.pswd);
            console.log("This is Q", q);
            $http({
                method: 'POST',
                url: 'http://roameals.azurewebsites.net/Token',
                data: q,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function (data) {
                $window.sessionStorage.setItem('tokenKey', data.access_token);
                console.log("sucessfully logedIn.......");
                console.log("Token", data.access_token);
                localStorage.loggedin = "none";
                localStorage.loggedout = "block";
                var userResponse = userAuthenticationService.GetUserName();
                userResponse.success(function(data)
                {
                    console.log("nameee", data.Name)
                    $scope.UserName = data.Name;
                    $rootScope.$emit("logged-in", data.Name)
                })
                $window.location.href = '#Index';
                }).error(function (data) {
                    console.log("Error Logging in ..." + data);
                    $window.location.href = '#Login';
                    $scope.errormessage="Incorrect UserName or Password";
                });
        }).error(function (data) {
            console.log("Error Registering..." + data);
            $scope.errormessage= data.ModelState[Object.keys(data.ModelState)[0]][0];
        });
    };
});