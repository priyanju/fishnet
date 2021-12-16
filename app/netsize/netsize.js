'use strict';

angular.module('netsize', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/netsize', {
    templateUrl: 'netsize/netsize.html',
    controller: 'NetsizeCtrl'
  });
}])

.controller('NetsizeCtrl',
  function($scope, $http,$location,$rootScope,$window,$filter,$interval) {
    // console.log(apiURL);
 //$rootScope.test=  ["Select","0.20mm","0.23mm","0.25mm","0.28mm","0.30mm","0.32mm","Others"];
    $http({
      method:'GET',
      url:$rootScope.api_url+'net_types',
       })
    .then(function(response){
      console.log(response);
      $scope.myLoader = false;
     $scope.netsize_value = response.data;

     //$scope.shiftid=  $scope.shift_id_id.id
      })
       //SAME API BUT DIFFERENT VARIABLE
       $scope.filterValue = function($event){
          var inputChar = String.fromCharCode($event.keyCode);
          var patettern = /^[0-9.]+$/;
        if(event.charCode!=0){
          if (!patettern.test(inputChar)) {
          // invalid character, prevent input
          event.preventDefault();
          }
        }
        // if(isNaN(String.fromCharCode($event.keyCode))){
        //     $event.preventDefault();
        // }
};


$scope.netsiziearrayvalue =[];
console.log($scope.netsiziearrayvalue);
      $http({
        method:'GET',
        url:$rootScope.api_url+'net_types',
         })
      .then(function(response){
        console.log(response);
        $scope.myLoader = false;
       $scope.net_scroll = response.data;
       for (var k in  $scope.net_scroll) { 
        $scope.netsiziearrayvalue.push($scope.net_scroll[k]);
    }
    $scope.netsiziearrayvalue.push("Others");

      //  $scope.net_scroll = [net_types];
      //$scope.netsiziearrayvalue.push($scope.net_scroll[]);
       //$scope.shiftid=  $scope.shift_id_id.id
        })


     
      $scope.nexttab = function(net){
        console.log(net)
        $http({
          method:'GET',
          url:$rootScope.api_url+'net_names?net_type='+net,
           }).then(function(response){
             $rootScope.resnetval = response.data;
             console.log($rootScope.resnetval)
             $scope.myLoader = false;
             $window.location='/#!/netsizetype';
            })
      }
      $scope.inputshow = false;
      console.log($scope.inputshow)
      $scope.checkfunction = function(g){
        $rootScope.netcheckval = g;
        if(g == "Others")
        $scope.inputshow = true;
        else
        $scope.inputshow = false;
      }
      
    //   var newshifttrans = { "name": $scope.newshifttrans.name, "length": $scope.newshifttrans.length, "type": $scope.newshifttrans.type };
    $scope.net = {name :"", types :""};  

     $scope.newshifttrans= function(){
       if($rootScope.netcheckval == "Others")
      var net=
      {
        "length_type":$scope.net.name,
        "width":$scope.Weight.name,
        "net_type":$scope.net.types + "mm"
      }
      else
      var net=
      {
        "length_type":$scope.net.name,
        "width":$scope.Weight.name,
        "net_type":$rootScope.netcheckval,
      }
       console.log(net)
       $http({
        method: 'POST',
        url: $rootScope.api_url + 'net_sizes',
         data: net  

      })
        .then(function (response) {
          $rootScope.net = response.data;
           console.log($rootScope.net)
          $scope.myLoader = false;

        })
      }
    
     


      })
   
  
      //

      // POST http://183.82.250.137:3009/api/v1/net_sizes?
      // {
      //     "length_type": "some name",
      //     "width": "weight",
      //     "net_type": "some type"
      // }



    
 

