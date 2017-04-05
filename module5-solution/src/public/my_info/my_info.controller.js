(function() {
'use strict';

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['user']
function MyInfoController(user){
	var $ctrl = this;
	if (user){
		$ctrl.user = user;
	} 
}

})();