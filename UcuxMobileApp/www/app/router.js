app.config(function($stateProvider, $urlRouterProvider, $locationProvider, $ionicConfigProvider) {
    $stateProvider.state('activation', {
        url: '/activation',
        controller: 'activationCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/activation/activation.html'
    }).state('password', {
        url: '/password',
        controller: 'passwordCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/password/password.html'
    }).state('login', {
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
    }).state('app.create_report', {
        url: '/create_report',
        views: {
            'menuContent': {
                templateUrl: 'app/create_report/create_report.html',
                controller: 'CreateReportCtrl',
                controllerAs: 'vm'
            }
        }
    }).state('app.subIssue', {
        url: '/subIssue',
        views: {
            'menuContent': {
                templateUrl: 'app/create_report/subissue/subissue.html',
                controller: 'SubIssueListCtrl',
                controllerAs: 'vm'
            }
        }
    }).state('app.submitReport', {
        url: '/submitReport',
        views: {
            'menuContent': {
                templateUrl: 'app/create_report/submit_report/submit_report.html',
                controller: 'SubmitReportCtrl',
                controllerAs: 'vm'
            }
        }
    });
    $urlRouterProvider.otherwise('/activation');
    // $locationProvider.html5Mode({
    //     enabled: true,
    //     requireBase: false
    // });
});
