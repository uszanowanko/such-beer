angular.module('SuchBeer')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: './../views/vote.html'
            })
            .when('/login', {
                templateUrl: './../views/login.html'
            })
            .otherwise({
                redirectTo: './../views/error404'
            });
    }).run(function ($location, $rootScope, UserSvc) {

        $rootScope.$on("$locationChangeStart", function (event, next, current) {
            if (!UserSvc.currentUser) {
                $location.path("/login")
            }
        });

    });