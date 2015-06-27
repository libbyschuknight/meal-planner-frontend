
app.controller('LogoutController', function ($scope, $http, $window) {
    // alert("wjefjkwsegflkrehglirhtjoiyohtju");

    // $scope.logout = function () {
        // var data = {
        //     grant_type: 'password',
        //     username: $scope.username,
        //     password: $scope.password,
        // };

        // var postdata = JSON.stringify(data)
        // console.log(postdata)

        // var q = "grant_type=password&username=" + encodeURIComponent($scope.username) + "&password=" + encodeURIComponent($scope.password);

 var authoriz = 'Bearer ' + $window.sessionStorage.getItem('tokenKey');
        $http({
            method: 'POST',
            url: 'http://roameals.azurewebsites.net/api/Account/Logout',
            
            headers: {'Authorization': authoriz}
        }).success(function () {
            $window.sessionStorage.setItem('tokenKey', "");
            console.log("sucess.......");
            // console.log("Token", data.access_token);
         $window.location.href = '#Login';
         //'Content-Type': 'application/x-www-form-urlencoded'
        }).error(function () {
            console.log("Error..." );
             $window.location.href = '#Login';
             //$scope.errormessage="Incorrect UserName or Password";
        });




    // };
    //  $scope.login = function () {

    //     var data = {
    //         grant_type: 'password',
    //         username: $scope.username,
    //         password: $scope.password,
    //     };

    //     var postdata = JSON.stringify(data)
    //     console.log(postdata)

    //     var q = "grant_type=password&username=" + encodeURIComponent($scope.username) + "&password=" + encodeURIComponent($scope.password);


    //     $http({
    //         method: 'POST',
    //         url: 'http://roameals.azurewebsites.net/Token',
    //         data: q,
    //         headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
    //     }).success(function (data) {
    //         $window.sessionStorage.setItem('tokenKey', data.access_token);
    //         console.log("sucess.......");
    //         console.log("Token", data.access_token);
    //         $window.location.href = '#Index';
    //     }).error(function (data) {
    //         console.log("Error..." + data);
    //          //$window.location.href = '#Login';
    //          $scope.errormessage="Incorrect UserName or Password";
    //     });




    // };
    // $scope.Register=function()
    // {
    //  $window.location.href = '#Register';
    // };


});


