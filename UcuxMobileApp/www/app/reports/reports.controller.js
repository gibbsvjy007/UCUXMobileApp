app.controller('ReportsCtrl', function($scope, $state, $ionicModal, $localStorage, $reportService, $window, toast, $utils, CONFIG, $rootScope) {
    var vm = this;
    vm.init = function() {
        //vm.reports = ReportData.getReports();
        vm.getReportData();
    };
    vm.getReportData = function() {

        var queryParams = {
            accountId: $rootScope.currentUser.AccountId,
            userId: $rootScope.currentUser.UserId,
            isManager: false,
            pageIndex: 0,
            pageSize: 100
        };
        $reportService.getReportData(queryParams).then(function(response) {
            console.log(response.data);
            if (response.data && response.data.length > 0) {
                vm.reports = response.data;
                $localStorage.set('reports', response.data);
            } else {
                toast.show("No Data Found.");
            }

            // $state.go('app.subIssue');
        }, function(error) {
            //error
            toast.show($message.error);
        });
    }
    vm.showDetail = function() {
        $state.go('app.create_report');
    };
    vm.showImage = function(src) {
        $scope.imageSrc = src;
        $scope.openModal();
    };
    $ionicModal.fromTemplateUrl('templates/image-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.openModal = function() {
        $scope.modal.show();
    };

    $scope.closeModal = function() {
        $scope.modal.hide();
    };

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function() {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
        // Execute action
    });
    $scope.$on('modal.shown', function() {
        console.log('Modal is shown!');
    });



});
