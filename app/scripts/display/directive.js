(function() {

    'use strict';

    angular
        .module('codereviewApp')
        .directive('mainDisplay', [
            'localStorageService',
            function(localStorageService) {
                return {
                    scope: false,
                    templateUrl: 'scripts/display/template.html',
                    replace: true,
                    restrict: 'EA',
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
                            $scope.currentFile.patch = LZString.decompress($scope.currentFile.patch);
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