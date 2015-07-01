// var menuApp = angular.module('MealsApp');

app.controller('LoginController', function ($scope, $http, $window,$rootScope, userAuthenticationService) {
// angular.module('MealsApp', []).controller('LoginController', function ($scope, $http, $window) {
    
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

            // console.log("sucessfully logedIn.......");
            // console.log("Token", data.access_token);
            //     console.log(data.Name)

            var userResponse = userAuthenticationService.GetUserName();
              userResponse.success(function(data)
              {
                console.log("nameee", data.Name)
                $scope.UserName = data.Name;
                $rootScope.$emit("logged-in", data.Name)
                //var sup = document.getElementById("signup");
                //sup.style.display = "none";
                localStorage.loggedin = "none";
                //sup.style.display = localStorage.loggedin;

                //Session["signup"]= sin.style.display = "none";
                //var sin = document.getElementById("signin");
                //sin.style.display = 'none';
                //var sout = document.getElementById("signout");
                //sout.style.display = 'block';
               localStorage.loggedout = "block";
                //sout.style.display = localStorage.loggedout;
              })
            

           
            $window.location.href = '#Index';
        }).error(function (data) {
            console.log("Error Logging in ..." + data);
             //$window.location.href = '#Login';
             console.log(data.error_description)
             $scope.errormessage=data.error_description;
        });




    };
	$scope.Register=function()
    {
	 $window.location.href = '#Register';
    };


});


