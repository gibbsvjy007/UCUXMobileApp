app.controller('SubIssueListCtrl', function($scope, IssueList, $window, ReportData, $cordovaToast, $state, $utils, $sce, $cordovaGoogleAnalytics, CONFIG, $cordovaInAppBrowser, $rootScope) {
    var vm = this;
    vm.init = function() {
        vm.issueList = IssueList.getList();
        console.log('subissue');
        $scope.selectable = [{"fname":"Ghaffar","lname":"Peterman","group":"Good"},{"fname":"Arturo","lname":"Sessa","group":"Good"},{"fname":"Bilal","lname":"Cox","group":"Best"},{"fname":"Serena","lname":"Bradley","group":"Best"},{"fname":"Mario","lname":"Delaura","group":"Best"},{"fname":"Bruce","lname":"Hackman","group":"Good"},{"fname":"Hope","lname":"Barowsky","group":"Best"},{"fname":"Lauris","lname":"Kaa","group":"Better"},{"fname":"Bola","lname":"Obara","group":"Best"},{"fname":"Jamie","lname":"Betts","group":"Good"},{"fname":"Bartley","lname":"Cole","group":"Best"},{"fname":"Wichaya","lname":"Mullins","group":"Good"},{"fname":"Rich","lname":"Seymour","group":"Better"},{"fname":"Denys","lname":"Gallant","group":"Good"},{"fname":"Maurice","lname":"Barrientos","group":"Best"},{"fname":"Jawdat","lname":"Ward","group":"Better"},{"fname":"Sherrie","lname":"Whalley","group":"Better"},{"fname":"Rob","lname":"Gould","group":"Better"},{"fname":"Saowalak","lname":"Hadley","group":"Good"},{"fname":"Marqueal","lname":"Wright","group":"Better"}];

    };

    vm.submitReport = function(){
    	$state.go('app.submitReport');
    }
    
});
