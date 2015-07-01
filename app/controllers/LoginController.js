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

function Register(){
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
        //alert(JSON.stringify(data));
        // window.location = "http://localhost:62555" + data[0].Url;
        console.log("the data from check user:", data);
        // if fale register else signin
        if(data.HasRegistered == false)
        {
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
        } else {
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


        }).error(function(){
            console.log("CHECKUSER ERROR!!!");
    });   
}

function GoogleSignIn(){

}
