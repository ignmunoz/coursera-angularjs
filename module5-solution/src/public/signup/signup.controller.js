(function() {
'use strict';

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['MenuService', 'UserInfoService'];
function SignupController(MenuService, UserInfoService){
	
	var $ctrl = this;
	$ctrl.error;
	$ctrl.success;

	$ctrl.signup = function(){
		if ($ctrl.user){
			MenuService.getFavoriteDish($ctrl.user.favoriteDish)
			.then(function (data){
				$ctrl.user.favorite = data;
				UserInfoService.setUserInfo($ctrl.user);
				$ctrl.success = 'User information registered!';
				$ctrl.invalidFavorite = false;
				$ctrl.error = '';
			})
			.catch(function() {
	        	$ctrl.invalidFavorite = true;
	        	$ctrl.error = 'No such menu number exists';
			 	$ctrl.success = '';
	        });
		}
		else{
			$ctrl.error = 'Error in your information';
			$ctrl.success = '';
		}
	};
}

})();