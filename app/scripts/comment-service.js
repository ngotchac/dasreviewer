(function() {

    'use strict';

    angular
        .module('codereviewApp')
        .service('commentService', [
            'Restangular',
            function(Restangular) {

                this.addComment = function(comment) {
                    return Restangular
                        .all('comments')
                        .post(comment);
                };

            }
        ]);
})();