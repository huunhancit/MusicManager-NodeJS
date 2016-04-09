/**
 * Created by dhnhan on 4/8/2016.
 */
require.config({
    paths: {
        'jquery': '../bower_components/jquery/dist/jquery.min',
        'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap',
        'angular': '../bower_components/angular/angular.min',
        'angular-bootstrap': '../bower_components/angular-bootstrap/ui-bootstrap-tpls.min',
        'angular-animate': '../bower_components/angular-animate/angular-animate.min',
        'angular-ui-router': '../bower_components/angular-ui-router/release/angular-ui-router.min',
        'angular-aria': '../bower_components/angular-aria/angular-aria.min',
        'angular-material': '../bower_components/angular-material/angular-material.min',
        'angular-translate': '../bower_components/angular-translate/angular-translate.min',
        'angular-translate-static-file' : '../bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.min',
        'app': 'app',
    },
    shim: {
        'angular': {
            deps: ['jquery']
        },
        'bootstrap': {
            deps: ['jquery']
        },

        'angular-animate': {
            deps: ['angular']
        },
        'angular-bootstrap': {
            deps: ['angular', 'angular-animate']
        },
        'angular-aria': {
            deps: ['angular']
        },
        'angular-ui-router': {
            deps: ['angular', 'angular-animate']
        },
        'angular-material': {
            deps: ['angular-animate', 'angular-aria']
        },
        'angular-translate' : {
            deps: ['angular']
        },
        'angular-translate-static-file' : {
            deps : ['angular-translate']
        },
        'app': {
            deps: ['angular']
        }
    }
});

require(['app'], function () {
    angular.bootstrap(document, ['app']);
});