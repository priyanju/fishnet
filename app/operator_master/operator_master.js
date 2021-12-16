'use strict';

angular.module('operator_master', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/operator_masters', {
    templateUrl: 'operator_master/operator_master.html',
    controller: 'OperatormasterCtrl'
  });
}])

.controller('OperatormasterCtrl', ['$scope', '$http','$location','$window','$rootScope',
  function($scope, $http,$location,$window,$rootScope) {

 //$scope.myLoader = true;
 $scope.phoneNumbr = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
  $scope.email = {
        text: 'me@example.com'
      };
//$scope.tenant_id=localStorage.getItem("tenant_id");
//$rootScope.tenant=$scope.tenant_id;
$scope.operatorregistration = {id: null,name:"",spec_id:"",operator_type:"",description:""};
//$scope.username=localStorage.getItem("username");
$scope.operatorForm= function(){  
 
        var operatorregistration = {"name":$scope.operatorregistration.name,"spec_id":$scope.operatorregistration.spec_id,"operator_type":$scope.operatorregistration.operator_type,"description":$scope.operatorregistration.description};
  if ($scope.operatorregistration.id== null){
      $http
      ({
        method: 'post',
        url: $rootScope.api_url+'operators',
        data: operatorregistration  
      })
      
      .success(function(data) {
        
        if(data){
$scope.operatorregistration="";
       // $state.go('/company_registration');
    alert(data.message);
$scope.clientinit();
      $scope.breaktimeinit();
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
        url: $rootScope.api_url+'operators/'+$scope.operatorregistration.id,
        data: operatorregistration  
      })
      
      .success(function(data) {
        
        if(data){

       // $state.go('/company_registration');
alert(data.message);
     // $window.location.reload();
    $scope.clientinit();
       $scope.breaktimeinit();
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
    url:$rootScope.api_url+'operators'
  })
  .then(function(response){
    $scope.myLoader = false;
   $rootScope.operators = response.data; 
   
    })
}

  $scope.cleandata=function(){

$scope.cleardata=  {id: null,name:"",spec_id:"",operator_type:"",description:""};
$scope.operatorregistration = angular.copy($scope.cleardata);
  }

    $scope.edit = function(id) {
      console.log($rootScope.operators);
var i;
   for(i in $rootScope.operators) {

            if($rootScope.operators[i].id == id) {
               var operator_id=$rootScope.operators[i];
               $scope.operatorregistration = angular.copy(operator_id);
            }
           
        }
    }

$scope.delete = function(id) {
 if ($window.confirm("Please confirm?")) {
$http.delete($rootScope.api_url+'operators/'+id).success(function(data) {
        
        if(data){

       // $state.go('/company_registration');
alert(data.message);
      //$window.location.reload();
      $scope.clientinit();
        }else{      
        alert('Delete Failed');   
        }
      });
}

}

	

}]);