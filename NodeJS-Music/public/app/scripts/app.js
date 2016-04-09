/**
 * Created by dhnhan on 4/8/2016.
 */
define([
        'angular',
        'bootstrap',
        'angular-animate',
        'angular-bootstrap',
        'angular-ui-router',
        'angular-aria',
        'angular-material',
        'angular-translate',
        'music/music',
        'angular-translate-static-file'
    ],
    function () {
        return angular.module('app',
            [
                'ngAnimate',
                'ui.bootstrap',
                'ui.router',
                'ngMaterial',
                'pascalprecht.translate',
                'com.dhnhan.music'
            ])
            .config(['$translateProvider',
                function ($translateProvider) {
                    $translateProvider.useStaticFilesLoader({
                        prefix: 'app/i18n/',
                        suffix: '.json'
                    });
                    $translateProvider.preferredLanguage('en');
                }])
            .controller('AppCtrl', ['$scope', 'LANGUAGE', '$translate', function ($scope, LANGUAGE, $translate) {
                $scope.langs = LANGUAGE;
                $scope.lang = $scope.langs[0];
                $scope.changeLang = function () {
                    $translate.use($scope.lang.id);
                }
            }]);
    });