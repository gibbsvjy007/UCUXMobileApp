app.service('toast',
    function($utils, $cordovaToast, ionicToast) {
        var toast = {};
        toast.show = function(message) {
            if ($utils.isBrowser()) {
                ionicToast.show(message, 'middle', false, 2500);
            } else {
                $cordovaToast.show(message, 'long', 'bottom');
                //ionicToast.show(message, 'middle', false, 2500);
            }
        };
        return toast;
    });
