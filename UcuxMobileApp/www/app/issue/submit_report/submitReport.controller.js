app.controller('SubmitReportCtrl', function($scope, IssueList, $window, ReportData, $cordovaToast, $state, $utils, $sce, $cordovaGoogleAnalytics, CONFIG, $cordovaInAppBrowser, $rootScope) {
    var vm = this;
    vm.init = function() {
        vm.issueList = IssueList.getList();
    };

});
