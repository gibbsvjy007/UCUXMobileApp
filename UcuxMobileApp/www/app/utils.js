app.factory('$utils', function($state, $ionicLoading, $localStorage, $cordovaToast, $ionicPopup) {
    var utils = {};
    utils.getCurrentPosition = function() {
        var posOptions = {
            timeout: 10000,
            enableHighAccuracy: false
        };
        $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function(position) {
                var data = {
                    lat: position.coords.latitude,
                    long: position.coords.longitude,
                    altitude: position.coords.altitude,
                    altitude_accuracy: position.coords.altitudeAccuracy,
                    accuracy: position.coords.accuracy
                };
                $localStorage.set('currentPosition', JSON.stringify(data));
            }, function(err) {
                // error
            });
    };
    utils.formatString = function(string, placeHolders) {
        placeHolders = typeof placeHolders === 'object' ? placeHolders : Array.prototype.slice.call(arguments, 1);
        return string.replace(/\{\{|\}\}|\{(\w+)\}/g, function(m, n) {
            if (m === "{{") {
                return "{";
            }
            if (m === "}}") {
                return "}";
            }
            return placeHolders[n];
        });
    };
    utils.hideLoading = function() {
        $ionicLoading.hide();
    };
    utils.showLoading = function() {
        //spiral
        $ionicLoading.show({
            template: '<ion-spinner  style="font-size: 32px" icon="android"></ion-spinner>',
            animation: 'fade-in',
            noBackdrop: false
        });
    };

    utils.notBlank = function(val) {
        return val === undefined || val === "undefined" || val === "NULL" || val === "UNDEFINED" || val === "null" || val === '{}' || val === null || (typeof val === "string" && val.trim() === "") ? false : true;
    };
    utils.params = function(obj) {
        var p = [];
        for (var key in obj) {
            p.push(key + '=' + encodeURIComponent(obj[key]));
        }
        return p.join('&');
    };
    utils.getUserId = function() {
        var user = JSON.parse($localStorage.get('user'));
        return user.user_id;
    };
    utils.showError = function() {
        $cordovaToast.show($message.error, 'long', 'bottom');
    };
    utils.confirmDialog = function(dialog) {
        return $ionicPopup.confirm({
            title: dialog.title,
            template: dialog.message
        });
    };
    utils.alert = function(alertObj) {
        if (!utils.notBlank(alertObj.title))
            alertObj.title = 'Alert';
        var alertPopup = $ionicPopup.alert({
            title: alertObj.title,
            template: alertObj.message
        });

        alertPopup.then(function(res) {
            console.log('Thank you !');
        });

    };
    return utils;
}).factory('$localStorage', function($filter, $window) {
    return {
        // Get data from localStorage it will use data key for getting the data.
        // Parameter :
        // key = reference of object in localStorage.
        get: function(key) {
            return JSON.parse($window.localStorage[key] || "null");
        },

        // Add data to localStorage it will use data key
        // by input data key and value for setting data to localStorage.
        // Parameter :
        // key = reference of object in localStorage.
        // value = data that will store in localStorage.
        set: function(key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },

        //Remove all data from localStorage.
        removeAll: function() {
            $window.localStorage.clear();
        }

    };
});
