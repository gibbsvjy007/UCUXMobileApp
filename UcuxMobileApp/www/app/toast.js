app.service('toast',
    function($utils, $cordovaToast, ionicToast) {
        var toast = {};
        toast.show = function(message) {
            if ($utils.isBrowser()) {
                ionicToast.show(message, 'bottom', true, 2500);
            } else {
                $cordovaToast.show(message, 'long', 'bottom');
            }
        };
        return toast;
    });
