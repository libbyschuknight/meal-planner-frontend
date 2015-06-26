var menuApp = angular.module('menuApp', []);

menuApp.controller('RegisterCtrl', function ($scope, $http) {

$scope.register=function()
{
  
            var data = {
                Email: $scope.text,
                Password: $scope.pswd,
                ConfirmPassword: $scope.conpswd
            };
            var postdata =JSON.stringify(data)

console.log(postdata)

$http.post("http://roameals.azurewebsites.net/api/Account/Register", postdata).success(function (){
    console.log("sucess.......")
})

}
});


menuApp.controller('LoginCtrl', function ($scope, $http) {
    // $scope.username ="Z%40Z.com";
    // $scope.password = "password_1"

$scope.login=function()
{
  
            var data = {
                grant_type: 'password',
                username: $scope.username,
                password: $scope.password,
                };

            var postdata =JSON.stringify(data)

console.log(postdata)


 var q = "grant_type=password&username=" + encodeURIComponent($scope.username) + "&password=" + encodeURIComponent( $scope.password) ;



$http({
    method: 'POST',
    url: 'http://roameals.azurewebsites.net/Token',
    data: q,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
}).success(function()
{
     console.log("sucess.......")
    console.log("Token", tokenKey) 
})



// $http.post("http://roameals.azurewebsites.net/Token", postdata).success(function (){
//     sessionStorage.setItem(tokenKey, data.access_token);
//     console.log("sucess.......")
//     console.log("Token", tokenKey)
// })

}
});


