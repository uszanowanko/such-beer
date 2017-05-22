function ApplicationCtrl(UserSvc) {
    this.userSvc = UserSvc
    
    this.logout = () => {
        UserSvc.currentUser = null;
    }
}

ApplicationCtrl.prototype = {
    get user() {
        return this.userSvc.currentUser;
    }
}

angular.module('SuchBeer').controller('ApplicationCtrl', ApplicationCtrl);