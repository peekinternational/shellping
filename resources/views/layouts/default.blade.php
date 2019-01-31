<!DOCTYPE html>
<html lang="en" ng-app="app" ng-controller="BaseController">
    <head>
        <!-- Basic Page Needs
        ================================================== -->
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title ng-bind="ngMeta.title"></title>
        <meta name="keywords" content="[[ ngMeta.keywords ]]" />
        <meta name="author" content="Shelping.COM" />
        <meta name="description" content="[[ ngMeta['description'] ]]" />
        <base href="{{ url('/') }}">
        <meta name="google-site-verification" content="QLBTKqKgRk3g5xOQYTQ4kSonhVO7IsqF7g4b0eASTR8" />
        <meta name="fragment" content="!">

        <!-- OG Metas -->
        <meta property="og:type" content="website">
        <meta property="og:title" content="[[ ngMeta.title ]]">
        <meta property="og:site_name" content="Shelping.COM">
        <meta property="og:url" content="[[ ngMeta['url'] ]]">
        <meta property="og:image" content="[[ ngMeta['image'] ]]">


        <!-- Mobile Specific Metas
        ================================================== -->
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <meta name="theme-color" content="#813e8e" />

        <!-- CSS
        ================================================== -->
        <link rel="stylesheet" href="{{ url('assets/css/bootstrap.min.css') }}">
        <link rel="stylesheet" href="{{ url('/assets/css/bootstrap-toggle.css') }}">
        <link rel="stylesheet" href="{{ url('/assets/css/bootstrap-slider.css') }}">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic&amp;subset=latin">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:400,700">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i">
        {{--<link rel="stylesheet" href="//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.css">--}}
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">
        <link rel="stylesheet" href="{{ url('/assets/css/material.css') }}">
        <link rel="stylesheet" href="{{ url('/assets/css/tether.min.css') }}">
        <link rel="stylesheet" href="{{ url('/assets/css/dropdown-style.css') }}">
        <link rel="stylesheet" href="{{ url('/assets/css/animate.min.css') }}">
        <link rel="stylesheet" href="{{ url('/assets/css/theme.css') }}">
        <link rel="stylesheet" href="{{ url('/assets/css/mbr-additional.css') }}" type="text/css">
        <link rel="stylesheet" href="{{ url('/assets/css/loading-bar.css') }}">
        <link rel="stylesheet" href="{{ url('/assets/css/jquery.mCustomScrollbar.css') }}">
        <link rel="stylesheet" href="{{ url('/assets/css/select.css') }}">
        <link rel="stylesheet" href="{{ url('/assets/css/slick.css') }}">
        <link rel="stylesheet" href="{{ url('/assets/css/slick-theme.css') }}">
        <link rel="stylesheet" href="{{ url('/assets/css/style.css') }}">
        <link rel="stylesheet" href="{{ url('/assets/css/style2.css') }}">
        <link rel="stylesheet" type="text/css" href="//services.postcodeanywhere.co.uk/css/platformcaptureplus-2.10.min.css?key=ZK47-YT99-CF97-PT96&amp;BRAND=PostcodeAnywhere">

        <style>
        @section('styles')

        @show
        </style>

        <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
        <!--[if lt IE 9]>
        <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
        <![endif]-->

        <!-- Favicons
        ================================================== -->
        <link rel="apple-touch-icon-precomposed" sizes="144x144" href="assets/ico/apple-touch-icon-144-precomposed.png">
        <link rel="apple-touch-icon-precomposed" sizes="114x114" href="assets/ico/apple-touch-icon-114-precomposed.png">
        <link rel="apple-touch-icon-precomposed" sizes="72x72" href="assets/ico/apple-touch-icon-72-precomposed.png">
        <link rel="apple-touch-icon-precomposed" href="assets/ico/apple-touch-icon-57-precomposed.png">
        <link rel="shortcut icon" href="{{ url('assets/favicon.ico') }}">

    </head>

    <body ng-cloak>
    <!-- Loading -->
    <div class="cd-loading" ng-if="cdLoading || dataLoading">
        <div class="centered animated fadeIn">
            <div class="spinner">
                <img width="30px"; src="assets/img/spinner.png" /> <strong>Shelping.COM</strong>
            </div>
        </div>
        <div class="ocean">
            <div class="wave"></div>
            <div class="wave"></div>
        </div>
    </div>

    <!-- Notifications -->
    @include('layouts.notifications')
    <!-- Begin page content -->
    <div class="animated fadeIn">
        <header>
            <!-- Navigation -->
            @include('layouts.navigation')
            @include('layouts.mob-navigation')
        </header>

        <!-- Content -->
        <main class="ng-cloak" ng-view autoscroll="true" id="base-content"></main>

        <!-- Cookie Policy -->
        <div class="cookie-policy" ng-if="!acceptedCookies">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 text-xs-center">
                        <p>We use <a href="privacy-policy">cookies</a> to ensure that we give you the best experience on our website. By continuing to use our website, we will assume that you are happy to receive cookies.</p>
                        <p class="text-danger" ng-if="!cookieEnabled"><strong>Please enable cookies on your browser!</strong></p>
                    </div>
                    <div ng-if="cookieEnabled" class="col-xs-12 text-xs-center">
                        <button class="btn btn-sm btn-success" ng-click="acceptCookiePolicy()">
                            I understand <i class="fa fa-check-circle"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <footer class="mbr-small-footer mbr-section mbr-section-nopadding" id="footer1-6" style="background-color: #ccc; padding-top: 1.75rem; padding-bottom: 1.75rem;">
            <div class="container text-xs-center">
                <ul class="list-inline list-unstyled">
                    <li class="list-inline-item text-black">Copyright &copy; [[ date| date:'yyyy' ]] Shelping.COM.</li>
                    <li class="list-inline-item">
                        <a class="text-black" href="{{ url('terms-of-service') }}"><strong>Terms & Conditions</strong></a>
                    </li>
                    <li class="list-inline-item">
                        <a class="text-black" href="{{ url('privacy-policy') }}"><strong>Privacy Policy</strong></a>
                    </li>
                    <li class="list-inline-item">
                        <a class="text-black" href="" ng-click="feedback()"><strong>Feedback</strong></a>
                    </li>
                </ul>

                <!-- Share Buttons -->
                <div class="mbr-social-likes social-likes social-likes_visible" data-counters="false">
                        <span class="btn btn-social facebook" title="Share link on Facebook" socialshare socialshare-provider="facebook" socialshare-text="Sky rocket your project on Shelping.COM." socialshare-type="share" socialshare-via="274676456259523" socialshare-url="[[ sharableUrl ]]">
                            <i class="fab fa-facebook-f"></i>
                        </span>
                    <span class="btn btn-social twitter" title="Share link on Twitter" socialshare socialshare-provider="twitter" socialshare-text="Sky rocket your project on Shelping.COM." socialshare-hashtags="Shelping.COM" socialshare-url="[[ sharableUrl ]]" socialshare-media="assets/img/logo-ico.png">
                            <i class="fab fa-twitter"></i>
                        </span>
                    <span class="btn btn-social plusone" title="Share link on Google+" socialshare socialshare-provider="google" socialshare-text="Sky rocket your project on Shelping.COM." socialshare-url="[[ sharableUrl ]]">
                            <i class="fab fa-google-plus-g"></i>
                        </span>
                    <span class="btn btn-social plusone" title="Share link on Linkedin" socialshare socialshare-provider="linkedin" socialshare-text="Sky rocket your project on Shelping.COM." socialshare-url="[[ sharableUrl ]]">
                            <i class="fab fa-linkedin-in"></i>
                        </span>
                    <span class="btn btn-social plusone" title="Share on others" ng-click="ShareModel()">
                            <i class="fa fa-share-alt"></i>
                        </span>
                    <span class="btn btn-social plusone" title="Share link via Email" socialshare socialshare-provider="email" socialshare-subject="Shelping.COM" socialshare-body="Sky rocket your project on Shelping.COM. [[ sharableUrl ]]">
                            <i class="fa fa-envelope"></i>
                        </span>
                </div>
            </div>
        </footer>

        {{--<div class="nav-active-bg animated fadeIn" ng-show="desktopNavActive == true"></div>--}}

    </div>

    <!-- Body bottom
    ================================================== -->
    @section('body_bottom')
    @show

    <!-- Javascripts
    ================================================== -->
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAGS694PP91hCal-aYl_SW5l6HIlyRHCEk"></script>
    <script src="{{ url('assets/js/jquery.min.js') }}"></script>
    <script async="" src="//HIDEN11111.pcapredict.com/js/sensor.js"></script>
    <script>(function(n,t,i,r){var u,f;n[i]=n[i]||{},n[i].initial={accountCode:"SHELP11112",host:"SHELP11112.pcapredict.com"},n[i].on=n[i].on||function(){(n[i].onq=n[i].onq||[]).push(arguments)},u=t.createElement("script"),u.async=!0,u.src=r,f=t.getElementsByTagName("script")[0],f.parentNode.insertBefore(u,f)})(window,document,"pca","//SHELP11112.pcapredict.com/js/sensor.js")</script>
    <script src="{{ url('assets/js/tether.min.js') }}"></script>
    <script src="{{ url('assets/js/bootstrap.min.js') }}"></script>
    <script src="{{ url('assets/js/bootstrap-toggle.js') }}"></script>
    <script src="{{ url('assets/js/bootstrap-slider.min.js') }}"></script>
    <script src="{{ url('assets/js/jquery.mCustomScrollbar.concat.min.js') }}"></script>
    <script src="{{ url('assets/js/slick.min.js') }}"></script>
    <script src="{{ url('assets/js/angular.min.js') }}"></script>
    <script src="{{ url('assets/js/angular-route.min.js') }}"></script>
    <script src="{{ url('assets/js/angular-sanitize.js') }}"></script>
    <script src="{{ url('assets/js/angular-cookies.js') }}"></script>
    <script src="https://www.youtube.com/iframe_api"></script>
    <script type="text/javascript" src="https://js.stripe.com/v2/"></script>
    <script src="{{ url('assets/js/ng-breadcrumbs.min.js') }}"></script>
    <script src="{{ url('assets/js/loading-bar.js') }}"></script>
    <script src="{{ url('assets/js/ngMeta.min.js') }}"></script>
    <script src="{{ url('assets/js/angular-sticky.min.js') }}"></script>
    <script src="{{ url('assets/js/select.min.js') }}"></script>
    <script src="{{ url('assets/js/ng-map.min.js') }}"></script>
    <script src="{{ url('assets/js/angular-youtube-embed.min.js') }}"></script>
    <script src="{{ url('assets/js/angular-socialshare.min.js') }}"></script>
    <script src="{{ url('assets/js/angular-credit-cards.js') }}"></script>
    <script src="{{ url('assets/js/ng-infinite-scroll.min.js') }}"></script>
    <script src="{{ url('assets/js/ui-bootstrap-tpls-2.5.0.min.js') }}"></script>
    {{--<script src="{{ url('assets/js/angular-stripe.js') }}"></script>--}}
    <script src="{{ url('assets/js/scrollbars.min.js') }}"></script>
    <script src="{{ url('assets/js/angular-file-upload.min.js') }}"></script>
    <script src="{{ url('assets/js/angular-slick.min.js') }}"></script>
    <script src="{{ url('assets/js/satellizer.min.js') }}"></script>
    <script src="{{ url('assets/js/ng-img-crop.min.js') }}"></script>
    <script src="{{ url('assets/js/ngCart.min.js') }}"></script>
    <script src="{{ url('assets/js/angular-translate.min.js') }}"></script>
    <script src="{{ url('assets/js/angular-translate-loader-static-files.min.js') }}"></script>
    <script src="{{ url('assets/js/angular-validation.min.js') }}"></script>
    <script src="{{ url('assets/js/app/app.js') }}"></script>
    <script src="{{ url('assets/js/app/routes.js') }}"></script>
    <script src="{{ url('assets/js/smooth-scroll.js') }}"></script>
    <script src="{{ url('assets/js/dropdown-script.min.js') }}"></script>
    <script src="{{ url('assets/js/jquery.touch-swipe.min.js') }}"></script>
    <script src="{{ url('assets/js/jquery.viewportchecker.js') }}"></script>
    <script src="{{ url('assets/js/jarallax.js') }}"></script>
    <script src="{{ url('assets/js/theme.js') }}"></script>
    <script src="{{ url('assets/js/app/controllers/BaseController.js') }}"></script>
    <script src="{{ url('assets/js/app/factories/ApiFactory.js') }}"></script>
    <script src="{{ url('assets/js/app/services/ModalService.js') }}"></script>
    <script src="{{ url('assets/js/app/services/AlertsService.js') }}"></script>
    <!-- Custom Youtube -->
    <script data-cfasync="false">
        (function(r,e,E,m,b){E[r]=E[r]||{};E[r][b]=E[r][b]||function(){
                (E[r].q=E[r].q||[]).push(arguments)};b=m.getElementsByTagName(e)[0];m=m.createElement(e);
            m.async=1;m.src=("file:"==location.protocol?"https:":"")+"//s.reembed.com/G-1Rz7K1.js";
            b.parentNode.insertBefore(m,b)})("reEmbed","script",window,document,"api");
    </script>

    @section('javascript_bottom')
    @show

    </body>
</html>
