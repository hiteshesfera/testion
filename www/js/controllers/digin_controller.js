
myapp.controller('DigCtrl', function(maydata , $scope ,  $location , $timeout , $ionicSlideBoxDelegate , $ionicScrollDelegate ,  $ionicModal , $stateParams , MinsData) {
 $scope.$on('$ionicView.beforeEnter', function () {
          

// console.log(maydata);
// console.log("**************Digin CONTROLLER CALLED NOW*************");
// console.log("yoyo");
// $stateParams.minId is our main digin id will remoain same through out our controller 
/**
* var data
* settinh initial data for our 4 container
*/ 
 
// $scope.maintoptitle = $stateParams.minName;


 // old func to fetch all data  from mine id start here
 // var  data =  MinsData.getMin_by_id($scope , $stateParams.minId);
 // old func to fetch all data  from mine id end here

//  var myvalue = MinsData.getCommonVariable();
//  console.log("==>" + myvalue);

//  MinsData.setCommonVariable("This is new Value");

// var myvalue = MinsData.getCommonVariable();
//  console.log("==>" + myvalue);


    $scope.levelgtrtn0 = false;
    $scope.levelz3gtrtn0 = false;
    $scope.showz1up =false;
    $scope.showz3up = false;
    $scope.showerror = false;
    $scope.showerrortext = "";

    $scope.handle =  {
      TotalLevel : 0 ,
      currentLevel : 0 ,
      leveldata : [] ,
      currentLevelz3 : 0 ,
      leveldataz3 : []
    }


  MinsData.getCurrentMine($scope , $stateParams.minId);
  var data =  MinsData.localgetMin_by_id($scope , $stateParams.minId);

  $scope.dragok = false;
      // $scope.diginData = data;
      // $scope.handle.z1level = data.data;
      // $scope.handle.leveldata.push($scope.handle.z1level);
      // $scope.selected_item =  $scope.handle.z1level[0].children;
      // // for z3
      // $scope.handle.z3level = data.data;
      // $scope.handle.leveldataz3.push($scope.handle.z3level);
      // $scope.selected_item_z3 = $scope.handle.z3level[0].children;

      $ionicModal.fromTemplateUrl('addNewItem.html', function(modal) {
      $scope.addNewItemMedel = modal;
        }, {
          scope: $scope
        });


      $ionicModal.fromTemplateUrl('editItem.html', function(modal) {
      $scope.editItemMedel = modal;
        }, {
          scope: $scope
        });


   $ionicModal.fromTemplateUrl('browse.html', function(modal) {
   $scope.broweModal = modal;
    }, {
    scope: $scope ,
    animation: 'slide-in-up'
    });

$scope.addHoverClass = function(event){
  $(event.target).addClass("hovered");
}

$scope.removeHoverClass = function(event) {
$(event.target).removeClass("hovered");
}




$scope.check = function() {
  if ($scope.dragok) {
    alert();
     return "true";
   } else {
    return "false";
   }
 
}


/**
* This is function is called when clicked on z1 element
* - 
* @params item = current click element obj
*  
*/ 


 $scope.z1ElementClicked = function(item) {
console.log("This is clicked Element");
console.log(item.id);
  // MinsData.getEleClickData($scope,  $stateParams.minId , item );
 MinsData.localZ1ClickedElementData($scope,  $stateParams.minId , item );
  //$scope.selected_item = item.children;
 }

 /**
 * function z3ElementClicked 
 * function called when clicked on z3 container
 */ 

  $scope.z3ElementClicked = function(item) {
   
  // console.log(item.children);
  // MinsData.getZ3EleClickData($scope,  $stateParams.minId , item );
    MinsData.localZ3ClickedElementData($scope,  $stateParams.minId , item );
 }


/**
* function onDoubleTap
* This function will do following 
* a) web service to fetch all element with item.id as parent id
* b) fetch all result and set on selected container.
* c) if result is found on webservice for selected data show alert no data found 
* d) 
*/ 

$scope.onDoubleTap = function($event , zone , item) {


  // console.log("Element Is Clicked Now");
  // console.log("This is z1 parent ");
  // console.log($scope.z1parent);
  // console.log("This is z2 container parent");
  // console.log($scope.handle.z1childparent);
  // console.log("This is z3 container parent");
  // console.log($scope.z3parent);
  // console.log("This is z4 container parent");
  // console.log($scope.z4paren);


 //  console.log($event);
  $event.stopPropagation();
  $event.stopImmediatePropagation();
  $event.preventDefault();
  $scope.handlefir.freezeScroll(false);

  console.log("*******************************************");
  console.log(item);
  console.log(zone);
  // if condition to check this zone

  MinsData.setTrackVariable(zone , item.id );
  
  console.log("zone first tracking");
  var first_variable = MinsData.getTrackVariableFirst();
  var second_variable = MinsData.getTrackVariableSecond();
  console.log(first_variable);
  console.log(second_variable);
  console.log("zone second tracking");
  console.log("*******************************************");
  
  // console.log(">>>>>>>>>>>>>>>>>>>>yoyo>>>>>>>>>>>>>>>>>>>>");
  // console.log(item.children);

 var oyoyo =  MinsData.localFindAndSetInnerElement( $scope ,  $stateParams.minId  , item , zone);
 // console.log(oyoyo);


 
 oyoyo.then(function(result){
  // console.log(">>>>>>>>>>>>>>>>>>>>yoyo>>>>>>>>>>>>>>>>>>>>");
  // console.log(result);

  if (!result) {
   $scope.showEditScreen(item);
  }

 })
 
}


 
$scope.showEditScreen = function(item) {
  // console.log("This is edit screen");
  // console.log(item);
  $scope.currentEditItem = item;
  // alert("edit functionality goes here");
   $scope.editItemMedel.show();
}

 $scope.editItem = function(item) {
    // console.log("This is edited element data");
    // console.log(item);
 // // This is function will do following . 
 // // get new element edit value
 // //  user we service to edit the element usign id 
 // // get latest result and update them

if (item != undefined) {

  if (item.name == "") {
    console.log("name cant be emtpy");
 
  } else {
     $scope.editItemMedel.hide();  
  MinsData.editDiginItem($scope  , $stateParams.minId  , item , $scope.currentEditItem );
  }

} else {
  alert("No element is edited")
}


// if (item != undefined) {
//   $scope.editItemMedel.hide();  
//     MinsData.editDiginItem($scope  , $stateParams.minId  , item , $scope.currentEditItem );
// };

  

 }

 $scope.DeleteItem = function(item) {


    var confi = confirm("Are you sure");
     
     if (confi) {
       $scope.editItemMedel.hide();
        console.log("dfdfdfdf");
        console.log($stateParams.minId );
       MinsData.deleteDiginItem($scope  , $stateParams.minId  , item);
     } else {
      alert("data is not deleted")
     }


 }

 $scope.closeEditItem = function(){
   $scope.editItemMedel.hide();  
 }

 $scope.handleother = $ionicScrollDelegate.$getByHandle('mainScroll');
 $scope.handlefir = $ionicScrollDelegate.$getByHandle('mainScrollfir');
 $scope.handlethird = $ionicScrollDelegate.$getByHandle('mainScrollthird');


    $scope.dragginright =false;
    $scope.dragginleft = false;
 //  var scrollTimer;
  $scope.onDragLeft = function(e){
    $scope.dragginright = false;
    $scope.dragginleft = true;


  };
$scope.onDragRight = function(e){
  $scope.dragginright = true;
  $scope.dragginleft = false;
    // console.log(e);
    // console.log("Dragging To Right");
  };

var getClosestValues = function(a, x , direction) {
    var lo, hi , loele , hiele;
    for (var i = a.length; i--;) {
        if (a[i].left <= x && (lo === undefined || lo < a[i].left)) {
          lo = a[i].left;
          loele = a[i].element;
        }

        if (a[i].left >= x && (hi === undefined || hi > a[i].left)) {
          hi = a[i].left;
          hiele = a[i].element;
        } 
    };



    if (direction == "left") {
     return [hi , hiele];
    } else {
     return [lo , loele];
    }

   
}

// $scope.scrolllft = function(){

//   console.log("scope to left is active");
// }
// Timer variable to detect scroll ending time.
var scrollTimer;
function scrollEnded(zone , element) {
  var item = {}
  item.id = element;
  if (zone == 'z1') {
   MinsData.localZ1ClickedElementData($scope,  $stateParams.minId , item );
  } else if(zone == 'z3') {
   MinsData.localZ3ClickedElementData($scope,  $stateParams.minId , item );
  }
  
  }

var funcGlobal;




$scope.lastupdatedvaluez1  = "";
$scope.lastupdatedvaluez3  = "";


/**
 * scrolling function
 * takes 1 param zone
*/ 

/**
* function scrollingaction()
* function will perform scroll action.
* loopelement array contain all element array in zone element will depend on the scroll zone
* handle is scroll handle used to stop make element center mainly to play with scroll depending on the zone in which scroll is happening
* zone is the zone value 
*/ 
function scrollingaction(loopElement , handle , zone ){
  var dff  = handle.getScrollPosition();
  handle.getScrollView().options.animationDuration = 30;
   var myarray = [];
   // console.log("loop element starts");
   // console.log(loopElement);
   $.each(loopElement , function(value , key) {
        var tempobj = {
          "left" : key.offsetLeft ,
          "element" : $(key).data('id')
         }
    myarray.push(tempobj);
 });

var direction = "";
var scrollstop = "";
if ($scope.dragginleft) {
  direction = "left";
  // its required to round off the dff.left value which is ceil for left and floor for right
 scrollstop = Math.ceil(dff.left);

} else if($scope.dragginright) {
  direction = "right";
  scrollstop = Math.floor(dff.left);
}


var df = getClosestValues(myarray , dff.left , direction  );



      if (df[0] != undefined) {  
          if (scrollstop != df[0]) {
            
       if ( df[1] == undefined) {
      // $scope.funcGlobal = 78978978;
      $scope.funcGlobal = false;
      $scope.lastupdatedvaluez1 = false;
           if (zone == "z1") {
                $scope.handle.z1childparent = false;
                $scope.selected_item_z1 = [];
                handle.scrollTo(df[0] , 0 , true);
           } else if(zone == "z3") {
                $scope.z4parent = false;
                $scope.selected_item_z3 = [];
             handle.scrollTo(df[0] , 0 , true);
           }
            
       } else {
       $scope.funcGlobal = df[1];
       $scope.lastScrollTopPosition = df[0];
        handle.scrollTo(df[0] , 0 , true) 
       } // if ( df[1] == undefined) {
      } else {
         console.log("nooo");
      }
  } 


  scrollTimer = $timeout(function() {
  
    if ($scope.funcGlobal != undefined) {
        if ($scope.lastupdatedvaluez1 !=  $scope.funcGlobal ) {
       $scope.lastupdatedvaluez1 = $scope.funcGlobal;
       scrollEnded(zone ,  $scope.funcGlobal );
     }
    };
    }, 200);






}


 $scope.scrolling = function(zone){

// scroll off time out condition
  if (scrollTimer) {
      $timeout.cancel(scrollTimer);
    }

 // var position = $ionicScrollDelegate.$getByHandle('mapDelegate').getScrollPosition();
 // freez scroll on longhold condition

 if ($scope.longPressedd) {
    $scope.handlefir.freezeScroll(true);
    $scope.handlethird.freezeScroll(true);
  } 

if (zone == 'z1') {
 // console.log("current zone is z1");
  var dff  = $scope.handlefir.getScrollPosition();
  var allelements = $('.hh-first ion-item.hhitem');
  scrollingaction(allelements , $scope.handlefir , zone);

//$scope.handlefir.getScrollView().options.animationDuration = 30;


} else if(zone == 'z3') {
 // console.log("current zone is z3");
  var myarray = [];
    var dff  = $scope.handlethird.getScrollPosition();
  var allelements = $('.hh-third ion-item.hhitem');

 scrollingaction(allelements ,$scope.handlethird , zone);

}

  


// if condition for freezing scroll on longhold
  if ($scope.longPressedd) {
     $scope.handleother.freezeScroll(true);
  } 
  
 }

$scope.longPressedd = false;
$scope.allowrelease = false;




$scope.onRelease = function(event , item) {

  if ($scope.allowrelease) {
  console.log("&&&***I Am Here .... ***&&&");
  console.log("yoyoyoyoyo");
  $scope.longPressedd = false;
  $scope.handleother.freezeScroll(true);

    $("#dynamicfloatingele").css({
        "display" : "none" 
    });

 // console.log($scope.currentele);

// if  condition check for checking if data attribut id is undefined 
// and checking listitem class

 if ($($scope.currentEle).data("id") != undefined && $($scope.currentEle).hasClass('listitem') && $scope.droppedonoutercontainer ) {

   console.log($($scope.currentEle).data("id"));

   console.log("This is zone of dropped element");
   console.log($($scope.currentEle).data("zone"));

   console.log(item);
   console.log("*************FIRST STAGE****************");
   MinsData.checkTrackVariable($($scope.currentEle).data("zone") , item.id);

   /**
   *Here We Need To Find If dragged element is parent of the dropped container.
   *if dragged container is parent of droped container then stop the droped action and shoot alert 
   *
   **/ 

   if (item.id == $($scope.currentEle).data("id")) {
   // alert("Cant drop on same element");
   } else if(MinsData.checkTrackVariable($($scope.currentEle).data("zone") , item.id)){
    alert("Element can't go inside its child");
   } else {
     $(event.target).css("display" , "none");

     MinsData.moveElementToNewPos( $scope ,  $stateParams.minId , item , $($scope.currentEle).data("id") );
   }
} 
 if($($scope.currentEle).data("id") != undefined && $($scope.currentEle).hasClass('listitem') && $scope.droponzonezero) {
  console.log("*************SECOND STAGE****************");
  MinsData.moveElementToParentLevel($scope ,  $stateParams.minId , item );
  $(event.target).css("display" , "none");
  // Here we need to move element to zone level 0
}

$scope.allowrelease = false;

  }

$(".listitem").css({
  "background" : "#fff"
});

 $(".dropzonezero").css({
        "background" : "red"
  });


}

$scope.droppedonoutercontainer = false;



/**
* current
* 1.) Longhold on element will first find 
the position of current element and apply to our 
container
2.) Now on hold and drag find the element 
located on mouse pointer position
3.) on drop find the last element with listitem class
and get the id of that element this id is the parent
id of the dragged element.

* Dragfunctionality steps
* 1.) Long Hold on element Will get the the current
position of pointer
2.) apply current css to the dragg element
3.) 
*/ 

 $scope.draggingg = function(event , item) {

  if ($scope.longPressedd) {

   $scope.allowrelease = true;
   event.stopImmediatePropagation();
   event.preventDefault();
   var width = event.target;
    // console.log(event);
 var ele =   document.elementFromPoint( $scope.scodyleft + event.gesture.deltaX  , $scope.scodytop + event.gesture.deltaY );
     // console.log("here");
     // console.log(ele);
    if ($(ele).hasClass('listitem')) {
      // console.log("Yes ");
      $scope.currentEle = ele;
    }

    if ($(ele).hasClass('drag_list')) {
      $scope.droppedonoutercontainer = false;
      $scope.droponzonezero = false;
    
    $(".dropzonezero").css({
        "background" : "red"
      });

    } else if($(ele).hasClass('dropzonezero')) {

      $(".dropzonezero").css({
        "background" : "green"
      });

      $scope.droponzonezero = true;

    } else {

       $(".dropzonezero").css({
        "background" : "red"
      });

      $scope.droponzonezero = false;
      $scope.droppedonoutercontainer = true;
    }




$(".listitem").css({
  "background" : "#fff"
});

  if ($(ele).hasClass('listitem')) {
     $(ele).css({
       "background" : "#ccc"
     });
   }

   // };
    // console.log(ele);
   
    $("#dynamicfloatingele").css({
       "top" :   $scope.scodytop + event.gesture.deltaY  ,
       "left" :   $scope.scodyleft + event.gesture.deltaX ,
        "width": $(event.target)[0].offsetWidth , 
        "height" : $(event.target)[0].offsetHeight, 
        "position": "absolute" , 
        "background" : "#fff" , 
        "display" : "block" ,
        "z-index" : "999999999999999"
    });

  }
 
 }

  $scope.scodyleft = 0;
  $scope.scodytop = 0;
  $scope.scodyleftt = 0;
  $scope.scodytopp = 0;


 $scope.longPressed = function( event , item){
 $scope.longPressedd = true;

console.log("Element longpressed set inner text");
console.log($(event.target).html());

 $(event.target).css("background" , "#ccc")

  var totaltop = event.target.offsetTop +  event.target.offsetParent.offsetParent.offsetTop + event.target.offsetParent.offsetParent.offsetParent.offsetTop;
  var totalleft = event.target.offsetLeft + event.target.offsetParent.offsetLeft + event.target.offsetParent.offsetParent.offsetParent.offsetLeft;
  // $scope.scodyleft = event.gesture.center.pageX - ($(event.target)[0].offsetWidth/2);
  // $scope.scodytop  =  event.gesture.center.pageY - ($(event.target)[0].offsetHeight/2);
  $scope.scodyleft = event.gesture.center.pageX;
  $scope.scodytop  =  event.gesture.center.pageY;

 $("#dynamicfloatingele").html($(event.target).html());
 $("#dynamicfloatingele").css({
  "text-align" : "center"
 });


 }
$scope.sdf = function() {

}

 $scope.onDragStart = function() {

 }

 $scope.dragStop = function(event) {

 console.log($(event.target).data("zone"));

   if ($(event.target).data("zone") == "z2") {
    
    $(".z3 , .z4").css({
      "background" : "#ddd none repeat scroll 0 0" 
    });

    $(".z1 ul li").css("display" , "table");
    
   } else if ($(event.target).data("zone") == "z4") {
    
     $(".z3 ul li").css("display" , "table");
    $(".z1 , .z2").css({
      "background" : "#ddd none repeat scroll 0 0"
    });
   }
 }

  $scope.onDragg = function(event){

 //  console.log( event.target.attributes["data-zone"].value);

   if ($(event.target).data("zone") == "z2") {
   $(".z1 ul li").css("display" , "none");

    $(".z3 , .z4").css({
      "background" : "red"
    });

   } else if ($(event.target).data("zone") == "z4") {

     $(".z3 ul li").css("display" , "none");
      $(".z1 , .z2").css({
        "background" : "red"
         });
   }


 $(".ui-draggable-dragging , .ui-draggable-dragging a").css({
  height: event.target.offsetHeight - 13 , 
  width : event.target.offsetWidth -13 ,
  'list-style' : 'outside none none' ,
  'text-align' : 'center'
 });

};

$scope.activeAllowedDropZone = "";

$scope.onDroppMain = function(event , ui) {
   if ( (ui.draggable.data("zone") == "z2" && $(event.target).data("section") == "z1" ) || (ui.draggable.data("zone") == "z4" && $(event.target).data("section") == "z3" ) )  {
         alert("This action is not allowed");
         return false;
   }
   $scope.activeAllowedDropZone = $(event.target).data("section");
   // alert("Element dropped from "+ ui.draggable.data("zone") +" zone to " + event.target.attributes["data-zone"].value + " zone" );
}

$scope.closeBrowse = function() {
  $scope.broweModal.hide();
}

$scope.onSwipeLeftClos = function() {
    $scope.broweModal.hide();
}

$scope.gohome = function(event) {
    window.location = "#/tab/home";
}


$scope.swappedleftdone = false;

$scope.onSwapRelease = function() {
  $scope.swappedleftdone = false;
}

$scope.onSwipeLeft = function(event) {
   if (!$scope.swappedleftdone) {
     $scope.swappedleftdone = true;
     $location.path("/browse/" + $stateParams.minId);
    }
  }


  $scope.closeNewItem = function() {
    $scope.addNewItemMedel.hide();
  }

  $scope.addNewItem = function(  asdf ) {
  $scope.element = {};
  $scope.tempvalue = "";
  $scope.currentselectedzonetemp = "";
   console.log("this is selected container  " + asdf);

  if (asdf == 'z1') {
  //  console.log($scope.z1parent);
   $scope.tempvalue = $scope.z1parent;
   $scope.currentselectedzonetemp = 'z1';
  } else if(asdf == 'z2') {
   $scope.tempvalue = $scope.handle.z1childparent ;
   $scope.currentselectedzonetemp = 'z2';
  } else if(asdf == 'z3') {
 
 $scope.tempvalue = $scope.z3parent;
 $scope.currentselectedzonetemp = 'z3';
  } else if(asdf == 'z4') {
    console.log("This is z4 parent id on add item click");
    console.log($scope.z4parent);
   $scope.tempvalue = $scope.z4parent;
   $scope.currentselectedzonetemp = 'z4';
  }
   $scope.addNewItemMedel.show();
  }


  /**
  *@function createNewItem()
  *
  * function will take object as argument data = obj
  * 1)check if name is presend and data is not empty
  * 2)if new name is ok then create new element. 
  * 3)load current created element on right si
  *
  */ 

  $scope.createNewItem = function(data) {
   
     if (data != undefined && data != "") {
      if (data.name == "" || data.name == undefined) {
          $scope.showerror = true;
          $scope.showerrortext = "Name Field is empty";
          $timeout(function(){
        $scope.showerror = false;
        $scope.showerrortext = "";
           }, 2000);
      }  else {
        console.log("This is temp value");
        console.log($scope.tempvalue);
        console.log($scope.currentselectedzonetemp);
          $scope.addNewItemMedel.hide();
         /** 
          * 
          *
          *   |^^^|
          *   |___|
          *   (o_O) => This function create new element.
          *     |
          *     |
          *    /|\  
          * ^^^^^^^^^^^^^^
          ^^^^^^^^^^^^^^^^^^^^

         */ 
         $scope.showerror = true;
         $scope.showerrortext = "";
          MinsData.createNewItemm($scope ,  $stateParams.minId , data.name , data.description , $scope.tempvalue , $scope.currentselectedzonetemp );
      }

     } else  {
       alert("form cant be empty")
     }
  }


/**
* function goback()
* -
* 1) find section
* 2) find parent id of section
* 3) find element with parent id
* 4) get all data of parent id element of parent id element
* 5)
*/ 

  $scope.goback = function(zone){
    MinsData.removeTrackVariableFirst(zone);
    MinsData.localGoBackFunc( $scope , $stateParams.minId ,  zone);
  }

    });

})

