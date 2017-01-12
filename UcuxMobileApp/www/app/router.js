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
    });
    $urlRouterProvider.otherwise('/login');
});
