angular.module('SuchBeer', ['ngMaterial', 'ngRoute'])
    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue-grey')
            .accentPalette('brown')
            .warnPalette("pink")
            .dark();
    });