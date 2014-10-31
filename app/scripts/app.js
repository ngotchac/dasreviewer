'use strict';

/**
 * @ngdoc overview
 * @name codereviewApp
 * @description
 * # codereviewApp
 *
 * Main module of the application.
 */
angular
  .module('codereviewApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angular-datepicker',
    'LocalStorageModule',
    'restangular'
  ])
  .config(function ($routeProvider, RestangularProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    RestangularProvider.setBaseUrl('http://localhost:3000');
    RestangularProvider.setErrorInterceptor(function(response, deferred, responseHandler) {
      if(response.status === 401) {
          sweetAlert("Oops...", "The cookie seems to be wrong!", "error");
          return true; // error handled
      }

      sweetAlert("Oops...", "Something went wrong!", "error");
      return true; // error not handled
  });
  });
