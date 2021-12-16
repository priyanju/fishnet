/*'use strict';

angular.module('alarms', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/alarms', {
    templateUrl: 'alarms/alarms.html',
    controller: 'AlarmsCtrl'
  });
}])

.controller('AlarmsCtrl', ['$scope', '$http','$location','$window','$rootScope',
  function($scope, $http,$location,$window,$rootScope) {
$scope.myLoader = true;

$scope.tenant_id=localStorage.getItem("tenant_id");
$rootScope.tenant=$scope.tenant_id;
$scope.clientregistration = {id: null,client_name:"",email_id:"",phone_number:"",tenant_id: $scope.tenant_id};
$scope.username=localStorage.getItem("username");


    $http({
     method:'GET',
     url:$rootScope.api_url+'api/v1/alarms?tenant_id='+$scope.tenant_id})
     .then(function(response){
      $scope.myLoader = false;
           $scope.Alarm= response.data;
      })

    $http({
     method:'GET',
     url:$rootScope.api_url+'api/v1/alarms/alarm_dashboard?tenant_id='+$scope.tenant_id})
     .then(function(response){
      $scope.myLoader = false;
           $scope.RecentAlarm= response.data;
            console.log($scope.RecentAlarm);
      })

    $scope.delete = function(id) {
     if ($window.confirm("Please confirm?")) {
    $http.delete($rootScope.api_url+'api/v1/alarms/'+id).success(function(data) {
            
            if(data){

           // $state.go('/company_registration');
    alert("Deleted Successfully");
          $window.location.reload();
            }else{      
            alert('Delete Failed');   
            }
          });
    }

}
}]);
*/

'use strict';

angular.module('alarms', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/alarms', {
    templateUrl: 'alarms/alarms.html',
    controller: 'AlarmsCtrl'
  });
}])

.controller('AlarmsCtrl', ['$scope', '$http','$location','$window','$rootScope',
  function($scope, $http,$location,$window,$rootScope) {
     if(localStorage.getItem("tenant_id") ==null){
   $location.path('/login')
    return;
 }
$scope.myLoader = true;

$scope.tenant_id=localStorage.getItem("tenant_id");
$rootScope.tenant=$scope.tenant_id;
$scope.clientregistration = {id: null,client_name:"",email_id:"",phone_number:"",tenant_id: $scope.tenant_id};
$scope.username=localStorage.getItem("username");


   /* $http({
     method:'GET',
     url:$rootScope.api_url+'api/v1/alarms?tenant_id='+$scope.tenant_id})
     .then(function(response){
      $scope.myLoader = false;
           $scope.Alarm= response.data;
      })*/

$scope.ssss=[];

         $http({
         method:'GET',
         url:$rootScope.api_url+'api/v1/alarms?tenant_id='+$scope.tenant_id
       }).then(function(response){
          console.log(response);
          
         $scope.Alarm= response.data;
         for (var i =0;i< response.data.length ; i++) {
          var inputJSON = {
              "created_date": $scope.Alarm[i].created_at,
              "current_time": $scope.Alarm[i].updated_at
          };

          function getDataDiff(startDate, endDate) {
                  var diff = endDate.getTime() - startDate.getTime();
                  var days = Math.floor(diff / (60 * 60 * 24 * 1000));
                  var hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
                  var minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
                  var seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
                  return { day: days, hour: hours, minute: minutes, second: seconds };
              }
              $scope.diff = getDataDiff(new Date(inputJSON.created_date), new Date(inputJSON.current_time));
              $scope.ssss.push( $scope.diff );
           
         }        
$scope.AlarmData = angular.merge($scope.Alarm, $scope.ssss);
      })






$scope.ssss1=[];
    $http({
     method:'GET',
     url:$rootScope.api_url+'api/v1/alarms/alarm_dashboard?tenant_id='+$scope.tenant_id})
     .then(function(response){
      $scope.myLoader = false;
           $scope.RecentAlarm= response.data;
            console.log($scope.RecentAlarm);


            for (var i =0;i< response.data.length ; i++) {
          var inputJSON = {
              "created_date": $scope.RecentAlarm[i].created_at,
              "current_time": $scope.RecentAlarm[i].updated_at
          };

          function getDataDiff(startDate, endDate) {
                  var diff = endDate.getTime() - startDate.getTime();
                  var days = Math.floor(diff / (60 * 60 * 24 * 1000));
                  var hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
                  var minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
                  var seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
                  return { day: days, hour: hours, minute: minutes, second: seconds };
              }
              $scope.diff1 = getDataDiff(new Date(inputJSON.created_date), new Date(inputJSON.current_time));
              $scope.ssss1.push( $scope.diff1 );
           
         }        
     $scope.AlarmDataRe = angular.merge($scope.RecentAlarm, $scope.ssss1);
      })

    $scope.delete = function(id) {
     if ($window.confirm("Please confirm?")) {
    $http.delete($rootScope.api_url+'api/v1/alarms/'+id).success(function(data) {
            
            if(data){

           // $state.go('/company_registration');
    alert("Deleted Successfully");
          $window.location.reload();
            }else{      
            alert('Delete Failed');   
            }
          });
    }

}



 $http({
         method:'GET',
         url:$rootScope.api_url+'api/v1/connection_logs?tenant_id='+$scope.tenant_id
       }).then(function(response){
          console.log(response);
          
       $scope.connectionStatus=response.data;
      })
 
                          












}]);
