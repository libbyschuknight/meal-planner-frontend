
app.controller('LogoutController', function ($scope, $http, $window,$rootScope) {

     $scope.logout=function()
     {
        var authoriz = 'Bearer ' + $window.sessionStorage.getItem('tokenKey');
     
        $http({
            method: 'POST',
            url: 'http://roameals.azurewebsites.net/api/Account/Logout',
            
            headers: {'Authorization': authoriz}
        }).success(function () {
             $rootScope.$emit("logged-out", "")
            $window.sessionStorage.removeItem('tokenKey', "");
            console.log(" Logged out sucessfully.......");
            var sup = document.getElementById("signup");
                sup.style.display = 'block';
            var sin = document.getElementById("signin");
                sin.style.display = 'block';
            var out = document.getElementById("signout");
            out.style.display = 'none';
            // console.log("Token", data.access_token);
            
          
         $window.location.href = '#Login';
         //'Content-Type': 'application/x-www-form-urlencoded'
        }).error(function () {

            console.log("Error Logging Out..." );
           
             //$scope.errormessage="Incorrect UserName or Password";
        });
    }
});


