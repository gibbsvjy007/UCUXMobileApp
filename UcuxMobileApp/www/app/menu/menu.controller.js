/**
 * [description]
 * @param  {[type]} $scope                 [description]
 * @param  {[type]} $ionicSideMenuDelegate [description]
 * @param  {[type]} MenuData)              {               $scope.menuItems [description]
 * @return {[type]}                        [description]
 */
app.controller('MenuCtrl', function($scope, $ionicSideMenuDelegate, MenuData, $utils, $state, $cordovaGoogleAnalytics, $ionicActionSheet) {
    $scope.menuItems = MenuData.getMenu();
    $scope.title = MenuData.title;
    $scope.showMenu = function($event) {
        $ionicSideMenuDelegate.toggleRight();
    };

    /**
     * [goTo function to navigate to all detail pages of the application]
     * @return {[type]} [description]
     */
    $scope.goTo = function(pageId) {
        switch (pageId) {
            case '1':
                $state.go('dashboard.dash');
                break;
            case '2':
                $state.go('dashboard.qr');
                break;
            case '3':
                //$state.go('dashboard');
                alert('coming soon');
                break;
            case '4':
                $state.go('dashboard.pairing');
                break;
            case '5':
                $state.go('dashboard.about');
                break;
            case '6':
                $state.go('dashboard.support');
                break;
            case '7':
                $scope.logout();
                break;
            default:
                alert('coming soon...');
        }
    };
    /**
     * [logout description]
     * @type {[type]}
     */
    $scope.logout = function() {

        // Show the action sheet
        var hideSheet = $ionicActionSheet.show({
            buttons: [
                { text: 'Logout' }
            ],
            //destructiveText: 'Delete',
            titleText: '<span style="font-size: 18px;">Are you sure you want to logout?</span>',
            cancelText: 'Cancel',
            cancel: function() {
                // add cancel code..
                hideSheet();
            },
            buttonClicked: function(index) {
                if (index === 0) {
                    $state.go('login');
                }
                return true;
            }
        });

        // $utils.confirmDialog({
        //     title: 'Confirm',
        //     message: 'Are you sure you want to logout?'
        // }).then(function(res) {
        //     if (res) {
        //         $state.go('login');
        //     }
        // });
    };
});
