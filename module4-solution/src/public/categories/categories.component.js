(function() {
'use strict';

angular.module('MenuApp')
.component('categories', {
	templateUrl: 'src/public/categories/categories.template.html',
  	bindings: {
    	items: '<'
  	}
  });

})();