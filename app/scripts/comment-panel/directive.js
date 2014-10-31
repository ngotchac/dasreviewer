(function() {

    'use strict';

    angular
        .module('codereviewApp')
        .directive('commentPanel', [
            'localStorageService', 'commentService', '$timeout', '$http',
            function(localStorageService, commentService, $timeout, $http) {
                return {
                    scope: false,
                    restrict: 'EA',
                    replace: true,
                    templateUrl: 'scripts/comment-panel/template.html',
                    link: function($scope, $element) {
                        $element.find('.ui.selection.dropdown').dropdown();
                        $element
                            .find('.ui.selection.dropdown')
                            .find('input[type=hidden][name=status]').on('change', function() {
                                $scope.comment.status = angular.element(this).val();
                                $timeout(function() {
                                    $scope.$apply();
                                });
                            });

                    },
                    controller: function($scope) {
                        var translateStatus = function(inputStatus) {
                            switch(inputStatus) {
                                case 'gj':
                                    return '3 - GJ';
                                    break;
                                case 'warning':
                                    return '2 - W';
                                    break;
                                case 'rejected':
                                    return '1 - R';
                                    break;
                                default:
                                    return '3 - GJ';
                            }
                        };

                        $scope.sendCodeReview = function() {
                            var config = localStorageService.get('config');

                            $scope.isLoading = true;
                            var spreadsheetId = config.spreadsheetId;

                            commentService
                                .addComment({
                                    'issues': $scope.currentFile.issuesId.join(', '),
                                    'date': $scope.currentFile.revisionDate,
                                    'revision': $scope.currentFile.revisionId,
                                    'file': $scope.currentFile.path,
                                    'line': $scope.comment.lineNumber,
                                    'comment': $scope.comment.comment,
                                    'status': translateStatus($scope.comment.status),
                                    'done': ($scope.comment.checkDone ? true : false),
                                    'spreadsheetId': spreadsheetId
                                })
                                .then(function() {
                                    $scope.isLoading = false;
                                });
                        };
                    }
                }
        }]);
})();