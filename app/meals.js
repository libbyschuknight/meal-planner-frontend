app.factory('meals', ['$http', function($http) {
  return $http.get('http://s3.amazonaws.com/codecademy-content/courses/ltp4/forecast-api/forecast.json')
  .success(function(data) {
    console.log(data)
    return data;
  })
  .error(function(err) {
    return err;
  });
}]);



// http://roameals.azurewebsites.net.json

// http://roameals.azurewebsites.net/api/Meals
// http://s3.amazonaws.com/codecademy-content/courses/ltp4/forecast-api/forecast.json