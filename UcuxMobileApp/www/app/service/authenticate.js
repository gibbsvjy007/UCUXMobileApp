app.constant('authAPIs', {
        authentication: 'Login',
        verifyNumber: 'VerifyMobileNumber',
        createUserPassword: 'CreateUserPassword',
        updateDeviceToken: 'UpdateDeviceToken'
    })
    .service('$authService', apiServicecFn);

/** @ngInject */
function apiServicecFn($rootScope, $q, $service, $http, authAPIs, $utils, toast) {
    var service = {};
    /**
     * @param  {[type]}
     * @return {[type]}
     */
    service.authenticate = function(userObj) {
        var deferred = $q.defer();
        //$utils.formatString(authAPIs.getClientInfo, { username: username })
        $utils.showLoading();
        var request = {
            method: 'POST',
            url: $rootScope.baseURL + authAPIs.authentication,
            data: userObj
        };
        $service.httpRequest(request).then(function(response) {
            deferred.resolve(response);
        });
        return deferred.promise;
    };
      service.forgotPassword = function(userObj) {
        var deferred = $q.defer();
        //$utils.formatString(authAPIs.getClientInfo, { username: username })
        $utils.showLoading();
        var request = {
            method: 'POST',
            url: $rootScope.baseURL + authAPIs.authentication,
            data: userObj
        };
        $service.httpRequest(request).then(function(response) {
            deferred.resolve(response);
        });
        return deferred.promise;
    };
    /**
     * @param  {[type]}
     * @return {[type]}
     */
    service.verifyNumber = function(queryParams) {
        var deferred = $q.defer();
        $utils.showLoading();
        var request = {
            method: 'POST',
            url: $rootScope.baseURL + authAPIs.verifyNumber + '?' + $.param(queryParams)
        };
        $service.httpRequest(request).then(function(response) {
            deferred.resolve(response);
        });
        return deferred.promise;
    };
    /**
     * @param  {[type]}
     * @return {[type]}
     */
    service.createUserPassword = function(dataObj) {
        var deferred = $q.defer();
        $utils.showLoading();
        var request = {
            method: 'POST',
            url: $rootScope.baseURL + authAPIs.createUserPassword,
            data: dataObj
        };
        $service.httpRequest(request).then(function(response) {
            deferred.resolve(response);
        });
        return deferred.promise;
    };
    /**
     * @param  {[type]}
     * @return {[type]}
     */
    service.updateDeviceToken = function(dataObj) {
        var deferred = $q.defer();
        $utils.showLoading();
        var request = {
            method: 'POST',
            data: dataObj,
            url: $rootScope.baseURL + authAPIs.updateDeviceToken
        };
        $service.httpRequest(request).then(function(response) {
            deferred.resolve(response);
        });
        return deferred.promise;
    };

    return service;
}
