function UserSvc($http) {
    this.currentUser = {
        username: "Pieseł"
    }
}


angular.module('SuchBeer')
    .service('UserSvc', UserSvc)