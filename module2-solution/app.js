(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;

  toBuy.items = ShoppingListCheckOffService.getToBuyItems();

  toBuy.passItem = function(itemIndex){
    ShoppingListCheckOffService.passItem(itemIndex);
  }

}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var bought = this;
  bought.items = ShoppingListCheckOffService.getBoughtItems();
}

function ShoppingListCheckOffService() {

  var service = this;

  var toBuyItems = [{ name: "Cookies", quantity: 10}, { name: "Pepto Bismol", quantity : 5}, { name: "Drinking Soda", quantity : 3}, { name: "Chips", quantity : 4}, { name: "Milk", quantity : 2}];
  var boughtItems = [];

  service.passItem = function (itemIndex) {
    var boughtItem = toBuyItems[itemIndex];
    toBuyItems.splice(itemIndex, 1);
    boughtItems.push(boughtItem);

  };

  service.getToBuyItems = function () {
    return toBuyItems;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };
}

})();
