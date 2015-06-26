'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('MealsApp', [
  'ngRoute'
]).config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/index'});
}]);
