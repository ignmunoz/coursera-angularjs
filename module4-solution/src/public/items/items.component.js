(function(){
'use strict';

angular.module('MenuApp')
.component('itemsList', {
	templateUrl: 'src/public/items/category-items.template.html',
  	bindings: {
    	items: '<'
  	}
  });

})();