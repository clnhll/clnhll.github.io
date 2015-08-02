(function () {
  'use strict';
  angular
      .module('MyApp',['ngMaterial', 'ngRoute'])
      .controller('AppCtrl', AppCtrl)
      .service('getUserData', getUserData);
  
  function AppCtrl($scope, $http, getUserData) {
    var users=["freecodecamp", "storbeck", 
               "terakilobyte", "habathcx", 
               "medrybw", "comster404", 
               "brunofin", "thomasballinger", 
               "noobs2ninjas", "beohoff"];   // users (obvs)
    $scope.tabs=[{name: "all"},
                 {name: "online", online: true},
                 {name: "offline",online: false}];
    $scope.userData=getUserData.get(users);

  }
  
  function getUserData($http) {
    var twitchStreamAPI = "https://api.twitch.tv/kraken/streams/";
    var twitchUserAPI = "https://api.twitch.tv/kraken/channels/";
    
    this.get=function(users) { 
      var usersData=[];
      users.forEach(function(user){
        var userData={};
        $http.jsonp(twitchStreamAPI + user + "?callback=JSON_CALLBACK").success(
          function(data){
            if (data.stream !== null) {
              userData.online=true;
              userData.status=data.stream.channel.status;
            } else {
              userData.online=false;
            }
          }
        )
        $http.jsonp(twitchUserAPI + user + "?callback=JSON_CALLBACK").success(
          function(data){
            if (!data.logo) {
              userData.logo="http://placeholdit.imgix.net/~text?txtsize=6&txt=50x50&w=50&h=50";  //stock user photo
            } else {
              userData.logo=data.logo;
            }
            userData.url=data.url;
            userData.name=data.display_name;
          })
        usersData.push(userData);
      })
      return usersData;
    }     
  }
  
})()