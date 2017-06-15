app.controller('CreateReportCtrl', function ($scope, $message, $interval, $timeout, $rootScope, IssueList, toast, $cordovaToast, $state, $reportService, $localStorage, $utils) {
  var vm = this;
  $scope.$on("$ionicView.enter", function () {
    $timeout(function () {
      vm.getIssueList();
    }, 1000);
  });
  // $interval(function() {
  //     vm.getIssueList();
  // }, 240000);
  vm.getIssueList = function () {
    var currentUser = $localStorage.get('currentUser');
    var issueObj = {
      accountId: currentUser.AccountId,
      parentCategoryId: '',
      departmentId: currentUser.DepartmentId,
      locationId: currentUser.LocationId
    };
    $reportService.getIssueList(issueObj).then(function (response) {
      if (response.data && response.data.length > 0) {
        vm.issueList = response.data;
        $localStorage.set('allIssue', response.data);
      } else {
        toast.show("No Category Found.");
      }

      // $state.go('app.subIssue');
    }, function (error) {
      //error
      toast.show($message.error);
    });
  };
  vm.showSubIssue = function (issue) {
    console.log(issue);
    $localStorage.set('currentIssue', issue);
    $state.go('app.subIssue');
  };
});
