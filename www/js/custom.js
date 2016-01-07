
  
 angular.module("ngDropDown", [])
    .service('ngDropDown', [function() {


        var scope = this;
        scope.inputEvent = function(event) {
            if (angular.isDefined(event.touches)) {
                return event.touches[0];
            }
            //Checking both is not redundent. If only check if touches isDefined, angularjs isDefnied will return error and stop the remaining scripty if event.originalEvent is not defined.
            else if (angular.isDefined(event.originalEvent) && angular.isDefined(event.originalEvent.touches)) {
                return event.originalEvent.touches[0];
            }
            return event;
        };

    }])

  .directive('collection', function () {
  return {
    restrict: "E",
    replace: true,
    scope: {
      collection: '='
    },
    template: '<ol class="dd-list" ><member ng-repeat="member in collection" member="member"></member></ol>'
  }
})


.directive('member', function ($compile) {
  return {
    restrict: "E",
    replace: true,
    scope: {
      member: '='
    },
    template: ' <li class="dd-item dd3-item" data-description="{{member.description}}" data-parent="{{member.parent}}" data-name="{{member.name}}" data-id="{{member.id}}"><div class="dd-handle dd3-handle">Drag</div><div class="dd3-content">{{member.name}}</div></li>',
    link: function (scope, element, attrs) {
       // console.log("I am Here");
       // console.log(scope.member.children.length > 0);
       // console.log("***************");
     // if (angular.isArray(scope.member.children)) {
      if (scope.member.children.length > 0) {
        element.append("<collection collection='member.children'></collection>"); 
        $compile(element.contents())(scope)
      }
    }
  }
})

