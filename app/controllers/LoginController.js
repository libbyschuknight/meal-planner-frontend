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


        $http({
            method: 'POST',
            url: 'http://roameals.azurewebsites.net/Token',
            data: q,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data) {
            $window.sessionStorage.setItem('tokenKey', data.access_token);
            console.log("sucessfully logedIn.......");
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

	$scope.Register=function()
    {
	 $window.location.href = '#Register';
    };

    $scope.SignInWithGoogleEvent = function(){
        console.log("signin google");
        $http({
            method: 'GET',
            url: 'http://localhost:62555/api/Account/ExternalLogins?returnUrl=%2F&generateState=true',
            headers: { 'Content-Type': 'application/json'}
        }).success(function (data) {
            alert(JSON.stringify(data));
            window.location = "http://localhost:62555" + data[0].Url;
        }).error(function(data){
            console.log("could not redirect to google", data);
        })
    }
});

function TestRegister(){
    $.ajax({
    method: 'POST',
    url: 'http://localhost:62555/api/Account/RegisterExternal',
    headers: { 'Content-Type': 'application/json'}
    }).success(function (data) {
        window.location = "http://localhost:8000" + data[0].Url;
    }).error(function(){
        console.log("could not redirect to google");
    })
}

function CheckUser()
{
    console.log("CheckUser: accessToken = " + accessToken);
   $.ajax({
        method: 'GET',
        url: 'http://localhost:62555/api/Account/UserInfo',
        headers: { 'Content-Type': 'application/json',
                    'Authorization': "Bearer " + accessToken }
    }).success(function (data) {
        console.log("the data from check user:", data);
        if(data.HasRegistered == false) {
            GoogleRegister();
        } else {
            GoogleSignIn();
        }
    }).error(function(){
        console.log("CHECKUSER ERROR!!!");
    });   
}

function GoogleSignIn(){
    console.log("user is registered")
    $.ajax({
        method: 'GET',
        url: '/api/Account/ExternalLogin?provider=Google&response_type=token&client_id=self&redirect_uri=http%3A%2F%2Flocalhost%3A62555%2F&state=lbs_GOWdVHyqMb1YqKR9E72-xoucA029p0ApTY-mQtc1',
        headers: { 'Content-Type': 'application/json'}
    }).success(function (data) {
        console.log("success of login ajax get");
        // window.location = "http://localhost:62555" + data[0].Url;
    }).error(function(data){
        console.log("could not redirect to google", data);
    }) 
}

function GoogleRegister(){
    $.ajax({
        method: 'POST',
        url: 'http://localhost:62555/api/Account/RegisterExternal',
        headers: { "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken}, 
        data: JSON.stringify({
                            // Only wants email
                            "Email": "samnz19@gmail.com"
                            })                         
    }).success(function(){
            console.log("registered post ajax thing")
            $window.location.href = '#Index';

    }).error(function(e){
            console.log("error RegisterExternal", e)
    });
}
