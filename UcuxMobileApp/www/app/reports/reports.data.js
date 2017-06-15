app.service('ReportData', function() {
    var service = {};
    service.title = "My Reports";
    var menu = [{
        id: '1',
        icon_status: 'ion-ios-chatbubble',
        icon_date: 'ion-ios-calendar',
        title: 'Unsafe condition - General',
        subTitle: 'Hazardous Energy Control',
        desc: 'No Lock out Tag out device',
        img: 'assets/images/fake.jpg',
        label: 'Home',
        status: 'Completed',
        createdOn: 'April 12th, 2016'
    }, {
        id: '2',
        icon_status: 'ion-ios-chatbubble',
        icon_date: 'ion-ios-calendar',
        label: 'Qr Code',
        title: 'Unsafe condition - General',
        subTitle: 'Hazardous Energy Control',
        desc: 'No Lock out Tag out device',
        img: 'assets/images/fake.jpg',
        status: 'Submitted',
        createdOn: 'April 12th, 2016'
    }, {
        id: '3',
        icon_status: 'ion-ios-chatbubble',
        icon_date: 'ion-ios-calendar',
        title: 'Unsafe condition - General',
        subTitle: 'Hazardous Energy Control',
        desc: 'No Lock out Tag out device',
        img: 'assets/images/fake.jpg',
        label: 'Bluetooth Reader',
        status: 'Submitted',
        createdOn: 'April 12th, 2016'
    }, {
        id: '4',
        icon_status: 'ion-ios-chatbubble',
        icon_date: 'ion-ios-calendar',
        title: 'Unsafe condition - General',
        subTitle: 'Hazardous Energy Control',
        desc: 'No Lock out Tag out device',
        img: 'assets/images/fake.jpg',
        label: 'Qr Pairing',
        status: 'Submitted',
        createdOn: 'April 12th, 2016'
    }, {
        id: '5',
        icon_status: 'ion-ios-chatbubble',
        icon_date: 'ion-ios-calendar',
        title: 'Unsafe condition - General',
        subTitle: 'Hazardous Energy Control',
        desc: 'No Lock out Tag out device',
        img: 'assets/images/fake.jpg',
        label: 'About Us',
        status: 'Submitted',
        createdOn: 'April 12th, 2016'
    }];
    service.getReports = function() {
        return menu;
    }
    return service;

});
