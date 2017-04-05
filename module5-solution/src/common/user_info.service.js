(function () {
'use strict';

angular.module('common')
.service('UserInfoService', UserInfoService);

function UserInfoService() {
  var service = this;
  var userInfo;

  service.setUserInfo = function(user){
    userInfo = user
  };

  service.getUserInfo = function(){
    return userInfo
  };

}

})();
