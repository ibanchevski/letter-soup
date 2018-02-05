function RegisterCtrl() {
    var vm = this;
    vm.repeatedPassword = '';
    vm.subjects = [];
    vm.teacher = {
        "firstName": '',
        "lastName": '',
        "city": '',
        "school": '',
        "email": '',
        "password": '',
        "subject": ''
    };

    var mockSubjects = [
        {
            "name": 'Български',
            "_id": '23xcvadf'
        },
        {
            "name": 'Испански',
            "_id": '23x324vadf'
        }
    ];
    vm.subjects = mockSubjects;
}
RegisterCtrl.$inject = [];
angular.module('letterSoup').controller('RegisterCtrl', RegisterCtrl);