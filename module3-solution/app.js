(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.directive('loader', loader);

function loader() {
    var ddo = {
      templateUrl: 'loader/itemsloaderindicator.template.html',
    };

    return ddo;
}

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      message: '<',
      onRemove: '&'
    }
  };

  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var search = this;
  search.found = [];
  search.searchTerm = "";

  search.matchedItems = function(){
    search.loader = true;
    search.message = "";
    var promise = MenuSearchService.getMatchedMenuItems(search.searchTerm);
    promise.then(function(response){
      search.found = response;
      search.loader = false;
      if (search.found.length == 0) {
        search.message = 'Nothing found!';
      }
    })
    .catch(function(error) {
        console.log(
          'Failed loading information. Error Code: %s, Error Message: %s',
          error.status,
          error.statusText
        );
        search.loader = false;
        search.message = 'Error loading information';
    });
  };
  
  search.removeItem = function(itemIndex){
    search.found.splice(itemIndex, 1);
  };
}

MenuSearchService.$inject = ['$http', '$q'];
function MenuSearchService($http, $q) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    if (searchTerm === '') {
       return $q.when([]);
    }

    return $http({
              method: "GET",
              url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
            }).then(function (result) {

            // process result and only keep items that match
              var foundItems = [];
              for (var i = 0; i < result.data.menu_items.length; i++) {
                var description = result.data.menu_items[i].description;                
                if (description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
                foundItems.push(result.data.menu_items[i]);
              }
            }
          // return processed items
          return foundItems || [];
        });
      };  
  }

})();
