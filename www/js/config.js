

myapp.config(function($stateProvider, $urlRouterProvider , $translateProvider ) {



  $translateProvider.useStaticFilesLoader({
   prefix: 'lang-' ,
   suffix: '.json'
  });

  //  $translateProvider.translations('en', {
  //   home_title: 'brainwork' ,
  //   digin_title : 'dig in' ,
  //   browse_title : 'browse' ,
  //   digin_view_first_label : 'view 1' ,
  //   digin_view_second_label : 'view 2' ,
  //   digin_long_hold_to_drag_text : 'Log press to drag and drop' ,
  //   browse_expand_all : 'Expand All' ,
  //   browse_collapse_all : 'Collapse All' ,
  //   digin_click_to_slide_text : 'Click to<span>Slide in</span>' ,
  //   digin_click_to_edit_text : 'Click<span>to edit</span>'
  // });

  // $translateProvider.translations('de', {
  //   home_title: 'braikljnwork' ,
  //   digin_title : 'dig in'
  // });

  $translateProvider.preferredLanguage('en');

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive



    .state('dig', {
    url: '/dig',
    abstract: true,
    templateUrl: 'templates/minings.html'
  })


     // Each tab has its own nav history stack:
  .state('dig.dash', {
    url: '/dash',
    views: {
      'dig-dash': {
        templateUrl: 'templates/dig-dash.html',
        controller: 'DigCtrl'
      }
    }
  })


    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  

  // Each tab has its own nav history stack:
  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

 .state('home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'MainHomeCtrl'
  })


  .state('home-detail', {
      url: '/home/:minId',
      templateUrl: 'templates/home-detail.html',
      resolve: {

         maydata: ['$stateParams' , 'MinsData'  , function( $stateParams , MinsData ) {
             // console.log("This is resolve for the digin controller taking this id => " + $stateParams.minId);
             // location.reload();
             // return "this is data";
             // this.controller()
             // if ($stateParams.reload != undefined) {
             //  // $stateParams.reload  == undefined;
             //  location.reload();
             // };
           // return MinsData.getDiginDataResolve($stateParams.minId);
             // setTimeout(function() {
             //  console.log("Time is up");
             // }, 200);
             // console.log("This is resolve");
             // // return "Hello"
             // var data = MinsData.getBrowseDataResolve( $stateParams.minId );
             // console.log(data);
             // console.log("****");
         }] } ,
      controller: 'DigCtrl'
    })

   .state('home-detail-browse', {
      url: '/browse/:minId',
      templateUrl: 'templates/home-browse.html',
        resolve: {
         maydata: ['$stateParams' , 'MinsData'  , function( $stateParams , MinsData ) {
           
             var data = MinsData.getBrowseDataResolve( $stateParams.minId );
           
         }] } ,
      controller: 'BrowseCtrl'
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');

});
