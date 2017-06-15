app.constant('reportAPIs', {
        getIssueList: 'CategoryList?accountId={accountId}&locationId={locationId}&departmentId={departmentId}&parentCategoryId={parentCategoryId}',
        getCategoryList: 'CategoryList?accountId={accountId}&locationId={locationId}&departmentId={departmentId}&parentCategoryId={parentCategoryId}',
        getZones: 'ZoneList?locationId={locationId}',
        createReport: 'CreateIssues',
        getReportData: 'GetIssueList?userId={userId}&accountId={accountId}&isManager={isManager}&pageIndex={pageIndex}&pageSize={pageSize}'
    })
    .service('$reportService', reportService);

/** @ngInject */
function reportService($rootScope, $q, $service, $http, reportAPIs, $utils, toast) {
    var service = {};
    /**
     * @param  {[type]}
     * @return {[type]}
     */
    service.getReportData = function(queryParams) {
        var deferred = $q.defer();
        //$utils.formatString(authAPIs.getClientInfo, { username: username })
        $utils.showLoading();
        var request = {
            method: 'GET',
            url: $rootScope.baseURL + $utils.formatString(reportAPIs.getReportData, { accountId: queryParams.accountId, userId: queryParams.userId, isManager: queryParams.isManager, pageIndex: queryParams.pageIndex, pageSize: queryParams.pageSize })
        };
        $service.httpRequest(request).then(function(response) {
            deferred.resolve(response);
        });
        return deferred.promise;
    };
    service.getIssueList = function(reportObj) {
        var deferred = $q.defer();
        //$utils.formatString(authAPIs.getClientInfo, { username: username })
        $utils.showLoading();
        var request = {
            method: 'GET',
            url: $rootScope.baseURL + $utils.formatString(reportAPIs.getIssueList, { accountId: reportObj.accountId, locationId: reportObj.locationId, departmentId: reportObj.departmentId, parentCategoryId: reportObj.parentCategoryId })
        };
        $service.httpRequest(request).then(function(response) {
            deferred.resolve(response);
        });
        return deferred.promise;
    };
    service.getCategoryList = function(reportObj) {
        var deferred = $q.defer();
        //$utils.formatString(authAPIs.getClientInfo, { username: username })
        $utils.showLoading();
        var request = {
            method: 'GET',
            url: $rootScope.baseURL + $utils.formatString(reportAPIs.getCategoryList, { accountId: reportObj.accountId, locationId: reportObj.locationId, departmentId: reportObj.departmentId, parentCategoryId: reportObj.parentCategoryId })
        };
        $service.httpRequest(request).then(function(response) {
            deferred.resolve(response);
        });
        return deferred.promise;
    };
    service.getZones = function(queryParams) {
        var deferred = $q.defer();
        //$utils.formatString(authAPIs.getClientInfo, { username: username })
        $utils.showLoading();
        var request = {
            method: 'GET',
            url: $rootScope.baseURL + $utils.formatString(reportAPIs.getZones, { locationId: queryParams.locationId })
        };
        $service.httpRequest(request).then(function(response) {
            deferred.resolve(response);
        });
        return deferred.promise;
    };
    service.createReport = function(reportObj) {
        var deferred = $q.defer();
        //$utils.formatString(authAPIs.getClientInfo, { username: username })
        $utils.showLoading();
        var request = {
            method: 'POST',
            url: $rootScope.baseURL + reportAPIs.createReport,
            data: reportObj
        };
        $service.httpRequest(request).then(function(response) {
            deferred.resolve(response);
        });
        return deferred.promise;
    };


    return service;
}
