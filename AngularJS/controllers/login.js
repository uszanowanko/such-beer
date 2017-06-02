function LoginCtrl($location, UserSvc) {
    this.userSvc = UserSvc;
    this.flags = {};
    
    if (UserSvc.currentUser) {
        $location.path('/')
    }
    
    this.login = (name) => {
        UserSvc.login(name)
        .then(() => {
            $location.path('/')
        }, () => {
            this.flags.loginBusy = false;            
        });
    }
}

angular.module('SuchBeer').controller('LoginCtrl', LoginCtrl);