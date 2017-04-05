describe('MenuItemComponent', function() {
  'use strict';

  var $httpBackend;
  var ApiPath;
  var MenuService;
  var menuItem = {
    "id": 1,
    "short_name": "A1",
    "name": "Won Ton Soup with Chicken",
    "description": "chicken-stuffed won tons in clear chicken broth with white meat chicken pieces and a few scallions",
    "price_small": 2.55,
    "price_large": 5.0,
    "small_portion_name": "pint",
    "large_portion_name": "quart",
    "created_at": "2017-03-23T16:41:43.391Z",
    "updated_at": "2017-03-23T16:41:43.391Z",
    "category_short_name": "A",
    "image_present": true
  };

  beforeEach(function() {
    module('public');

    inject(function ($injector) {
      $httpBackend = $injector.get('$httpBackend');
      ApiPath = $injector.get('ApiPath');
      MenuService = $injector.get('MenuService');
    });

  });

  it('should show error message if the item number is invalid', function() {
    var shortName = "L1";

    $httpBackend.expectGET(ApiPath + "/menu_items/" + shortName + ".json").respond({ status: '500', error: 'Internal Server Error' });
    MenuService.getFavoriteDish(shortName).then(function (response){
      expect(response.status).toBe('500');
    });

    $httpBackend.flush();

  });

  it('should show success message if the item number is valid', function() {
    var shortName = "A1";
    $httpBackend.expectGET(ApiPath + "/menu_items/" + shortName + ".json").respond(menuItem);
    MenuService.getFavoriteDish(shortName).then(function (response){
      expect(response).toEqual(menuItem);
    });

    $httpBackend.flush();

  });

});