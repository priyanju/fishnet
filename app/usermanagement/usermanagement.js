'use strict';

angular.module('user', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/usermanagement', {
    templateUrl: 'usermanagement/usermanagement.html',
    controller: 'UserCtrl'
  });
}])

.controller('UserCtrl', ['$scope', '$http','$location','$window','$rootScope',
  function($scope, $http,$location,$window,$rootScope) {

 $scope.myLoader = true;
 //$scope.phoneNumbr = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
  $scope.email = {
        text: 'me@example.com'
      };


 $scope.userregistration = {id: null,username:"",email:"",password_digest:"",phone_number:"", note: "",user_type:2,role:{"id":null},active:true};
//$scope.username=localStorage.getItem("username");
$scope.userForm= function(){  

        var userregistration = {username:$scope.userregistration.username,email:$scope.userregistration.email,password_digest:$scope.userregistration.password_digest,phone_number:$scope.userregistration.phone_number, note: $scope.userregistration.note,role_id:$scope.userregistration.role.id,user_type:2,active: $scope.userregistration.active};

  if ($scope.userregistration.id== null){
   // alert($scope.userregistration.role_id);
      $http
      ({
        method: 'post',
        url: $rootScope.api_url+'users',
        data: userregistration  
      })
      
      .success(function(data) {
        
        if(data){
          //alert("hi");
$scope.userregistration="";
       // $state.go('/company_registration');
    alert("Registration completed");
    //$window.location.reload();
     $scope.userinit();
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
        url: $rootScope.api_url+'users/'+$scope.userregistration.id,
        data: userregistration  
      })
      
      .success(function(data) {
        
        if(data){

       // $state.go('/company_registration');
alert("Updated Successfully");
    $scope.userinit();
        }else{      
        alert('Updation Failed');   
        }
      });

    }

    }

  /*$http({

    method:'GET',
    url:$rootScope.api_url+'api/v1/tenants/'+$rootScope.tenant
  })
  .then(function(response){
   $rootScope.tenant_nme = response.data; 
   
    })


$http({

    method:'GET',
    url:$rootScope.api_url+'api/v1/roles?tenant_id='+$rootScope.tenant
  })
  .then(function(response){
   $rootScope.role_ids = response.data; 
         $rootScope.count=$rootScope.role_ids.length
    })*/

$scope.userinit=function(){

$http({

    method:'GET',
    url:$rootScope.api_url+'users'
  })
  .then(function(response){
    $scope.myLoader = false;
   $rootScope.users = response.data; 
   
    })

  $http({

    method:'GET',
    url:$rootScope.api_url+'roles'
  })
  .then(function(response){
    $scope.myLoader = false;
   $rootScope.rols = response.data; 
   console.log(response.data);
   
    })
}

  $scope.cleandata=function(){

$scope.cleardata= {id: null,username:"",email:"",password_digest:"",phone_number:"", note: "",user_type:2,role:{id:null},active:true};
$scope.userregistration = angular.copy($scope.cleardata);
  }

$scope.showdetails = function(id){

         var i=0;
    var len=$rootScope.count;
    
    for (; i<len; i++) {
      if ($rootScope.role_ids[i].id == id) {
      
       return $rootScope.role_ids[i].role_name;
      
      }
    }
         
     }


    $scope.edit = function(id) {

      console.log($scope.userregistration)
     //$scope.userregistration = angular.copy(user_id);
var i;
   for(i in $rootScope.users) {
             
            if($rootScope.users[i].id == id) {
               var user_id=$rootScope.users[i];
             
               $scope.userregistration = angular.copy(user_id);
               console.log($scope.userregistration)
            }
           
        }
    }

$scope.delete = function(id) {
 if ($window.confirm("Please confirm?")) {
$http.delete($rootScope.api_url+'users/'+id).success(function(data) {
        
        if(data){

       // $state.go('/company_registration');
alert("Deleted Successfully");
      $scope.userinit();
        }else{      
        alert('Delete Failed');   
        }
      });
}

}
}]);