angular.module('SuchBeer', ['ngMaterial', 'ngRoute', 'ngMaterialDatePicker','pascalprecht.translate'])
    .config(function ($mdThemingProvider, $translateProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue-grey')
            .accentPalette('brown')
            .warnPalette("pink")
            .dark();
        $translateProvider.useStaticFilesLoader({
            prefix: 'resources/locale-',
            suffix: '.json'
        })
            .registerAvailableLanguageKeys(['en','pl','de'], {
                'en_*': 'en',
                'pl_*': 'pl',
                'de_*': 'de',
                '*': 'en'
            })
            .determinePreferredLanguage()
            .fallbackLanguage('en');
    });