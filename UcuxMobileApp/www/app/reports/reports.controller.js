app.controller('ReportsCtrl', function($scope, $state, $ionicHistory, $window, ReportData, $ionicNavBarDelegate, $cordovaToast, $utils, $sce, $cordovaGoogleAnalytics, CONFIG, $cordovaInAppBrowser, $rootScope) {
    var vm = this;
    vm.init = function() {
        vm.reports = ReportData.getReports();
    };
    vm.showDetail = function() {
        $state.go('app.issue');
    }

});
