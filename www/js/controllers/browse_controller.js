
myapp.controller('BrowseCtrl' , function( maydata , $scope , $window , $location ,$timeout , $ionicPlatform , $ionicNavBarDelegate , $ionicHistory , $stateParams , $rootScope ,  $ionicModal  , MinsData ){
 


 
      MinsData.getBrowseData($scope , $stateParams.minId);
      MinsData.getCurrentMine($scope , $stateParams.minId);
      
      $scope.student = {
        name: "dj",
        age: 32,
        subject: [
            "math" ,
            "geography"
        ]
    }
 
    $scope.setGrade = function (student) {
        student.grade = "A+"
    }

      $scope.customer = {
        name: 'Naomi',
        address: '1600 Amphitheatre'
  };

setTimeout(function(){
   var updateOutput = function(e)
    {
      // console.log("I Am inside update output function");
        var list   = e.length ? e : $(e.target),
            output = list.data('output');
        if (window.JSON) {
          // console.log("this is current obj");
          //console.log($scope.diginData.data);
          //console.log("This is changes obj");
          //console.log(list.nestable('serialize'));
          //console.log($scope.diginData.data == list.nestable('serialize'));
          // output.val(window.JSON.stringify(list.nestable('serialize')));//, null, 2));
        } else {
            output.val('JSON browser support required for this demo.');
        }
    };

  $('#nestable3').nestable({

    dropCallback : function(){
      // console.log("^^^^^^^^^^^^^^^^^^^");
      // console.log(this.currentDropedElment);
      // console.log("this is current object id");
      // alert(JSON.stringify(this.currentDropedElment));
  
      MinsData.moveElementToNewPosBrowse($scope , this.currentDropedElment.current.id , this.currentDropedElment.droped_to_parent);
      // console.log("THis is moved to id");
      // console.log(this.currentDropedElment.droped_to_parent);
    }

  }).on('change', updateOutput);;
  $('#nestable').nestable();
  console.log("closing now");
  $('.dd').nestable('collapseAll');
 }, 900);


$scope.open = function(){
   console.log("open my things");
     $('.dd').nestable('expandAll');
}

$scope.close = function() {
   console.log("close my things");
   $('.dd').nestable('collapseAll');
}




  $scope.onSwipeLeft = function(event) {
    // $ionicNavBarDelegate.back();
    // window.history.go(-1);
    // $ionicHistory.goBack(-1);
    // var historyId = $ionicHistory.currentHistoryId();
    // var history = $ionicHistory.viewHistory().histories[historyId];
    // for (var i = history.stack.length - 1; i >= 0; i--){
    //   if (history.stack[i].stateName == stateName){
    //     $ionicHistory.backView(history.stack[i]);
    //     $ionicHistory.goBack();
    //   }
    // }
    // window.history.back(1);
    // $('#nestable3').remove();
    console.log("THis is id " + $stateParams.minId);

    $location.url("/home/"+ $stateParams.minId);
    // $rootScope.$apply();
    // location.reload();
    // $window.location.reload();
    // window.location = "#/home/"+ $stateParams.minId;
    // $route.reload();
     //window.location = "#/home/"+ $stateParams.minId;
  }

  $scope.browserclickfunc = function() {
    alert("element clicked");
  }


})