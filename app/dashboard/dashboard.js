
'use strict';

angular.module('dashboard', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'dashboard/dashboard.html',
    controller: 'DashboardCtrl'
  });
}])

.controller('DashboardCtrl', ['$scope', '$http','$location','$window','$rootScope','$timeout','$interval',
  function($scope, $http,$location,$window,$rootScope,$timeout,$interval) {
  $scope.myLoader = true;
  var tick = function () {
    $scope.clock = Date.now();
  }
 tick();
  $interval(tick, 1000);

  var userdeatils=JSON.parse(localStorage.getItem('userdata'));
  $scope.user_type=userdeatils.user_type;
$rootScope.username=userdeatils.username;

  $rootScope.stop = function () {
    if ($rootScope.interval != null) {
      $interval.cancel($rootScope.interval);
    }
  };
   $scope.dashboard=function(){
    $http({
       method:'GET',
       url:$rootScope.api_url+'machine_logs'
   }).then(function(response){
     $scope.myLoader = false;
       $scope.cardnames = response.data;  
        $scope.LastUpdate = $scope.cardnames.last_update;
  })

 
  };
  $scope.machine_page_redirect = function (id){
    $scope.myLoader1 = true;

    $http({
      method:'GET',
      url:$rootScope.api_url+'single_machine_detail?machine_id='+id,
  }).then(function(response){
    $scope.myLoader1 = false;
      $scope.singleres = response.data;  
       console.log($scope.singleres);
 }) 
 $http({
  method:'GET',
  url:$rootScope.api_url+'machine_logs'
}).then(function(response){
$scope.myLoader = false;
  $scope.cardnames = response.data;  
   $scope.LastUpdate = $scope.cardnames.last_update;
})
  }
  $scope.dashboardre = function(){
    $http({
      method:'GET',
      url:$rootScope.api_url+'machine_logs'
  }).then(function(response){
    $scope.myLoader = false;
      $scope.cardnames = response.data;  
       $scope.LastUpdate = $scope.cardnames.last_update;
 })
  }

//file upload
$scope.fileInit=function(){ 
      $scope.files={id:null,machinefilename:null}
      $http({
        method: 'GET',
        url: $rootScope.api_url + 'machine_lists'
      }).then(function (response) {
        $scope.machineList = response.data;
      })
      
        $scope.machineipstatus=0;
      $http({
        method: 'GET',
        url: $rootScope.api_url + 'test_logs'
      }).then(function (response) {
        $scope.filedetailGet = response.data;
      })


      $scope.formdata = new FormData();
      $scope.getTheFiles = function ($files) {
        console.log($files);
        $scope.filedetail=$files;
        angular.forEach($files, function (value, key) {

          $scope.formdata.append(key, value);
          console.log($scope.formdata);
        });


      };
    }

    $scope.clear = function () {
      angular.element("input[type='file']").val(null);
  };

        $scope.fileAdd=function(){
          $scope.machineipstatus=0;
          angular.element("input[type='file']").val(null);
        }

       $scope.edit=function(id){
        angular.element("input[type='file']").val(null);
         $scope.editId=id;
           for(var i in  $scope.filedetailGet){
             if($scope.filedetailGet[i].id == id){
              $scope.files.machinefilename=$scope.filedetailGet[i].machine;
              console.log( $scope.files.machinefilename);
              $scope.machineip=$scope.filedetailGet[i].machine.machine_name;
              $scope.machinenameip=$scope.filedetailGet[i].machine.machine_ip;
              $scope.machineippath=$scope.filedetailGet[i].file_path;
              $scope.machineipstatus=1;
             }
           }
       }

      // NOW UPLOAD THE FILES.
      $scope.uploadFiles = function (name) {
        console.log($scope.filedetail);
        if($scope.filedetail == undefined){ 
          alert("Please Browse File")
           return;
          }
        $scope.filedata = {
          "machine_id": name.id,
          "file_path": $scope.formdata

        }  

            $http
              ({
                method: 'put',
                url: $rootScope.api_url + 'create_files?machine_id='+name.machine_ip,
                headers: {
                  'Content-Type': undefined
                },
                data: $scope.formdata
              })

              .success(function (data) {

                console.log(data.message);
                alert(data.message);
                $scope.fileInit();
                $scope.filedetail=undefined;
                angular.element("input[type='file']").val(null);
                $('#fileModalLabel').modal('hide');
              }).error(function (data) {
                alert(data);
              })
      }


      $scope.fileupdate = function () {
        if($scope.filedetail == undefined){ 
          alert("Please Browse File")
           return;
          }
        $http
          ({
            method: 'put',
            url: $rootScope.api_url + 'test_logs/'+$scope.editId,
            headers: {
              'Content-Type': undefined
            },
            data: $scope.formdata
          })

          .success(function (data) {
            alert(data.message);
            $scope.fileInit();
            $scope.filedetail=undefined;
            angular.element("input[type='file']").val(null);
            $('#fileModalLabel').modal('hide');
          }).error(function (data) {
            alert(data);
          })
      }



}])

.directive('ngFiles', ['$parse', function ($parse) {

    function fn_link(scope, element, attrs) {
      var onChange = $parse(attrs.ngFiles);
      element.on('change', function (event) {
        onChange(scope, {
          $files: event.target.files
        });
      });
    };

    return {
      link: fn_link
    }
  }])

.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
})
