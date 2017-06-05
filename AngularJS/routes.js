angular.module('SuchBeer')
    .config(function ($routeProvider) {
        var basePath = 'views/';
        $routeProvider
            .when('/', {
                templateUrl: basePath + 'vote.html'
            })
            .when('/login', {
                templateUrl: basePath + 'login.html'
            })
            .otherwise({
                redirectTo: basePath + 'error404'
            });
    })/*.run(function ($location, $rootScope, UserSvc) {

        $rootScope.$on("$locationChangeStart", function (event, next, current) {
            if (!UserSvc.currentUser) {
                $location.path("/login")
            }
        });

    });*/