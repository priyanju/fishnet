

'use strict';

angular.module('netsizetype', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/netsizetype', {
    templateUrl: 'netsizetype/netsizetype.html',
    controller: 'NetsizetypeCtrl'
  });
}])

.controller('NetsizetypeCtrl',
  function($scope, $http,$location,$rootScope,$window,$filter,$interval) {
   

  })

  
// return this.http.post('http://183.82.250.137:3009/api/v1/toradax_test',{ip:ip,net_size:size});
