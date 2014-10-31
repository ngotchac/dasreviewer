(function() {

    'use strict';

    angular
        .module('codereviewApp')
        .directive('dropConfig', [
            'localStorageService',
            function(localStorageService) {
                return {
                    restrict: 'AE',
                    scope: false,
                    replace: false,
                    link: function($scope, $element, $attributes) {
                        $scope.getConfig = function() {
                            console.log('conf');
                        }

                        $scope.dropData = $scope[$attributes["drop"]];

                        $element.bind('click', $scope.getConfig);

                        $element.bind('dragover', function (e) {
                            e.preventDefault();
                        }); 

                        $element.bind('drop', function(e) {
                            e.preventDefault();
                            // jQuery wraps the originalEvent, so we try to detect that here...
                            e = e.originalEvent || e;
                            // Using e.files with fallback because e.dataTransfer is immutable and can't be overridden in Polyfills (http://sandbox.knarly.com/js/dropfiles/).            
                            var files = (e.files || e.dataTransfer.files);
                            var file = files[0];

                            var r = new FileReader();
                            r.onload = function(e) { 
                                var contents = e.target.result;
                                try{
                                    var config = JSON.parse(contents);
                                } catch(e){
                                    alert(e);
                                }

                                console.log(config);
                            };
                            r.readAsText(file);
                        });
                    }
                }
            }
        ]);
})();