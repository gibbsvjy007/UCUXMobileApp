app.constant('apiList', {
    login: 'login'
}).service('$service',
    function($http, $q, $utils, toast, apiList) {
        var service = {};
        var baseUrl = '';
        var handleError = function(error) {
            utils.hideLoading();
            if (utils.notBlank(error)) {
                toast.show(error.data.message);
            } else {
                toast.show('Soething went wrong while processing your request. Please Contact Administrator.');
            }
        };

        service.authenticate = function(userObj) {
            var deferred = $q.defer();
            var url = baseUrl + utils.formatString(apiList.login, { email: userObj.email, password: userObj.password });
            utils.showLoading();
            $http({
                method: 'POST',
                url: url,
                data: {},
                headers: { 'Content-Type': 'application/json' }
            }).then(function(response) {
                deferred.resolve(response);
                utils.hideLoading();
            }, function(error) {
                deferred.reject(handleError(error));
            });
            return deferred.promise;
        };
        return service;
    });
