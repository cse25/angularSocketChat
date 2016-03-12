var myApp = angular.module('chat', ['ui.router', 'chat.controller'])

  .config(function($stateProvider, $urlRouterProvider, $httpProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('main', {
        templateUrl: '/app/chat.html',
        url: '/',
        controller: 'chatCtrl'
      });
  });
