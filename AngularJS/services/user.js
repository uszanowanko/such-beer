function UserSvc($http) {    
    this.getUser = function () {
        return $http.get('/api/user')
        .then((response) => {
            this.currentUser = response.data;
            return response.data;
        },() => false);
    }
    
    this.login = function (name) {
        return $http.post('/api/users',{name: name})
        .then((response) => {
            this.currentUser = response.data;
            return response.data;
        },() => false);
    }
    
    this.logout = function (name) {
        return $http.post('/api/logout',{name: name})
        .then(() => {
            this.currentUser = null;
        },() => false);
    }
}


angular.module('SuchBeer')
    .service('UserSvc', UserSvc)