(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);

MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };

  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
        return response.data;                                        
    });
  };

  service.getFavoriteDish = function(menu_item){
    menu_item = menu_item.toUpperCase();
    return $http.get(ApiPath + '/menu_items/' +  menu_item + '.json')
    .then(function (response){
         return response.data;
      })
  };

  // function to test the http GET response, for debugging purpose
  service.isEmpty = function(obj){
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop)) return false;
    }
    return JSON.stringify(obj) === JSON.stringify({})
  };

}



})();
