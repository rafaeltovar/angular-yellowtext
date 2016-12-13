angular.module("Angular-YellowText", [])
.directive("ngYellowtext",function(){
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            element.YellowText();
        }
    };
});
