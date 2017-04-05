(function (){
'use strict';

angular.module('public')
.directive('favoriteDish', CheckFavoriteDishDirective);

CheckFavoriteDishDirective.$inject = ['MenuService', '$rootScope', '$q', '$timeout'];
function CheckFavoriteDishDirective(MenuService, $rootScope, $q, $timeout) {
	var menuItem = '';

    return {
    	restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            ctrl.$asyncValidators.favoriteDish = function(modelValue, viewValue) {
				if (ctrl.$isEmpty(modelValue)) {
	      			// consider empty model valid
	      			return $q.resolve();
	    		}

	    		var def = $q.defer();

	    		menuItem = MenuService.getFavoriteDish(modelValue)
	    					.then(function(data){        			
	    						return data;
	    					});

	    		$timeout(function(){
	    			if (menuItem.$$state.status === 1) {
	    				def.resolve();
	    			}
				     //menu item doesn't exist, this means validation fails
				    else{
				   		def.reject();
				    } 
	    		}, 1000);
	    		
	    		return def.promise;
			};
        }
    };
}

})();