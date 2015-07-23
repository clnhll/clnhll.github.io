angular.module('MyApp',['ngMaterial','dndLists']);

/**
* This service deals with local storage,
* plays nicely with browsers that don't
* support local storage
**/

angular.module('MyApp').service('local',[function(){
  this.get=function(){
    if (localStorage !== null) {
      return localStorage.getItem('list')!==null ? JSON.parse(localStorage.getItem('list')) : [];
    } else {
      return [];
    }
  };
  this.set=function(list) {
    if (localStorage !== null) {
      localStorage.setItem('list',JSON.stringify(list));
    }
  }
}]);

/**
* Main app controller that does the 
* add/remove/update logic
**/

angular.module('MyApp').controller('MainCtrl',['$scope','local',function($scope, local, lists){
  $scope.scrollClasses='';
  $scope.list=local.get();
  $scope.addItem=function(){
    if ($scope.inputItem=="") {return}
    $scope.list.push({
      name: $scope.inputItem, 
      completed: false
    });
    local.set($scope.list);
    $scope.inputItem='';
  }
  
  $scope.updateCompleted = function(index) {
    local.set($scope.list);
  }
  
  $scope.clear=function() {
    for (var i=0; i < $scope.list.length; i++) {
      if ($scope.list[i].completed) {
        $scope.list[i]=null;
      }
    }
    $scope.list = $scope.list.filter(function(item) {return item!==null});
    local.set($scope.list);
  }
  
  $scope.deleteItem=function(index) {
    $scope.list.splice(index,1);
    local.set($scope.list);
  }
  
  $scope.update = function(){local.set($scope.list);}
}]);

/**
* This directive is a work in progress.
* Trying to construct some visual hints 
* that there's more content, based on user
* scroll position
**/

angular.module('MyApp').directive("scroll", function() {
  return function(scope, element, attrs) {
    angular.element(element).bind("scroll mousemove DOMNodeInserted DOMNodeRemoved cached", function() {
      if (this.scrollTop !== 0 && 
          this.scrollHeight - this.scrollTop !== 
          this.clientHeight) {
        scope.scrollClasses='bothShadow';
        scope.$apply();
      } else if (this.scrollTop === 0 &&
          this.scrollHeight - this.scrollTop === 
          this.clientHeight) {
        scope.scrollClasses='';
        scope.$apply();
      } else if (this.scrollTop === 0 &&
          this.scrollHeight - this.scrollTop !== 
          this.clientHeight){ 
        scope.scrollClasses='bottomShadow';
        scope.$apply();
      } else if (this.scrollTop !== 0 &&
          this.scrollHeight - this.scrollTop === 
          this.clientHeight){ 
        scope.scrollClasses='topShadow';
        scope.$apply();
      }
      scope.$apply();
    });
     
  };
});