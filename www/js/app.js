// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js


var db = null;

var myapp = angular.module('starter', ['ionic' , 'ngCordova' , 'starter.controllers' , 'starter.services'  , 'ngTouch' , 'ngDropDown' , 'pascalprecht.translate'  ])

.run(function($ionicPlatform , $cordovaSQLite) {
  $ionicPlatform.ready(function() {
     // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
     // db = window.openDatabase("dragapp_test5.db", '1', 'my tab', 1024 * 1024 * 100); // browser
     // db =  window.openDB({ name: "dragapp_test3.db" }); // browser
     db =  $cordovaSQLite.openDB({ name: "dragapp.db" }); //device
     // $cordovaSQLite.execute(db, 'DROP TABLE IF EXISTS mines');
     var d =  $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS mines (id INTEGER PRIMARY KEY AUTOINCREMENT, name string , description text , fav boolean DEFAULT false , created_at DATETIME DEFAULT CURRENT_TIMESTAMP , updated_at DATETIME DEFAULT CURRENT_TIMESTAMP)');
      $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS digins (id INTEGER PRIMARY KEY AUTOINCREMENT, name string , description text , parent INTEGER , like INTEGER , mine_id INTEGER)');
     //alert("now running db open")
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})




.directive('onLongPress', function($timeout) {
  return {
    restrict: 'A',
    link: function($scope, $elm, $attrs) {
      $elm.bind('touchstart', function(evt) {
        // Locally scoped variable that will keep track of the long press
        $scope.longPress = true;
        // We'll set a timeout for 600 ms for a long press
        $timeout(function() {
          if ($scope.longPress) {
            // If the touchend event hasn't fired,
            // apply the function given in on the element's on-long-press attribute
            $scope.$apply(function() {
              $scope.$eval($attrs.onLongPress)
            });
          }
        }, 600);
      });

      $elm.bind('touchend', function(evt) {
        // Prevent the onLongPress event from firing
        $scope.longPress = false;
        // If there is an on-touch-end function attached to this element, apply it
        if ($attrs.onTouchEnd) {
          $scope.$apply(function() {
            $scope.$eval($attrs.onTouchEnd)
          });
        }
      });
    }
  };
})






.directive('testingdir' , function(){

  return {

    template: function(elem , attr) {
      console.log("=>>>>");
      console.log(attr.mydata);
      console.log("************************");
      console.log(elem);
      console.log(attr);
    }
  }

})


.directive('helloWorld' , function(){
  return {
    template : "{{student.name}} is {{student.age}} years old!!" ,
    
    restrict : 'E' , 
    scope : {
      name : '@' ,
      price : '@'
    } ,
    template : '{{name}} costs {{price}}' 
  }
})