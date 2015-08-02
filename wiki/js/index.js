(function(){
  'use strict';
  angular.module("MyApp", ['ngSanitize','ngAnimate']).
    controller("MainCtrl", MainCtrl).
    service("wikiData", wikiData);
  
  function MainCtrl($scope, $timeout, wikiData) {
    $scope.listItems=[];
    $scope.getRandom = function(){
      $scope.listItems = wikiData.getRandom();
    }
    $scope.searchWiki = function(){
      $timeout(function(){
        $scope.listItems = wikiData.getList($scope.search);
      },50);
    }
  }
  
  function wikiData($http) {
    this.getList = function(searchTerm) {
      var data=[];
    $http.jsonp('//en.wikipedia.org/w/api.php', {
      params: { 
        action: 'query', 
        list: 'search', 
        srsearch: searchTerm, 
        srinfo: 'suggestion', 
        continue: '', 
        format: 'json',
        callback: 'JSON_CALLBACK'}})
      .success(function (x) {
        var titles="";
        var snippets=[];

        for (var i = 0; i < x.query.search.length; i++) {
          var title=x.query.search[i].title;
          titles+="|"+title;
          snippets.push(x.query.search[i].snippet)
        }
      titles=titles.substring(0,titles.length);
      $http.jsonp('//en.wikipedia.org/w/api.php',{
        params: {
          action: 'query', 
          //prop: 'info|pageprops', 
          titles: titles, 
          prop: 'info|pageterms',
          inprop: 'url',
          wbptterms: 'description',
          format: 'json',
          callback: 'JSON_CALLBACK'}}).
      success(function (y) { 
        var pageKeys = Object.keys(y.query.pages);
        for (var i = 0; i < pageKeys.length-1; i++) {
          var url=y.query.pages[pageKeys[i]].fullurl;
          var title = y.query.pages[pageKeys[i]].title;
          var snippet = x.query.search.filter(function(item) {
            return item.title==title;
          })[0].snippet;
          data.push({url: url,title: title,snippet: snippet});
        }
            
      })
    });   
      return data;
    }
    this.getRandom = function() {
      
      var data =[];

      $http.jsonp('https://en.wikipedia.org/w/api.php', {params:{
        action: 'query',
        list: 'random',
        rnnamespace: '0',
        continue: '', 
        format: 'json',
        callback: 'JSON_CALLBACK'}
      }).success(function (x) {
        $http.jsonp('https://en.wikipedia.org/w/api.php', {params:{
          action: 'query', 
          //prop: 'info|pageprops', 
          titles: x.query.random[0].title, 
          prop: 'info|pageterms',
          inprop: 'url',
          wbptterms: 'description',
          format: 'json',
          callback: 'JSON_CALLBACK'}
        }).success(function (y) { 
          var keys = Object.keys(y.query.pages);
          var url = y.query.pages[keys[0]].fullurl;
          var title = y.query.pages[keys[0]].title;
          $http.jsonp('https://en.wikipedia.org/w/api.php', { params: {
            action: 'query', 
            list: 'search', 
            srsearch: title, 
            srinfo: 'suggestion', 
            continue: '', 
            format: 'json',
            callback: 'JSON_CALLBACK'}
          }).success(function (z) {
              var snippet=z.query.search[0].snippet;
              data.push({url: url, title: title, snippet: snippet});
          });
        });
      });
      return data;
    }
  }
          

  
})()