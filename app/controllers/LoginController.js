app.controller('LoginController', function ($scope, $http, $window,$rootScope, userAuthenticationService) {

    localStorage.loggedin = "block";
    localStorage.loggedout = "none";


    /////////// User Login code

    $scope.login = function () {
        var data = {
            grant_type: 'password',
            username: $scope.username,
            password: $scope.password,
        };

        var postdata = JSON.stringify(data)

        var q = "grant_type=password&username=" + encodeURIComponent($scope.username) + "&password=" + encodeURIComponent($scope.password);
        $http({
            method: 'POST',
            url: 'http://roameals.azurewebsites.net/Token',
            data: q,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data) {
            $window.sessionStorage.setItem('tokenKey', data.access_token);
            $scope.errormessage="";
            $rootScope.$emit("logged-in", data.userName)

            var userResponse = userAuthenticationService.GetUserName();
            userResponse.success(function(data)
            {
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


    ///// Redirect to Register Code
    
    $scope.Register=function()
    {
      $window.location.href = '#Register';
    };

});