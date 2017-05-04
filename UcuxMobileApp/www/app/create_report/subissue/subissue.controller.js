app.controller('SubIssueListCtrl', function ($scope, IssueList, $state, $rootScope, $utils, toast, $localStorage, $reportService) {
  var vm = this;
  vm.subCategory = false;
  vm.notAllowed = true;
  vm.init = function () {
    // vm.issueList = IssueList.getList();
    var currentIssue = $localStorage.get('currentIssue');
    vm.allCategory = $localStorage.get('allIssue');
    vm.selectedCategory = currentIssue.CategoryId;
    $scope.title = currentIssue.Name;
    //$scope.selectable = [{ "fname": "Ghaffar", "lname": "Peterman", "group": "Good" }, { "fname": "Arturo", "lname": "Sessa", "group": "Good" }, { "fname": "Bilal", "lname": "Cox", "group": "Best" }, { "fname": "Serena", "lname": "Bradley", "group": "Best" }, { "fname": "Mario", "lname": "Delaura", "group": "Best" }, { "fname": "Bruce", "lname": "Hackman", "group": "Good" }, { "fname": "Hope", "lname": "Barowsky", "group": "Best" }, { "fname": "Lauris", "lname": "Kaa", "group": "Better" }, { "fname": "Bola", "lname": "Obara", "group": "Best" }, { "fname": "Jamie", "lname": "Betts", "group": "Good" }, { "fname": "Bartley", "lname": "Cole", "group": "Best" }, { "fname": "Wichaya", "lname": "Mullins", "group": "Good" }, { "fname": "Rich", "lname": "Seymour", "group": "Better" }, { "fname": "Denys", "lname": "Gallant", "group": "Good" }, { "fname": "Maurice", "lname": "Barrientos", "group": "Best" }, { "fname": "Jawdat", "lname": "Ward", "group": "Better" }, { "fname": "Sherrie", "lname": "Whalley", "group": "Better" }, { "fname": "Rob", "lname": "Gould", "group": "Better" }, { "fname": "Saowalak", "lname": "Hadley", "group": "Good" }, { "fname": "Marqueal", "lname": "Wright", "group": "Better" }];

    vm.getCategoryList();
    vm.getZoneList();
  };
  vm.getCategoryList = function (event) {
    if (event)
      event.preventDefault();
    console.log('issueList');
    vm.subCategory = false;
    if (vm.selectedCategory == "") {
      toast.show("Please select Issue.");
      return;
    }
    var issueObj = {
      accountId: $rootScope.currentUser.AccountId,
      parentCategoryId: vm.selectedCategory,
      departmentId: $rootScope.currentUser.DepartmentId,
      locationId: $rootScope.currentUser.LocationId
    };
    $reportService.getCategoryList(issueObj).then(function (response) {
      console.log(response.data);
      if (response.data && response.data.length > 0) {
        vm.subCategoryList = response.data;
      } else {
        toast.show("No Category Found.");
      }

      // $state.go('app.subIssue');
    }, function (error) {
      //error
      toast.show($message.error);
    });
  };
  vm.getSubCategory = function (event) {
    vm.subCategory = false;
    console.log('subCategory');
    if (event)
      event.preventDefault();
    if (vm.selectedSubCategory == "") {
      toast.show("Please select Issue.");
      return;
    }
    var issueObj = {
      accountId: $rootScope.currentUser.AccountId,
      parentCategoryId: vm.selectedSubCategory,
      departmentId: $rootScope.currentUser.DepartmentId,
      locationId: $rootScope.currentUser.LocationId
    };
    if (vm.selectedSubCategory)
      $reportService.getCategoryList(issueObj).then(function (response) {
        console.log(response.data);
        if (response.data && response.data.length > 0) {
          vm.subSubCategoryList = response.data;
          vm.subCategory = true;
        } else {
          toast.show("No Category Found.");
          vm.subCategory = false;
        }

        // $state.go('app.subIssue');
      }, function (error) {
        //error
        vm.subCategory = false;
        toast.show($message.error);
      });
  };
  vm.getZoneList = function () {
    var queryParams = {
      locationId: $rootScope.currentUser.LocationId
    };
    if (vm.selectedZone == "") {
      toast.show("Please select Issue.");
      return;
    }
    $reportService.getZones(queryParams).then(function (response) {
      console.log(response.data);
      if (response.data && response.data.length > 0) {
        vm.zoneList = response.data;
      } else {
        toast.show("No Category Found.");
      }

      // $state.go('app.subIssue');
    }, function (error) {
      //error
      toast.show($message.error);
    });
  };
  vm.enableNext = function () {
    if(vm.remarks !== "" && vm.selectedZone !== "" && vm.selectedSubCategory !== "" && vm.selectedCategory !== ""){
      vm.notAllowed = false;
    }else{
      vm.notAllowed = true;
    }
  };
  vm.remarks = "";
  vm.condition = "Unsafe Act";
  vm.nextPage = function () {
    console.log(vm.condition);
    console.log(vm.remarks);
    console.log(vm.selectedCategory);
    console.log(vm.selectedSubCategory);
    console.log(vm.selectedSubSubCategory);
    console.log(vm.selectedZone);
    if(vm.remarks !== "" && vm.selectedZone !== "" && vm.selectedSubCategory !== "" && vm.selectedCategory !== ""){
      var finalReportObj = {
        condition: vm.condition,
        remarks: vm.remarks,
        parentCategoryId: vm.selectedCategory,
        categoryId: vm.selectedSubCategory,
        subCategoryId: vm.selectedSubSubCategory,
        zoneId: vm.selectedZone
      };
      vm.notAllowed = false;
      $localStorage.set('FinalReportObj', finalReportObj);
      $state.go('app.submitReport');
    }else{
      toast.show("All items are required.");
      vm.notAllowed = true;
    }

  };

});
