'use strict';

angular.module('shift', ['ngRoute','ngSanitize','ui.bootstrap', 'mgcrea.ngStrap'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/shift_registration', {
    templateUrl: 'shift_registration/shift.html',
    controller: 'ShiftCtrl'
  });
}])

.controller('ShiftCtrl', ['$scope', '$http','$location','$rootScope','$window','$log','$timeout','$filter',
  function($scope, $http,$location,$rootScope,$window,$log,$timeout,$filter) {
$scope.myLoader = true;


$scope.getDuration = function(start, end) {
 // alert(start +"gf"+ end);

   var startTime=moment(start, "HH:mm a");
var endTime=moment(end, "HH:mm a");
var duration = moment.duration(endTime.diff(startTime));
var hours = parseInt(duration.asHours());
var minutes = parseInt(duration.asMinutes())-hours*60;
$scope.duration=hours+':'+minutes;
//$scope.shifttransaction={"start_time":start,"end_time":end,"duration":hours+':'+minutes}

//alert (hours + ' hour and '+ minutes+' minutes.')
       
       var result = endTime.diff(startTime, 'hours') + " Hrs and " +     
                        endTime.diff(startTime, 'minutes') + " Mns";
                        $scope.shifttransaction.duration=$scope.duration;

  };

$scope.shifttransaction = {id:null,start_time:"",end_time:"",duration:"",shift_no:null,active:true};//,tenant_id: $scope.tenant_id};

$scope.$watch("shifttransaction.end_time", function(newVal, oldVal) {
  // alert(newVal);
  $scope.getDuration($scope.shifttransaction.start_time,$scope.shifttransaction.end_time);

  });
  $scope.$watch("shifttransaction.start_time", function(newVal, oldVal) {
    // alert(newVal);
    $scope.getDuration($scope.shifttransaction.start_time,$scope.shifttransaction.end_time);
  
    });
  
$scope.newshifttrans= function(){
//$scope.getDuration($scope.start_time, $scope.end_time); 
 // alert(start +"gf"+ end);
  

        var shifttransaction = {"start_time":$scope.shifttransaction.start_time,"end_time": $scope.shifttransaction.end_time,"duration":$scope.shifttransaction.duration,
         "shift_no": $scope.shifttransaction.shift_no,"active":$scope.shifttransaction.active};//,"tenant_id": $scope.shifttransaction.tenant_id};
//alert($scope.duration);
if ($scope.shifttransaction.id==null){
  //$scope.getDuration($scope.shifttransaction.start_time, $scope.shifttransaction.end_time); 
 
     var shifttransaction1 = {"start_time":$scope.shifttransaction.start_time,"end_time": $scope.shifttransaction.end_time,"duration":$scope.shifttransaction.duration,
         "shift_no": $scope.shifttransaction.shift_no,"active":$scope.shifttransaction.active};

      $http
      ({
        method: 'post',
        url: $rootScope.api_url+'shifts',
        data: shifttransaction1
      })

      .success(function(data) {

        if(data){
       // $window.location.reload();
       // $state.go('/company_registration');
        alert("Registration completed");
      //$window.location.reload();
      $scope.shiftinit();
        }else{
        alert('Registration Failed');
        }
      });
}else
{
   
    $http
      ({
        method: 'put',
        url: $rootScope.api_url+'shifts/'+$scope.shifttransaction.id,
        //$scope.shifttransaction.id,
        data: shifttransaction
      })

      .success(function(data) {

        if(data){

       // $state.go('/company_registration');
        alert("Updated Successfully");
    // $window.location.reload(); 
    $scope.shiftinit();   
         }else{
        alert('Updation Failed');
        }
      });
}
    }

$scope.breaktime=function(id){

localStorage.setItem("breaktime_id",id);
         $location.path('/breaktime');

}

$scope.shiftinit=function(){
  $http({

    method:'GET',
    url:$rootScope.api_url+'shifts',
     })
  .then(function(response){
    $scope.myLoader = false;
   $rootScope.shiftstrans = response.data;
   //$scope.shiftid=  $scope.shift_id_id.id
    })
}

    $scope.cleandata1= function() {

$scope.shifttransact = {id:null,start_time:"",end_time:"",duration:"",shift_no:null,active:true};


 $scope.shifttransaction = angular.copy($scope.shifttransact);
 }

    $scope.edit1 = function(id) {
var i;

   for(i in $rootScope.shiftstrans) {

            if($rootScope.shiftstrans[i].id == id) {
               var shifttrans_id=$rootScope.shiftstrans[i];
               $scope.shifttransaction = angular.copy(shifttrans_id);

               console.log($scope.shifttransaction);
            }

        }
    }

$scope.delete1 = function(id) {

$http.delete($rootScope.api_url+'shifts/'+id).success(function(data) {

        if(data){

       // $state.go('/company_registration');
alert("Deleted Successfully");
     // $window.location.reload();
      $scope.shiftinit();
        }else{
        alert('Delete Failed');
        }
      });


}


$scope.time=["12:00am","12:30am","1:00am","1:30am","2:00am","2:30am","3:00am","3:30am","4:00am","4:30am","5:00am","5:30am",
"6:00am","6:30am","7:00am","7:30am","8:00am","8:30am","9:00am","9:30am","11:00am","10:00am","10:30am","11:30am","12:00pm",
"12:30pm","1:00pm","1:30pm","2:00pm","2:30pm","3:00pm","3:30pm"]


}]).directive('bindHtmlCompile', function($compile) {
    return {
      restrict: "A",
      scope: {
        bindHtmlCompile: "="
      },
      link: function(scope, elem) {
        scope.$watch("bindHtmlCompile", function(newVal) {
          elem.html('');
          var newElem = angular.element(newVal);
          var compileNewElem = $compile(newElem)(scope.$parent);
          elem.append(compileNewElem);
        });
      }
    };
  });