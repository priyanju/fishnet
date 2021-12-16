'use strict';

angular.module('login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', ['$scope', '$http','$location','$window','$rootScope',
  function($scope, $http,$location,$window,$rootScope) {
 
   $scope.email = {
        text: 'me@example.com'
      };
    $scope.login = {email :"", password :""};  

    $scope.signin = function(){ 
        $scope.isdisabled=true; 
      var login=
      {
        "email":$scope.login.email_id,
        "password":$scope.login.password
      }
            
      $http
      ({
        method: 'post',
        url: $rootScope.api_url+'login',
        data: login  
      })
      
    .success(function(data) {
      console.log(data)
       localStorage.setItem('userdata',JSON.stringify(data))
      if(data == false){
        alert("please enter correct username or password")
      }else{
         localStorage.setItem("userDetails",JSON.stringify(data));
         var date =Date.now();
         localStorage.setItem("loginDate",JSON.stringify(date));
        $window.location='/#!/dashboard';
      }
      /* if(data.usertype_id==1)
      {
           $scope.isdisabled=false;
          // alert('Welcome your login was successful'); 
      
       // $state.go('/company_registration');
       localStorage.setItem("tenant_id",data.tenant_id);
       localStorage.setItem("userid",data.id)
       localStorage.setItem("username",data.first_name);
       localStorage.setItem("role_id",data.role_id);
       //alert( localStorage.getItem("tenant_id"));
      // $scope.const();
         $window.location='/#!/dashboard'; 
        }else if(data.usertype_id==2)
        {
          $window.location='/#!/alldetails'; 
        }else{      
           $scope.isdisabled=false;
           alert('The username or password is incorrect');   
        }*/
      }).error(function(data) {

        if(data.errors){
           alert('Username or password is invaild');
        }
       

      }); 

    }
/*start registration*/
   
  
}])
