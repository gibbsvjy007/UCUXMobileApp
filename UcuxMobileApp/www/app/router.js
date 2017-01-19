app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $stateProvider.state('login', {
        url: '/login',
        controller: 'loginCtrl',
        controllerAs: 'login',
        templateUrl: 'app/login/login.html'
    }).state('app', {
        url: '/app',
        abstract: true,
        controller: 'MenuCtrl',
        templateUrl: 'app/menu/menu.html'
    }).state('app.reports', {
        url: '/reports',
        views: {
            'menuContent': {
                templateUrl: 'app/reports/reports.html',
                controller: 'ReportsCtrl',
                controllerAs: 'vm'
            }
        }
    }).state('app.report-detail', {
        url: '/detail',
        views: {
            'menuContent': {
                templateUrl: 'app/reports/report.detail.html',
                controller: 'ReportDetailCtrl',
                controllerAs: 'vm'
            }
        }
    }).state('app.issue', {
        url: '/issue',
        views: {
            'menuContent': {
                templateUrl: 'app/issue/issue_list.html',
                controller: 'IssueListCtrl',
                controllerAs: 'vm'
            }
        }
    }).state('app.subIssue', {
        url: '/subIssue',
        views: {
            'menuContent': {
                templateUrl: 'app/issue/subissue/subissue.html',
                controller: 'SubIssueListCtrl',
                controllerAs: 'vm'
            }
        }
    }).state('app.submitReport', {
        url: '/submitReport',
        views: {
            'menuContent': {
                templateUrl: 'app/issue/submit_report/submit_report.html',
                controller: 'SubmitReportCtrl',
                controllerAs: 'vm'
            }
        }
    });
    $urlRouterProvider.otherwise('/login');
});
