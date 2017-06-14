function ApplicationCtrl($location, UserSvc) {
    this.userSvc = UserSvc
    
    UserSvc.getUser().then((response) => {
        if (!response) {
            $location.path('/login')
        }
    });
    
    this.logout = () => {
        UserSvc.logout(UserSvc.currentUser.name).then(() => {
            $location.path('/login');
        });
    }
}

ApplicationCtrl.prototype = {
    get user() {
        return this.userSvc.currentUser;
    }
}

angular.module('SuchBeer').controller('ApplicationCtrl', ApplicationCtrl);