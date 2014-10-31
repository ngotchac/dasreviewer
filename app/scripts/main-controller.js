(function() {

    'use strict';

    angular
        .module('codereviewApp')
        .controller('MainCtrl',
            function($scope) {
                $scope.toggleSidebar = function() {
                    if(angular.element('#comment-panel.ui.sidebar').hasClass('active')) {
                        $scope.toggleCommentsSidebar();
                    }
                    angular.element('#side-panel.ui.sidebar').sidebar('toggle');
                };

                $scope.toggleCommentsSidebar = function(openIt) {
                    if(openIt !== undefined && openIt && angular.element('#comment-panel.ui.sidebar').hasClass('active')) {
                        return true;
                    }
                    
                    if(angular.element('#side-panel.ui.sidebar').hasClass('active')) {
                        $scope.toggleSidebar();
                    }
                    angular.element('#comment-panel.ui.sidebar').sidebar('toggle');
                };
            }
        );

})();