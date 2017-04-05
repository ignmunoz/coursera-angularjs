(function(){
'use strict';
angular.module('MenuApp')
.controller('CategoriesListController', CategoriesListController);

CategoriesListController.$inject = ['items'];
function CategoriesListController(items) {
  var catList = this;
  catList.categories = items;
}
})();