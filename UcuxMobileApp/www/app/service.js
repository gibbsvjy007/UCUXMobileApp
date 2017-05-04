app.constant('apiList', {
    login: 'login'
}).service('$service',
    function($http, $q, $utils, toast, apiList) {
        var service = {};
        var baseUrl = '';
        var handleError = function(error) {
            if ($utils.notBlank(error) && error.status != 400) {
                if (error.data)
                    toast.show(error.data.Message);
            } else {
                toast.show('Something went wrong while processing your request. Please Contact Administrator.');
            }
        };

        service.httpRequest = function(request) {
            var deferred = $q.defer();
            var httpObj = {
                method: request.method,
                url: request.url,
                data: $utils.notBlank(request.data) ? angular.toJson(request.data) : {},
                headers: { 'Content-Type': 'application/json' }
            };
            $utils.showLoading();
            $http(httpObj).then(function(response) {
                deferred.resolve(response);
                $utils.hideLoading();
            }, function(error) {
                $utils.hideLoading();
                if (request.errorCall) {
                    deferred.reject(error);
                } else {
                    handleError(error);
                }
            });
            return deferred.promise;
        };
        return service;
    });
