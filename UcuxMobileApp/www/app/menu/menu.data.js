app.service('MenuData', function(){
  var service = {};
  service.title = "Menu";
    var menu = [{
      id: '1',
      icon: 'ion-home',
      label: 'Home',
      class: 'home'
    },{
      id: '2',
      icon: 'ion-qr-scanner',
      label: 'Qr Code',
      class: 'qrcode'
    },{
      id: '3',
      icon: 'ion-bluetooth',
      label: 'Bluetooth Reader',
      class: 'bluetooth'
    },{
      id: '4',
      icon: 'ion-qr-scanner',
      label: 'Qr Pairing',
      class: 'pairing'
    },{
      id: '5',
      icon: 'ion-information-circled',
      label: 'About Us',
      class: 'about'
    },
    {
      id: '6',
      icon: 'fa fa-support',
      label: 'Support',
      class: 'support'
    },{
      id: '7',
      icon: 'ion-log-out',
      label: 'Logout',
      class: 'logout'
    }];
    service.getMenu = function(){
      return menu;
    }
    return service;

});
