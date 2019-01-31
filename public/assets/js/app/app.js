/**
 * App
 */
var app = angular.module('app',
    [
        'ngRoute',
        'ngCookies',
        'ng-breadcrumbs',
        /*'angular-loading-bar',*/
        'cfp.loadingBar',
        'ngMeta',
        'youtube-embed',
        '720kb.socialshare',
        'ui.bootstrap',
	    'ui.select',
        /*'angular-stripe',*/
        'credit-cards',
	    'infinite-scroll',
        'ngSanitize',
        'ngScrollbars',
        'ngMap',
        'angularFileUpload',
        'uiCropper',
        'slick',
        'satellizer',
        'hl.sticky',
        'ngCart',
        'ghiscoding.validation',
        'pascalprecht.translate'
    ]
);

/**
 * Init meta data
 */
app.run(['ngMeta', function(ngMeta) {
    ngMeta.init();
}]);

/**
 * Replace {{}} for [[]]
 */
app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

/**
 * Set default meta data
 */
app.config(function(ngMetaProvider) {

    ngMetaProvider.useTitleSuffix(true);
    ngMetaProvider.setDefaultTitle('Shelping.COM');
    ngMetaProvider.setDefaultTitleSuffix(' | Change Brand - Change Lives.');
    ngMetaProvider.setDefaultTag('author', 'Shelping.COM');
});

/**
 * Loading Template
 */
app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.parentSelector = '#base-content';
    /*cfpLoadingBarProvider.latencyThreshold = 0;*/
    /*cfpLoadingBarProvider.spinnerTemplate = '' +
        '<div class="cd-loading" ng-if="cdLoading || dataLoading">' +
        '<div class="centered animated fadeIn">' +
        '<div class="spinner">' +
        '<img class="fa-spin" src="assets/img/spinner.png" />' +
        '</div>' +
        '<div class="text">Loading...</div>' +
        '</div>' +
        '</div>';*/

    cfpLoadingBarProvider.spinnerTemplate = '' +
        '<div class="cd-loading">' +
        '<div class="centered animated fadeIn">' +
        '<div class="spinner">' +
        '<img width="30px" src="assets/img/spinner.png" /> <strong>Shelping.COM</strong>' +
        '</div>' +
        '</div>' +
        '<div class="ocean">' +
        '<div class="wave">' +
        '<div class="wave">' +
        '</div>' +
        '</div>';
}]);

// Stripe
/*app.config(function (stripeProvider) {
    stripeProvider.setPublishableKey('pk_test_LeDggc6W9AiC0qZYLtrRNjNI');
});*/

/**
 * Scrollbar global config
 */
app.config(function (ScrollBarsProvider) {
    ScrollBarsProvider.defaults = {
        autoHideScrollbar: true,
        advanced:{
            updateOnContentResize: true
        },
        setHeight: 400,
        scrollInertia: 0,
        scrollButtons: {
            scrollAmount: 'auto', // scroll amount when button pressed
            enable: false // enable scrolling buttons by default
        },
        axis: 'y'
    };
});

/**
 * OAuth
 * Currently not used
 */
app.config(function($authProvider) {
    $authProvider.facebook({
        clientId: '274676456259523',
        display: 'popup',
        responseType: 'token'
    });

    $authProvider.google({
        clientId: '419050714736-g2er9p7cp437r5sc50sukd4qphmett62.apps.googleusercontent.com',
        responseType: 'token'
    });

    $authProvider.linkedin({
        clientId: '78d4f8gua9i9uj'
    });

    // Twitter
    $authProvider.twitter({
        url: 'api/auth/twitter',
        responseType: 'token'
    });
});

/**
 * If image is missing, replace with default
 */
app.directive('checkImage', function() {
    return {
        link: function(scope, element, attrs) {
            element.bind('error', function() {
                if( !attrs.checkImage )
                    attrs.checkImage = '/assets/img/missing-project.png';
                if (attrs.src != attrs.checkImage) {
                    attrs.$set('src', attrs.checkImage);
                }
            });
        }
    }
});

/**
 * Password match check directive
 */
app.directive('pwCheck', [function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            var firstPassword = '#' + attrs.pwCheck;
            elem.add(firstPassword).on('keyup', function () {
                scope.$apply(function () {
                    var v = elem.val()===$(firstPassword).val();
                    ctrl.$setValidity('pwmatch', v);
                });
            });
        }
    }
}]);

/**
 * Enter key to submit directive
 */
app.directive('enterSubmit', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.enterSubmit);
                });

                event.preventDefault();
            }
        });
    };
});

/**
 * Scroll to section directive
 */
app.directive('autoScroller', function ($location, $anchorScroll, $timeout) {
    return {
        restrit: 'A',
        scope: {
            trigger: '=',
            idToScrollTo: '='
        },
        link: function (scope, element, attrs) {
            scope.$watch('trigger', function (newValue, oldValue) {
                if (newValue && newValue !== oldValue) {
                    $timeout(function () {
                        $location.hash(scope.idToScrollTo);
                        $anchorScroll();
                    });
                }
            });
        }
    }
});

/**
 * USAGE : $remember('my_cookie_name', response.user._id);
 */
app.factory('$remember', function() {
    return function(name, values) {
        var cookie = name + '=';

        cookie += values + ';';

        var date = new Date();
        date.setDate(date.getDate() + 365);

        cookie += 'expires=' + date.toString() + ';';

        document.cookie = cookie;
    }
});

app.factory('$forget', function() {
    return function(name) {
        var cookie = name + '=;';
        cookie += 'expires=' + (new Date()).toString() + ';';

        document.cookie = cookie;
    }
});

// Bootstrapper

/*var cachedWidth = $(window).width();
$(window).resize(function(){
    var newWidth = $(window).width();
    if(newWidth !== cachedWidth){
        //DO RESIZE HERE
        cachedWidth = newWidth;
    }
});*/

/**
 * None Angular Related
 */
$(document).ready(function() {
// Tooltips
    var bodyTag = $('body');
    bodyTag.tooltip({
        selector: '[data-toggle="tooltip"]'
    });

// Popovers
    bodyTag.popover({
        selector: '[data-toggle="popover"]'
    });

// Sliders
    $("#radius-slider").slider();

    // Carousel swipe functionality
    $(".carousel").on("touchstart", function(event){
        var xClick = event.originalEvent.touches[0].pageX;
        $(this).one("touchmove", function(event){
            var xMove = event.originalEvent.touches[0].pageX;
            if( Math.floor(xClick - xMove) > 5 ){
                $(this).carousel('next');
            }
            else if( Math.floor(xClick - xMove) < -5 ){
                $(this).carousel('prev');
            }
        });
        $(".carousel").on("touchend", function(){
            $(this).off("touchmove");
        });
    });
});

