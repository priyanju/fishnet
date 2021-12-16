
'use strict';

angular.module('con_log', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/connectionlog', {
    templateUrl: 'connection_log/connection_log.html',
    controller: 'ConnectCtrl'
  });
}])


.controller('ConnectCtrl', ['$scope', '$http','$location','$window','$rootScope','$filter',
  function($scope, $http,$location,$window,$rootScope,$filter) {
  
$scope.myLoader = true;





$scope.connection_init=function(){


 $http({
         method:'GET',
         url:$rootScope.api_url+'netlog_statuses'
       }).then(function(response){
          console.log(response);
          $scope.myLoader = false;
       $scope.connectionStatus=response.data;
        
    for (var i in $scope.connectionStatus) {
      $scope.data.push($scope.connectionStatus[i]);
  }

      })
 

 /*$http({
         method:'GET',
         url:$rootScope.api_url+'api/v1/ethernet_logs?tenant_id='+$scope.tenant_id
       }).then(function(response){
          console.log(response);
           $scope.myLoader = false;
       $scope.machineConnStatus=response.data;
      })*/
       }       

    //report alarm

    $scope.currentPage = 0;
    $scope.pageSize = 15;
    $scope.data = [];
    $scope.q = '';
    
    
    $scope.getData = function () {
      // needed for the pagination calc
      // https://docs.angularjs.org/api/ng/filter/filter
      return $filter('filter')($scope.data, $scope.q)
      
       // manual filter
       // if u used this, remove the filter from html, remove above line and replace data with getData()
       
        // var arr = [];
        // if($scope.q == '') {
        //     arr = $scope.data;
        // } else {
        //     for(var ea in $scope.data) {
        //         if($scope.data[ea].indexOf($scope.q) > -1) {
        //             arr.push( $scope.data[ea] );
        //         }
        //     }
        // }
        // return arr;
       
    }
    
    $scope.numberOfPages=function(){
      console.log($scope.getData());
        return Math.ceil($scope.getData().length/$scope.pageSize);                
    }

    
    
}])

.filter('startFrom', function() {
  return function(input, start) {
      //if (!input || !input.length) { return; }
      start = +start; //parse to int
      return input.slice(start);
  }
});