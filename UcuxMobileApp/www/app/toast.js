app.service('toast',
    function($utils, $cordovaToast) {
        var toast = {};
        toast.show = function(message) {
            $cordovaToast.show(message, 'long', 'bottom');
        };
        toast.error = function(message) {
            $cordovaToast.show(message, 'long', 'bottom');
        };
        return toast;
    });
