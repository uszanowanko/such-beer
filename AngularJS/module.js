angular.module('SuchBeer', ['ngMaterial', 'ngRoute', 'ngMaterialDatePicker'])
    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue-grey')
            .accentPalette('brown')
            .warnPalette("pink")
            .dark();
    });