(function () {
  'use strict';
  angular
      .module('MyApp',['ngMaterial','dndLists'])
      .controller('AppCtrl', AppCtrl);

  function AppCtrl ($scope, $log, $mdDialog, local) {
    $scope.lists=local.get(),
    $scope.selectedIndex = local.getTab();
    $scope.saveTab = function() {
      local.setTab($scope.selectedIndex);
    }

    $scope.addTab = function () {
      $scope.lists.push({ title: $scope.tTitle, items: [], disabled: false});
      local.set($scope.lists)
      $scope.tTitle="";
    };
    $scope.removeTab = function (tab) {
      var index = $scope.lists.indexOf(tab);
      $scope.lists.splice(index, 1);
      local.set($scope.lists);
    };

    $scope.scrollClasses='';
    $scope.inputItem=[];
    $scope.addItem=function(listIndex){
      if ($scope.inputItem[listIndex]=="") {return}
      $scope.lists[listIndex].items.push({
        name: $scope.inputItem[listIndex],
        completed: false
      });
      local.set($scope.lists);
      $scope.inputItem[listIndex]='';
    }

    $scope.updateCompleted = function() {
      local.set($scope.lists);
    }

    $scope.clear=function(index) {
      for (var i=0; i < $scope.lists[index].items.length; i++) {
        if ($scope.lists[index].items[i].completed) {
          $scope.lists[index].items[i]=null;
        }
      }
      $scope.lists[index].items = $scope.lists[index].items.filter(function(item) {return item!==null});
      local.set($scope.lists);
    }

    $scope.deleteItem=function(listIndex,itemIndex) {
      $scope.lists[listIndex].items.splice(itemIndex,1);
      local.set($scope.lists);
    }

    $scope.update = function(){local.set($scope.lists);}

  $scope.showAlert = function(ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      // Modal dialogs should fully cover application
      // to prevent interaction outside of dialog
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.body))
          .title('Angular Material To-Do')
          .content('This project was  a way for me to learn Angular Material, drag-and-drop reordering, app caching and local storage. Try re-ordering your to-do list (desktop only, sorry) or refreshing the page while offline! Your list and this page will persist until you clear your browser data.')
          .ariaLabel('App Info')
          .ok('Got it!')
          .targetEvent(ev)
      );
    };

  }

  angular.module('MyApp').service('local',[function(){
    this.get=function(){
      var defaultList = [{
        title: 'Todo',
        items: [
          {
            name:'Watch Xena: warrior princess',
            completed: false
          },
          {
            name:'Get a new backpack',
            completed: true
          }]
        }];

      if (localStorage !== null) {
        return localStorage.getItem('lists')!==null ? JSON.parse(localStorage.getItem('lists')) : defaultList;
      } else {
        return defaultList;
      }
    };
    this.set=function(lists) {
      if (localStorage !== null) {
        localStorage.setItem('lists',JSON.stringify(lists));
      }
    }
    this.getTab = function() {
      if (localStorage !== null) {
        return localStorage.getItem('savedTab')!==null ? JSON.parse(localStorage.getItem('savedTab')) : 0;
      } else {
        return 0;
      }
    }
    this.setTab = function(tab) {
      if (localStorage !== null) {
        localStorage.setItem('savedTab',JSON.stringify(tab));
      }
    }

  }]);


})();
