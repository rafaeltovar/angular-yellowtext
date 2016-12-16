angular.module("Angular-YellowText", [])
.directive("ngYellowtext", ['$timeout', function($timeout){
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            var ytClass = 'js-yellowtext-' + Math.random().toString(36).substring(7);
            // http://stackoverflow.com/questions/14687822/how-to-pass-a-json-as-a-string-param-to-a-directive
            var buttons = eval('(' + attrs.ngYellowtext + ')');

			var options = { defaultActions: buttons,
                            iFrameClass: ytClass,
                            isContentChanged: function(changed){
                                var value = getContentFromEditor();
                                updateModel.call(this, value);
                            }
                            };


            getContentFromEditor = function() {
                return editor.contents().find("body").html();
            }

            setContentToEditor = function(content) {
                editor.contents().find("body").html( content );
            }

            // Expose scope var with loaded state of Redactor
            var editorLoaded = false;

            var updateModel = function updateModel(value) {
                // $timeout to avoid $digest collision
                $timeout(function() {
                    scope.$apply(function() {
                        ngModel.$setViewValue(value);
                    });
                });
            },
            editor;

            // put in timeout to avoid $digest collision.  call render() to
            // set the initial value.
            $timeout(function() {
                //editor = element.redactor(options);
                element.YellowText(options);
                editor = angular.element("." + ytClass);
                ngModel.$render();
                /*element.on('remove',function(){
                    element.off('remove');
                    //element.redactor('core.destroy');
                });*/
            });

            ngModel.$render = function() {
                if(angular.isDefined(editor)) {
                    $timeout(function() {
                        setContentToEditor(ngModel.$viewValue || '' );
                        editorLoaded = true;
                    });
                }
            };

        } // end link
    };
}]);
