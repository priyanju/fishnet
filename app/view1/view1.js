'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])


.controller('View1Ctrl', ['$scope','$http','$location','$rootScope','$timeout','$window', function($scope,$http,$location,$rootScope,$timeout,$window) {
$scope.percentageValue = 39;
$scope.MachineID;
$scope.ShiftID;
 /* $scope.tenant_id=localStorage.getItem("tenant_id");
$scope.username=localStorage.getItem("username");
$scope.roleforpage=localStorage.getItem("role_id");
$scope.useridforedit=localStorage.getItem("userid");
$scope.JobID;*/
$scope.dateday=new Date();

$scope.from_date;
$scope.to_date;
$scope.to_date1;
$scope.momentToday= moment(new Date()).format("YYYY-MM-DD");
$scope.momentToday1=moment().subtract(1, 'day').format("YYYY-MM-DD");
$scope.myLoader = true;
$http({

    method:'GET',
    url:$rootScope.api_url+'operator_list'
  })
  .then(function(response){
    $scope.myLoader = false;
   $rootScope.userdetails = response.data; 
   
    })
    
  $scope.exportData = function (){
        var blob = new Blob([document.getElementById('exportable').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "Report.xls");
  };

  $scope.exportData1 = function (){
        var blob = new Blob([document.getElementById('exportable1').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "Report.xls");
  };

$scope.typewise=["Shiftwise","Operatorwise","Datewise"];
$scope.splitwise=["Idlereason"];
    $scope.mychange=function(man){
      //$scope.operator_id='';
     
     // $scope.ShiftID = undefined;
     $rootScope.wise= man;
     console.log($rootScope.wise);
     if(man == "Datewise"){
      $scope.operator_id=undefined;
      $scope.ShiftID=undefined;
      $scope.split=undefined;
      $scope.splittype=null;
     }
     $scope.items = []; 
}

$scope.splitchange=function(split){

$scope.split=split;
if($scope.split == null){
  $scope.split=undefined;
}
$scope.items = []; 
}

$scope.checkingmachineid=function(){
if($scope.MachineID == null){
  $scope.MachineID=undefined;
}
//alert($scope.MachineID);

}
$scope.checkingshiftid=function(){
  $scope.operator_id=undefined;
  if($scope.ShiftID == null){
  $scope.ShiftID=undefined;
}
 //alert($scope.ShiftID);
}

$scope.checkingopid=function(){
   $scope.ShiftID=undefined;
  if($scope.operator_id == null){
  $scope.operator_id=undefined;
}
 //alert($scope.operator_id);
}



$scope.generate_report=function(gd,opid){
  $scope.show=1;
  if($rootScope.wise == 'Operatorwise' && $scope.operator_id==undefined){
  alert("please select operator")
  return;
}




//alert($scope.to_date);



// if($scope.from_date ==$scope.momentToday){
//   $http({
//     method:'GET',
//     url:$rootScope.api_url+'today_reports?start_date='+$scope.from_date+'&end_date='+$scope.from_date+'&report_type='+ $rootScope.wise
//   }).then(function(response){
//   $scope.myLoader = false;
//    $scope.items = response.data;
//    console.log($scope.items); 
//    $scope.isdisabled=false;
   
//     })
//     return;
// }


// if($scope.split=="Idlereason"){  
// $http({
//   method:'GET',
//   url:$rootScope.api_url+'reason_reports?start_date='+$scope.from_date+'&end_date='+$scope.to_date+'&machine_id='+$scope.MachineID+'&shift_id='+$scope.ShiftID+'&operator_id='+$scope.operator_id+'&report_type='+ $rootScope.wise
// })
// .then(function(response){
//   $scope.reasonitem=[];
//   $scope.myLoader = false;
//  $scope.reasonitem1 = response.data; 
//  for(var d in $scope.reasonitem1.data){
  
  
//  }
//  console.log($scope.reasonitem)
// $scope.isdisabled=false;

//   })
//   return;
// }
if($scope.split=="Idlereason"){  

  if($scope.MachineID == undefined){
   alert("Please Select Machine Name");
   return;
  }
  if($scope.ShiftID == undefined && $rootScope.wise=='Shiftwise'){
    alert("Please Select Shift");
    return;
  }
 
    $scope.myLoader = true;
  $http({
    method:'GET',
    url:$rootScope.api_url+'hmis?start_date='+$scope.from_date+'&end_date='+$scope.from_date+'&machine_id='+$scope.MachineID+'&shift_id='+$scope.ShiftID+'&operator_id='+$scope.operator_id+'&report_type='+ $rootScope.wise
  })
  .then(function(response){
   // $scope.reasonitem=[];
    $scope.myLoader = false;
   $scope.reasonitem = response.data; 

   $scope.dur=0;
   for(var j in $scope.reasonitem){

     if($scope.reasonitem[j].duration != undefined){ 
      var hms = $scope.reasonitem[j].duration;   // your input string
      var a = hms.split(':'); // split it at the colons    
      // minutes are worth 60 seconds. Hours are worth 60 minutes.
      var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
    $scope.dur +=seconds;

  
  }

   }
  console.log($scope.reasonitem2);
   $scope.dur= convertMinsToHrsMins($scope.dur);
   
  
    })
    return;
  }

  if( $scope.to_date==null){
    alert("Please Select ToDate");
    return;
    }

if($rootScope.wise== "Datewise" ){  
  $scope.myLoader = true;
$http({
  method:'GET',
  url:$rootScope.api_url+'date_reports?start_date='+$scope.from_date+'&end_date='+$scope.to_date+'&machine_id='+$scope.MachineID+'&shift_id='+$scope.ShiftID+'&operator_id='+$scope.operator_id+'&report_type='+ $rootScope.wise
})
.then(function(response){
  $scope.myLoader = false;
 $scope.items = response.data; 
$scope.isdisabled=false;

  })
  return;
}






$http({
  method:'GET',
  url:$rootScope.api_url+'reports?start_date='+$scope.from_date+'&end_date='+$scope.to_date+'&machine_id='+$scope.MachineID+'&shift_id='+$scope.ShiftID+'&operator_id='+$scope.operator_id+'&report_type='+ $rootScope.wise
})
.then(function(response){
  $scope.myLoader = false;
 $scope.items = response.data; 
$scope.isdisabled=false;

  })

return;




}




//chart

$scope.generate_chartreport=function(gd,opid){
$scope.show=2;
  if($rootScope.wise == 'Operatorwise' && $scope.operator_id==undefined ){
  alert("please select operator")
  return;
}




if($scope.split=="Idlereason"){ 
  
  $http({
    method:'GET',
    url:$rootScope.api_url+'hmi_report?start_date='+$scope.from_date+'&end_date='+$scope.from_date+'&machine_id='+$scope.MachineID+'&shift_id='+$scope.ShiftID+'&operator_id='+$scope.operator_id+'&report_type='+ $rootScope.wise
  }).then(function(response){
  $scope.myLoader = false;
   $scope.chartdatas = response.data;
    })

    $http({
      method:'GET',
      url:$rootScope.api_url+'overall_hmi_report_chart?start_date='+$scope.from_date+'&end_date='+$scope.from_date+'&machine_id='+$scope.MachineID+'&shift_id='+$scope.ShiftID+'&operator_id='+$scope.operator_id+'&report_type='+ $rootScope.wise
    }).then(function(response){
      $scope.myLoader = false;

     $scope.overallchartdatas = response.data;
      })

  return;
}

if( $scope.to_date==null){
  alert("Please Select ToDate");
  return;
  }

$http({
  method:'GET',
  url:$rootScope.api_url+'chartreports?start_date='+$scope.from_date+'&end_date='+$scope.to_date+'&machine_id='+$scope.MachineID+'&shift_id='+$scope.ShiftID+'&operator_id='+$scope.operator_id+'&report_type='+ $rootScope.wise
}).then(function(response){
$scope.myLoader = false;
 $scope.chartdatas = response.data;
  })

  $http({
    method:'GET',
    url:$rootScope.api_url+'overall_reports?start_date='+$scope.from_date+'&end_date='+$scope.to_date+'&machine_id='+$scope.MachineID+'&shift_id='+$scope.ShiftID+'&operator_id='+$scope.operator_id+'&report_type='+ $rootScope.wise
  }).then(function(response){
    $scope.myLoader = false;

   $scope.overallchartdatas = response.data;
    })

    return;




}

$scope.showChart=function(){
  $scope.showme = $scope.showme ? false : true;
}


$scope.exportclick=function() {
  
$scope.exportchartdata=[];
  console.log(Highcharts);
  for(var n in Highcharts.charts){
    if(Highcharts.charts[n] != undefined){
      $scope.exportchartdata.push(Highcharts.charts[n]);
    }
   
  }

  $scope.exportchartdata.reverse();
  Highcharts.exportCharts($scope.exportchartdata, {
      type: 'application/pdf'
  });

  

}



Highcharts.getSVG = function (charts) {
  console.log(charts)
  var svgArr = [],
      top = 0,
      width = 0;

  Highcharts.each(charts, function (chart) {
      var svg = chart.getSVG(),
          // Get width/height of SVG for export
          svgWidth = +svg.match(
              /^<svg[^>]*width\s*=\s*\"?(\d+)\"?[^>]*>/
          )[1],
          svgHeight = +svg.match(
              /^<svg[^>]*height\s*=\s*\"?(\d+)\"?[^>]*>/
          )[1];

      svg = svg.replace(
          '<svg',
          '<g transform="translate(0,' + top + ')" '
      );
      svg = svg.replace('</svg>', '</g>');

      top += svgHeight;
      width = Math.max(width, svgWidth);

      svgArr.push(svg);
  });

  return '<svg height="' + top + '" width="' + width +
      '" version="1.1" xmlns="http://www.w3.org/2000/svg">' +
      svgArr.join('') + '</svg>';
};



Highcharts.exportCharts = function (charts, options) {
  
  // Merge the options
  options = Highcharts.merge(Highcharts.getOptions().exporting, options);

  // Post to export server
  Highcharts.post(options.url, {
      filename: options.filename || 'chart',
      type: options.type,
      width: options.width,
      svg: Highcharts.getSVG(charts)
  });
  
  
};




}])



function convertMinsToHrsMins(totalSeconds) {
  var hours   = Math.floor(totalSeconds / 3600);
  var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
  var seconds = totalSeconds - (hours * 3600) - (minutes * 60);

  // round seconds
  seconds = Math.round(seconds * 100) / 100

  var result = (hours < 10 ? "0" + hours : hours);
      result += ":" + (minutes < 10 ? "0" + minutes : minutes);
      result += ":" + (seconds  < 10 ? "0" + seconds : seconds);
  return result;

}



