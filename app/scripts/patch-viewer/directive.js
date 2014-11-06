(function() {

    'use strict';

    angular
        .module('codereviewApp')
        .directive('patchViewer', [

            function() {
                return {
                    restrict: 'EA',
                    replace: true,
                    templateUrl: 'views/patch-viewer.html',
                    scope: {
                        'selectLine': '&selectLine',
                        patchContent: '&patchContent'
                    },
                    link: function($scope, $element, $attrs) {
                        var initLineRegex = /^@@ \-(\d+),(\d+) \+(\d+),(\d+) @@$/;
                        var currentLeftNum = 0, currentRightNum = 0;
                        var leftSerie, rightSerie;
                        $scope.tableData = [];

                        $scope.computeTable = function() {
                            $scope.tableData = [];

                            angular.forEach($scope.patch.split('\n'), function(line) {
                                if(initLineRegex.test(line)) {
                                    if($scope.tableData.length > 0) {
                                        $scope.tableData.push({
                                            leftNum: '...',
                                            leftClass: 'separator',
                                            rightNum: '...',
                                            rightClass: 'separator'
                                        });
                                    }
                                    var matches = initLineRegex.exec(line);
                                    leftSerie = [];
                                    rightSerie = [];
                                    currentLeftNum = parseInt(matches[1]);
                                    currentRightNum = parseInt(matches[3]);
                                } else {
                                    if(line[0] === '-') {
                                        leftSerie.push({
                                            num: currentLeftNum,
                                            data: line.substring(1),
                                            rowClass: 'delete'
                                        });
                                        currentLeftNum += 1;
                                    } else if(line[0] === '+') {
                                        rightSerie.push({
                                            num: currentRightNum,
                                            data: line.substring(1),
                                            rowClass: 'add'
                                        });
                                        currentRightNum += 1;
                                    } else {
                                        if(leftSerie.length > 0 || rightSerie.length > 0) {
                                            for(var i = 0; i < Math.max(leftSerie.length, rightSerie.length); i += 1) {
                                                $scope.tableData.push({
                                                    leftNum: (leftSerie[i] !== undefined ? leftSerie[i].num : ''),
                                                    leftClass: (leftSerie[i] !== undefined ? leftSerie[i].rowClass : 'empty'),
                                                    leftData: (leftSerie[i] !== undefined ? leftSerie[i].data : ''),
                                                    rightNum: (rightSerie[i] !== undefined ? rightSerie[i].num : ''),
                                                    rightClass: (rightSerie[i] !== undefined ? rightSerie[i].rowClass : 'empty'),
                                                    rightData: (rightSerie[i] !== undefined ? rightSerie[i].data : '')
                                                });
                                            }
                                            leftSerie = [];
                                            rightSerie = [];
                                        }
                                        if(!(/No newline at end of file/.test(line)) && line) {
                                            $scope.tableData.push({
                                                leftNum: currentLeftNum,
                                                leftClass: 'neutral',
                                                leftData: line.substring(1),
                                                rightNum: currentRightNum,
                                                rightClass: 'neutral',
                                                rightData: line.substring(1)
                                            });
                                            currentLeftNum += 1;
                                            currentRightNum += 1;
                                        }
                                    }
                                }
                            });
                            if(currentLeftNum === 0) {
                                $scope.fileAdded = true;
                            } else {
                                $scope.fileAdded = false;
                            }
                            if(currentRightNum === 0) {
                                $scope.fileDeleted = true;
                            } else {
                                $scope.fileDeleted = false;
                            }
                        };


                        $scope.$watch($scope.patchContent, function(value){
                            $scope.patch = value;
                            $scope.computeTable();
                        });
                    }
                }
            }
        ]);
})();