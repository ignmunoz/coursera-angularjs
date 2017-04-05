(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
	$scope.menu = "";

	$scope.checkMenu = function() {

		$scope.responseTypeClass = "has-success";

		if ($scope.menu === "") {
  			$scope.responseTypeClass = "has-error";
			return $scope.message = "Please enter data first";
		}
		var separator = /\s*,\s*/; /* trims whitespaces from the start, in between and the end of the string */
  		var menuArray = $scope.menu.split(separator);
  		
  		var numberOfItems = countItems(menuArray);
  		if (numberOfItems >= 1 && numberOfItems <= 3) {
  			return $scope.message = "Enjoy!";
  		}
  		else if (numberOfItems > 3) {
  			return $scope.message = "Too Much!";
  		}
  		else console.log("Something wrong happened!");
  		
  	};

  	function countItems(menu) {
  		var numberOfItems = 0;
  		for (var i = 0; i < menu.length; i++) {
  			if (menu[i] !== "") numberOfItems++;
  		}
  		return numberOfItems;
  	}
}

})();