(function(){
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

MenuDataService.$inject = ['$http', 'ApiBasePath'];
function MenuDataService($http, ApiBasePath){
	var service = this;
  var getItemsForCategoryPromise = [];

	service.getAllCategories = function () {
    var promise = "";

    promise = $http.get(ApiBasePath + '/categories.json')
      .then(function(result){
        return result.data;
      });
    return promise;
	};

  service.getItemsForCategory = function (categoryShortName) {
    if (!getItemsForCategoryPromise[categoryShortName]) {
      console.log('Cached items not found for ' + categoryShortName + '. Fetching now...');
      getItemsForCategoryPromise[categoryShortName] = $http({
        method: 'GET',
        url: ApiBasePath + '/menu_items.json',
        params: {
          category: categoryShortName
        }
      }).then(function (result) {
        return result.data.menu_items;
      });
    } else {
      console.log('Using cached items for ' + categoryShortName);
    }
    return getItemsForCategoryPromise[categoryShortName];
  };
}

})();