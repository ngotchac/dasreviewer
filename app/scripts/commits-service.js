(function() {

    'use strict';

    angular
        .module('codereviewApp')
        .service('commitsService', [
            'Restangular', 'localStorageService',
            function(Restangular, localStorageService) {

                this.getCommits = function(config) {
                    return Restangular
                        .all('commits')
                        .getList(config);
                };

            }
        ]);
})();