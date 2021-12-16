



'use strict';

angular.module('operator_allocation_master', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/operator_allocation_masters', {
    templateUrl: 'operator_allocation/operator_allocation.html',
    controller: 'OperatorallocationmasterCtrl'
  });
}])

.controller('OperatorallocationmasterCtrl', ['$scope', '$http','$location','$window','$rootScope',
  function($scope, $http,$location,$window,$rootScope) {
   
$scope.myLoader = true;
/*$scope.tenant_id=localStorage.getItem("tenant_id");
$rootScope.tenant=$scope.tenant_id;*/
$scope.operatorassignregistration = {id: null,from_date:null,to_date:null,shift_id: null,machine_id:null,operator_id:null,description:""};
$scope.todaydat=new Date();
$scope.startDate = moment();

$scope.username=localStorage.getItem("username");
$scope.operatorForm= function(){  
         var operatorassignregistration = {"from_date":$scope.operatorassignregistration.from_date,"to_date":$scope.operatorassignregistration.to_date,"shift_id": $scope.operatorassignregistration.shift_id,"machine_id":$scope.operatorassignregistration.machine_id,"operator_id":$scope.operatorassignregistration.operator_id,"description":$scope.operatorassignregistration.description};
  if ($scope.operatorassignregistration.id== null){
      $http
      ({
        method: 'post',
        url: $rootScope.api_url+'operator_allocations',
        data: operatorassignregistration  
      })
      
      .success(function(data) {
        
        if(data){
$scope.operatorassignregistration="";
       // $state.go('/company_registration');
    alert("Registration completed");
    
$scope.clientinit();
    //  $scope.breaktimeinit();
       $(document).ready(function () {
   $('#exampleModalLabel').modal('hide');
 });
        }else{      
        alert('Registration Failed');   
        }
      });
    }else
    {
      
 $http
      ({
        method: 'put',
        url: $rootScope.api_url+'operator_mappings/'+$scope.edit_id,
        data: operatorassignregistration  
      })
      
      .success(function(data) {
        
        if(data){

       // $state.go('/company_registration');
alert("Updated Successfully");
     // $window.location.reload();
    $scope.clientinit();
      
       $(document).ready(function () {
   $('#exampleModalLabel').modal('hide');
 });
        }else{      
        alert('Updation Failed');   
        }
      });


    }




    }


$scope.clientinit=function(){
$http({

    method:'GET',
    url:$rootScope.api_url+'operator_allocations'
  })
  .then(function(response){
    $scope.myLoader = false;
   $rootScope.operator_alls = response.data; 
   
    })
}

  $scope.cleandata=function(){
$scope.alloedit=0;
$scope.cleardata=  {id: null,from_date:null,to_date:null,shift_id: null,machine_id:null,operator_id:null,description:"" };
$scope.operatorassignregistration = angular.copy($scope.cleardata);
  }
$scope.alloedit=0;
    $scope.edit = function(id,editid) {
$scope.alloedit=1;
      $scope.edit_id=editid.id;
      $scope.edit_date=editid.date;
var i;
   for(i in $rootScope.operator_alls) {
               
            if($rootScope.operator_alls[i].id == id) {
              

               var operator_id= {id: $rootScope.operator_alls[i].id,operator_id:$rootScope.operator_alls[i].operator_mappings.id,machine_id:$rootScope.operator_alls[i].machine.id,shift_id: $rootScope.operator_alls[i].shift.id,description:$rootScope.operator_alls[i].description,from_date:$rootScope.operator_alls[i].from_date,to_date:$rootScope.operator_alls[i].to_date};

                console.log($rootScope.operator_alls[i]);

               $scope.operatorassignregistration = angular.copy(operator_id);
               console.log($scope.operatorassignregistration)
            
           }
        }
    }

$scope.delete = function(id) {
 if ($window.confirm("Please confirm?")) {
$http.delete($rootScope.api_url+'operator_allocations/'+id).success(function(data) {
        
        if(data){

       // $state.go('/company_registration');
alert("Deleted Successfully");
      //$window.location.reload();
      $scope.clientinit();
        }else{      
        alert('Delete Failed');   
        }
      });
}

}


$http({

    method:'GET',
    url:$rootScope.api_url+'operator_list'
  })
  .then(function(response){
   $rootScope.operators = response.data; 
   
    })
  /*$http({

    method:'GET',
    url:$rootScope.api_url+'api/v1/operators?tenant_id='+$rootScope.tenant
  })
  .then(function(response){
   $rootScope.operators = response.data; 
   
    })

$http({
    method:'GET',
    url:$rootScope.api_url+'api/v1/machines?tenant_id='+$scope.tenant_id
  })
  .then(function(response){
   $rootScope.operatormachines = response.data; 

   
    })
  $http({

    method:'GET',
    url:$rootScope.api_url+'api/v1/shifts?tenant_id='+$scope.tenant_id
  })
  .then(function(response){
 $scope.shiftdetailfordrop1= response.data; 
//console.log(  $scope.shiftdetailfordrop);

 $http({


    method:'GET',
    url:$rootScope.api_url+'api/v1/shifttransactions?shift_id='+ $scope.shiftdetailfordrop1.id

  })
  .then(function(response){
   $rootScope.shiftstransfordrop1 = response.data; 
    
      })
 })
*/

 $scope.statusColapse= 0;

$scope.alocate=function(res){

     if($scope.statusColapse == res){
                                           $scope.IsVisible = $scope.IsVisible ? false : true;
                                          
                                           return;
                                        }else{
                                          $scope.IsVisible=true;
                                        }
                                        $scope.statusColapse= res;


                                        $scope.subid=res;
}

}]);
