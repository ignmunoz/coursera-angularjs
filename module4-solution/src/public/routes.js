(function() {
'use strict';
angular.module('MenuApp').config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/public/home.template.html'
  })

  // Premade list page
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/public/categories/categories-list.template.html',
    controller: 'CategoriesListController as catList',
    resolve: {
      items: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  .state('categories.items', {
    url: '/item/{categoryShortName}',
    templateUrl: 'src/public/category-items/category-items-list.template.html',
    controller: 'CategoryItemsController as itemsList',
    resolve: {
      items: ['$stateParams', 'MenuDataService',
        function ($stateParams, MenuDataService) {
          return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
        }]
      }
  });
}
})();