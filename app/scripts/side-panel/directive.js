(function() {

    'use strict';

    angular
        .module('codereviewApp')
        .directive('sidePanel', [
            'localStorageService', 'commitsService',
            function(localStorageService, commitsService) {
                return {
                    scope: false,
                    restrict: 'EA',
                    replace: true,
                    templateUrl: 'views/side-panel.html',
                    link: function($scope) {

                        var config = localStorageService.get('config');

                        if(config !== null) {
                            $scope.config.redmineUrl = config.url;
                            $scope.config.redmineCookie = config.cookie;
                            $scope.config.redmineProject = config.project;
                            $scope.config.spreadsheetId = config.spreadsheetId;
                        }

                    },
                    controller: function($scope) {
                        $scope.dateOptions = {
                            max: new Date()
                        };

                        $scope.saveConfig = function() {
                            var config = {
                                url: $scope.config.redmineUrl,
                                cookie: $scope.config.redmineCookie,
                                project: $scope.config.redmineProject,
                                spreadsheetId: $scope.config.spreadsheetId
                            };
                            localStorageService.set('config', config);
                        };

                        $scope.codeReview = function() {
                            $scope.saveConfig();
                            var config = {
                                url: $scope.config.redmineUrl,
                                cookie: $scope.config.redmineCookie,
                                project: $scope.config.redmineProject,
                                date: $scope.config.date
                            };

                            $scope.isLoading = true;
                            commitsService
                                .getCommits(config)
                                .then(function(commitsData) {
                                    var files = [];
                                    angular.forEach(commitsData, function(retrievedRevision) {
                                        angular.forEach(retrievedRevision.files, function(file) {
                                            if(file.patch !== undefined && file.patch !== '') {
                                                file.patch = LZString.compress(file.patch);
                                                file.revisionId = retrievedRevision.id;
                                                file.revisionDate = retrievedRevision.date;
                                                file.revisionsIssues = [];
                                                file.issuesId = [];

                                                angular.forEach(retrievedRevision.issues, function(issue) {
                                                    if(issue.id === undefined) {
                                                        issue.id = /\/issues\/(\d+)/.exec(issue.url)[1];
                                                    }
                                                    file.revisionsIssues.push(issue);
                                                    file.issuesId.push(issue.id);
                                                });

                                                files.push(file);
                                            }
                                        });
                                    });
                                    localStorageService.remove('retrieved_commits');
                                    localStorageService.set('retrieved_commits', files);
                                    $scope.isLoading = false;
                                }, function() {
                                    $scope.isLoading = false;
                                });
                        }
                    }
                }
        }]);
})();