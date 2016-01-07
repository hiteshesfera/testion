angular.module('starter.controllers', [])



.controller('DashCtrl', function($scope) {})



.controller('MainHomeCtrl', function($scope , $timeout ,  $ionicModal , MinsData) {



$scope.showerror = false;
$scope.showerrortext = "";

$scope.ShowDig = function(data) {
   window.location = "#/home/"+ data.id ;
}


 $ionicModal.fromTemplateUrl('edit-task.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    scope: $scope
  });


  $ionicModal.fromTemplateUrl('add-task.html', function(modal) {
    $scope.addTaskModal = modal;
  }, {
    scope: $scope
  });
  $scope.newelementinit = {};

  $scope.navsliding = function() {
    alert();
  }
  
$scope.AddNewMine = function() {
  $scope.element = {};
  $scope.addTaskModal.show();
}

$scope.addToFav = function(event , item) {
  event.stopImmediatePropagation();
  
var value = false;
  if (item.fav == "true") {
 value = false;
  }else {
 value = true;

  }
  // alert("add this item to fav" + item.id + " TO " + value);

  MinsData.updateMindingFav($scope , item.id , value);
}


$scope.DeleteMine = function(data){
  data.destroy();
}

$scope.closemine  = function(){
   $scope.addTaskModal.hide();
}

$scope.createNewElement = function(element , addnewmineform) {


  console.log(element);
  console.log(element.description);
  if (element != "" && element != undefined ) {
     // check to see if value is empty

  if (element.name == "" || element.name == undefined) {
  // alert("Name can't be empty");
  $scope.showerror = true;
  $scope.showerrortext = "Name is required";
   $timeout(function(){
$scope.showerror = false;
$scope.showerrortext = "";
   }, 2000);

  return false;
  }

//   else if (element.description == "" || element.description == undefined) {
  
//    $scope.showerror = true;
//    $scope.showerrortext = "Description is required";

//   $timeout(function(){
// $scope.showerror = false;
// $scope.showerrortext = "";
//    }, 2000);
  
//    return false;
//   } 

  else {
    $scope.showerror = false;
    $scope.showerrortext = "";
     // insert comming data into database 
     $scope.addTaskModal.hide();
     MinsData.saveElement($scope , element);
     addnewmineform.$setPristine();
     addnewmineform.$setUntouched(); 

  }


  } else {
    alert("form is empty");
  }
  
// old createnewelement function
  //$scope.addTaskModal.hide();
 // MinsData.saveElement($scope , element);
 // old createnewelement func end here

}


  $scope.closeNewTask = function() {
    $scope.taskModal.hide();
  }

  $scope.modifyTask = function(item) {


  if (item == undefined) {
    
       $scope.showerror = true;
       $scope.showerrortext = "No Changes Found";
      
       $timeout(function(){
$scope.showerror = false;
$scope.showerrortext = "";
   }, 2000);


  } else if (item.name == "" && item.name != undefined) {
  // alert("Name can't be empty");
  $scope.showerror = true;
  $scope.showerrortext = "Name is required";
   $timeout(function(){
$scope.showerror = false;
$scope.showerrortext = "";
   }, 2000);


  return false;
  } else if (item.description == "" && item.description != undefined) {
  
   $scope.showerror = true;
   $scope.showerrortext = "Description is required";

  $timeout(function(){
$scope.showerror = false;
$scope.showerrortext = "";
   }, 2000);

   return false;
  } else {

    $scope.showerror = false;
    $scope.showerrortext = "";
    $scope.taskModal.hide();
    MinsData.UpdateMinding($scope , item , $scope.current_item.id);
    
  }

  
  }

  $scope.showMindingEditForm = function(item){
    console.log("sdf");
    $scope.current_item = item
    $scope.taskModal.show();
  }

  $scope.remove = function(item)  {
    var confi = confirm("Are you sure");
     
     if (confi) {
       MinsData.DeleteElement($scope , item);
     } else {
     
     }
  }

  $scope.removeC = function(item) {
     var confi = confirm("Are you sure");
     
     if (confi) {
      $scope.taskModal.hide();
       MinsData.DeleteElement($scope , item);

     } else {
     
     }
  }

 
// Fetching all data old start here
setTimeout(function(){
  MinsData.lacalall($scope);
}, 1000);
 
  // $scope.mins = MinsData.all($scope);
// Fetching all data from localhost start here
  //console.log( $scope.mins);
})





.controller('ChatsCtrl', function($scope, Chats) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})


.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };


});
