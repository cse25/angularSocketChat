angular.module('chat.controller', [])
  .controller('chatCtrl', ['$scope', '$state', 'Socket', function($scope, $state, Socket) {

    $scope.chat = {};
    $scope.updated = [];

    Socket.on('message', function(message){
      $scope.updated.push(message);
    });

    $scope.sendMessage = function() {
      Socket.emit('chat', $scope.chat.message);
      $scope.updated.push($scope.chat.message);
      $scope.chat.message = '';
    };

  }])
  .factory('Socket', function($rootScope) {

    var socket = io.connect();

    var on = function(eventName, callback){
      socket.on(eventName, function(){
        var args = arguments;
        $rootScope.$apply(function(){
          callback.apply(socket, args);
        });
      });
    };

    var emit = function(eventName, data, callback) {
      socket.emit(eventName, data, function() {
        var args = arguments;
        $rootScope.$apply(function(){
          if(callback) {
            callback.apply(socket, args);
          }
        });
      });
    };

    return {
      on: on,
      emit: emit
    };

  });
