app.service('IssueList', function() {
    var service = {};
    service.title = "Select Issue";
    var menu = [{
        id: '1',
        img: 'assets/images/fake.jpg',
        icon: 'fa fa-calendar',
        name: 'Hazardous Energy Control'
    }, {
        id: '2',
        img: 'assets/images/fake.jpg',
        icon: 'fa fa-calendar',
        name: 'Electrical'
    }, {
        id: '3',
        img: 'assets/images/fake.jpg',
        icon: 'fa fa-calendar',
        name: ' Working at Height'
    }, {
        id: '4',
        img: 'assets/images/fake.jpg',
        icon: 'fa fa-calendar',
        name: 'Confined Space'
    }, {
        id: '5',
        img: 'assets/images/fake.jpg',
        icon: 'fa fa-calendar',
        name: 'Machine Guarding'
    }, {
        id: '6',
        img: 'assets/images/fake.jpg',
        icon: 'fa fa-calendar',
        name: 'Fire / Hot Works'
    }, {
        id: '7',
        img: 'assets/images/fake.jpg',
        icon: 'fa fa-calendar',
        name: 'Hazardous Material'
    }, {
        id: '8',
        img: 'assets/images/fake.jpg',
        icon: 'fa fa-calendar',
        name: 'Fleets & Material Handling'
    }, {
        id: '9',
        img: 'assets/images/fake.jpg',
        icon: 'fa fa-calendar',
        name: 'Office'
    }, {
        id: '10',
        img: 'assets/images/fake.jpg',
        icon: 'fa fa-calendar',
        name: 'First Aid Facility'
    }, {
        id: '11',
        img: 'assets/images/fake.jpg',
        icon: 'fa fa-calendar',
        name: 'Lifts / Elavators'
    }, {
        id: '12',
        img: 'assets/images/fake.jpg',
        icon: 'fa fa-plus',
        name: 'More'
    }];
    service.getList = function() {
        return menu;
    }
    return service;

});
