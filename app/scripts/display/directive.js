(function() {

    'use strict';

    angular
        .module('codereviewApp')
        .directive('mainDisplay', [
            'localStorageService', '$timeout',
            function(localStorageService, $timeout) {
                return {
                    scope: false,
                    templateUrl: 'views/display.html',
                    replace: true,
                    restrict: 'EA',
                    link: function($scope, $element) {
                        angular.element('body').bind("keydown keypress", function (event) {
                            if(event.keyCode === 37) {
                                $scope.previous();
                                $scope.$apply();
                            } else if(event.keyCode === 39) {
                                $scope.next();
                                $scope.$apply();
                            }
                        });
                    },
                    controller: function($scope) {
                        $scope.initCR = function() {
                            var commitFiles = localStorageService.get('retrieved_commits');

                            if(commitFiles !== undefined && commitFiles !== null) {
                                $scope.baseUrl = localStorageService.get('config').url;
                                $scope.projectId = localStorageService.get('config').project;

                                $scope.totalFiles = commitFiles.length;
                                $scope.currentFileIndex = 0;
                                $scope.parseFile();
                            }
                        };

                        $scope.parseFile = function() {
                            var commitFiles = localStorageService.get('retrieved_commits');

                            $scope.currentFile = commitFiles[$scope.currentFileIndex];
                            if($scope.currentFile) {
                                $scope.currentFile.patch = LZString.decompress($scope.currentFile.patch);
                            }
                        }

                        $scope.next = function() {
                            $scope.currentFileIndex += 1;
                            if($scope.currentFileIndex >= $scope.totalFiles) {
                                $scope.currentFileIndex = 0;
                            }
                            $scope.parseFile();
                        }

                        $scope.previous= function() {
                            $scope.currentFileIndex -= 1;
                            if($scope.currentFileIndex < 0) {
                                $scope.currentFileIndex = $scope.totalFiles - 1;
                            }
                            $scope.parseFile();
                        }

                        $scope.$on('LocalStorageModule.notification.setitem', function(event, localStorageData) {
                            if(localStorageData.key === 'retrieved_commits') {
                                $scope.initCR();
                            }
                        });

                        $scope.initCR();

                        
                        $scope.selectLine = function(line) {
                            $scope.toggleCommentsSidebar(true);
                            $scope.comment.lineNumber = line;
                        };
                    }
                }
            }
        ]);

})();