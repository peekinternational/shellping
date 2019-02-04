// region Global

/**
 * Base controller to handle data and functions shared across all views
 */
app.controller('BaseController', [ '$window', '$rootScope', '$scope', '$routeParams', '$location', '$cookies', '$filter', 'breadcrumbs', 'ngMeta', 'ngCart', 'ApiFactory', 'ModalsService', 'AlertsService', 'cfpLoadingBar',
    function ($window, $rootScope, $scope, $routeParams, $location, $cookies, $filter, breadcrumbs, ngMeta, ngCart, ApiFactory, ModalsService, AlertsService, cfpLoadingBar)
{
    // Console log status
    //console.log = function() {}; // Disables console log, comment out for dev

    $scope.userAgent = $window.navigator.userAgent;
    $rootScope.showStatic = false;
    $rootScope.stripe = Stripe('pk_test_LeDggc6W9AiC0qZYLtrRNjNI');

    // Check if we are social website
    // (facebookexternalhit/[0-9]|Twitterbot|Pinterest|Google.*snippet)
    if($scope.userAgent == 'facebookexternalhit/[0-9]' || $scope.userAgent == 'Twitterbot' || $scope.userAgent == 'Pinterest' || $scope.userAgent == 'Google.*snippet') {
        $rootScope.showStatic = true;
    }

    $scope.date                     = new Date();
    $scope.cdLoading                = true;
    $rootScope.breadcrumbs          = breadcrumbs;
    $rootScope.screenTexts          = [];
    $rootScope.helpTexts            = [];
    $rootScope.categories           = [];
    $rootScope.shopCategories       = [];
    $rootScope.skills               = [];
    $rootScope.interests            = [];
    $rootScope.locations            = [];
    $rootScope.flatCats             = [];
    $rootScope.flatShopCats         = [];
    $rootScope.transNav             = true;
    $rootScope.sharableUrl          = $location.absUrl();
    $rootScope.currentHelpText      = 'default_help';
    $rootScope.dataLoading          = false;

    // Meta Attr
    $rootScope.metaTitle            = '';
    $rootScope.metaUrl              = '';
    $rootScope.metaImg              = '';

    // For navigation
    $scope.navUrl                   = $location.url();
    $scope.absUrl                   = $location.protocol() + "://" + location.host;
    $scope.selectedProjectCat       = null;
    $scope.selectedShopCat          = null;
    $scope.desktopNavActive         = false;
    $rootScope.toggleMobNav         = false;

    // For mobile navigation
    $rootScope.mobParent            = [];
    $rootScope.mobCategory          = [];
    $rootScope.mobNavBreadcrumbs    = [];

    // Cookie policy
    $rootScope.cookieEnabled            = navigator.cookieEnabled;
    $rootScope.acceptedCookies          = false;

    console.log('current url', $rootScope.sharableUrl);

    // Cart
    $rootScope.cart = ngCart;
    $rootScope.cart.setTaxRate(0);
    $rootScope.cart.setShipping(0);

    // Storefront mock products
    $rootScope.mockProducts = [
        {
            id: '1',
            title: 'Razor',
            price: 3.45,
            contribution: 0.35,
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Quattro_Titanium_Energy.jpg/300px-Quattro_Titanium_Energy.jpg"
        },
        {
            id: '2',
            title: 'Toothbrush',
            price: 3.45,
            contribution: 0.35,
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image: "https://www.colgateprofessional.com/Professional/v1/en/us/locale-assets/img/thumbnails/Product-Detail-Toothbrush-ColgateWaveZigZag-Thumb.png"
        },
        {
            id: '3',
            title: 'Plugin',
            price: 3.45,
            contribution: 0.35,
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image: "https://scjglade.azureedge.net/~/media/glade/products/product-shots/plugins-scented-oil-naked.jpg?"
        },
        {
            id: '4',
            title: 'Car Air Freshener',
            price: 3.45,
            contribution: 0.35,
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image: "http://i1.wp.com/thegreendivas.com/wp-content/uploads/2013/08/Tree-Air-Freshener.jpg"
        },
        {
            id: '5',
            title: 'Makeup Sponge',
            price: 3.45,
            contribution: 0.35,
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image: "https://images-na.ssl-images-amazon.com/images/I/61ONpgcckML._SY355_.jpg"
        },
        {
            id: '6',
            title: 'Phone Cleaner',
            price: 3.45,
            contribution: 0.35,
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image: "http://jailbreakstation.com/wp-content/uploads/2015/07/how-to-clean-cell-phone.jpg"
        },
        {
            id: '7',
            title: 'Wax',
            price: 3.45,
            contribution: 0.35,
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image: "http://cdn.shopify.com/s/files/1/0275/8531/products/xl__BNWAX8_grande.jpg"
        },
        {
            id: '8',
            title: 'Dishwasher Deodorant',
            price: 3.45,
            contribution: 0.35,
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image: "http://www.wilko.com/content/ebiz/wilkinsonplus/invt/0254925/0254925_l.jpg"
        },
    ];
    $rootScope.subscriptionPlans = [];
    $rootScope.cartItems = [];

    // Mock user subscriptions
    /*$rootScope.subscriptions    = [
        {
            id: "ABC123",
            item: {
                id: '1',
                title: 'Razor',
                price: 3.45,
                contribution: 0.35,
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Quattro_Titanium_Energy.jpg/300px-Quattro_Titanium_Energy.jpg",
                subscription_plan: {
                    id: "1",
                    name: "4 weeks",
                    interval: 4
                },
                quantity: 5
            }
        },
        {
            id: "DEF456",
            item: {
                id: '2',
                title: 'Toothbrush',
                price: 3.45,
                contribution: 0.35,
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                image: "https://www.colgateprofessional.com/Professional/v1/en/us/locale-assets/img/thumbnails/Product-Detail-Toothbrush-ColgateWaveZigZag-Thumb.png",
                subscription_plan: {
                    id: "1",
                    name: "4 weeks",
                    interval: 4
                },
                quantity: 2
            }
        },
        {
            id: "GHI789",
            item: {
                id: '3',
                title: 'Plugin',
                price: 3.45,
                contribution: 0.35,
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                image: "https://scjglade.azureedge.net/~/media/glade/products/product-shots/plugins-scented-oil-naked.jpg?",
                subscription_plan: {
                    id: "1",
                    name: "4 weeks",
                    interval: 4
                },
                quantity: 1
            }
        }
    ];*/

    $rootScope.subscriptions = [];
    $rootScope.subscriptionData = [];

    // Filters
    $rootScope.filters      = {
        show: false,
        applied: false,
        orderBy: 'createdDateNew',
        ascending: 'false',
        searchTerm: '',
        categories: [],
        interests: [],
        skills: [],
        swLat: '',
        swLon: '',
        neLat: '',
        neLon: '',
        lat: '',
        lon: '',
        location: '',
        mapZoom: 10
    };

    // Auth
    $rootScope.auth             = [];
    $rootScope.account          = [];
    $rootScope.auth.remember    = false;

    // Maps
    $rootScope.googleMapsUrl    = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAGS694PP91hCal-aYl_SW5l6HIlyRHCEk";

    /**
     * Resets nav dropdown
     */
    $rootScope.resetNavDropdown = function () {
        $scope.desktopNavActive     = false;
        $('.dropdown-menu-dynamic').removeClass('dropdown-container');
        $('.nav-dropdown').trigger('mouseleave');
    };

    /**
     * Triggered when the route changes
     * @param next
     * @param current
     */
    $scope.$on('$routeChangeStart', function(event, next, current) {
        //cfpLoadingBar.start();
        $scope.cdLoading                = true;
        //$rootScope.dataLoading          = true;
        // Reset sub cats
        $scope.selectedProjectCat       = null;
        $scope.selectedShopCat          = null;
        // Toggle mob nav
        if($rootScope.toggleMobNav)
            $rootScope.MobNav();

        // If not homepage
        $rootScope.transNav = ($location.path() != '/' ? false : true);
        // Clear metas
        $rootScope.metaTitle            = '';
        $rootScope.metaUrl              = '';
        $rootScope.metaImg              = '';
        // Clear filters
        $rootScope.filters.show         = false;
        if(!$routeParams) {
            $rootScope.clearFilters();
        }
        // Store current url
        $rootScope.sharableUrl = $location.absUrl();
        // Update nav url
        $scope.navUrl = $location.url();
        // Check session token cookie
        $rootScope.getCookieData();
        // Close mob nav
        if($('#exCollapsingNavbar')) {
            $('#exCollapsingNavbar').collapse('hide');
        }
    });

    /**
     * Functionality to run when route change is success
     */
    $scope.$on('$routeChangeSuccess', function(event, next, current) {
        // UAC
        if(next.loginRequired) {
            if(!$rootScope.account.token) {
                $location.path('/').replace();
                $rootScope.auth.getLogin('You must login to access this area.');
                return;
            }
            // If idCheck true we check if the current id is equal to our account id
            if(next.idCheck) {
                if(parseInt(next.params.id) !== parseInt($rootScope.account.id)) {
                    $location.path('/403').replace();
                }
            }
        }
        //$rootScope.resetNavDropdown();
        $scope.cdLoading = false;
        console.log('Nav Active: ' + $scope.desktopNavActive);
    });

    /**
     * Cookie Policy
     */
    $rootScope.acceptCookiePolicy = function () {
        var today = new Date();
        today.setDate(today.getDate() + 365); //Set expired date to tomorrow
        $cookies.put('shelping_accept_cookies', 1, {expires : today, path: '/' });
        $rootScope.acceptedCookies = true;
    };

    /**
     * Checks if cookie data is available if true then sets account details
     */
    $rootScope.getCookieData = function () {
        if($cookies.get('shelping_accept_cookies')) {
            $rootScope.acceptedCookies = true;
        }

        if($cookies.get('shelping_com')) {
            var cData = $cookies.get('shelping_com');
            cData = jQuery.parseJSON(cData);
            $rootScope.account.token    = cData.token;
            $rootScope.account.id       = cData.id;
            // Get account details
            ApiFactory.auth.authenticate().success(function (response) {
                // Store to scope
                $rootScope.account = response;
                $rootScope.account.token = cData.token;

                $rootScope.getNotifications();
                $rootScope.getSubscriptions();

                console.log('Account Data:', response);
            }).error(function (response) {
                // Return error response
                console.log(response);
            });
        }
    };

    /**
     * Gets account data from API
     */
    $rootScope.refreshAccountData = function () {
        var cData = $cookies.get('shelping_com');
        cData = jQuery.parseJSON(cData);
        $rootScope.account.token    = cData.token;
        $rootScope.account.id       = cData.id;
        ApiFactory.auth.authenticate().success(function (response) {
            // Store to scope
            $rootScope.account = response;
            $rootScope.account.token = cData.token;
            console.log('Account Data:', response);
        }).error(function (response) {
            // Return error response
            console.log(response);
        });
    };

    /**
     * Watchtes for changes in filters, function is called
     */
    $scope.$watch("filters.show", function(){
        // If filters are hidden and not applied
        if(!$rootScope.filters.show && !$rootScope.filters.applied) {
            //$rootScope.clearFilters();
        }
    }, true);

    /**
     * NavMenu subcat selected
     */
    $rootScope.setSubCats = function (parent, cats, lastParent, type) {
        if(type == 'projects') {
            $scope.selectedProjectCat       = {
                parent: parent,
                lastParent: lastParent,
                categories: cats
            };
        }

        if(type == 'shops') {
            $scope.selectedShopCat          = {
                parent: parent,
                lastParent: lastParent,
                categories: cats
            };
            console.log($scope.selectedShopCat);
        }
    };

    /**
     * NavMenu reset sub categories
     * @param type
     */
    $rootScope.resetSubCats = function (type) {
        if(type == 'projects') {
            $scope.selectedProjectCat       = null;
        }

        if(type == 'shops') {
            $scope.selectedShopCat          = null;
        }
    };

    /**
     * Toggles mobile navigation state
     * @constructor
     */
    $rootScope.MobNav = function () {
        $rootScope.toggleMobNav = !$rootScope.toggleMobNav;
        console.log($rootScope.toggleMobNav);
    };

    /**
     * apply url filters
     */
    $rootScope.applyFilters = function (useCats, useInterests, useSkills, useLocation, useOrder) {
        // Search params
        var params = {};
        // Add categories to url
        if(useCats == true) {
            if ($rootScope.filters.categories.length > 0) {
                var catCount = 0;
                angular.forEach($rootScope.filters.categories, function (v, k) {
                    params['category' + catCount] = v.id;
                    catCount++;
                });
            }
        }

        // Add interests to url
        if(useInterests == true) {
            if ($rootScope.filters.interests.length > 0) {
                var intCount = 0;
                angular.forEach($rootScope.filters.interests, function (v, k) {
                    params['interest' + intCount] = v.id;
                    intCount++;
                });
            }
        }

        if(useSkills == true) {
            // Add skills to url
            if ($rootScope.filters.skills.length > 0) {
                var skillCount = 0;
                angular.forEach($rootScope.filters.skills, function (v, k) {
                    params['skill' + skillCount] = v.id;
                    skillCount++;
                });
            }
        }

        // Add locations to url
        if(useLocation == true) {
            if ($rootScope.filters.swLat != '') {
                params['swlat'] = $rootScope.filters.swLat;
            }
            if ($rootScope.filters.swLon != '') {
                params['swlon'] = $rootScope.filters.swLon;
            }
            if ($rootScope.filters.neLat != '') {
                params['nelat'] = $rootScope.filters.neLat;
            }
            if ($rootScope.filters.neLon != '') {
                params['nelon'] = $rootScope.filters.neLon;
            }
        }

        if(useOrder == true) {
            params['orderBy'] = $rootScope.filters.orderBy;

            params['ascending'] = $rootScope.filters.ascending;
        }
        // Apply to uri
        $location.url($location.path()).search(params);

        console.log('new path = ', $location.path());
    };

    /**
     * clear uri filters
     */
    $rootScope.clearFilters = function () {
        $rootScope.filters      = {
            applied: false,
            orderBy: 'createdDateNew',
            ascending: 'false',
            searchTerm: '',
            categories: [],
            interests: [],
            skills: [],
            swLat: '',
            swLon: '',
            neLat: '',
            neLon: '',
            lat: '',
            lon: '',
            location: '',
            mapZoom: 10
        };
    };

    /**
     * Adds filters from URL Params back into filters list
     */
    $rootScope.addUrlFilters = function () {
        angular.forEach($rootScope.account._interests, function(v,k){
            angular.forEach($rootScope.flatCats, function(val, key) {
                if(val.id === v.id) {
                    if($rootScope.filters.categories.indexOf(val) == -1) {
                        $rootScope.filters.categories.push(val) // Add value if does not exist
                    }
                }
            });
        })
    };

    /**
     * Adds account interests to filters
     */
    $rootScope.addFilterMyInterests = function () {
        angular.forEach($rootScope.account._interests, function(v,k){
            angular.forEach($rootScope.flatCats, function(val, key) {
                if(val.id === v.id) {
                    if($rootScope.filters.categories.indexOf(val) == -1) {
                        $rootScope.filters.categories.push(val) // Add value if does not exist
                    }
                    if($rootScope.filters.interests.indexOf(val) == -1) {
                        $rootScope.filters.interests.push(val) // Add value if does not exist
                    }
                }
            });
        })
    };
    /**
     * Adds account skills to filters
     */
    $rootScope.addFilterMySkills = function () {
        angular.forEach($rootScope.account._skills, function(v,k){
            angular.forEach($rootScope.flatCats, function(val, key) {
                if(val.id === v.id) {
                    if($rootScope.filters.categories.indexOf(val) == -1) {
                        $rootScope.filters.categories.push(val) // Add value if does not exist
                    }
                    if($rootScope.filters.skills.indexOf(val) == -1) {
                        $rootScope.filters.skills.push(val) // Add value if does not exist
                    }
                }
            });
        })
    };

    /**
     * Gets all available screen texts from API
     */
    $rootScope.screenText = function () {
        ApiFactory.global.screenText().success(function (response) {
           // Store to scope
            $rootScope.screenTexts = response.data;

            $scope.strapLines = $rootScope.getScreenText('hm-straplines').text;

            $scope.introTextArray = $scope.strapLines.split('***');
            console.log($scope.introTextArray);

            $scope.para1 = $rootScope.getScreenText('hm-para1').text;
            $scope.para2 = $rootScope.getScreenText('hm-para2').text;
            $scope.para3 = $rootScope.getScreenText('hm-para3').text;

            // Random title
            $scope.introText = $scope.introTextArray[Math.floor(Math.random() * $scope.introTextArray.length)];

            console.log('Screen Text:', response);
        }).error(function (data) {
            // Return error response
            console.log("Could not get screen texts.");
        });
    };

    /**
     * Gets all available help screens from API
     */
    $rootScope.helpText = function () {
        ApiFactory.global.helpText().success(function (response) {
            // Store to scope
            $rootScope.helpTexts = response.data;

            //console.log('Help Text:', response);
        }).error(function (data) {
            // Return error response
            console.log("Could not get help texts.");
        });
    };

    /**
     * Gets all available subscription plans
     */
    $rootScope.getSubscriptionPlans = function () {
        ApiFactory.global.plans().success(function (response) {
            // Store to scope
            $rootScope.subscriptionPlans = response;

            // Order by interval
            $rootScope.subscriptionPlans.sort(function(a, b) {
                return a.interval - b.interval;
            });

            console.log('Subscription plans:', response);
        }).error(function (data) {
            // Return error response
            console.log("Could not get subscription plans.");
        });
    };

    /**
     * Returns subscription plan based on ID
     * @param subId
     * @returns {*}
     */
    $rootScope.getSubscriptionPlanById = function (subId) {
        var result = null;
        angular.forEach($rootScope.subscriptionPlans, function (v, k) {
            if(v.id === subId) {
                result = v;
            }
        });

        return result;
    };

    /**
     * Returns subscription plan based on interval
     * @param interval
     * @returns {*}
     */
    $rootScope.getSubscriptionPlanByDuration = function (interval) {
        var result = null;
        angular.forEach($rootScope.subscriptionPlans, function (v, k) {
            if(v.interval === interval) {
                result = v.id;
            }
        });

        return result;
    };

    /**
     * Gets single text object based on id
     * @param id    = (String) Text id
     * @returns {*}
     */
    $rootScope.getScreenText = function (id) {
        return $filter('filter')($rootScope.screenTexts, {'id':id}, true)[0];
    };

    /**
     * Gets single help screen object based on id
     * @param id    = (string) Text id
     * @returns {*}
     */
    $rootScope.getHelpText = function (id) {
        return $filter('filter')($rootScope.helpTexts, {'id':id}, true)[0];
    };

    /**
     * Shows help in a modal box, help to show is based on id
     * @param id = help screen ID
     */
    $scope.showHelp = function (id) {
        $scope.ne = ModalsService.openModal(
            'HelpModalController',      // Controller
            'Help',                    // Title
            'views/modals/help.html',   // Template
            'lg',                       // Size
            {
                id: id
            }                          // Data
        );
    };

    /**
     * Show notifications for account in modal box
     */
    $scope.showNotifications = function () {
        $scope.ne = ModalsService.openModal(
            'AccountNotificationsModalController',       // Controller
            'Notifications',                            // Title
            'views/modals/account-notifications.html',  // Template
            'lg',                                       // Size
            {}                                          // Data
        );
    };

    /**
     * Opens the subscription edit modal window
     * @param sub = Subscription object
     */
    $rootScope.editSubscription = function (sub) {
        // create new project
        ModalsService.closeAll();
        // Open relative modal
        $scope.ne = ModalsService.openModal(
            'AccountSubscriptionModalController',              // Controller
            'Editing Subscription #' + sub.id,                // Title
            'views/modals/account-edit-subscription.html',  // Template
            'lg',                                           // Size
            {
                subscription: sub
            }                                               // Data

        );
    };

    /**
     * Opens the report project modal window
     * @param project = Project object
     */
    $rootScope.reportProject = function (project) {
        // create new project
        ModalsService.closeAll();
        // Open relative modal
        $scope.ne = ModalsService.openModal(
            'ProjectReportModalController',         // Controller
            'Report Project - ' + project.title,    // Title
            'views/modals/report-project.html',          // Template
            'lg',                                   // Size
            {
                project: project
            }                                       // Data

        );
    };

    /**
     * Opens login modal view
     */
    $rootScope.auth.getLogin = function (title) {
        if(!title) {
            title = 'Sign In';
        }
        $scope.ne = ModalsService.openModal(
            'AuthModalController',      // Controller
            title,                    // Title
            'views/auth/signin.html',   // Template
            'md',                       // Size
            {}                          // Data
        );

        /*$scope.ne.result.then(function (data) {
            // Data returned from the modal when closed
            // This should be called only if login was successful
        });*/
    };

    /**
     * Opens signup modal view
     */
    $rootScope.auth.getSignup = function () {
        // Close open modals
        ModalsService.closeAll();
        // Open relative modal
        $scope.ne = ModalsService.openModal(
            'AuthModalController',      // Controller
            'Create an Account',                   // Title
            'views/auth/signup.html',   // Template
            'md',                       // Size
            {}                          // Data
        );

        /*$scope.ne.result.then(function (data) {
         // Data returned from the modal when closed
         // This should be called only if login was successful
         });*/
    };

    /**
     * Opens forgot password view
     */
    $rootScope.auth.forgotPassword = function () {
        // Close open modals
        ModalsService.closeAll();
        // Open relative modal
        $scope.ne = ModalsService.openModal(
            'AuthModalController',      // Controller
            'Reset Password',                   // Title
            'views/auth/password-reset.html',   // Template
            'md',                       // Size
            {}                          // Data
        );

        /*$scope.ne.result.then(function (data) {
         // Data returned from the modal when closed
         // This should be called only if login was successful
         });*/
    };

    /**
     * Attempts to log the current user out
     * Removes token cookie and scope data
     */
    $rootScope.auth.logout = function () {
        $scope.ne = ModalsService.openModal(
            'LogoutModalController',      // Controller
            "Are you sure you wan't to logout",                    // Title
            'views/modals/logout-callout.html',   // Template
            'md',                       // Size
            {}                          // Data
        );
    };

    /**
     * Opens payment view in modal box
     * NOT USED ATM
     * @param id = related project id
     */
    $rootScope.auth.payment = function (id) {
        // Close open modals
        ModalsService.closeAll();
        // Open relative modal
        $scope.ne = ModalsService.openModal(
            'PaymentModalController',       // Controller
            'Make a payment',               // Title
            'views/modals/donations.html',  // Template
            'lg',                           // Size
            {
                projectId: id
            }                              // Data
        );

        /*$scope.ne.result.then(function (data) {
         // Data returned from the modal when closed
         // This should be called only if login was successful
         });*/
    };

    /**
     * Call to ApiFactory to get tree of categories
     */
    $rootScope.getCategories = function () {
        // Get project categories
        ApiFactory.categories.all().success(function (response) {
            $rootScope.categories   = response;
            $rootScope.skills       = response;
            $rootScope.interests    = response;
            $rootScope.flatCats     = flattenCategories(response);
        }).error(function (response) {
            // Return error response
            console.log("Could not get categories.");
        });

        // Get shop categories
        ApiFactory.categories.allShop().success(function (response) {
            $rootScope.shopCategories   = response;
            $rootScope.flatShopCats     = flattenCategories(response);
            console.log($rootScope.shopCategories);
        }).error(function (response) {
            // Return error response
            console.log("Could not get categories.");
        });
    };

    /**
     * Call to ApiFactory to get all skills
     */
    $rootScope.getSkills = function () {
        ApiFactory.skills.all().success(function (response) {
            $rootScope.skills = response.data;
        }).error(function (response) {
            // Return error response
            console.log("Could not get skills.");
        });
    };

    /**
     * Call to ApiFactory to get all interests
     */
    $rootScope.getInterests = function () {
        ApiFactory.interests.all().success(function (response) {
            $rootScope.interests = response.data;
        }).error(function (response) {
            // Return error response
            console.log("Could not get interests.");
        });
    };

    /**
     * Call to ApiFactory to get list of projects based on dynamic url params
     */
    $rootScope.getProjects = function () {
        // Get Random Projects
        ApiFactory.projects.list($scope.page, $scope.cat).success(function (response) {
            // Push new projects
            return response.data;
        }).error(function (response) {
            // Return error response
            // TODO create alert functionality
            console.log("Could not get projects.");
        });
    };

    /**
     * Gets random projects from API
     * @param count = project count
     */
    $rootScope.getRandomProjects = function (count) {
        ApiFactory.projects.random(count).success(function (response) {
            return response;
        }).error(function (response) {
            console.log("Could not get projects.");
            return null;
        });
    };

    /**
     * Global create project function
     * Now redirects to create view
     */
    $rootScope.createProject = function () {

        if( $rootScope.account.token ) {
            /*// create new project
            ModalsService.closeAll();
            // Open relative modal
            $scope.ne = ModalsService.openModal(
                'ProjectCreateModalController',       // Controller
                'Create a Project',               // Title
                'views/projects/create.html',    // Template
                'lg',                           // Size
                {}                              // Data

            );*/
            $window.location = "/projects/create";
        } else {
            $scope.ne = ModalsService.openModal(
                'AuthModalController',      // Controller
                'Sign In',                    // Title
                'views/auth/signin.html',   // Template
                'md',                       // Size
                {
                    nextModal: 'create-project'
                }                          // Data
            );
        }

        /*$scope.ne.result.then(function (data) {
         // Data returned from the modal when closed
         // This should be called only if login was successful
         });*/

    };

    /**
     * returns a single project based on project id
     * @param id = Project Id
     */
    $rootScope.getProject = function (id) {
        // Get Random Projects
        ApiFactory.projects.get(id).success(function (response) {
            // Push new projects
            return response;
        }).error(function (response) {
            // Return error response
            // TODO create alert functionality
            console.log("Could not get project.");
        });
    };

    /**
     * Gets users account notifications from API
     */
    $rootScope.getNotifications = function () {
        if($rootScope.account) {
            ApiFactory.users.getNotifications($rootScope.account.id).success(function (response) {
                $rootScope.account.notifications = response.data;
                console.log($rootScope.account.notifications);
            }).error(function (response) {
                // Return error response
                console.log("Could not get notifications.", $rootScope.account);
            });
        }
    };

    /**
     * Gets the users subscriptions if user is logged in
     */
    $rootScope.getSubscriptions = function() {
        if($rootScope.account) {
            ApiFactory.users.getSubscriptions($rootScope.account.id).success(function (response) {
                $rootScope.subscriptions      = response.data;
                //console.log("Subscriptions: ", response);
                $scope.organizeSubscriptions();
            }).error(function (response) {
                console.log("Could not get the user.");
            });
        }
    };

    /**
     * Organize subscription data for account
     */
    $rootScope.organizeSubscriptions = function () {
        // Clear data
        $rootScope.subscriptionData = [];
        // setup subscription plans
        angular.forEach($rootScope.subscriptionPlans, function (v, k) {
            $rootScope.subscriptionData.push({plan: v, data: []});
        });

        // Add items to relative subscription plan
        angular.forEach($rootScope.subscriptionData, function (v, k) {
            angular.forEach($rootScope.subscriptions, function (s, i) {
                if(v.plan.interval === s.duration) {
                    v.data.push(s);
                }
            });
        });

        console.log($rootScope.subscriptionData);
    };

    /**
     * Flattens array of categories with child items
     * @param categories
     * @param depth
     * @param parent
     * @returns {Array}
     */
    function flattenCategories(categories, depth, parent){
        if(angular.isUndefined(depth)){ depth = 1; }
        var flat = [];
        angular.forEach(categories, function(category){
            if(!category.disabled) {
                flat.push({
                    id: category.id,
                    name: category.name,
                    depth: depth,
                    parent: parent
                });
                if (category.children) {
                    var childCategories = flattenCategories(category.children, depth + 1, (angular.isDefined(parent) ? parent + '.' : '') + category.code);
                    if (childCategories.length) {
                        flat.push.apply(flat, childCategories);
                    }
                }
            }
        });
        return flat;
    }

    /**
     * Set pages meta data for SEO
     * @param title
     * @param desc
     * @param image
     */
    $rootScope.setMetaData = function(title, desc, image) {
        //default titleSuffix
        ngMeta.setTitle(title);
        if(desc) {
            ngMeta.setTag('description', desc);
        }
        if(image) {
            ngMeta.setTag('image', image);
        }
        ngMeta.setTag('url', $location.absUrl())
    };

    /**
     * TODO get user details related to project with relative @param id
     * @param id = Project Id
     */
    $rootScope.getProjectUser = function (id) {};

    // Init shared data
    $rootScope.screenText();
    $rootScope.helpText();
    $rootScope.getCategories();
    $rootScope.getSubscriptionPlans();
    //$rootScope.getSkills();
    //$rootScope.getInterests();

    /**
     * Desktop notification handlers
     * Optional and not required
     */
    $rootScope.requestDesktopNotification = function() {
        if (!('Notification' in window)) {
            console.log('Web Notification not supported');
            return;
        }

        Notification.requestPermission(function (permission) {
            var notification = new Notification(
                "Desktop notifications enabled", {
                    body: 'You can disable this feature anytime in your account settings.',
                    icon: 'assets/img/logo-ico.png',
                    dir: 'auto',
                    silent: false,
                    sticky: true
                }
            );
            setTimeout(function () {
                notification.close();
            }, 6000);

            $rootScope.checkDesktopNotification();
        });
    };

    /**
     * Check if visitor has desktop notifications active
     * @returns {boolean}
     */
    $rootScope.checkDesktopNotification = function() {
        if(Notification.permission === "granted") {
            console.log("Desktop push notifications granted.");
            return true;
        }

        return false;

    };

    /**
     * Calculate age based on date
     * @param birthdate = date
     * @returns {boolean}
     */
    $rootScope.calculateAge = function calculateAge(birthdate) { // birthdate is a string
        var birthday = new Date(birthdate);
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        var res = Math.abs(ageDate.getUTCFullYear() - 1970);
        if(res >= 16) { // TODO return res >= 16 ? true : false
            return true;
        }
        return false;
    };

    /**
     * Opens feedback modal
     */
    $rootScope.feedback = function () {
        $scope.ne = ModalsService.openModal(
            'FeedbackModalController',          // Controller
            'Feedback',                         // Title
            'views/modals/feedback-form.html',  // Template
            'lg',                               // Size
            {}                                  // Data

        );
    };

    /**
     * Show modal alert message
     * TODO Use this instead of AlertService
     * @param closeOthers
     * @param title
     * @param content
     * @constructor
     */
    $rootScope.AlertModal = function (closeOthers, title, content) {
        // create new project
        if(closeOthers)
            ModalsService.closeAll();

        // Open relative modal
        $scope.ne = ModalsService.openModal(
            'AlertModalController',              // Controller
            title,                // Title
            'views/modals/alert-message.html',  // Template
            'lg',                                           // Size
            {
                content: content
            }                                               // Data

        );
    };


    /**
     * Show model alert with confirmation
     * @param closeOthers
     * @param title
     * @param content
     * @returns {*|b|result|Object}
     * @constructor
     */
    $rootScope.ConfirmationModal = function (closeOthers, title, content) {
        // create new project
        if(closeOthers)
            ModalsService.closeAll();

        // Open relative modal
        $scope.ne = ModalsService.openModal(
            'ConfirmationModalController',              // Controller
            title,                // Title
            'views/modals/alert-confirmation-modal.html',  // Template
            'lg',                                           // Size
            {
                content: content
            }                                               // Data

        );

        return $scope.ne.result;
    };

    /**
     * Show modal alert message
     * @param closeOthers
     * @constructor
     */
    $rootScope.ShareModel = function (closeOthers) {
        // create new project
        if(closeOthers)
            ModalsService.closeAll();

        // Open relative modal
        $scope.ne = ModalsService.openModal(
            'ShareModalController',              // Controller
            'Share',                // Title
            'views/modals/social-share.html',  // Template
            'sm',                                           // Size
            {}                                               // Data

        );
    };

    /**
     * Copies text to clipboard
     * @param eleId
     */
    $rootScope.copyToClipboard = function (eleId) {
        /* Get the text field */
        var copyText = document.getElementById(eleId);

        /* Select the text field */
        copyText.select();

        /* Copy the text inside the text field */
        document.execCommand("copy");

        /* Alert the copied text */
        AlertsService.add(200, copyText.value + " copied to clipboard.");
    };

    /**
     * Works out the contribution per product based on values.
     * @param price = item price(float)
     * @param contribution = item contribution(float)
     * @returns {number}
     */
    $rootScope.productContribution = function (price, contribution) {
        /* Working out percentage */
        var percentage = price / 1.2 * contribution;
        return contribution * percentage / 100;
    };

    /**
     * Works out the contribution per product based on values * quantity.
     * @param price         = Product price
     * @param contribution  = product contribution
     * @param qty           = Product quantity
     * @returns {number}
     */
    $rootScope.productContributionQty = function (price, contribution, qty) {
        var newPrice = price * qty;
        /* Working out percentage */
        var percentage = newPrice / 1.2 * (contribution * qty);
        return contribution * percentage / 100;
    };

    /**
     * Works out the contribution for subscription
     * @param price         = Subscription price
     * @param items         = Array of all items in subscription
     * @returns {number}
     */
    $rootScope.subscriptionContribution = function(price, items) {
        var totalContribution = 0;
        // Calculate total project contribution
        angular.forEach(items, function (v, k) {
            totalContribution += (v.item.contribution * v.quantity);
        });
        var percentage = price / 1.2 * totalContribution;
        return totalContribution * percentage / 100;
    };

    /**
     * Postage calculation cost
     * @returns {number}
     */
    $rootScope.apcc = function () {
        var result = 0;
        var calc = 0;
        // Calculate Postage
        angular.forEach($rootScope.cart.getItems(), function(v, k) {
            calc = v._quantity * 0.23;
            result += calc;
        });
        //return result;
        if(result < 3){
            return 2;
        }
        if(result >= 3 && result < 4){
            return 1;
        }
        return 0;
    };

    /**
     * Postage calculation cost for item only
     * @param item
     * @returns {number}
     */
    $rootScope.itemApcc = function (item) {
        var result = 0;
        var calc = 0;
        // Calculate Postage
        calc = item._quantity * 0.23;
        result += calc;
        return result;
        if(result <= 2){
            return 2;
        }
        if(result < 4){
            return 1;
        }
        return 0;
    }

    /**
     * Gets a product item by item Id
     * @param id    = product item id
     * @returns {null} | {object}
     */
    $rootScope.getItemById = function (id) {
        angular.forEach($rootScope.products, function(v,k){
            if(v.id === id)
                return v;
        });
        return null;
    }

    //console.log($rootScope.account);
}]);

app.controller('AlertsController', ['$scope', '$timeout', 'AlertsService', function ($scope, $timeout, AlertsService)
{
    // Alerts Scope
    $scope.alerts = AlertsService;

    // Remove the alert
    $scope.removeAlert = function(alert)
    {
        AlertsService.splice(AlertsService.indexOf(alert), 1);
    };

    // fadeOut alert after 5 secounds
    $scope.fadeOut = function(fn, alert)
    {
        $timeout(function() {$scope.removeAlert(alert)}, 1000 * 8);
    }

}]);

app.controller('MobileNavController', [ '$rootScope', '$scope', '$location', '$route',
function ($rootScope, $scope, $location, $route)
{
    $scope.url = $location.url();
    $scope.mobNavType = null;

    $scope.typeSelect = function (type) {
        $rootScope.mobNavBreadcrumbs = [];
        if(type == $scope.mobNavType && $rootScope.mobParent == null) {
            $scope.mobNavType = null;
        } else {
            if (type == 'Projects') {
                $rootScope.mobCategory = $rootScope.categories;
                $scope.mobNavType = 'Projects';
            }
            if (type == 'Shops') {
                $rootScope.mobCategory = $rootScope.shopCategories;
                $scope.mobNavType = 'Shops';
            }
            if (type == 'Account') {
                $rootScope.mobCategory = null;
                $scope.mobNavType = 'Account';
            }
            if (type == 'Share') {
                $rootScope.mobCategory = null;
                $scope.mobNavType = 'Share';
            }
            if (type == 'Calculator') {
                $rootScope.mobCategory = null;
                $scope.mobNavType = 'Calculator';
            }
        }

        if(!type) {
            $scope.mobNavType = null;
        }

        $rootScope.mobParent = null;
    };
    $scope.mobCategorySelect = function (cat) {
        if($rootScope.mobParent != null) {
            $rootScope.mobNavBreadcrumbs.push($rootScope.mobParent);
        }
        $rootScope.mobParent = cat;
        $rootScope.mobCategory = cat.children;

        console.log($rootScope.mobNavBreadcrumbs);
    };
    $scope.mobPrevSelect = function (cat) {
        $rootScope.mobNavBreadcrumbs.splice(cat, 1);
        $rootScope.mobParent = cat;
        $rootScope.mobCategory = cat.children;
    };

    $(function(){
        var navMain = $(".navbar-toggleable-sm");
        navMain.on("click", "a", null, function () {
            $route.reload();
            //navMain.collapse('hide');
        });
    });

    /**
     *
     * @constructor
     */
    $scope.navState = function() {
        $rootScope.toggleMobNav = false;
    }

}]);

// endregion

// region Homepage
/**
 * Home controller, handles all data for the homepage only
 */
app.controller('HomeController', [ '$rootScope', '$scope', '$location', 'ApiFactory', 'AlertsService', 'cfpLoadingBar',
    function ($rootScope, $scope, $location, ApiFactory, AlertsService, cfpLoadingBar)
{
    cfpLoadingBar.start();

    // Check if to show static
    if($rootScope.showStatic) {
        // Redirect to static page
        $location.path('/static/default').replace();
    }

    $scope.projects     = [];
    $scope.users        = [];
    $scope.breakpoints = [
        {
            breakpoint: 1950,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 3,
                infinite: true
            }
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                arrows: false
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                arrows: false
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                arrows: false
            }
        }
    ];

    /**
     * Get a list of random projects (8 in total)
     */
    ApiFactory.projects.random(8).success(function (response) {
        $scope.projects = response;
        $rootScope.dataLoading = false;
        cfpLoadingBar.complete();
    }).error(function (response) {
        console.log("Could not get projects.");
        $rootScope.dataLoading = false;
        cfpLoadingBar.complete();
    });

    /**
     * Gets all users from API
     */
    /*ApiFactory.users.all().success(function (response) {
        $scope.users      = response.data;
    }).error(function (response) {
        console.log("Could not get users.");
    });*/

    $scope.random = function() {
        return 0.5 - Math.random();
    }

}]);

// endregion

// region Calculator
app.controller('FundCalculatorController', [ '$rootScope', '$scope', '$routeParams', '$location', 'ApiFactory', 'ModalsService', 'AlertsService', 'FileUploader',
    function ($rootScope, $scope, $routeParams, $location, ApiFactory, ModalsService, AlertsService, FileUploader)
    {
        $scope.url      = $location.absUrl();

        $scope.calc = {
            households: 15,
            families: 60,
            friends: 0,
            cost: 40.00,
            actualCost: 0,
            totalPeople: 0,
            totalMonth: 0,
            totalYear: 0
        };

        // Calculator
        $scope.calculate = function () {
            $scope.calc.actualCost = Number($scope.calc.cost) / 1.2 * 0.15;
            $scope.calc.totalPeople = Number($scope.calc.households) + Number($scope.calc.families) + Number($scope.calc.friends);
            $scope.calc.totalMonth = ($scope.calc.actualCost * $scope.calc.totalPeople);
            $scope.calc.totalYear = ($scope.calc.actualCost * $scope.calc.totalPeople * 12);

            console.log("Calculator update!");
        };

        $scope.calculate();
    }
]);
// endregion

// region Projects
/**
 * Search filters controller
 */
app.controller('FiltersController', [ '$rootScope', '$scope', '$routeParams', 'ApiFactory', 'AlertsService', 'NgMap',
function ($rootScope, $scope, $routeParams, ApiFactory, AlertsService, NgMap)
{
    $scope.boundsSet = false;
    $scope.mapZoom = 4;

    $scope.addressType = "['address']";
    // swLat=swLat&swLon=swLon&neLat=neLat&neLon=neLon
    $scope.newMap = {
        location: '',
        lat: '55.378051',
        lon: '-3.435973',
        swLat: '',
        swLon: '',
        neLat: '',
        neLon: '',
        fullAddress: ''
    };

    /**
     * sets filter option data
     * @param useCats       = use categories
     * @param useInterests  = use interests
     * @param useSkills     = use skills
     * @param useLocation   = use location
     * @param useOrder      = use ordering
     */
    $rootScope.setFilters = function (useCats, useInterests, useSkills, useLocation, useOrder) {
        $rootScope.applyFilters(useCats, useInterests, useSkills, useLocation, useOrder);

        if(useLocation == true) {
            NgMap.getMap().then(function (map) {
                $rootScope.filters.mapZoom = map.getZoom();
                $rootScope.filters.location = $scope.newMap.location;
                $rootScope.filters.swLat = map.getBounds().getSouthWest().lat();
                $rootScope.filters.swLon = map.getBounds().getSouthWest().lng();
                $rootScope.filters.neLat = map.getBounds().getNorthEast().lat();
                $rootScope.filters.neLon = map.getBounds().getNorthEast().lng();
                $rootScope.filters.lat = $scope.newMap.lat;
                $rootScope.filters.lon = $scope.newMap.lon;

                map.shapes.foo.setBounds(map.getBounds());

                $scope.setFilterLocation();

                console.log($rootScope.filters);

                google.maps.event.trigger(map,'resize');

            });
        } else {
            $rootScope.filters.mapZoom = 10;
            $rootScope.filters.location = '';
            $rootScope.filters.swLat = '';
            $rootScope.filters.swLon = '';
            $rootScope.filters.neLat = '';
            $rootScope.filters.neLon = '';
            $rootScope.filters.lat = '';
            $rootScope.filters.lon = '';
        }
    };

    /**
     * Updates the lat and long to pass back to the view
     */
    $scope.setFilterLocation = function() {
        NgMap.getMap().then(function (map) {
            $scope.newMap.location  = $rootScope.filters.location;
            $scope.newMap.lat       = $rootScope.filters.lat;
            $scope.newMap.lon       = $rootScope.filters.lon;
            $scope.mapZoom          = $rootScope.filters.mapZoom;

            NgMap.getGeoLocation($scope.newMap.location).then(function(data){
                $scope.newMap.lat = data.lat();
                $scope.newMap.lon = data.lng();
            });

            //map.shapes.foo.setBounds(map.getBounds());
            google.maps.event.trigger(map, 'resize');
        });
    };

    /**
     * Updates the lat and long to pass back to the view
     */
    $scope.updateLocation = function() {
        NgMap.getMap().then(function (map) {
            NgMap.getGeoLocation($scope.newMap.location).then(function (data) {
                $scope.newMap.lat = data.lat();
                $scope.newMap.lon = data.lng();
            });

            //map.shapes.foo.setBounds(map.getBounds());

            //console.log($rootScope.filters.location);
            google.maps.event.trigger(map, 'resize');

        });
    };

    if( $routeParams ) {
        for (var obj in $routeParams) {
            if (obj == 'swlat' || obj == 'swlon' || obj == 'nelat' || obj == 'nelon') {
                if (obj == 'swlat') {
                    $scope.newMap.swLat = $routeParams[obj];
                }
                if (obj == 'swlon') {
                    $scope.newMap.swLon = $routeParams[obj];
                }
                if (obj == 'nelat') {
                    $scope.newMap.neLat = $routeParams[obj];
                }
                if (obj == 'nelon') {
                    $scope.newMap.neLon = $routeParams[obj];
                }
            }
        }
        $scope.setFilterLocation();
    }

}]);

/**
 * Category controller, handles all data for category views
 */
app.controller('CategoryController', [ '$rootScope', '$scope', '$routeParams', 'ApiFactory', 'AlertsService', 'NgMap', '$location', 'ModalsService', 'cfpLoadingBar',
    function ($rootScope, $scope, $routeParams, ApiFactory, AlertsService, NgMap, $location, ModalsService, cfpLoadingBar)
{
    cfpLoadingBar.start();

    // Check if to show static
    if($rootScope.showStatic) {
        // Redirect to static page
        $location.path('/static/default').replace();
    }

    $scope.loading      = false;
    $scope.projects     = [];
    $scope.page         = 0;
    $scope.firstLoad    = true;
    $scope.selectedOrder = 'createdDate';
    $scope.useFilterLocation  = false;
    $rootScope.currentHelpText      = 'default_help';

    // Filters
    $scope.cats     = [];
    $scope.swLat    = '';
    $scope.swLon    = '';
    $scope.neLat    = '';
    $scope.neLon    = '';

    // Categories title
    $scope.titleCats = [];

    /**
     * Check if we have a category id
     */
    if( $routeParams ) {
        $rootScope.filters.categories = [];
        $rootScope.filters.interests = [];
        $rootScope.filters.skills = [];
        for(var obj in $routeParams) {
            if(obj == 'swlat' || obj == 'swlon' || obj == 'nelat' || obj == 'nelon' || obj == 'orderBy' || obj == 'ascending') {
                // Do nothing
                if (obj == 'swlat') {
                    $scope.useFilterLocation  = true;
                    $scope.swLat = $routeParams[obj];
                }
                if (obj == 'swlon') {
                    $scope.useFilterLocation  = true;
                    $scope.swLon = $routeParams[obj];
                }
                if (obj == 'nelat') {
                    $scope.useFilterLocation  = true;
                    $scope.neLat = $routeParams[obj];
                }
                if (obj == 'nelon') {
                    $scope.useFilterLocation  = true;
                    $scope.neLon = $routeParams[obj];
                }
                if(obj == 'orderBy') {
                    $rootScope.filters.orderBy = $routeParams[obj];
                }
            } else {
                $scope.cats.push($routeParams[obj]);

                // Fill category title
                angular.forEach($rootScope.flatCats, function (v, k) {
                    if (v.id === $routeParams[obj]) {
                        $scope.titleCats.push(v.name);
                        if($rootScope.filters.categories.indexOf(v) == -1) {
                            $rootScope.filters.categories.push(v); // Add value if does not exist
                        }
                    }
                });
            }
        }
    } else {
        $rootScope.clearFilters();
    }

    $scope.setProjectFilters = function () {
        var locationFilter = $scope.useFilterLocation;
        console.log(locationFilter);
        $rootScope.setFilters(true, false, false, locationFilter, true, true);
    };

    $scope.toggleFilterByLocation = function () {
        $scope.useFilterLocation = !$scope.useFilterLocation;
    };

    /**
     * Resets projects
     */
    $scope.resetPage = function () {
        $scope.page         = 0;
        $scope.projects     = [];
        $scope.firstLoad    = true;
        $scope.orderChange(true);
        cfpLoadingBar.start();
        $scope.nextPage();
    };

    $scope.orderChange = function(forceReload) {
        switch ($rootScope.filters.orderBy) {
            case 'createdDateNew':
                $scope.selectedOrder = 'createdDate';
                $rootScope.filters.ascending = false;
                break;
            case 'createdDateOld':
                $scope.selectedOrder = 'createdDate';
                $rootScope.filters.ascending = true;
                break;
            case 'titleAZ':
                $scope.selectedOrder = 'title';
                $rootScope.filters.ascending = true;
                break;
            case 'titleZA':
                $scope.selectedOrder = 'title';
                $rootScope.filters.ascending = false;
                break;
            case 'backersCountHigh':
                $scope.selectedOrder = 'backersCount';
                $rootScope.filters.ascending = false;
                break;
            case 'backersCountLow':
                $scope.selectedOrder = 'backersCount';
                $rootScope.filters.ascending = true;
                break;
            case 'projectRatingHigh':
                $scope.selectedOrder = 'projectRating';
                $rootScope.filters.ascending = false;
                break;
            case 'projectRatingLow':
                $scope.selectedOrder = 'projectRating';
                $rootScope.filters.ascending = true;
                break;
        }

        if(forceReload == true) {
            $scope.setProjectFilters();
        }
    };

    /**
     * Append next page of projects if there is any
     */
    $scope.nextPage = function () {
        if ($scope.loading) {
            return;
        }

        if(!$scope.firstLoad && $scope.projects.length < 20) {
            return;
        }

        $scope.loading = true;

        $scope.orderChange(false);

        // Get next page of projects
        ApiFactory.projects.list($scope.page, $scope.cats, $scope.swLat, $scope.swLon, $scope.neLat, $scope.neLon, $scope.selectedOrder, $rootScope.filters.ascending, $scope.firstLoad).success(function (response) {
            // Push new projects
            for (var i = 0; i < response.data.length; i++) {
                if(response.data[i].status != 'DELETED') {
                    $scope.projects.push(response.data[i]);
                    // Check if current user is backing this project
                    angular.forEach(response.data[i]._backers, function (v, k) {
                        if (v.id && v.id === $rootScope.account.id) {
                            response.data[i].isBacking = true;
                        }
                    });
                }
            }
            console.log('Categories Loaded');
            console.log('Page Loaded', $scope.page);
            console.log('Page Data', $scope.projects);

            if($scope.firstLoad) {
                $rootScope.dataLoading = false;
                cfpLoadingBar.complete();
            }

            $scope.loading = false;
            $scope.firstLoad = false;
            $scope.page++;
        }).error(function (response) {
            // Return error response
            // TODO create alert functionality
            console.log("Could not get projects.");
            $scope.loading = false;
            $rootScope.dataLoading = false;
            cfpLoadingBar.complete();
        });
    };

    /**
     * Search project by term string
     */
    $scope.searchProject = function () {
        if($scope.filters.searchTerm) {
            $scope.loading = true;
            ApiFactory.projects.search($scope.filters.searchTerm).success(function (response) {
                $scope.projects     = [];
                // Push new projects
                for (var i = 0; i < response.data.length; i++) {
                    if(response.data[i].status == 'APPROVED') {
                        $scope.projects.push(response.data[i]);
                    }
                }
                $scope.loading = false;
            }).error(function (response) {
                // TODO alert no projects found
                $scope.loading = false;
            })
        }
    }

    /**
     * Backs the current project
     */
    $scope.backProject = function (i) {
        var project = $scope.projects[i];

        if( !$rootScope.account.token ) {
            // Open relative modal
            $scope.ne = ModalsService.openModal(
                'AuthModalController',      // Controller
                'You must be signed in to support a project',                    // Title
                'views/auth/signin.html',   // Template
                'md',                       // Size
                {
                    //nextModal: 'create-project'
                }                          // Data
            );
            return;
        }

        // Check if current user is backing this project
        angular.forEach(project._backers, function (v, k) {
            if (v.id && v.id === $rootScope.account.id) {
                isBacking = true;
            }
        });

        if(project.id) {
            if(!project.isBacking) {
                if($rootScope.account.backedProjects && $rootScope.account.backedProjects.length === 3)
                {
                    $rootScope.AlertModal(
                        true,
                        "Supported Project's Limit Reached",
                        "You have reached the maximum limit of supported projects, you can only support 3 projects at a time. Please go to <strong>\"My Supported Projects\"</strong> to manage the current projects you are supporting."
                    );
                    return;
                }
                ApiFactory.projects.back(project.id).success(function (response) {
                    project.isBacking = true;
                    project.backersCount = response.backersCount;
                    $rootScope.refreshAccountData();
                    // Show notification
                    AlertsService.add(200, 'You are now supporting this project!');
                    console.log("supporting this project.", response);
                    console.log($rootScope.account.backedProjects);
                }).error(function (response) {
                    /*$rootScope.AlertModal(
                        true,
                        "Supported Project's Limit Reached",
                        "You have reached the maximum limit of supported projects, you can only support 3 projects at a time. Please go to <strong>\"My Supported Projects\"</strong> to manage the current projects you are supporting."
                    );*/
                    console.log(response);
                });
            }
            if(project.isBacking) {
                $rootScope.ConfirmationModal(
                    false,
                    'Stop supporting this project?',
                    'Are you sure you would like to stop supporting ' + project.title + ', the project will no longer receive funds from your future purchases!'
                ).then(function(result) {
                    if (result) {
                        ApiFactory.projects.unback(project.id).success(function (response) {
                            project.isBacking = false;
                            project.backersCount = response.backersCount;
                            $rootScope.refreshAccountData();
                            // Show notification
                            AlertsService.add(200, 'You are no longer supporting this project!');
                            console.log("Stopped supporting this project.");
                            console.log($rootScope.account.backedProjects);
                        }).error(function (response) {
                            console.log("Could not stop supporting this project.");
                        });
                    }
                });

            }
            //$scope.getProject(true);
        }
    };
}]);

/**
 * Category controller, handles all data for category views of shops
 * OBSOLETE: not used anymore
 */
app.controller('ShopsIndexController', [ '$rootScope', '$scope', '$routeParams', '$window', 'ApiFactory', 'AlertsService', 'ModalsService', '$location',
    function ($rootScope, $scope, $routeParams, $window, ApiFactory, AlertsService, ModalsService, $location)
    {
        // Check if to show static
        if($rootScope.showStatic) {
            // Redirect to static page
            $location.path('/static/default').replace();
        }

        $scope.loading      = false;
        $scope.shops        = [];
        $scope.page         = 0;
        $scope.firstLoad    = true;

        // Funding data
        $scope.userId = null;
        $scope.projectId = null;

        // Filters
        $scope.cats   = [];

        // Titles
        $scope.titleCats = [];

        /**
         * Check if we have a category id
         */
        if( $routeParams ) {
            $rootScope.filters.categories = [];
            $rootScope.filters.interests = [];
            $rootScope.filters.skills = [];
            for(var obj in $routeParams) {
                if(obj != "project" && obj != "user") {
                    $scope.cats.push($routeParams[obj]);

                    // Fill category title
                    angular.forEach($rootScope.flatShopCats, function (v, k) {
                        if (v.id === $routeParams[obj]) {
                            $scope.titleCats.push(v.name);
                            if ($rootScope.filters.categories.indexOf(v) == -1) {
                                $rootScope.filters.categories.push(v); // Add value if does not exist
                            }
                        }
                    });
                }

                if(obj === "project") {
                    $scope.projectId = $routeParams[obj];
                }

                if(obj === "user") {
                    $scope.userId = $routeParams[obj];
                }
            }
        } else {
            $rootScope.clearFilters();
        }

        $scope.resetPage = function () {
            $scope.page         = 0;
            $scope.shops        = [];
            $scope.firstLoad    = true;
            $scope.nextPage();
        };

        /**
         * Append next page of projects if there is any
         */
        $scope.nextPage = function () {
            if ($scope.loading) {
                return;
            }

            if(!$scope.firstLoad && $scope.shops.length < 20) {
                return;
            }

            $scope.loading = true;

            // Get next page of projects
            ApiFactory.shops.list($scope.page, $scope.cats, $scope.firstLoad).success(function (response) {
                // Push new projects
                for (var i = 0; i < response.data.length; i++) {
                    $scope.shops.push(response.data[i]);
                }
                console.log("Shops:", $scope.shops);

                if($scope.firstLoad) {
                    $rootScope.dataLoading = false;
                }

                $scope.loading = false;
                $scope.firstLoad = false;
                $scope.page++;
            }).error(function (response) {
                // Return error response
                // TODO create alert functionality
                console.log("Could not get shops.");
                $scope.loading = false;
                $rootScope.dataLoading = false;
            });
        };

        $scope.shopLink = function (shop) {
            if($rootScope.account.token) {
                var win = window.open();
                ApiFactory.shops.link(shop.id, $scope.userId, $scope.projectId).success(function (response) {
                    // Redirect to shop
                    var link = response[0];
                    win.location = link;
                }).error(function (response) {
                    console.log("Could not get shop redirect.");
                });
            } else {
                $scope.ne = ModalsService.openModal(
                    'ShopModalController',      // Controller
                    'Continue Shopping?',       // Title
                    'views/modals/shop-callout.html', // Template
                    'lg',                       // Size
                    {
                        shop: shop
                    }                          // Data
                );
            }
        }

    }]);

/**
 * Project Create Controller, handles creation of projects outside model
 */
app.controller('ProjectCreateController', [ '$rootScope', '$scope', '$routeParams', '$location', '$timeout', '$window', 'breadcrumbs', 'ApiFactory', 'AlertsService', 'ModalsService', 'FileUploader', 'Socialshare', 'NgMap', 'ValidationService', 'cfpLoadingBar',
    function ($rootScope, $scope, $routeParams, $location, $timeout, $window, breadcrumbs, ApiFactory, AlertsService, ModalsService, FileUploader, Socialshare, NgMap, ValidationService, cfpLoadingBar)
{
    // Show Loader
    cfpLoadingBar.start();

    // Show loader
    $scope.modal        = {
        loader: true
    };

    $scope.data = {project: null};

    $scope.project = [];

    $scope.formData = {
        title: null,
        desc: null,
        locationName: null,
        tags: [],
        categories: []
    };

    $scope.formCategories = [];

    $scope.uploader = new FileUploader();

    $scope.cropSize = {
        w: 300,
        h: 117
    };

    $scope.cropImageSize = {
        w: 800,
        h: 417
    };

    $rootScope.createStep = 1;

    $scope.shareUrl = $location.absUrl();

    $scope.shareCheck = {
        facebook: false,
        twitter: false
    };

    $scope.missingDataWindow = false;

    $scope.croppedImage = {
        cropped: "/assets/img/missing-project.png",
        preview: "",
        blob: ""
    };

    $scope.isEdit = false;

    // Check if we are editing a project
    if($routeParams.id) {
        ApiFactory.projects.get($routeParams.id, true).success(function (response) {
            $scope.data.project = response;
            $scope.isEdit = true;

            console.log('Project', $scope.data.project);
            $scope.setEditData();
        }).error(function (response) {
            console.log("Could not get project.");
        });
    } else {
        cfpLoadingBar.complete();
    }

    // If we have project data
    $scope.setEditData = function() {
        $scope.formData = {
            id: $scope.data.project.id,
            title: $scope.data.project.title,
            desc: $scope.data.project.desc,
            lat: $scope.data.project.location.latitude,
            lon: $scope.data.project.location.longitude,
            logo: $scope.data.project.logo,
            web: $scope.data.project.web,
            fb: $scope.data.project.fb
        };

        $scope.formData.locationName = $scope.data.project.locationName;

        $scope.croppedImage.cropped = $scope.data.project.logo;

        // Clear categories & tags
        $scope.formData.categories  = [];
        $scope.formData.tags        = [];

        // Refactor category data
        angular.forEach($scope.data.project.categories, function(v,k){
            angular.forEach($rootScope.flatCats, function(val, key) {
                if(val.id === v) {
                    $scope.formData.categories.push(val) // Add value
                }
            });
        });

        // Apply project tags
        angular.forEach($scope.data.project.tags, function(v,k){
            $scope.formData.tags.push(v); // Add value
        });

        cfpLoadingBar.complete();
    };

    $scope.selectFile = function () {
        $scope.uploader.clearQueue();
        $('#file-input').click();
    };

    $scope.uploader.onAfterAddingFile = function(fileItem) {
        if (fileItem._file) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $scope.$apply(function () {
                    $scope.croppedImage.preview = e.target.result;
                })
            };

            reader.readAsDataURL(fileItem._file);
        }
    };

    $scope.readURL = function() {

        if ($scope.uploader.queue[0]._file) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $scope.croppedImage.preview = e.target.result;
            };

            reader.readAsDataURL(input.files[0]);
        }
    };

    // new code
    $scope.tryStore = function() {
        var errors = [];

        // Check form validation
        var i = 0;
        if($scope.formData.fb == null){
            errors[i] = {name:"fb"};
            i++;
        }
        if($scope.formData.web == null){
            errors[i] = {name:"web"};
            i++;
        }
        if($scope.formData.tags.length == 0){
            errors[i] = {name:"tags"};
            i++;
        }
        if($scope.formData.categories.length == 0){
            errors[i] = {name:"categories"};
            i++;
        }
        if($scope.formData.locationName == null){
            errors[i] = {name:"location"};
            i++;
        }
        
        if(errors.length > 0) {
            // Open relative modal
            $scope.ne = ModalsService.openModal(
                'AlertModalController',        // Controller
                "You have not filled in the following fields:", // Title
                'views/modals/alert-modal.html',     // Template
                'lg',                               // Size
                errors                                  // Data

            );

            $scope.ne.result.then(function (data) {
                // Data returned from the modal when closed
                if(data == true){
                    $scope.saveProject();
                }
            });
        } else {
            $scope.saveProject();
        }
    };
    /* create project if exsist then edit*/
    $scope.saveProject = function(){
        $scope.modal.loader = true;
        // Store all category ids to string
        $scope.formData.category = [];
        angular.forEach($scope.formData.categories, function (v, k) {
            $scope.formData.category.push(v.id);
        });
        // Set image for project
        if($scope.uploader.queue.length > 0) {
            $scope.formData.logo = $scope.uploader.queue[0]._file;
            $scope.formData.logo = $scope.croppedImage.blob;
        }

        // Check if new or edit
        if(!$scope.data.project) {
            // Attempt to store project
            ApiFactory.projects.store($scope.formData).success(function (response) {
                AlertsService.add(200, 'Your project was created.');
                // Set project id
                $scope.project = response;
                // Hide loader
                $scope.modal.loader = false;
                // Show next step
                $scope.nextStep();
                // Hide close button
                $scope.hideClose = true;
                // Hide loading window
                $scope.modal.loader = false;
            }).error(function (response) {
                // Hide loader
                AlertsService.add(401, 'Could not create this project, please try again.');
                $scope.modal.loader = false;
                console.log("Could not save project.");
            });
        } else {
            // Attempt to store project
            ApiFactory.projects.edit($scope.formData.id, $scope.formData).success(function (response) {
                AlertsService.add(200, 'Your project has been updated.');
                // Set project id
                $scope.project = response;
                // Hide loader
                $scope.modal.loader = false;
                // Show next step
                //$location.path('/projects/'+ $routeParams.id).replace();
                $location.url('projects/' + response.id);
            }).error(function (response) {
                // Hide loader
                AlertsService.add(401, 'Could not update this project, please try again.');
                $scope.modal.loader = false;
            });
        }
    }
    $scope.store = function () {
        var errors = [];

        // Check form validation
        var i = 0;
        if($scope.formData.title == null){
            errors[i] = {name:"Name"};
            i++;
        }
        if($scope.formData.desc == null){
            errors[i] = {name:"Description"};
            i++;
        }

        if(errors.length > 0) {
            $rootScope.AlertModal(false, "You must fill in the following requried fields:", errors);
            return;
        }else{
            $scope.tryStore();
            
        }

        /*if(!$scope.validation.checkFormValidity($scope.form.createProject)) {
            console.log("Validation", $scope.form.createProject.$validationSummary);
            $rootScope.AlertModal(false, "Project Form Invalid", $scope.form.createProject.$validationSummary);
        }

        return;*/

        
    };

    $scope.nextStep = function () {
        $rootScope.createStep++;
    };

    $scope.prevStep = function () {
        $rootScope.createStep--;
    };

    $scope.reset = function() {
        $rootScope.createStep = 3;
    };

    $scope.complete = function () {
        $location.url('projects/' + $scope.project.id);
        //$route.reload();
        //ModalsService.closeAll();
        //$uibModalInstance.close($scope.project);
    };

    $scope.facebookShare = function () {
        var url = $scope.shareUrl + 'projects/' + $scope.project.id;
        Socialshare.share({
            'provider': 'facebook',
            'attrs': {
                'socialshareUrl': url,
                'socialshareType': 'sharer',
                'socialshareText': 'Show your support for ' + $scope.project.title + ' on Shelping.COM.',
                'socialshareMedia': $scope.project.logo
            }
        });

        // Set status as shared
        $scope.shareCheck.facebook = true;
    };

    $scope.twitterShare = function () {
        var url = $scope.shareUrl + 'projects/' + $scope.project.id;
        Socialshare.share({
            'provider': 'twitter',
            'attrs': {
                'socialshareUrl': url,
                'socialshareText': 'Show your support for ' + $scope.project.title + ' on Shelping.COM.',
                'socialshareHashtags': 'Shelping.COM',
                'socialshareMedia': $scope.project.logo
            }
        });
        // Set status as shared
        $scope.shareCheck.twitter = true;
    };

    $scope.setTitle = function () {
        switch ($rootScope.createStep) {
            case 1:
                $scope.title = title;
                break;
            case 2:
                $scope.title = 'Your project is ready!';
                break;
            case 3:
                $scope.title = 'Sharing on Facebook can increase donations';
                break;
            case 4:
                $scope.title = 'Sharing on Twitter can also increase donations';
                break;
            case 5:
                $scope.title = 'Congratulations!';
                break;
            case 6:
                $scope.title = title;
                break;
        }
    };

    $scope.modal = {
        loader: false
    };

    $scope.getLocation = function () {
        // Open relative modal
        $scope.ne = ModalsService.openModal(
            'LocationModalController',  // Controller
            'Project Area/Location',                 // Title
            'views/modals/map.html',    // Template
            'md',                       // Size
            {
                subtext: "Enter the location of your project in the box below then click the `set location` buttom." +"\n \n" + "This location is then used to allow people to search for your project making it easier find. Projects that are easier to search for will receive more support. ",
                location: { name: $scope.formData.locationName }
            }                          // Data
        );

        $scope.ne.result.then(function (data) {
            // Data returned from the modal when closed
            $scope.formData.locationName = data.location;
            $scope.formData.lat = data.lat;
            $scope.formData.lon = data.lon;
        });
    };

    $scope.deleteProject = function () {
        if($rootScope.account.token) {
            $scope.ne = ModalsService.openModal(
                'ProjectDeleteModalController',      // Controller
                'Delete Project',                    // Title
                'views/modals/project-delete.html',   // Template
                'md',                       // Size
                {
                    projectId: $scope.data.project.id
                }                          // Data
            );
        }
    };

    $scope.transferToken = function () {
        ApiFactory.projects.generateTransferToken($scope.formData.id).success(function (response) {
            AlertsService.add(200, 'A project transfer token has been generated.');
            // Set project token
            $scope.data.project._transferToken = response.token;
        }).error(function (response) {
            // Hide loader
            AlertsService.add(401, 'Could not generate a transfer token, please try again.');
            console.log("Could not generate a transfer token.", response);
        });
    };

    // Check if leaving page before save
    $scope.$on('$routeChangeStart', function(event, next, current) {
        if($scope.formData.length > 0) {
            $rootScope.ConfirmationModal(
                false,
                'Create Project',
                'Are you sure you would like to leave before saving your project?').then(function(result) {
                if (result) {
                    return result;
                }
            });
           /* // create new project
            ModalsService.closeAll();
            // Open relative modal
            $scope.ne = ModalsService.openModal(
                'CartRedirectModalController',        // Controller
                'You still have items in your cart!', // Title
                'views/modals/cart-redirect-form.html',     // Template
                'md',                               // Size
                {
                    nextPage: next
                }                                  // Data

            );

            return false;*/
        }
    });
}]);

/**
 * Project View Controller, handles all data for a single project view
 */
app.controller('ProjectViewController', [ '$rootScope', '$scope', '$routeParams', '$location', '$timeout', '$window', 'breadcrumbs', 'ApiFactory', 'AlertsService', 'ModalsService', 'NgMap', 'cfpLoadingBar',
    function ($rootScope, $scope, $routeParams, $location, $timeout, $window, breadcrumbs, ApiFactory, AlertsService, ModalsService, NgMap, cfpLoadingBar)
{
    cfpLoadingBar.start();
    //$rootScope.showStatic = true;
    // Check if to show static
    if($rootScope.showStatic) {
        // Redirect to static page
        var newId = $routeParams.id;
        var newUrl = '/static/projects/' + newId;
        $location.path(newUrl).replace();
    }
    $scope.hideMap      = true;
    $scope.project      = [];
    $scope.reviews      = [];
    $scope.url          = $location.absUrl();
    $scope.isBacking    = false;
    $scope.isMine       = false;
    $scope.hasReview    = false;
    $scope.backersSortDate = false;
    $scope.backersSortBy = 'name';
    $scope.backersSortDesc = true;
    $scope.revForm   = {
        comment: '',
        vote: 0
    };
    $scope.replyForm = {
        comment: ''
    };
    $rootScope.currentHelpText      = 'help_url_project_detail';

    /**
     * Get project data based on $routeParams.id
     */

    $scope.getProject = function(showLoader) {
        ApiFactory.projects.get($routeParams.id, showLoader).success(function (response) {
            /*$scope.project = response.project;
            $scope.reviews = response.reviews.data;*/
            $scope.project = response;

            $rootScope.setMetaData($scope.project.title, $scope.project.desc, $scope.project.logo);

            console.log('Project', $scope.project);
            //console.log('Reviews', $scope.reviews);

            // Breadcrumb
            breadcrumbs.options = {'Project': $scope.project.title};

            // If logged in
            if ($rootScope.account.token) {
                // Check if current user is backing this project
                angular.forEach($scope.project._backers, function (v, k) {
                    if (v.id && v.id === $rootScope.account.id) {
                        $scope.isBacking = true;
                    }
                });
                // Check if user has rated the project
                /*angular.forEach($scope.reviews, function (v, k) {
                    if (v.id === $rootScope.account.id) {
                        //$scope.hasReview = true;
                    }
                });*/
                console.log('I am logged in', $scope.project);
                // Check if current user is owner of this project
                if ($scope.project.owner === $rootScope.account.id) {
                    console.log('This is my project', $scope.project);
                    $scope.isMine = true;
                }

                // Data is loaded
                $rootScope.dataLoading = false;
            }
            cfpLoadingBar.complete();
        }).error(function (response) {
            console.log("Could not get project.");
            $rootScope.dataLoading = false;
            cfpLoadingBar.complete();
        });
    };

    $scope.getProject(false);
    $rootScope.dataLoading = false;

    $scope.backersSortOrder = function () {
        $scope.backersSortDate = !$scope.backersSortDate;
        if($scope.backersSortDate === true) {
            $scope.backersSortBy = 'order';
            $scope.backersSortDesc = true;
        } else {
            $scope.backersSortBy = 'name';
            $scope.backersSortDesc = false;
        }
    };

    /**
     * Backs the current project
     */
    $scope.backProject = function () {
        if( !$rootScope.account.token ) {
            // create new project
            ModalsService.closeAll();
            // Open relative modal
            $scope.ne = ModalsService.openModal(
                'AuthModalController',      // Controller
                'You must be signed in to support a project',                    // Title
                'views/auth/signin.html',   // Template
                'md',                       // Size
                {
                    //nextModal: 'create-project'
                }                          // Data
            );
            return;
        }

        if($scope.project.id) {
            if(!$scope.isBacking) {
                if($rootScope.account.backedProjects && $rootScope.account.backedProjects.length === 3)
                {
                    $rootScope.AlertModal(
                        true,
                        "Supported Project's Limit Reached",
                        "You have reached the maximum limit of supported projects, you can only support 3 projects at a time. Please go to <strong>\"My Supported Projects\"</strong> to manage the current projects you are supporting."
                    );
                    return;
                }

                ApiFactory.projects.back($scope.project.id).success(function (response) {
                    $scope.isBacking = true;
                    $scope.project.backersCount = response.backersCount;
                    $rootScope.refreshAccountData();
                    // Show notification
                    AlertsService.add(200, 'You are now supporting this project!');
                    console.log("supporting this project.", response);
                    console.log($rootScope.account.backedProjects);
                }).error(function (response) {
                    /*$rootScope.AlertModal(
                        true,
                        "Supported Project's Limit Reached",
                        "You have reached the maximum limit of supported projects, you can only support 3 projects at a time. Please go to <strong>\"My Supported Projects\"</strong> to manage the current projects you are supporting."
                    );*/
                    console.log(response);
                });
            }
            if($scope.isBacking) {
                $rootScope.ConfirmationModal(
                    false,
                    'Stop supporting this project?',
                    'Are you sure you would like to stop supporting ' + $scope.project.title + ', the project will no longer receive funds from your future purchases!'
                ).then(function(result) {
                    if (result) {
                        ApiFactory.projects.unback($scope.project.id).success(function (response) {
                            $scope.isBacking = false;
                            $scope.project.backersCount = response.backersCount;
                            $rootScope.refreshAccountData();
                            // Show notification
                            AlertsService.add(200, 'You are no longer supporting this project!');
                            console.log("Stopped backing this project.");
                            console.log($rootScope.account.backedProjects);
                        }).error(function (response) {
                            console.log("Could not stop supporting this project.");
                        });
                    }
                });
            }
            $scope.getProject(true);
        }
    };

    /**
     * Submit a review with rating
     */
    $scope.postReview = function () {
        if($rootScope.account.id) {
            ApiFactory.projects.submitReview($scope.project.id, $scope.revForm).success(function (response) {
                $scope.hasReview = false;
                $scope.reviews = response.data;
                // Show notification
                AlertsService.add(200, 'You review has been submitted!');
                console.log("Reviews project.", response);
            }).error(function (response) {
                console.log("Could not back this project.");
            });
        }
    };

    /**
     * Post reply to review (Owne only)
     * @param review
     */
    $scope.postReviewReply = function (review) {
        if(!$scope.isMine)
            return;

        ApiFactory.projects.reviewReply($scope.project.id, review.user, $scope.replyForm).success(function (response) {
            //
            console.log(response);
        }).error(function (response) {
            console.log("Could not post reply.", response);
        });
    };

    $scope.pauseProject = function () {
        if($rootScope.account.id && $scope.isMine) {
            if($scope.project.status === 'APPROVED') {
                // Pause the project
                ApiFactory.projects.pause($scope.project.id).success(function (response) {
                    $scope.project.status = 'PAUSED';
                    // Show notification
                    AlertsService.add(200, 'Your project has been paused!');
                }).error(function (response) {
                    console.log("Could not pause this project.", response);
                });
            } else {
                // Resume the project
                ApiFactory.projects.resume($scope.project.id).success(function (response) {
                    $scope.project.status = 'APPROVED';
                    // Show notification
                    AlertsService.add(200, 'Your project has been resumed!');
                }).error(function (response) {
                    console.log("Could not resume this project.", response);
                });
            }
        }
    };

    $scope.editProject = function () {
        if($rootScope.account.token && $scope.isMine) {
            $scope.ne = ModalsService.openModal(
                'ProjectCreateModalController',      // Controller
                'Edit Project',                    // Title
                'views/projects/create.html',   // Template
                'lg',                       // Size
                {
                    project: $scope.project,
                    categories: $scope.project.categories
                }                          // Data
            );

            $scope.ne.result.then(function (data) {
                // Reload page
                $window.location.reload();
            });
        }
    };

    $scope.deleteProject = function () {
        if($rootScope.account.token && $scope.isMine) {
            $scope.ne = ModalsService.openModal(
                'ProjectDeleteModalController',      // Controller
                'Delete Project',                    // Title
                'views/modals/project-delete.html',   // Template
                'md',                       // Size
                {
                    projectId: $scope.project.id
                }                          // Data
            );
        }
    };

    $scope.requestWithdraw = function () {
        $scope.ne = ModalsService.openModal(
            'ProjectWithdrawModalController',      // Controller
            'Request Funds',                    // Title
            'views/modals/project-withdraw.html',   // Template
            'md',                       // Size
            {
                id: $scope.project.id,
                ownerId: $scope.project.owner,
                funds: $scope.project.fund
            }                          // Data
        );
    };

    $scope.sharePopup = function () {
        if(!$rootScope.account.token) {
            $scope.ne = ModalsService.openModal(
                'ProjectShareModalController',      // Controller
                'Share this project',                    // Title
                'views/modals/project-share-modal.html',   // Template
                'md',                       // Size
                {
                    project: $scope.project
                }                          // Data
            );
        }
    };

    // Refresh google map
    $timeout(function() {
        console.log("Refreshing map");
        $scope.hideMap = false;
        NgMap.getMap().then(function (map) {
            google.maps.event.trigger(map, "resize");
            console.log("Map Refresh Done!");
        });
    }, 1000);

    var timer = $timeout($scope.sharePopup, 10000);

    /** Stops the timer when DOM is not available */
    $scope.$on(
        "$destroy",
        function( event ) {
            $timeout.cancel( timer );
        }
    );

}]);

app.controller('ProjectClaimController', [ '$rootScope', '$scope', '$routeParams', '$location', '$timeout', '$window', 'breadcrumbs', 'ApiFactory', 'AlertsService', 'ModalsService', 'NgMap',
function ($rootScope, $scope, $routeParams, $location, $timeout, $window, breadcrumbs, ApiFactory, AlertsService, ModalsService, NgMap)
{
    $scope.hasToken = false;

    $scope.response = [];

    // Check that we have a token
    if($routeParams.token) {
        // Set to true
        $scope.hasToken = true;
        // Request transfer of ownership
        ApiFactory.projects.requestTransfer($routeParams.id, $routeParams.token).success(function (response) {
            AlertsService.add(200, 'A project transfer token has been accepted.');
            // Set project token
            $scope.response = response;
            // Redirect to project page
            $location.url('projects/' + response.id);
        }).error(function (response) {
            // Hide loader
            AlertsService.add(401, 'Could not accept the transfer token, please try again.');
            console.log("Could not accept transfer token.", response);
            $location.url('/');
        });
    } else {
        $location.url('/');
    }
}]);

// endregion

// region Account
/**
 * Users Index Controller, handles all data for user list view
 */
app.controller('UsersIndexController', [ '$rootScope', '$scope', '$routeParams', '$location', 'ApiFactory',
function ($rootScope, $scope, $routeParams, $location, ApiFactory)
{
    // Check if to show static
    if($rootScope.showStatic) {
        // Redirect to static page
        $location.path('/static/default').replace();
    }

    $scope.loading  = false;
    $scope.page     = 0;
    $scope.users    = [];
    $scope.firstLoad = true;
    $scope.searching = false;

    $scope.interests = [];
    $scope.skills = [];

    // Titles
    $scope.titleInterestsCats = [];
    $scope.titleSkillsCats = [];

    /**
     * Check if we have a interests and/or skills
     */
    if( $routeParams ) {
        $rootScope.filters.categories = [];
        $rootScope.filters.interests = [];
        $rootScope.filters.skills = [];
        for(var obj in $routeParams) {
            //$scope.cats.push($routeParams[obj]);

            // Fill category title
            angular.forEach($rootScope.flatCats, function(v,k){
                // Set interests
                if(obj.search('interest') !== -1) {
                    if(v.id === $routeParams[obj]) {
                        $scope.titleInterestsCats.push(v.name);
                        $scope.interests.push($routeParams[obj]);
                        if ($rootScope.filters.interests.indexOf(v) == -1) {
                            $rootScope.filters.interests.push(v); // Add value if does not exist
                        }
                    }
                }
                // Set skills
                if(obj.search('skill') !== -1) {
                    if(v.id === $routeParams[obj]) {
                        $scope.titleSkillsCats.push(v.name);
                        $scope.skills.push($routeParams[obj]);
                        if ($rootScope.filters.skills.indexOf(v) == -1) {
                            $rootScope.filters.skills.push(v); // Add value if does not exist
                        }
                    }
                }
            });
        }
    } else {
        $rootScope.clearFilters();
    }

    $scope.resetPage = function () {
        $scope.page         = 0;
        $scope.shops        = [];
        $scope.firstLoad    = true;
        $scope.nextPage();
    };

    $scope.searchUsers = function () {
        if($rootScope.filters.searchTerm) {
            $scope.searching = true;
            ApiFactory.users.search($rootScope.filters.searchTerm).success(function (response) {
                console.log(response);
                $scope.users = response.data;
            }).error(function (response) {
                console.log("Could not search users.");
            });
        } else {
            $scope.searching    = false;
            $scope.firstLoad    = true;
            $scope.page         = 0;
            $scope.users        = [];
            $scope.nextPage();
        }
    };

    /**
     * Append next page of users if there is any
     */
    $scope.nextPage = function () {
        if ($scope.loading) {
            return;
        }

        // Get next page of users
        if(!$rootScope.filters.searchTerm) {
            $scope.searching = false;
            if(!$scope.firstLoad && $scope.users.length == 0) {
                return;
            }
            $scope.loading = true;
            ApiFactory.users.all($scope.page, $scope.interests, $scope.skills, $scope.firstLoad).success(function (response) {
                // Push new users
                for (var i = 0; i < response.data.length; i++) {
                    if (!response.data[i].blockedByCurrentUser) {
                        $scope.users.push(response.data[i]);
                    }
                }

                if($scope.firstLoad) {
                    // Data is loaded
                    $rootScope.dataLoading = false;
                }

                $scope.loading = false;
                $scope.firstLoad = false;
                console.log('Users', $scope.users);
                $scope.page++;
            }).error(function (response) {
                console.log("Could not get users.");
                $rootScope.dataLoading = false;
            });
        } else {
            if(!$scope.firstLoad && $scope.searching) {
                if($scope.users.length == 0) {
                    return;
                }
            }
            $scope.loading = true;
            ApiFactory.users.search($rootScope.filters.searchTerm, $scope.page).success(function (response) {
                // Push new users
                for (var i = 0; i < response.data.length; i++) {
                    if (!response.data[i].blockedByCurrentUser) {
                        $scope.users.push(response.data[i]);
                    }
                }
                $rootScope.dataLoading = false;
                $scope.loading = false;
                $scope.page++;
            }).error(function (response) {
                console.log("Could not search users.");
                $rootScope.dataLoading = false;
            });
        }
    };
}
]);

app.controller('UsersViewController', [ '$rootScope', '$scope', '$routeParams', '$location', 'breadcrumbs', 'ApiFactory', 'AlertsService', 'ModalsService', 'cfpLoadingBar',
    function ($rootScope, $scope, $routeParams, $location, breadcrumbs, ApiFactory, AlertsService, ModalsService, cfpLoadingBar)
    {
        cfpLoadingBar.start();
        // Check if to show static
        if($rootScope.showStatic) {
            // Redirect to static page
            $location.path('/static/users/' + $routeParams.id).replace();
        }

        $scope.user         = [];
        $scope.url          = $location.absUrl();

        /**
         * Get user data based on $routeParams.id
         */
        ApiFactory.users.get($routeParams.id).success(function (response) {
            $scope.user      = response;
            // Breadcrumb
            breadcrumbs.options = { 'Users': $scope.user.name };
            // Set Meta Data
            $rootScope.setMetaData($scope.user.name, null, $scope.user.photo);
            // Data is loaded
            $rootScope.dataLoading = false;
            cfpLoadingBar.complete();
        }).error(function (response) {
            console.log("Could not get the user.");
            $rootScope.dataLoading = false;
            cfpLoadingBar.complete();
        });

        /**
         * call API to fetch the userss projects and backed projects
         * **/

        ApiFactory.users.getProjects($routeParams.id).success(function (response) {
            $scope.user.projects    = response.data;
        }).error(function (response) {
            console.log("Could not get the user projects.");
        });

        ApiFactory.users.getBackedProjects($routeParams.id).success(function (response) {
            $scope.user.backed      = response;
        }).error(function (response) {
            console.log("Could not get the user backed projects.");
        });

        /**
         * Block / Unblock user
         */
        $scope.toggleBlock = function () {
            var method = 'block';
            if( $scope.user.currentUserBlocked ) {
                method = 'unblock';
                $scope.user.currentUserBlocked = false;
            } else {
                method = 'block';
                $scope.user.currentUserBlocked = true;
            }

            ApiFactory.users.block($routeParams.id, method).success(function (response) {
                $scope.user.currentUserBlocked  = response;
                // Show notification
                AlertsService.add(200, 'You have ' + method + ' this user!');
            }).error(function (response) {
                console.log('Could not get ' + method + ' user.');
            });
        };

        /** Send user message */
        $scope.messageUser = function () {

            if( $rootScope.account.token ) {
                // create new project
                ModalsService.closeAll();
                // Open relative modal
                $scope.ne = ModalsService.openModal(
                    'MessageModalController',       // Controller
                    'Compose a message',            // Title
                    'views/modals/message.html',   // Template
                    'lg',                           // Size
                    {
                        user: $routeParams.id
                    }                              // Data

                );
            } else {
                $rootScope.auth.getLogin();
            }

            /*$scope.ne.result.then(function (data) {
             // Data returned from the modal when closed
             // This should be called only if login was successful
             });*/

        };
    }
]);
//User funds management
app.controller('UserFundsController', [ '$rootScope', '$scope', '$routeParams', '$location', 'ModalsService', 'ApiFactory', 'cfpLoadingBar',
    function ($rootScope, $scope, $routeParams, $location, ModalsService, ApiFactory, cfpLoadingBar)
    {
        cfpLoadingBar.start();

        $scope.funds    = [];
        $scope.url      = $location.absUrl(); // Remove if not needed or used
        $rootScope.currentHelpText      = 'help_url_fund_manager';

        ApiFactory.users.getFunds($routeParams.id).success(function (response) {
            $scope.funds      = response;
            $rootScope.dataLoading = false;
            cfpLoadingBar.complete();
        }).error(function (response) {
            console.log("Could not get the user funds.");
            $rootScope.dataLoading = false;
            cfpLoadingBar.complete()
        });

        $scope.requestWithdraw = function () {
            $scope.ne = ModalsService.openModal(
                'AccountWithdrawModalController',      // Controller
                'Withdraw Funds',                    // Title
                'views/modals/account-withdraw.html',   // Template
                'md',                       // Size
                {
                    id: $routeParams.id,
                    funds: $scope.funds
                }                          // Data
            );
        };

        $scope.addFunds = function () {
            $scope.ne = ModalsService.openModal(
                'AccountFundsModalController',      // Controller
                'Deposit Funds',                    // Title
                'views/modals/account-add-funds.html',   // Template
                'lg',                       // Size
                {}                          // Data
            );
        }
    }
]);

app.controller('UserPurchaseHistoryController', [ '$rootScope', '$scope', '$routeParams', '$location', 'ModalsService', 'ApiFactory', 'cfpLoadingBar',
    function ($rootScope, $scope, $routeParams, $location, ModalsService, ApiFactory, cfpLoadingBar)
    {
        cfpLoadingBar.start();
        $scope.purchases = [];
        $scope.invoices = [];

        $scope.currentView = 'purchases';

        // Get purchase history
        ApiFactory.users.getPurchases($routeParams.id).success(function (response) {
            $scope.purchases      = response;
            console.log(response);
            $rootScope.dataLoading = false;
            cfpLoadingBar.complete();
        }).error(function (response) {
            console.log("Could not get recent purchases.");
            console.log(response);
            $rootScope.dataLoading = false;
            cfpLoadingBar.complete();
        });

        // Get invoices
        ApiFactory.users.getInvoices($routeParams.id).success(function (response) {
            $scope.invoices      = response;
            console.log(response);
            $rootScope.dataLoading = false;
            cfpLoadingBar.complete();
        }).error(function (response) {
            console.log("Could not get invoices.");
            console.log(response);
            $rootScope.dataLoading = false;
            cfpLoadingBar.complete();
        });
    }
]);

//profile edit
app.controller('UserEditController', [ '$rootScope', '$scope', '$routeParams', '$location', 'ApiFactory', 'ModalsService', 'AlertsService', 'FileUploader', 'cfpLoadingBar',
    function ($rootScope, $scope, $routeParams, $location, ApiFactory, ModalsService, AlertsService, FileUploader, cfpLoadingBar)
    {
        cfpLoadingBar.start();
        $scope.user     = [];
        $scope.url      = $location.absUrl();
        $scope.profile  = {
            skills: [],
            interests: []
        };

        $scope.newPassword = {
            password: '',
            password_match: ''
        };

        $scope.uploader = new FileUploader();

        $scope.croppedImage = "/assets/img/missing-avatar.png";

        $scope.blobImage = '';

        $scope.selectFile = function () {
            $scope.uploader.clearQueue();
            $('#file-input').click();
        };

        $scope.uploader.onAfterAddingFile = function(fileItem) {
            if (fileItem._file) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $scope.$apply(function () {
                        $scope.user.photo = e.target.result;
                    })
                };

                reader.readAsDataURL(fileItem._file);

                // Update avatar
                //$scope.storeAvatar();
            }
        };

        $scope.readURL = function() {

            if ($scope.uploader.queue[0]._file) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $scope.user.photo = e.target.result;
                };

                reader.readAsDataURL(input.files[0]);
            }
        };

        /**
         * Gets users profile skills
         */
        $scope.getSkills = function () {
            angular.forEach($scope.user._skills, function(v,k){
                angular.forEach($rootScope.flatCats, function(val, key) {
                    if(val.id === v.id) {
                        if($scope.profile.skills.indexOf(val) == -1) {
                            $scope.profile.skills.push(val) // Add value if does not exist
                        }
                    }
                });
            })
        };

        /**
         * Gets users profile skills
         */
        $scope.getInterests = function () {
            angular.forEach($scope.user._interests, function(v,k){
                angular.forEach($rootScope.flatCats, function(val, key) {
                    if(val.id === v.id) {
                        if($scope.profile.interests.indexOf(val) == -1) {
                            $scope.profile.interests.push(val) // Add value if does not exist
                        }
                    }
                });
            })
        };

        /**
         * Sets users profile skills
         */
        $scope.setSkills = function () {
            // Remove unwanted data
            angular.forEach($scope.user.skills, function(v,k){
                if ($scope.profile.skills.indexOf(v.id) == -1) {
                    $scope.user.skills.splice(v.id) // Remove value if does not exist
                }
            });

            // Add new data
            angular.forEach($scope.profile.skills, function(v,k){
                if($scope.user.skills != null) {
                    if ($scope.user.skills.indexOf(v.id) == -1) {
                        $scope.user.skills.push(v.id) // Add value if does not exist
                    }
                } else {
                    $scope.user.skills = [];
                    $scope.user.skills.push(v.id) // Add value if does not exist
                }
            });
        };

        /**
         * Sets users profile skills
         */
        $scope.setInterests = function () {
            // Remove unwanted data
            angular.forEach($scope.user.interests, function(v,k){
                if ($scope.profile.interests.indexOf(v.id) == -1) {
                    $scope.user.interests.splice(v.id) // Remove value if does not exist
                }
            });

            // Add new data
            angular.forEach($scope.profile.interests, function(v,k){
                if($scope.user.interests != null) {
                    if ($scope.user.interests.indexOf(v.id) == -1) {
                        $scope.user.interests.push(v.id) // Add value if does not exist
                    }
                } else {
                    $scope.user.interests = [];
                    $scope.user.interests.push(v.id) // Add value if does not exist
                }
            });
        };

        /**
         * Get user data based on $routeParams.id
         */
        $scope.getProfile = function() {
            ApiFactory.users.getProfile($routeParams.id).success(function (response) {
                $scope.user = response;
                // Set Skills
                //$scope.getSkills();
                // Set Interests
                //$scope.getInterests();

                if($scope.user.photo) {
                    $scope.croppedImage = $scope.user.photo;
                }
                console.log('profile data', $scope.user);
                $rootScope.dataLoading = false;
                cfpLoadingBar.complete();
            }).error(function (response) {
                console.log("Could not get the user.");
                $rootScope.dataLoading = false;
                cfpLoadingBar.complete();
            });
        };

        $scope.storeAvatar = function () {
            // Set image for new avatar
            var userAvatar = {'photo': null};
            if($scope.uploader.queue.length > 0) {
                userAvatar.photo = $scope.blobImage;
            }
            ApiFactory.users.storeAvatar($routeParams.id, userAvatar).success(function (response) {
                //$scope.user = response;
                AlertsService.add(200, 'Your profile picture has been updated!');
                $rootScope.account.photo = response.photo;
                console.log("User avatar updated");
            }).error(function (response) {
                console.log(response);
            }).then(function (data) {
                //$scope.getProfile();
            });
        };

        /**
         * the $scope to update user edit profiles from Update.
         */
        $scope.storeProfile = function () {
            //$scope.setSkills();
            //$scope.setInterests();
            var errors = "";

            // Check form validation
            if($scope.user.email == null)
                errors += "Please enter a valid email address, ";
            if($scope.user.username == null)
                errors += "Please enter a valid username, ";
            if($scope.user.locationName == null)
                errors += "Please enter a valid location, ";

            if(errors.length > 0) {
                $rootScope.AlertModal(false, "Account Profile Invalid", errors);
                return;
            }

            cfpLoadingBar.start();
            ApiFactory.users.storeProfile($routeParams.id, $scope.user).success(function (response) {
                //$scope.user = response;
                AlertsService.add(200, 'Your profile has been updated!');
                console.log("User profile updated");
            }).error(function (response) {
                console.log("Could not get the user.");
                cfpLoadingBar.complete();
            }).then(function (data) {
                $scope.getProfile();
            });
        };

        $scope.getLocation = function () {
            // Close open modals
            ModalsService.closeAll();
            // Open relative modal
            $scope.ne = ModalsService.openModal(
                'LocationModalController',  // Controller
                'Your address',                 // Title
                'views/modals/map.html',    // Template
                'md',                       // Size
                {
                    subtext: 'Enter your address here and wait for its validation. Precise address will be rounded to city.'
                }                          // Data
            );

            $scope.ne.result.then(function (data) {
             // Data returned from the modal when closed
                $scope.user.location = {
                    latitude: data.lat,
                    longitude: data.lon
                };
                $scope.user.locationName = data.location;
             });
        };

        $scope.getProfile();
    }
]);

app.controller('UserEditPasswordController', [ '$rootScope', '$scope', '$routeParams', '$location', 'ApiFactory', 'ModalsService', 'AlertsService', 'cfpLoadingBar',
    function ($rootScope, $scope, $routeParams, $location, ApiFactory, ModalsService, AlertsService, cfpLoadingBar) {
        cfpLoadingBar.start();
        $scope.user = {};

        $scope.newPassword = {
            password: '',
            password_match: ''
        };
        /**
         * Get user data based on $routeParams.id
         */
        $scope.getProfile = function() {
            ApiFactory.users.getProfile($routeParams.id).success(function (response) {
                $scope.user = response;

                console.log('profile data', $scope.user);
                $rootScope.dataLoading = false;
                cfpLoadingBar.complete();
            }).error(function (response) {
                console.log("Could not get the user.");
                $rootScope.dataLoading = false;
                cfpLoadingBar.complete();
            });
        };

        $scope.storeProfile = function (form) {
            // Do a validation check
            if(form.$invalid) {
                console.log(form.$error.required);
                var errors = null;
                // Gather all errors form.$error.required
                $rootScope.AlertModal(false, 'Password Reset Form Invalid', 'Please check the form for invalid fields.');
                return;
            }

            // Check if we should reset password
            if($scope.newPassword.password.length > 0)
                $scope.user.password = $scope.newPassword.password;

            cfpLoadingBar.start();

            ApiFactory.users.storeProfile($routeParams.id, $scope.user).success(function (response) {
                //$scope.user = response;
                AlertsService.add(200, 'Your password has been updated!');
                console.log("User password updated");
                $scope.newPassword = {
                    password: '',
                    password_match: ''
                };
            }).error(function (response) {
                console.log("Could not get the user.");
                $rootScope.AlertModal(true, "Could not change password", "We was unable to update your password.");
                cfpLoadingBar.complete();
            }).then(function (data) {
                $scope.getProfile();
            });
        };
        $scope.getProfile();
    }
]);

app.controller('UserSettingsController', [ '$rootScope', '$scope', '$routeParams', '$location', 'ApiFactory', 'AlertsService', 'cfpLoadingBar',
    function ($rootScope, $scope, $routeParams, $location, ApiFactory, AlertsService, cfpLoadingBar)
    {
        cfpLoadingBar.start();
        $scope.settings     = [];
        $scope.url      = $location.absUrl();

        /**
         * Get user data based on $routeParams.id
         */
        ApiFactory.users.getSettings($routeParams.id).success(function (response) {
            $scope.settings      = response;
            $rootScope.dataLoading = false;
            cfpLoadingBar.complete();
        }).error(function (response) {
            console.log("Could not get the user.");
            $rootScope.dataLoading = false;
            cfpLoadingBar.complete();
        });
        /**
         * calling the APi factory and updating account settings
         */
        $scope.update = function () {
            cfpLoadingBar.start();
            ApiFactory.users.storeSettings($routeParams.id, $scope.settings).success(function (response) {
            //    $scope.settings      = response;
                AlertsService.add(200, 'Your account settings have been updated!');
                cfpLoadingBar.complete();
            }).error(function (response) {
                AlertsService.add(422, 'Your account settings could not be updated, please try again.');
                console.log("Could not get the user.");
                cfpLoadingBar.complete();
            });
        };
        /**
         * watchtes for changes in the $scope.settings update function is called
         */
        /*$scope.$watch("settings", function(){
            $scope.update();
        }, true);*/
    }
]);

// User Subscriptions
app.controller('UserSubscriptionsController', [ '$rootScope', '$scope', '$routeParams', '$location', '$window', 'ApiFactory', 'AlertsService', 'ModalsService', 'cfpLoadingBar',
    function ($rootScope, $scope, $routeParams, $location, $window, ApiFactory, AlertsService, ModalsService, cfpLoadingBar)
    {
        cfpLoadingBar.start();
        $scope.url              = $location.absUrl();

        //$scope.subscriptions = {};

        $scope.upcomingSubscription = null;
        console.log('subscriptions', $rootScope.subscriptions);
        /**
         * Get the next payment due date for active subscriptions
         */
        $scope.getNextPaymentDate = function () {
            var dueDate = null;

            if($rootScope.account) {
                ApiFactory.users.getSubscriptions($rootScope.account.id).success(function (response) {
                    $rootScope.subscriptions      = response.data;
                    console.log("Subscriptions", $rootScope.subscriptions);

                    if($rootScope.subscriptions.length > 0) {
                        // Iterate over subscriptions and get the next subscription due payment
                        angular.forEach($rootScope.subscriptions, function (v, k) {
                            // If subscription is not active then return
                            if(v.state != 'ACTIVE') {
                                return;
                            }

                            var tmpDate = new Date(v.paymentDate);

                            // Set the latest date if closer
                            if(dueDate === null || tmpDate < dueDate) {
                                dueDate = tmpDate;
                                $scope.upcomingSubscription = v;
                            }
                        });
                    }
                    cfpLoadingBar.complete();
                }).error(function (response) {
                    console.log("Could not get the user.");
                    cfpLoadingBar.complete();
                });
            }
        };

        /**
         * Opens the subscription edit modal window
         * Using this over the global function so that
         * we can run code on closed
         * @param sub = Subscription object
         */
        $scope.editSubscription = function (sub) {
            // create new project
            ModalsService.closeAll();
            // Open relative modal
            $scope.ne = ModalsService.openModal(
                'AccountSubscriptionModalController',              // Controller
                'Editing Subscription #' + sub.id,                // Title
                'views/modals/account-edit-subscription.html',  // Template
                'lg',                                           // Size
                {
                    subscription: sub
                }                                               // Data

            );

            $scope.ne.result.then(function (data) {
                // Reload page
                if(data)
                    $window.location.reload();

                //$scope.getNextPaymentDate();
                //$rootScope.organizeSubscriptions();
            });
        };

        /**
         * Get user data based on $routeParams.id
         */

        /**
         * calling the APi factory and updating account settings
         */
        /*$scope.update = function () {
            ApiFactory.users.storeSettings($routeParams.id, $scope.settings).success(function (response) {
                //    $scope.settings      = response;
                AlertsService.add(200, 'Your account settings have been updated!');
            }).error(function (response) {
                AlertsService.add(422, 'Your account settings could not be updated, please try again.');
                console.log("Could not get the user.");
            });
        };*/

        /**
         * watchtes for changes in the $scope.settings update function is called
         */
        /*$scope.$watch("settings", function(){
         $scope.update();
         }, true);*/
        cfpLoadingBar.complete();
    }
]);

// Handles both my projects and supported projects functionality
app.controller('UserProjectManagerController', [ '$rootScope', '$scope', '$routeParams', '$location', 'ApiFactory', 'AlertsService', 'ModalsService', 'cfpLoadingBar',
    function ($rootScope, $scope, $routeParams, $location, ApiFactory, AlertsService, ModalsService, cfpLoadingBar)
    {
        cfpLoadingBar.start();
        $scope.selectType = 'myProjects';
        $scope.userProjects = [];
        $scope.userBackedProjects = [];

        /**
         * call API to fetch the users projects and backed projects
         * **/

        ApiFactory.users.getProjects($routeParams.id).success(function (response) {
            // Push new projects
            for (var i = 0; i < response.data.length; i++) {
                if(response.data[i].status != 'DELETED') {
                    $scope.userProjects.push(response.data[i]);
                }
            }
            //$scope.userProjects      = response.data;
            console.log('my auth token', $rootScope.account.token);
            console.log('my projects', $scope.userProjects);
        }).error(function (response) {
            console.log("Could not get the user.");
            cfpLoadingBar.complete();
        }).then(function(data){
            ApiFactory.users.getBackedProjects($routeParams.id).success(function (response) {
                // Push new projects
                for (var i = 0; i < response.length; i++) {
                    if(response[i].status == 'APPROVED') {
                        $scope.userBackedProjects.push(response[i]);
                    }
                }
                //$scope.userBackedProjects      = response;
                $rootScope.dataLoading = false;
                cfpLoadingBar.complete();
            }).error(function (response) {
                console.log("Could not get the user.");
                $rootScope.dataLoading = false;
                cfpLoadingBar.complete();
            });
        });

        $scope.stopBacking = function (i, projectId) {
            $rootScope.ConfirmationModal(
                false,
                'Stop supporting this project?',
                'Are you sure you would like to stop supporting ' + $scope.userBackedProjects[i].title + ', the project will no longer receive funds from your future purchases!'
            ).then(function(result) {
                if(result) {
                    ApiFactory.projects.unback(projectId).success(function (response) {
                        // Remove project from view
                        $scope.userBackedProjects.splice(i, 1);
                        // Show notification
                        AlertsService.add(200, 'You are no longer supporting this project!');
                        console.log("Stopped backing this project.");
                    }).error(function (response) {
                        console.log("Could not stop supporting this project.");
                    });
                }
            });
        };

        $scope.pauseProject = function (i) {
            var title   = '';
            var msg     = '';
            var project = $scope.userProjects[i];
            if (project.status === 'APPROVED') {
                title   = 'Pause Project?';
                msg     = 'Are you sure you would like to pause your ' + project.title + ' project? Your project will not be listed to the public and will be unable to receive backers.';
            } else {
                title = 'Resume Project?';
                msg     = 'Are you sure you would like to resume your ' + project.title + ' project? Your project will be listed to the public and will be able to receive backers.';
            }

            $rootScope.ConfirmationModal(
                false,
                title,
                msg
            ).then(function(result) {
                if(result) {
                    switch (project.status) {
                        case "APPROVED":
                            // Pause the project
                            ApiFactory.projects.pause(project.id).success(function (response) {
                                $scope.userProjects[i] = response;
                                // Show notification
                                AlertsService.add(200, 'Your project has been paused!');
                            }).error(function (response) {
                                console.log("Could not pause this project.", response);
                            });
                            break;
                        case "PAUSED":
                            // Resume the project
                            ApiFactory.projects.resume(project.id).success(function (response) {
                                $scope.userProjects[i].status = response;
                                // Show notification
                                AlertsService.add(200, 'Your project has been resumed!');
                            }).error(function (response) {
                                console.log("Could not resume this project.", response);
                            });
                            break;
                        case "PENDING":
                            $rootScope.AlertModal(
                                false,
                                'Unable to change project state.',
                                'Your project, ' + project.title + ' is currently pending approval.'
                            );
                            break;
                    };
                }
            });
        };

        // TODO Redirect to edit page
        $scope.editProject = function (i) {
            if($rootScope.account.token) {
                var project = $scope.userProjects[i];

                $scope.ne = ModalsService.openModal(
                    'ProjectCreateModalController',      // Controller
                    'Edit Project',                    // Title
                    'views/projects/create.html',   // Template
                    'lg',                       // Size
                    {
                        project: project,
                        categories: project.categories
                    }                          // Data
                );

                $scope.ne.result.then(function (data) {
                    // Reload page
                    $window.location.reload();
                });
            }
        };

        $scope.deleteProject = function (i) {
            if($rootScope.account.token) {
                //var project = $scope.userProjects[i];

                $scope.ne = ModalsService.openModal(
                    'ProjectDeleteModalController',      // Controller
                    'Delete Project',                    // Title
                    'views/modals/project-delete.html',   // Template
                    'md',                       // Size
                    {
                        projectId: i
                    }
                );

                // Removes the project from the list
                $scope.ne.result.then(function (data) {
                    // Reload page
                    $scope.userProjects.splice(i);
                });
            }
        };

        $scope.requestWithdraw = function (i) {
            var project = $scope.userProjects[i];
            $scope.ne = ModalsService.openModal(
                'ProjectWithdrawModalController',      // Controller
                'Request Funds',                    // Title
                'views/modals/project-withdraw.html',   // Template
                'md',                       // Size
                {
                    id: project.id,
                    ownerId: project.owner,
                    funds: project.fund
                }                          // Data
            );
        };
    }

]);

// User messages controller
app.controller('UserMessagesIndexController', [ '$rootScope', '$scope', '$routeParams', '$location', 'ApiFactory', 'ModalsService', 'AlertsService', 'cfpLoadingBar',
    function ($rootScope, $scope, $routeParams, $location, ApiFactory, ModalsService, AlertsService, cfpLoadingBar)
    {
        cfpLoadingBar.start();
        $scope.messages         = [];
        $scope.currentMsg       = null;
        $scope.loadingContent   = false;
        $scope.currentTab       = "Messages";
        $scope.showInput        = false;
        $scope.msgForm = {
            recipient: '',
            message: '',
            profile: null,
            attachment: null
        };

        // Scrollbar
        $scope.scrollerSettings = {
            autoHideScrollbar: false,
            advanced:{
                updateOnContentResize: true
            },
            setHeight: 600,
            scrollInertia: 0,
            scrollButtons: {
                scrollAmount: 'auto', // scroll amount when button pressed
                enable: false // enable scrolling buttons by default
            },
            axis: 'y'
        };

        ApiFactory.users.getMessages().success(function (response) {
            $scope.messages     = response.data;

            if($scope.messages.length > 0)
                $scope.viewContent('message', $scope.messages[0].id);

            $rootScope.dataLoading = false;
            cfpLoadingBar.complete();
        }).error(function () {
            console.log("Could not get the user messages.");
            $rootScope.dataLoading = false;
            cfpLoadingBar.complete();
        });

        $scope.viewContent = function (type, id) {
            $scope.loadingContent = true;
            cfpLoadingBar.start();
            if(type === "message") {
                ApiFactory.users.getMessage($rootScope.account.id, id).success(function (response) {
                    $scope.currentMsg  = response;
                    console.log(response);
                    $scope.loadingContent = false;
                    cfpLoadingBar.complete();
                }).error(function () {
                    console.log("Could not get the message.");
                    $scope.loadingContent = false;
                    cfpLoadingBar.complete();
                });
            }
            if(type === "notification") {

            }
        };

        $scope.sendMsg = function () {
            // Do not send if message is empty
            if($scope.msgForm.message.length === 0) {
                return;
            }
            $scope.loadingContent = true;
            // Set recipient
            $scope.msgForm.recipient = $scope.currentMsg.message.participant;
            ApiFactory.users.sendMessage($scope.account.id,$scope.msgForm).success(function (response) {
                //$scope.getMsg();
                $scope.viewContent("message", $scope.currentMsg.message.id);
                // Reset values
                $scope.msgForm = {
                    recipient: '',
                    message: '',
                    profile: null,
                    attachment: null
                };
                // Show notification
                AlertsService.add(200, 'Your message has been sent!');
            }).error(function (response) {
                console.log("Could not send the message.");
            });
        };

        $scope.attachment = function () {

            if( $rootScope.account.token ) {
                // create new project
                ModalsService.closeAll();
                // Open relative modal
                $scope.ne = ModalsService.openModal(
                    'AttachmentModalController',        // Controller
                    'Attach your Profile or a Project', // Title
                    'views/modals/attachment.html',     // Template
                    'lg',                               // Size
                    {}                                  // Data

                );
            } else {
                $rootScope.auth.getLogin();
            }

            $scope.ne.result.then(function (data) {
                // Data returned from the modal when closed
                if(data.type == 'profile'){
                    $scope.msgForm.profile = data.id;
                }
                if(data.type == 'project'){
                    $scope.msgForm.attachment = data.id;
                }
            });

        };

        $scope.clearContent = function () {
            $scope.currentMsg = null;
        };

        $scope.toggleReply = function () {
            $scope.showInput = !$scope.showInput;
        }
    }
]);

// User messages view controller
app.controller('UserMessagesViewController', [ '$rootScope', '$scope', '$routeParams', '$location', 'ApiFactory', 'AlertsService', 'ModalsService', 'cfpLoadingBar',
    function ($rootScope, $scope, $routeParams, $location, ApiFactory, AlertsService, ModalsService, cfpLoadingBar)
    {
        $scope.message  = [];
        $scope.messages  = [];

        $scope.msgForm = {
            recipient: '',
            message: '',
            profile: null,
            attachment: null
        };

        $scope.getMsg = function () {
            ApiFactory.users.getMessage($routeParams.id,$routeParams.msg).success(function (response) {
                $scope.message  = response.message;
                $scope.messages  = response.messages.data;
                $rootScope.dataLoading = false;
            }).error(function (response) {
                console.log("Could not get the message.");
                $rootScope.dataLoading = false;
            });
        };

        $scope.sendMsg = function () {
            // Set recipient
            $scope.msgForm.recipient = $scope.message.participant;
            ApiFactory.users.sendMessage($scope.account.id,$scope.msgForm).success(function (response) {
                $scope.getMsg();
                // Reset values
                $scope.msgForm = {
                    recipient: '',
                    message: '',
                    profile: null,
                    attachment: null
                };
                // Show notification
                AlertsService.add(200, 'Your message has been sent!');
            }).error(function (response) {
                console.log("Could not send the message.");
            });
        };

        $scope.attachment = function () {

            if( $rootScope.account.token ) {
                // create new project
                ModalsService.closeAll();
                // Open relative modal
                $scope.ne = ModalsService.openModal(
                    'AttachmentModalController',        // Controller
                    'Attach your Profile or a Project', // Title
                    'views/modals/attachment.html',     // Template
                    'lg',                               // Size
                    {}                                  // Data

                );
            } else {
                $rootScope.auth.getLogin();
            }

            $scope.ne.result.then(function (data) {
                // Data returned from the modal when closed
                if(data.type == 'profile'){
                    $scope.msgForm.profile = data.id;
                }
                if(data.type == 'project'){
                    $scope.msgForm.attachment = data.id;
                }
             });

        };

        // Loads all messages
        $scope.getMsg();
    }
]);

app.controller('UsersPasswordResetController', [ '$rootScope', '$scope', '$routeParams', '$location', 'ApiFactory', 'AlertsService', 'cfpLoadingBar',
    function ($rootScope, $scope, $routeParams, $location, ApiFactory, AlertsService, cfpLoadingBar)
    {
        $scope.formData = {
            newPassword: null,
            passwordMatch: null
        };
        $rootScope.dataLoading = false;

        $scope.resetPassRequest = function (form) {
            // Do a validation check
            if(form.$invalid) {
                console.log(form.$error.required);
                var errors = null;
                // Gather all errors form.$error.required
                $rootScope.AlertModal(false, 'Password Reset Form Invalid', 'Please check the form for invalid fields.');
                return;
            }

            var data = {
                "password": $scope.formData.newPassword,
                "token": $routeParams.token
            };

            cfpLoadingBar.start();

            ApiFactory.auth.resetPassToken(data).success(function (response) {
                //    $scope.settings      = response;
                AlertsService.add(200, 'Your password has been reset!');
                $scope.resetDone = true;
                $rootScope.AlertModal(true, "Please check your inbox", "Your password has been reset, we have sent a confirmation email to " + response.email + ".");
                cfpLoadingBar.complete();
            }).error(function (response) {
                //AlertsService.add(422, 'Your password could not be reset, please request a new reset token.');
                $rootScope.AlertModal(true, "Password Reset Error", "Your password could not be reset, please request a new reset token.");
                cfpLoadingBar.complete();
            });
        };
    }
]);

// endregion

// region Store

/** Store Controllers */
app.controller('StoreIndexController', [ '$rootScope', '$scope', '$routeParams', '$window', 'ApiFactory', 'AlertsService', 'ModalsService', '$location', 'cfpLoadingBar',
    function ($rootScope, $scope, $routeParams, $window, ApiFactory, AlertsService, ModalsService, $location, cfpLoadingBar)
    {
        cfpLoadingBar.start();
        // Check if to show static
        if($rootScope.showStatic) {
            // Redirect to static page
            $location.path('/static/default').replace();
        }

        $scope.loading      = false;
        $scope.products     = [];
        $scope.page         = 0;
        $scope.firstLoad    = true;

        // Filters
        $scope.cats   = [];

        // Titles
        $scope.titleCats = [];

        /**
         * Check if we have a category id
         */
        /*if( $routeParams ) {
            $rootScope.filters.categories = [];
            $rootScope.filters.interests = [];
            $rootScope.filters.skills = [];
            for(var obj in $routeParams) {
                $scope.cats.push($routeParams[obj]);

                // Fill category title
                angular.forEach($rootScope.flatShopCats, function (v, k) {
                    if (v.id === $routeParams[obj]) {
                        $scope.titleCats.push(v.name);
                        if ($rootScope.filters.categories.indexOf(v) == -1) {
                            $rootScope.filters.categories.push(v); // Add value if does not exist
                        }
                    }
                });
            }
        } else {
            $rootScope.clearFilters();
        }*/


        $scope.quickBuy = function (item) {
            $scope.ne = ModalsService.openModal(
                'StoreCheckoutModalController',      // Controller
                'Add to cart',                    // Title
                'views/modals/store-quick-purchase.html',   // Template
                'md',                       // Size
                {
                    product: item
                }                          // Data
            );

            $scope.ne.result.then(function (data) {
                // Reload page
                //$window.location.reload();
            });
        };

        $scope.resetPage = function () {
            $scope.page         = 0;
            $scope.products     = [];
            $scope.firstLoad    = true;
            cfpLoadingBar.start();
            //$scope.nextPage();
        };

        /**
         * Append next page of projects if there is any
         */
        $scope.nextPage = function () {
            if ($scope.loading) {
                return;
            }

            if(!$scope.firstLoad && $scope.products.length < 20) {
                return;
            }

            $scope.loading = true;

            // Get next page of products
            ApiFactory.store.list($scope.page, $scope.cats, $scope.firstLoad).success(function (response) {
                // Push new projects
                for (var i = 0; i < response.data.length; i++) {
                    $scope.products.push(response.data[i]);
                }
                console.log("Products:", $scope.products);

                if($scope.firstLoad) {
                    $rootScope.dataLoading = false;
                    cfpLoadingBar.complete();
                }

                $scope.loading = false;
                $scope.firstLoad = false;
                $scope.page++;
            }).error(function (response) {
                // Return error response
                // TODO create alert functionality
                console.log("Could not get items.");
                $scope.loading = false;
                cfpLoadingBar.complete();
            });
        };

    }]);

app.controller('StoreViewController', [ '$rootScope', '$scope', '$routeParams', '$location', 'ApiFactory', 'AlertsService', 'breadcrumbs', 'ModalsService', 'cfpLoadingBar',
    function ($rootScope, $scope, $routeParams, $location, ApiFactory, AlertsService, breadcrumbs, ModalsService, cfpLoadingBar)
    {
        cfpLoadingBar.start();
        $scope.itemSub = null;
        $scope.hasSubscription = false;

        // data
        $scope.product = [];
        $scope.products = [];

        $scope.order = {
            subRange: null,
            qty: 1,
            subscribe: false
        };

        $scope.isSubscribed = false;

        $scope.itemIsInCart = false;

        $scope.breakpoints = [
            {
                breakpoint: 1950,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    arrows: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    arrows: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    arrows: false
                }
            }
        ];

        /**
         * Gets the current product data from database
         */
        $scope.getProduct = function () {
            /**
             * Get user data based on $routeParams.id
             */
            ApiFactory.store.get($routeParams.id).success(function (response) {
                $scope.product      = response.item;
                // Breadcrumb
                breadcrumbs.options = {'Product': $scope.product.name};
                // Set Meta Data
                $rootScope.setMetaData($scope.product.name, null, $scope.product.images && $scope.product.images.length > 0 ? $scope.product.images[0] : '/assets/img/missing-project.png');

                $scope.order.subRange = $rootScope.subscriptionPlans[0].id;

                $scope.checkSubscription();
                $rootScope.dataLoading = false;

                // check if logged in
                if($scope.account.token)
                    $scope.order.subscribe = true;

                cfpLoadingBar.complete();
            }).error(function (response) {
                console.log("Could not get the product.");
                $rootScope.dataLoading = false;
                cfpLoadingBar.complete();
            });

            // Get next page of products
            ApiFactory.store.list(1, $scope.cats, true).success(function (response) {
                // Push new projects
                for (var i = 0; i < response.data.length; i++) {
                    $scope.products.push(response.data[i]);
                }
            }).error(function (response) {
                // Return error response
                // TODO create alert functionality
                console.log("Could not get products.");
            });
        };

        /**
         * Checks if we have current selected subscription already and if we are subscribed to item
         */
        $scope.checkSubscription = function () {
            // Set default to false
            $scope.isSubscribed = false;
            $scope.hasSubscription = false;

            // Get plan by id
            $scope.plan = $rootScope.getSubscriptionPlanById(parseInt($scope.order.subRange));

            // Check if we are subscribed to item
            angular.forEach($rootScope.subscriptions, function (v, k) {
                // Check if subscribing
                if($scope.order.subscribe) {
                    if ($scope.plan != null && v.duration === $scope.plan.interval) {
                        $scope.hasSubscription = true;
                    }
                }

                // Check if item exists in subscription
                angular.forEach(v.items, function(item, i) {
                    if(item.item.id === $scope.product.id) {
                        //if(v.state === 'ACTIVE' || v.state === 'CREATED') {
                            $scope.isSubscribed = true;
                            $scope.itemSub = v;
                       //}
                    }
                });
            });
        };

        /**
         * Adds current item to cart
         */
        $scope.addToCart = function () {
            // Setup data depending if subscription or not
            var itemData = {};

            if($scope.order.subscribe) {
                itemData = {
                    product_id: $scope.product.id,
                    subscription: $scope.order.subRange,
                    image: $scope.product.images && $scope.product.images.length > 0 ? $scope.product.images[0] : '/assets/img/missing-project.png',
                    apcc: $scope.product.postageCalculationCost,
                    isSubscription: 1
                };
            } else {
                itemData = {
                    product_id: $scope.product.id,
                    image: $scope.product.images && $scope.product.images.length > 0 ? $scope.product.images[0] : '/assets/img/missing-project.png',
                    apcc: $scope.product.postageCalculationCost,
                    isSubscription: 0
                }
            }

            if(!$rootScope.cart.getItemById($scope.product.id)) {
                $rootScope.cart.addItem(
                    //$rootScope.cart.getTotalItems() + 1,
                    $scope.product.id,
                    $scope.product.name,
                    $scope.product.price,
                    $scope.order.qty,
                    itemData
                );
                AlertsService.add(200, $scope.product.name + ' x' + $scope.order.qty + ' has been added to your cart.');
            } else {
                var cartItem = $rootScope.cart.getItemById($scope.product.id);
                cartItem.setQuantity($scope.order.qty);
                cartItem.setData(itemData);
                AlertsService.add(200, $scope.product.name + ' updated.');
            }
            $rootScope.$broadcast('ngCart:change', {});
        };

        /**
         * Adds single item to cart based on data
         * @param item
         * @param sub
         * @param qty
         */
        $scope.addItemToCart = function (item, qty) {
            // Setup data depending if subscription or not
            var itemData = {};

            if($scope.order.subscribe) {
                itemData = {
                    product_id: item.id,
                    subscription: $scope.order.subRange,
                    image: item.images[0],
                    isSubscription: 1
                };
            } else {
                itemData = {
                    product_id: item.id,
                    image: item.images[0],
                    isSubscription: 0
                }
            }

            if(!$rootScope.cart.getItemById(item.id)) {
                $rootScope.cart.addItem(
                    //$rootScope.cart.getTotalItems() + 1,
                    item.id,
                    item.name,
                    item.price,
                    qty,
                    itemData
                );
                AlertsService.add(200, item.name + ' x' + qty + ' has been added to your cart.');
            } else {
                var cartItem = $rootScope.cart.getItemById(item.id);
                cartItem.setQuantity(qty);
                cartItem.setData(itemData);
                AlertsService.add(200, item.name + ' updated.');
            }
            $rootScope.$broadcast('ngCart:change', {});
        };

        /**
         * Checks if current item is already in cart
         */
        $scope.checkCartItem = function () {
            if($rootScope.cart.getItemById($scope.product.id)) {
                var cartItem = $rootScope.cart.getItemById($scope.product.id);
                $scope.order.qty = cartItem.getQuantity();
                console.log("Item subscription data", cartItem.getData());

                // Check if current cart item is subscription based
                if(cartItem.getData().isSubscription === 1) {
                    $scope.order.subRange = cartItem.getData().subscription;
                    $scope.order.subscribe = true;
                    $scope.itemIsInCart = true;
                }
            } else {
                $scope.itemIsInCart = false;
            }
        };

        $scope.addToSubscription = function() {
            // Get plan by id
            var plan = $rootScope.getSubscriptionPlanById(parseInt($scope.order.subRange));
            var sub = null;

            // Check if we are subscribed to item
            angular.forEach($rootScope.subscriptions, function (v, k) {
                // Check if subscribing
                if ($scope.order.subscribe) {
                    if (plan && v.duration === plan.interval) {
                        sub = v;
                    }
                }
            });

            // Build alert message
            var title = "";
            var message = "";

            // Check subscription status
            if(sub.items.length > 0) {
                // Get plan details
                console.log(plan);
                // Confirmation of adding item
                $rootScope.ConfirmationModal(
                    true,
                    'Add ' + $scope.product.name + ' x' + $scope.order.qty + ' to ' + plan.name + '?',
                    'You current have an active ' + plan.name + ' subscription, would you like to add ' + $scope.product.name + ' x' + $scope.order.qty + '?'
                ).then(function(result) {
                    if (result) {
                        title = "Subscription updated";
                        message = "<p>" +
                            "We have added " +
                            "<strong>" + $scope.product.name + " x" + $scope.order.qty + "</strong> " +
                            "to your " +
                            "<strong>" + plan.name + "</strong> " +
                            "subscription." +
                            "</p>";

                        // Attempt to update the subscription
                        var subItems = {items: []};

                        // Build array of items for subscription update
                        angular.forEach(sub.items, function (v, k) {
                            // Add item to subscription items
                            subItems.items.push({
                                itemId: v.item.id,
                                quantity: v.quantity
                            })
                        });

                        // Add this item to array
                        // Add item to subscription items
                        subItems.items.push({
                            itemId: $scope.product.id,
                            quantity: $scope.order.qty
                        });

                        ApiFactory.users.updateSubscription(sub.id, subItems).success(function (response) {
                            // Show alert
                            //AlertsService.add(200, 'Subscription #' + sub.id + ' has been updated.');
                            $rootScope.AlertModal(true, title, message);
                            // Broadcast change
                            $rootScope.$broadcast('subscriptions-update');
                            // Reorganize subscriptions for view
                            $rootScope.organizeSubscriptions();
                        }).error(function (response) {
                            console.log('There was an error: ', response);
                        });
                    }
                });

            } else {
                /*// Add current item to cart
                $scope.addToCart();

                // Add subscriptions previous items to cart
                angular.forEach(sub.items, function (v, k) {
                    $scope.addItemToCart(v.item, v.quantity);
                });

                title = "Subscription is not active";
                message = "<p>" +
                    "We have added " +
                    "<strong>" + $scope.product.name + " x" + $scope.order.qty + "</strong> " +
                    "to your cart as your subscription " +
                    "<strong>#" + sub.id + "</strong> " +
                    "is currently inactive." +
                    "</p>" +
                    "<p>We have also added your subscriptions previous items to the cart so you can resubscribe to them as well, if you like.</p>" +
                    "<p>To reactivate it, simply follow the checkout procedure.</p>";

                $location.url("store/cart");*/

                // Show reactivation model
                ModalsService.closeAll();
                // Open relative modal
                $scope.ne = ModalsService.openModal(
                    'StoreReactivateModalController',       // Controller
                    'Subscription ' + plan.name + ' is not active',            // Title
                    'views/modals/store-reactivate-subscription.html',   // Template
                    'lg',                           // Size
                    {}                              // Data

                );

                $scope.ne.result.then(function (data) {
                    // Data returned from the modal when closed
                    if(data === true) {
                        // Attempt to update the subscription
                        var subItems = {items: []};
                        // Add this item to array
                        // Add item to subscription items
                        subItems.items.push({
                            itemId: $scope.product.id,
                            quantity: $scope.order.qty
                        });
                        title = "Subscription updated";
                        message = "<p>" +
                            "We have added " +
                            "<strong>" + $scope.product.name + " x" + $scope.order.qty + "</strong> " +
                            "to your subscription " +
                            "<strong>" + plan.name + ", the subscription is now Active!</strong>" +
                            "</p>";

                        ApiFactory.users.updateSubscription(sub.id, subItems).success(function (response) {
                            // Show alert
                            //AlertsService.add(200, 'Subscription #' + sub.id + ' has been updated.');
                            $rootScope.AlertModal(true, title, message);
                            // Broadcast change
                            $rootScope.$broadcast('subscriptions-update');
                            // Reorganize subscriptions for view
                            $rootScope.organizeSubscriptions();
                        }).error(function (response) {
                            console.log('There was an error: ', response);
                        });
                    }
                 });

            }
            // Add to subscription

            // Show success message
            $scope.checkSubscription();
            console.log(sub);
        };

        $scope.getProduct();
        $scope.checkCartItem();

        // Events
        $scope.$on('subscriptions-update', function(event, args) {
            console.log("Subscriptions Updated");
            $scope.checkSubscription();
        });
    }
]);

app.controller('StoreCartController', [ '$rootScope', '$scope', '$routeParams', '$location', '$anchorScroll', 'ApiFactory', 'AlertsService', 'breadcrumbs', 'ModalsService',
    function ($rootScope, $scope, $routeParams, $location, $anchorScroll, ApiFactory, AlertsService, breadcrumbs, ModalsService)
    {
        $scope.showCheckout = false;
        $scope.hasCurrentSubs = false;
        $scope.paymentProcessing = false;
        $scope.paymentProcessingComplete = null;
        $scope.project = null;
        $scope.projectId = null;
        $scope.showResult = false;
        $scope.orderResult = {};
        $rootScope.dataLoading = false;

        $scope.updateSubscriptionsOnly = false;

        $scope.cartProjects = [];

        // Valid card types
        $scope.cardTypes = ['Visa', 'MasterCard', 'American Express', 'Descover', 'JCB'];

        $scope.cartData = {
            items: [],
            userId: null,
            address: '',
            stripeToken: null,
            projectId: '',
            storeCard: false,
            sameAddress: false,
            useExistingCard: false,
            address_line1: '',
            address_line2: '',
            address_city: '',
            address_state: '',
            address_zip: ''
        };

        $scope.card = {
            number: null,
            exp_month: null,
            exp_year: null,
            cvc: null,
            name: '',
            address_country: 'UK',
            address_line1: '',
            address_line2: '',
            address_city: '',
            address_state: '',
            address_zip: ''
        };

        // Set user id if logged in
        if($rootScope.account) {
            $scope.cartData.userId = $rootScope.account.id;
            $scope.cartData.email = $rootScope.account.email;
            $scope.card.name = $rootScope.account.name;
        }


        $scope.closeAlert = function () {
            $scope.paymentProcessing = false;
            $scope.paymentProcessingComplete = null;
        };

        // Cart controller
        $scope.removeCartItem = function (item, force) {
            if(force) {
                $scope.cart.removeItem(item);
            } else {
                $rootScope.ConfirmationModal(true, 'Remove Cart Item', 'Are you sure you would like to remove ' + item._name + ' from your cart?').then(function (result) {
                    if (result) {
                        $scope.cart.removeItem(item);
                        AlertsService.add(200, item._name + ' has been removed from your cart.');
                    }
                });
            }
        };

        $scope.updateQty = function (item) {
            item.setQuantity(item.newQty);
            $rootScope.$broadcast('ngCart:change', {});
        };

        $scope.updateSubscription = function (item) {
            var oldSub = item.getData().subscription;
            var subUpdated = false;
            var sub = null;

            item.setData({
                product_id: item.getData().product_id,
                subscription: item.newSub,
                image: item.getData().image,
                isSubscription: item.getData().isSubscription,
            });
            $rootScope.$broadcast('ngCart:change', {});
            item.subData = $rootScope.getSubscriptionPlanById(item.newSub);
            item.isSubscribed = $scope.checkSubscription(item);

            // TODO Show madel
            if(item.isSubscribed) {
                // Get users subscription
                angular.forEach($rootScope.subscriptions, function (v, k) {
                    // Check if subscribing
                    if (item.subData && v.duration === item.subData.interval) {
                        sub = v;
                    }
                });
                // Confirmation of adding item
                $rootScope.ConfirmationModal(
                    true,
                    'Add ' + item.getName() + ' x' + item.getQuantity() + ' to ' + item.subData.name + '?',
                    'You current have an active ' + item.subData.name + ' subscription, would you like to add ' + item.getName() + ' x' + item.getQuantity() + '?'
                ).then(function(result) {
                    if (result) {
                        title = "Subscription updated";
                        message = "<p>" +
                            "We have added " +
                            "<strong>" + item.getName() + " x" + item.getQuantity() + "</strong> " +
                            "to your " +
                            "<strong>" + item.subData.name + "</strong> " +
                            "subscription." +
                            "</p>" +
                            "<p>" +
                            "We have removed" +
                            "<strong>" + item.subData.name + "</strong> " +
                            "from your cart." +
                            "</p>"
                        ;

                        // Attempt to update the subscription
                        var subItems = {items: []};

                        // Build array of items for subscription update
                        angular.forEach(sub.items, function (v, k) {
                            // Add item to subscription items
                            subItems.items.push({
                                itemId: v.item.id,
                                quantity: v.quantity
                            })
                        });

                        // Add this item to array
                        // Add item to subscription items
                        subItems.items.push({
                            itemId: item._id,
                            quantity: item.getQuantity()
                        });

                        ApiFactory.users.updateSubscription(sub.id, subItems).success(function (response) {
                            // Show alert
                            //AlertsService.add(200, 'Subscription #' + sub.id + ' has been updated.');
                            $rootScope.AlertModal(true, title, message);
                            // Broadcast change
                            $rootScope.$broadcast('subscriptions-update');
                            // Reorganize subscriptions for view
                            $rootScope.organizeSubscriptions();
                            subUpdated = true;
                            $scope.removeCartItem(item, true);
                        }).error(function (response) {
                            console.log('There was an error: ', response);
                        });
                    } else {
                        // Revert subscription back if model closed without action
                        if(!subUpdated) {
                            item.setData({
                                product_id: item.getData().product_id,
                                subscription: oldSub,
                                image: item.getData().image,
                                isSubscription: item.getData().isSubscription,
                            });
                            $rootScope.$broadcast('ngCart:change', {});
                            item.newSub = oldSub;
                            item.subData = $rootScope.getSubscriptionPlanById(item.newSub);
                            item.isSubscribed = $scope.checkSubscription(item);
                        }
                    }
                });
            }
        };

        $scope.updateAddress = function() {
            if($scope.cartData.sameAddress) {
                // Set card address to the same as delivery address
                $scope.card.address_line1   = $scope.cartData.address_line1;
                $scope.card.address_line2   = $scope.cartData.address_line2;
                $scope.card.address_city    = $scope.cartData.address_city;
                $scope.card.address_state   = $scope.cartData.address_state;
                $scope.card.address_zip     = $scope.cartData.address_zip;
            } else {
                // Reset card address
                $scope.card.address_line1   = "";
                $scope.card.address_line2   = "";
                $scope.card.address_city    = "";
                $scope.card.address_state   = "";
                $scope.card.address_zip     = "";
            }
        };

        $scope.toggleCheckout = function () {
            /*if(!$rootScope.account.token) {
                $rootScope.auth.getLogin();
            } else {
                // Show checkout form
                $scope.showCheckout = !$scope.showCheckout;
            }*/

            //TODO Check if any item in our cart needs to be put in current active subscriptions


            // Toggle checkout form
            $scope.showCheckout = !$scope.showCheckout;
            $('html,body').animate({
                scrollTop: $("#cart-checkout").offset().top},
            'slow');
            console.log("Cart:",$scope.cart.getItems());
        };

        $scope.getCartProjects = function () {
            ApiFactory.projects.random(6).success(function (response) {
                $scope.cartProjects = response;
            }).error(function (response) {
                console.log("Could not get projects.");
            });
        };

        $scope.selectProject = function (project) {
            $scope.project = project;
            $scope.projectId = project.id;
        };

        $scope.reselectProject = function() {
            $scope.project = null;
            $scope.projectId = null;
        };

        /**
         * Checks if we have current selected subscription already and if we are subscribed to item
         */
        $scope.checkSubscription = function (cartItem) {

            // Set default to false
            var isSubscribed = false;

            // Check if we are subscribed to item
            angular.forEach($rootScope.subscriptions, function (v, k) {
                // Check if subscribing
                if (v.duration === cartItem.subData.interval) {
                    isSubscribed = true;
                }
            });

            return isSubscribed;
        };

        /**
         * process all purchases and subscriptions
         */
        $scope.checkout = function (form) {
            // Do a validation check
            if(form.$invalid) {
                console.log(form.$error.required);
                var errors = null;
                // Gather all errors form.$error.required
                $rootScope.AlertModal(true, 'Checkout Form Invalid', 'Please check the Checkout form for invalid fields.');
                return;
            }

            $scope.paymentProcessing = true;

            $scope.cartData.items = $scope.cart.getItems();
            //$scope.cartData.userId = null;
            $scope.cartData.address = $scope.card.address_line1 + ", " + $scope.card.address_line2 + ", " + $scope.card.address_city + ", " + $scope.card.address_state + ", " + $scope.card.address_zip;
            $scope.cartData.stripeToken = null;
            $scope.cartData.projectId = $scope.projectId;

            // Set card details
            $scope.cartData.card = $scope.card;

            if($rootScope.account && $scope.cartData.useExistingCard)
                $scope.cartData.stripeToken = $rootScope.account.cardToken;

            // Log token for debug
            //console.log('token created for card ', $scope.cartData.stripeToken);

            // TODO Check items to see if they need adding to existing subscriptions

            // Process payment for remaining cart items
            ApiFactory.cart.checkout($scope.cartData).success(function (response) {
                console.log(response);
                $scope.orderResult = response;
                $scope.paymentProcessingComplete = "Success";
                $scope.showResult = true;
                AlertsService.add(200, 'Your purchase was successful.');
                $scope.cart.empty();

                // Fill returned data for subscriptions
                angular.forEach($scope.orderResult.subscriptions, function(v,k){
                    // Get plan data
                    v.plan = $rootScope.getSubscriptionPlanByDuration(v.duration);
                    v.plan = $rootScope.getSubscriptionPlanById(v.plan);
                });

                console.log($scope.orderResult);
            }).error(function (response) {
                $scope.paymentProcessingComplete = "Error";
            });

            /*$rootScope.stripe.createSource($scope.card).then(function(result) {
                if (result.error) {
                    // Inform the user if there was an error
                    //var errorElement = document.getElementById('card-errors');
                    console.log(result.error.message);
                } else {
                    // Send the source to your server
                    console.log(result.source);
                }
            });*/

            /*stripe.createSource($scope.card)
            .then(function (response) {
                if(response.error) {
                    $scope.paymentProcessingComplete = "Error";
                    console.error("There was an error.")
                    return;
                }
                // Log token from stripe
                console.log('token created for card ending in ', response.card.last4);

                // Set token
                $scope.cartData.stripeToken = response.id;

                if($scope.cartData.useExistingCard)
                    $scope.cartData.stripeToken = $rootScope.account.cardToken;

                // Set card details
                $scope.cartData.card = $scope.card;

                // Log token for debug
                console.log('token created for card ', $scope.cartData.stripeToken);

                if ($scope.cartData.storeCard) {
                    var storeToken = {"token": $scope.cartData.stripeToken};
                    ApiFactory.users.storeCardData($rootScope.account.id, storeToken).success(function (response) {
                        console.log(response);
                    }).error(function (response) {
                        console.log(response);
                    });
                }

                /*ApiFactory.cart.checkout($scope.cartData).success(function (response) {
                    console.log(response);
                    $scope.orderResult = response;
                    $scope.paymentProcessingComplete = "Success";
                    $scope.showResult = true;
                    AlertsService.add(200, 'Your subscription was successful.');
                    $scope.cart.empty();
                }).error(function (response) {
                    $scope.paymentProcessingComplete = "Error";
                });
            });*/
        };

        // If logged in then use account details
        if( $rootScope.account ) {
            $scope.card.name = $rootScope.account.name;
            $scope.email = $rootScope.account.email;
        }

        // Stripe charge
        $scope.chargeCard = function () {
            return stripe.card.createToken($scope.card)
                .then(function (response) {
                    // Log token from stripe
                    console.log('token created for card ending in ', response.card.last4);

                    // Copy scope to custom var
                    var payment = angular.copy($scope.card);

                    // Scrap card details
                    payment = undefined;

                    // Set token
                    $scope.payment.token = response.id;

                    // Log token for debug
                    console.log('token created for card ', $scope.payment.token);

                    // Validate with server
                    // Attempt to make payment to stripe
                    ApiFactory.projects.fund($scope.payment).success(function (response) {
                        console.log('successfully paid', response);

                        // Mark as payment successful
                        $scope.payemtSuccess = true;

                        // Show notification
                        AlertsService.add(200, 'You have funded ' + $scope.project.title + ' with £' + $scope.payment.amount);

                        // Reset form details
                        $scope.payment  = {
                            fullName: null,
                            email: null,
                            projectId: null,
                            token: null,
                            amount: 1.00,
                            total: 1.00,
                            anonymous: false
                        };

                        $scope.card = {
                            number: null,
                            exp_month: null,
                            exp_year: null,
                            cvc: null,
                            address_zip: null
                        };
                        $scope.modal.loader = false;
                    }).error(function (response) {
                        console.log('There was an error: ', response);
                        $scope.modal.loader = false;
                    });
                })
                .then(function (payment) {
                    // Success
                    console.log('successfully submitted payment for £', payment.amount);
                })
                .catch(function (err) {
                    // Catch and print errors
                    if (err.type && /^Stripe/.test(err.type)) {
                        console.log('Stripe error: ', err.message)
                        $scope.modal.loader = false;
                    }
                    else {
                        console.log('Other error occurred, possibly with your API', err.message)
                        $scope.modal.loader = false;
                    }
                })
        };

        // Check if leaving cart before checkout
        $scope.$on('$routeChangeStart', function(event, next, current) {
            // No need if logged in
            if($scope.account.token)
                return;

            if($scope.cart.getItems().length > 0) {
                // create new project
                ModalsService.closeAll();
                // Open relative modal
                $scope.ne = ModalsService.openModal(
                    'CartRedirectModalController',        // Controller
                    'You still have items in your cart!', // Title
                    'views/modals/cart-redirect-form.html',     // Template
                    'md',                               // Size
                    {
                        nextPage: next
                    }                                  // Data

                );

                return false;
            }
        });
    }
]);

// endregion

// region Authentification
app.controller('AccountSignupController', [ '$rootScope', '$scope', '$routeParams', '$location', 'ApiFactory', 'ModalsService', 'AlertsService', 'FileUploader', 'cfpLoadingBar',
    function ($rootScope, $scope, $routeParams, $location, ApiFactory, ModalsService, AlertsService, FileUploader, cfpLoadingBar)
    {
        $scope.url      = $location.absUrl();
        $scope.groupForm = {
            title: null,
            desc: null,
            membersCount: 1
        };
        $scope.signupForm = {
            full_name:      '',
            email:          '',
            birthday:       '',
            username:       '',
            password:       '',
            about:          '',
            gender:         null,
            ageAgreement:   false
        };
        $scope.signupType = 1;
        $scope.signupStep = 0;
        $scope.project = [];

        $scope.calc = {
            households: 15,
            families: 60,
            friends: 0,
            cost: 40.00,
            actualCost: 0,
            totalPeople: 0,
            totalMonth: 0,
            totalYear: 0
        };
        $scope.signedUp = false;
        $scope.groupCreated = false;

        if( $routeParams ) {
            // Switch statement on $routeParams[obj]
            switch($routeParams['signup_type']) {
                case "1":
                    console.log("Signup type is Project Owner");
                    $scope.signupType = 1;
                    $scope.signupStep = 1;
                    break;
                case "2":
                    console.log("Signup type is Project Member");
                    $scope.signupType = 2;
                    break;
                case "3":
                    console.log("Signup type is Parent/Sibling/Friend");
                    $scope.signupType = 3;
                    break;
                case "4":
                    console.log("Signup type is No Association");
                    $scope.signupType = 4;
                    $scope.signupStep = 2;
                    break;
            }
        }

        /**
         * Sets the signup step
         * @param step
         */
        $scope.setStep = function (step) {
            // Need to check if current step form is valid
            if($scope.signupStep === 1) {
                if(!$scope.groupForm.title || !$scope.groupForm.desc) {
                    $rootScope.AlertModal(false, "Group form invalid!", "Looks like you forgot to enter some data, please check the form for errors.");
                    return;
                }
            }

            if($scope.signupStep === 2) {
                if(!$scope.signupForm.full_name || !$scope.signupForm.birthday || !$scope.signupForm.username ) {
                    $rootScope.AlertModal(false, "Signup form invalid!", "Looks like you forgot to enter some data, please check the form for errors.");
                    return;
                }
            }

            $scope.signupStep = step;
        };

        /**
         * Check the user is 16 or over
         */
        $scope.ageCheck = function () {
            $scope.signupForm.ageAgreement = $rootScope.calculateAge($scope.signupForm.birthday);
        };

        /**
         * the $scope to update user edit profiles from Update.
         */
        $scope.storeProfile = function () {
            // if group data available
            if($scope.groupForm.title) {
                // Add group data as project
                $scope.signupForm.project = $scope.groupForm;
            }

            cfpLoadingBar.start();

            ApiFactory.auth.signup($scope.signupForm).success(function (data) {
                // Show notification
                AlertsService.add(200, 'Your account was created.');
                // Set login details
                $rootScope.auth.email       = $scope.signupForm.email;
                $rootScope.auth.password    = $scope.signupForm.password;
                $scope.accountCreated       = true;
                ++$scope.signupStep;
                if($scope.groupForm.title) {
                    $scope.groupCreated = true;
                }

                cfpLoadingBar.complete();
            }).error(function (data) {
                console.log(data);
                cfpLoadingBar.complete();
            })
        };

        $scope.storeProject = function () {
            /*var errors = "";

            // Check form validation
            if($scope.formData.title == null)
                errors += "Please enter a valid title, ";
            if($scope.formData.desc == null)
                errors += "Please enter a valid description, ";
            if($scope.formData.locationName == null)
                errors += "Please enter a valid location, ";
            if($scope.formData.categories.length == 0)
                errors += "Please select at least one Category. ";

            if(errors.length > 0)
                $rootScope.AlertModal(false, "Project Form Invalid", errors);

            $scope.modal.loader = true;*/
            // Attempt to store project
            ApiFactory.projects.store($scope.groupForm).success(function (response) {
                AlertsService.add(200, 'Your project was created.');
                // Set project id
                $scope.project = response;
                $scope.groupCreated = true;
            }).error(function (response) {
                // Hide loader
                AlertsService.add(401, 'Could not create this project, please try again.');
                $scope.modal.loader = false;
                console.log("Could not save project.");
            });
        };

        // Calculator
        $scope.calculate = function () {
            $scope.calc.actualCost = Number($scope.calc.cost) / 1.2 * 0.15;
            $scope.calc.totalPeople = Number($scope.calc.households) + Number($scope.calc.families) + Number($scope.calc.friends);
            $scope.calc.totalMonth = ($scope.calc.actualCost * $scope.calc.totalPeople);
            $scope.calc.totalYear = ($scope.calc.actualCost * $scope.calc.totalPeople * 12);

            console.log("Calculator update!");
        };

        $scope.calculate();
    }
]);

app.controller('LogoutController', [ '$rootScope', '$scope', '$routeParams', '$location', 'cfpLoadingBar',
function ($rootScope, $scope, $routeParams, $location, cfpLoadingBar)
{
    cfpLoadingBar.start();
    if($rootScope.account.id) {
        $location.search({});
        $location.path('/').replace(); // Redirects to homepage
    } else {
        cfpLoadingBar.complete();
    }
}]);
//endregion

// region Model Controllers
/**
 * Auth Model View Controller, handles all data and functionality of the Login and Signup modal views
 */
app.controller('AuthModalController', [ '$window', '$rootScope', '$scope', '$routeParams', '$location', '$cookies', '$auth', 'ApiFactory', 'ModalsService', '$uibModalInstance', '$remember', 'AlertsService', 'items', 'title', 'view',
    function ($window, $rootScope, $scope, $routeParams, $location, $cookies, $auth, ApiFactory, ModalsService, $uibModalInstance, $remember, AlertsService, items, title, view)
{
    $scope.title        = title;

    $scope.templateView = view;

    $scope.data         = items;

    $scope.signedUp     = false;

    $scope.provider     = null;

    $scope.token        = null;

    $scope.modal        = {
        loader: false
    };

    $scope.signupForm = {
        full_name: '',
        gender: 'NONE',
        birthday: '',
        username: '',
        email: '',
        password: '',
        location: {
            latitude: null,
            longitude: null,
            name: null
        },
        ageAgreement: false,
        tosAgreement: false
    };

    // Check if user is remembered
    if($cookies.get('shelping_remember_me')) {
        $rootScope.auth.email = $cookies.get('shelping_remember_me');
        $rootScope.auth.remember = true;
    }

    $scope.setCookieData = function (data) {
        // Store user data cookie
        var today = new Date();
        today.setDate(today.getDate() + 1); //Set expired date to tomorrow
        $cookies.put('shelping_com', data, {expires : today, path: '/' });
        //set cookie data as $rootScope data
        $rootScope.getCookieData();

        // Remember user
        if($rootScope.auth.remember) {
            $remember('shelping_remember_me', $rootScope.auth.email);
        }

        // Check if we have a followon modal view
        if($scope.data.nextModal) {
            switch($scope.data.nextModal) {
                case 'create-project':
                    $rootScope.createProject();
                    break;
            }
        } else {
            // Close open modals
            ModalsService.closeAll();
            // Reload page
            //$location.path("/account/" + $rootScope.account.id + "/purchase-history");
            $window.location.reload();
            //$location.path("/account/" + $rootScope.account.id + "/purchase-history");
        }
    };

    $scope.ageCheck = function () {
        $scope.signupForm.ageAgreement = $rootScope.calculateAge($scope.signupForm.birthday);
    };

    /**
     * Social login via oAuth
     * @param provider = (String) i.e 'facebook'
     */
    $scope.socialAuth = function(provider) {
        if($rootScope.account.token == null) {
            $auth.authenticate(provider).then(function (response) {
                $scope.provider = provider;
                if ($scope.provider != 'twitter') {
                    $scope.token = $auth.getToken();
                } else {
                    $scope.token = response.data.oauth_token + ':' + response.data.oauth_token_secret;
                }
                console.log($scope.token);

            }).catch(function (response) {
                // Something went wrong.
                console.log(response);
            }).then(function () {
                // Signed in.
                ApiFactory.auth.socialLogin($scope.provider, $scope.token).success(function (data) {
                    // Set cookie data
                    //var newData = null;

                    //newData.token = data.token;
                    var cookieData = {
                        id: data.id,
                        token: data.token
                    };
                    $scope.setCookieData(JSON.stringify(cookieData));
                    $rootScope.getCookieData();
                }).error(function (data) {
                    console.log("Could not signup.");
                })
            });
            //console.log('auth token', $auth.getToken());
        }
    };

    /**
     * Attampts to log into a user account based on credentials
     * If successful, creates a cookie with the session token
     */
    $scope.auth.login = function (form) {
        // Do a validation check
        if(form.$invalid) {
            console.log(form.$error.required);
            var errors = null;
            // Gather all errors form.$error.required
            $rootScope.AlertModal(false, 'Login Form Invalid', 'Please check the login form for invalid fields.');
            return;
        }

        $scope.user = {
            "email": $rootScope.auth.email,
            "password": $rootScope.auth.password
        };

        // Show Loader
        $scope.modal.loader = true;

        ApiFactory.auth.login($scope.user).success(function (data) {
            // Set cookie data
            var newData = [];

            newData.token = data.token;
            var cookieData = {id: data.id,token: newData.token};
            $scope.setCookieData(JSON.stringify(cookieData));
            // Hide Loader
            //$scope.modal.loader = false;
        }).error(function (data) {
            // Hide Loader
            $scope.modal.loader = false;
            // Return error response
            console.log("Could not login.");
            // Show notification
            $rootScope.AlertModal(false, 'Could not find account, please make sure your username & password are correct.');
        });
    };

    $scope.auth.facebook = function () {
        ApiFactory.auth.facebookLogin().success(function (data) {
            // Show notification
            AlertsService.add(200, 'Your account was created.');
            // Set login details
            $rootScope.auth.email       = $scope.signupForm.email;
            $rootScope.auth.password    = $scope.signupForm.password;
            // Attempt to login
            $scope.auth.login();
        }).error(function (data) {
            console.log("Could not signup.");
        })
    };

    $scope.auth.signup  = function (form) {
        // Do a validation check
        if(form.$invalid) {
            console.log(form.$error.required);
            var errors = null;
            // Gather all errors form.$error.required
            $rootScope.AlertModal(false, 'Signup Form Invalid', 'Please check the signup form for invalid fields.');
            return;
        }
        // Show Loader
        $scope.modal.loader = true;
        ApiFactory.auth.signup($scope.signupForm).success(function (data) {
            // Show notification
            //AlertsService.add(200, 'Your account was created.');
            //$rootScope.AlertModal(false, 'Your account has been created, a verification email has been sent to <strong>' + $scope.signupForm.email + '</strong>.');
            // Set login details
            $rootScope.auth.email       = $scope.signupForm.email;
            $rootScope.auth.password    = $scope.signupForm.password;
            $scope.signedUp = true;
            $scope.modal.loader = false;
            // Attempt to login
            //$scope.auth.login();
        }).error(function (data) {
            $scope.modal.loader = false;
            console.log(data);
        })
    };

    $scope.auth.resetPass = function (form) {
        // Do a validation check
        if(form.$invalid) {
            console.log(form.$error.required);
            var errors = null;
            // Gather all errors form.$error.required
            $rootScope.AlertModal(false, 'Password Form Invalid', 'Please check the password form for invalid fields.');
            return;
        }

        // Show Loader
        $scope.modal.loader = true;

        var account = {
            "email": $rootScope.auth.email
        };

        ApiFactory.auth.resetPass(account).success(function (data) {
            // Hide Loader
            $scope.modal.loader = false;
            $scope.resetDone = true;
        }).error(function (data) {
            // Hide Loader
            $scope.modal.loader = false;
            // Return error response
            // TODO create alert functionality
            console.log("Could not reset password.");
            // Show notification
            $rootScope.AlertModal(false, 'Could not find account, please make sure your email address is correct.');
        });
    };

    $scope.getLocation = function () {
        // Open relative modal
        $scope.ne = ModalsService.openModal(
            'LocationModalController',  // Controller
            'Your address',                 // Title
            'views/modals/map.html',    // Template
            'md',                       // Size
            {
                subtext: 'Enter your address here and wait for its validation. Precise address will be rounded to city.'
            }                          // Data
        );

        $scope.ne.result.then(function (data) {
            // Data returned from the modal when closed
            $scope.signupForm.location = {
                latitude: data.lat,
                longitude: data.lon,
                name: data.location
            }
        });
    };

    // Dismiss
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);

app.controller('AuthActivationController', [ '$rootScope', '$scope', '$routeParams', '$location', 'ApiFactory', 'AlertsService',
    function ($rootScope, $scope, $routeParams, $location, ApiFactory, AlertsService)
    {
        $scope.activationDone   = false;
        $scope.activationFail   = false;
        $scope.noToken          = false;

        $scope.activateAccount = function () {
            // Check we have token
            if($routeParams.token == null) {
                $scope.noToken = true;
            } else {
                var data = {
                    "token": $routeParams.token
                };
                ApiFactory.auth.activateAccount(data).success(function (response) {
                    $scope.activationDone = true;
                    //AlertsService.add(200, 'Account was activated!');
                    $rootScope.AlertModal(true, 'Your account has been activated and you can now signin.');
                }).error(function (response) {
                    $scope.activationFail = true;
                    //AlertsService.add(422, 'Unable to activate the account.');
                    $rootScope.AlertModal(true, 'There was an issue activating your account, if this continues please contact our support team.');
                });
            }
        };

        // TODO Redirect if loggedin
        if(!$rootScope.account.verified) {
            $scope.activateAccount();
        } else {
            $location.search({});
            $location.path('/').replace(); // Redirects to homepage
        }
    }
]);

/** Modal Box Controllers TODO Impliment loader where needed */

app.controller('ProjectCreateModalController', [ '$rootScope', '$scope', '$routeParams', '$location', 'ApiFactory', '$uibModalInstance', 'items', 'title', 'view', 'ModalsService', 'FileUploader', 'AlertsService', 'Socialshare',
    function ($rootScope, $scope, $routeParams, $location, ApiFactory, $uibModalInstance, items, title, view, ModalsService, FileUploader, AlertsService, Socialshare) {

        // Show loader
        $scope.modal        = {
            loader: true
        };

        $scope.title = title;

        $scope.templateView = view;

        $scope.data = items;

        $scope.project = [];

        $scope.formData = {
            category: []
        };

        $scope.formCategories = [];

        $scope.uploader = new FileUploader();

        $scope.cropSize = {
            w: 300,
            h: 117
        };

        $scope.cropImageSize = {
            w: 800,
            h: 417
        };

        $rootScope.createStep = 1;

        $scope.shareUrl = $location.absUrl();

        $scope.shareCheck = {
            facebook: false,
            twitter: false
        };

        $scope.missingDataWindow = false;

        $scope.croppedImage = {
            cropped: "/assets/img/missing-project.png",
            preview: "",
            blob: ""
        };

        // If we have project data
        if($scope.data.project) {
            $scope.formData = {
                id: $scope.data.project.id,
                title: $scope.data.project.title,
                desc: $scope.data.project.desc,
                lat: $scope.data.project.location.latitude,
                lon: $scope.data.project.location.longitude,
                logo: $scope.data.project.logo,
                web: $scope.data.project.web,
                fb: $scope.data.project.fb
            };

            $scope.formData.locationName = $scope.data.project.locationName;

            $scope.croppedImage.cropped = $scope.data.project.logo;

            // Clear categories & tags
            $scope.formData.categories  = [];
            $scope.formData.tags        = [];

            // Refactor category data
            angular.forEach($scope.data.categories, function(v,k){
                angular.forEach($rootScope.flatCats, function(val, key) {
                    if(val.id === v) {
                        $scope.formData.categories.push(val) // Add value
                    }
                });
            });

            // Apply project tags
            angular.forEach($scope.data.project.tags, function(v,k){
                $scope.formData.tags.push(v); // Add value
            })
        }

        $scope.selectFile = function () {
            $scope.uploader.clearQueue();
            $('#file-input').click();
        };

        $scope.uploader.onAfterAddingFile = function(fileItem) {
            if (fileItem._file) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $scope.$apply(function () {
                        $scope.croppedImage.preview = e.target.result;
                    })
                };

                reader.readAsDataURL(fileItem._file);
            }
        };

        $scope.readURL = function() {

            if ($scope.uploader.queue[0]._file) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $scope.croppedImage.preview = e.target.result;
                };

                reader.readAsDataURL(input.files[0]);
            }
        };

        // new code
        $scope.tryStore = function() {
            if(!$scope.formData.fb || !$scope.formData.web || $scope.formData.tags.length == 0) {
                // Open relative modal
                $scope.ne = ModalsService.openModal(
                    'AlertModalController',        // Controller
                    "Are you sure you want to continue?", // Title
                    'views/modals/alert-modal.html',     // Template
                    'lg',                               // Size
                    {}                                  // Data

                );

                $scope.ne.result.then(function (data) {
                    // Data returned from the modal when closed
                    if(data == true){
                        $scope.store();
                    }
                });
            } else {
                $scope.store();
                console.log($scope.formData.tags);
            }
        };

        $scope.store = function () {
            $scope.modal.loader = true;
            // Store all category ids to string
            $scope.formData.category = [];
            angular.forEach($scope.formData.categories, function (v, k) {
                $scope.formData.category.push(v.id);
            });
            // Set image for project
            if($scope.uploader.queue.length > 0) {
                $scope.formData.logo = $scope.uploader.queue[0]._file;
                $scope.formData.logo = $scope.croppedImage.blob;
            }

            // Check if new or edit
            if(!$scope.data.project) {
                // Attempt to store project
                ApiFactory.projects.store($scope.formData).success(function (response) {
                    AlertsService.add(200, 'Your project was created.');
                    // Set project id
                    $scope.project = response;
                    // Hide loader
                    $scope.modal.loader = false;
                    // Show next step
                    $scope.nextStep();
                    // Hide close button
                    $scope.hideClose = true;
                    // Hide loading window
                    $scope.modal.loader = false;
                }).error(function (response) {
                    // Hide loader
                    AlertsService.add(401, 'Could not create this project, please try again.');
                    $scope.modal.loader = false;
                    console.log("Could not save project.");
                });
            } else {
                // Attempt to store project
                ApiFactory.projects.edit($scope.formData.id, $scope.formData).success(function (response) {
                    AlertsService.add(200, 'Your project has been updated.');
                    // Set project id
                    $scope.project = response;
                    // Hide loader
                    $scope.modal.loader = false;
                    // Show next step
                    $scope.complete();
                }).error(function (response) {
                    // Hide loader
                    AlertsService.add(401, 'Could not update this project, please try again.');
                    $scope.modal.loader = false;
                });
            }
        };

        $scope.nextStep = function () {
            $rootScope.createStep++;
        };

        $scope.prevStep = function () {
            $rootScope.createStep--;
        };

        $scope.reset = function() {
            $rootScope.createStep = 3;
        };

        $scope.complete = function () {
            //$location.url('projects/' + $scope.project.id);
            //$route.reload();
            //ModalsService.closeAll();
            $uibModalInstance.close($scope.project);
        };

        $scope.facebookShare = function () {
            var url = $scope.shareUrl + 'projects/' + $scope.project.id;
            Socialshare.share({
                'provider': 'facebook',
                'attrs': {
                    'socialshareUrl': url,
                    'socialshareType': 'sharer',
                    'socialshareText': 'Show your support for ' + $scope.project.title + ' on Shelping.COM.',
                    'socialshareMedia': $scope.project.logo
                }
            });

            // Set status as shared
            $scope.shareCheck.facebook = true;
        };

        $scope.twitterShare = function () {
            var url = $scope.shareUrl + 'projects/' + $scope.project.id;
            Socialshare.share({
                'provider': 'twitter',
                'attrs': {
                    'socialshareUrl': url,
                    'socialshareText': 'Show your support for ' + $scope.project.title + ' on Shelping.COM.',
                    'socialshareHashtags': 'Shelping.COM',
                    'socialshareMedia': $scope.project.logo
                }
            });
            // Set status as shared
            $scope.shareCheck.twitter = true;
        };

        $scope.setTitle = function () {
            switch ($rootScope.createStep) {
                case 1:
                    $scope.title = title;
                    break;
                case 2:
                    $scope.title = 'Your project is ready!';
                    break;
                case 3:
                    $scope.title = 'Sharing on Facebook can increase donations';
                    break;
                case 4:
                    $scope.title = 'Sharing on Twitter can also increase donations';
                    break;
                case 5:
                    $scope.title = 'Congratulations!';
                    break;
                case 6:
                    $scope.title = title;
                    break;
            }
        };

        $scope.modal = {
            loader: false
        };

        // Dismiss
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.getLocation = function () {
            // Open relative modal
            $scope.ne = ModalsService.openModal(
                'LocationModalController',  // Controller
                'Your address',                 // Title
                'views/modals/map.html',    // Template
                'md',                       // Size
                {
                    subtext: 'Enter your address here and wait for its validation. Precise address will be rounded to city.',
                    location: { name: $scope.formData.locationName }
                }                          // Data
            );

            $scope.ne.result.then(function (data) {
                // Data returned from the modal when closed
                $scope.formData.locationName = data.location;
                $scope.formData.lat = data.lat;
                $scope.formData.lon = data.lon;
            });
        }

}]);

app.controller('ProjectDeleteModalController', [ '$rootScope', '$scope', '$routeParams', '$location', '$cookies', 'ApiFactory', 'ModalsService', '$uibModalInstance', 'AlertsService', 'items', 'title', 'view',
function ($rootScope, $scope, $routeParams, $location, $cookies, ApiFactory, ModalsService, $uibModalInstance, AlertsService, items, title, view)
{
    $scope.title        = title;

    $scope.templateView = view;

    $scope.data         = items;

    $scope.modal        = {
        loader: false
    };

    $scope.msg = {
        reason: ''
    };

    $scope.confirm = function () {
        ApiFactory.projects.remove($scope.data.projectId, $scope.msg.reason).success(function (response) {
            // Show notification
            AlertsService.add(200, 'Your project has been removed!');
            console.log("Project deleted.");
            // Redirect to profile manager
            $location.path('account/' + $rootScope.account.id + '/project-manager');
            // Close the modal box
            $scope.cancel();
        }).error(function (response) {
            console.log("Could not delete this project.");
        });
    };

    // Dismiss
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);

app.controller('ProjectShareModalController', [ '$rootScope', '$scope', '$routeParams', '$location', '$cookies', '$window', 'ApiFactory', 'ModalsService', '$uibModalInstance', 'AlertsService', 'items', 'title', 'view',
    function ($rootScope, $scope, $routeParams, $location, $cookies, $window, ApiFactory, ModalsService, $uibModalInstance, AlertsService, items, title, view)
    {
        //$scope.title        = title;

        $scope.templateView = view;

        $scope.data         = items;

        $scope.modal        = {
            loader: false
        };

        $scope.url          = $location.absUrl();

        // Dismiss
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);

app.controller('ProjectWithdrawModalController', [ '$rootScope', '$scope', '$routeParams', '$location', '$cookies', '$window', 'ApiFactory', 'ModalsService', '$uibModalInstance', 'AlertsService', 'items', 'title', 'view',
    function ($rootScope, $scope, $routeParams, $location, $cookies, $window, ApiFactory, ModalsService, $uibModalInstance, AlertsService, items, title, view)
    {
        $scope.title        = title;

        $scope.templateView = view;

        $scope.data         = items;

        $scope.modal        = {
            loader: false
        };

        $scope.withdraw = {
            amount: 0.00,
            comment: ''
        };

        // Check we are this user and have permission to request
        if($rootScope.account.id != $scope.data.ownerId) {
            // This is not our account, redirect asap
            $location.path('/403').replace();
        }

        $scope.withdrawRequest = function () {
            if($scope.withdraw.amount > 0) {
                // Post to API withdraw request
                ApiFactory.projects.withdrawRequest($scope.data.id, $scope.withdraw).success(function (response) {
                    // Show notification
                    AlertsService.add(200, 'Your request has been sent & will be processed by our team.');
                    // Close modal
                    $scope.cancel();
                }).error(function (response) {
                    console.log("Could not send the request at this time.");
                });
            }
        };

        // Dismiss
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);

app.controller('ProjectReportModalController', [ '$rootScope', '$scope', '$routeParams', '$location', '$cookies', '$window', 'ApiFactory', 'ModalsService', '$uibModalInstance', 'AlertsService', 'items', 'title', 'view',
    function ($rootScope, $scope, $routeParams, $location, $cookies, $window, ApiFactory, ModalsService, $uibModalInstance, AlertsService, items, title, view)
    {
        $scope.title        = title;

        $scope.templateView = view;

        $scope.data         = items;

        $scope.modal        = {
            loader: false
        };

        $scope.report = {
            text: ''
        };

        // Check we are this user and have permission to request
        /*if($rootScope.account.id != $scope.data.ownerId) {
            // This is not our account, redirect asap
            $location.path('/403').replace();
        }*/

        $scope.postReport = function () {
            var errors = "";

            // Check form validation
            if($scope.report.text.length == 0)
                errors += "Please enter a valid reason. for reporting this project.";

            if(errors.length > 0) {
                $rootScope.AlertModal(false, "Report Form Invalid", errors);
                return;
            }

            $scope.modal.loader = true;

            // Post to API withdraw request
            ApiFactory.projects.report($scope.data.project.id, $scope.report).success(function (response) {
                console.log(response);
                // Show notification
                AlertsService.add(200, 'Your report has been submitted & will be processed by our team.');
                // Close modal
                $scope.cancel();
            }).error(function (response) {
                console.log("Could not send the report at this time.");
                console.log(response);
                $scope.modal.loader = false;
            });
        };

        // Dismiss
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);

app.controller('PaymentModalController', [ '$rootScope', '$scope', '$routeParams', '$location', 'ApiFactory', '$uibModalInstance', 'ModalsService', 'items', 'title', 'view', 'stripe', 'AlertsService',
    function ($rootScope, $scope, $routeParams, $location, ApiFactory, $uibModalInstance, ModalsService, items, title, view, stripe, AlertsService) {
    // Show loader
    $scope.modal        = {
        loader: true
    };

    $scope.title = title;

    $scope.templateView = view;

    $scope.data = items;

    $scope.project = [];

    // Select donation type
    $scope.donationType = null;

    // Valid card types
    $scope.cardTypes = ['Visa', 'MasterCard', 'American Express', 'Descover', 'JCB'];

    // Card details
    $scope.payment  = {
        fullName: null,
        email: null,
        projectId: null,
        token: null,
        amount: 1.00,
        total: 1.00,
        anonymous: false
    };

    $scope.card = {
        number: null,
        exp_month: null,
        exp_year: null,
        cvc: null,
        address_zip: null
    };

    $scope.payemtSuccess = false;

    // Changes donation method
    // funds, paypal, card, shopping or null
    $scope.setDonationType = function (type) {
        $scope.donationType = type;

        // If type is shopping close modal
        if(type == "shopping") {
            $scope.cancel();
        }
    };

    if(!$rootScope.account.token) {
        $scope.setDonationType("card");
    }

    // Check if we have a related project
    if( $scope.data.projectId ) {
        ApiFactory.projects.get($scope.data.projectId, true).success(function (response) {
            // Push new project
            $scope.project = response.project;
            $scope.payment.projectId = $scope.project.id;
            // Set title
            $scope.title = 'Donate to ' + $scope.project.title;
            // Hide loader
            $scope.modal.loader = false;
        }).error(function (response) {
            // Hide loader
            $scope.modal.loader = false;
            console.log("Could not get project.");
        });
    }

    // If logged in then use account details
    if( $rootScope.account ) {
        $scope.payment.fullName = $rootScope.account.name;
        $scope.payment.email = $rootScope.account.email;
        $scope.card.name = $rootScope.account.name;

        console.log("Payment Details", $scope.account);
    }

    // Stripe charge
    $scope.charge = function () {
        $scope.modal.loader = true;
        return stripe.card.createToken($scope.card)
            .then(function (response) {
                // Log token from stripe
                console.log('token created for card ending in ', response.card.last4);

                // Copy scope to custom var
                var payment = angular.copy($scope.card);

                // Scrap card details
                payment = undefined;

                // Set token
                $scope.payment.token = response.id;

                // Log token for debug
                console.log('token created for card ', $scope.payment.token);

                // Validate with server
                // Attempt to make payment to stripe
                ApiFactory.projects.fund($scope.payment).success(function (response) {
                    console.log('successfully paid', response);

                    // Mark as payment successful
                    $scope.payemtSuccess = true;

                    // Show notification
                    AlertsService.add(200, 'You have funded ' + $scope.project.title + ' with £' + $scope.payment.amount);

                    // Reset form details
                    $scope.payment  = {
                        fullName: null,
                        email: null,
                        projectId: null,
                        token: null,
                        amount: 1.00,
                        total: 1.00,
                        anonymous: false
                    };

                    $scope.card = {
                        number: null,
                        exp_month: null,
                        exp_year: null,
                        cvc: null,
                        address_zip: null
                    };
                    $scope.modal.loader = false;
                }).error(function (response) {
                    console.log('There was an error: ', response);
                    $scope.modal.loader = false;
                });
            })
            .then(function (payment) {
                // Success
                console.log('successfully submitted payment for £', payment.amount);
            })
            .catch(function (err) {
                // Catch and print errors
                if (err.type && /^Stripe/.test(err.type)) {
                    console.log('Stripe error: ', err.message)
                    $scope.modal.loader = false;
                }
                else {
                    console.log('Other error occurred, possibly with your API', err.message)
                    $scope.modal.loader = false;
                }
            })
    };

    // CD Donation
    $scope.donate = function () {
        $scope.modal.loader = true;
        // Create temp data
        var donation = {
            amount: $scope.payment.amount,
            comment: $rootScope.account.name + ' donated £' + $scope.payment.amount + ' to ' + $scope.project.title
        };
        ApiFactory.projects.donate($scope.project.id, donation).success(function (response) {
            // Show notification
            AlertsService.add(200, 'You have donated £' + $scope.payment.amount + ' to ' + $scope.project.title);
            $scope.modal.loader = false;
        }).error(function (response) {
            console.log('There was an error: ', response);
            $scope.modal.loader = false;
        });
    };

    $scope.modal = {
        loader: false
    };

    // Dismiss
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);

app.controller('ShopModalController', [ '$rootScope', '$scope', '$routeParams', '$location', '$cookies', '$window', 'ApiFactory', 'ModalsService', '$uibModalInstance', 'AlertsService', 'items', 'title', 'view',
function ($rootScope, $scope, $routeParams, $location, $cookies, $window, ApiFactory, ModalsService, $uibModalInstance, AlertsService, items, title, view)
{
    $scope.title        = title;

    $scope.templateView = view;

    $scope.data         = items;

    $scope.modal        = {
        loader: false
    };

    $scope.shopText = $rootScope.getScreenText('shop-redirect-text');

    /**
     * Redirects to affiliate shop link
     */
    $scope.shopLink = function() {
        var win = window.open();
        // Redirect to shop
        ApiFactory.shops.link($scope.data.shop.id).success(function (response) {
            var link = response[0];
            win.location = link;
            ModalsService.closeAll();
        }).error(function (response) {
            // Log error
        });
    };

    /**
     * Shows login if users is not logged in
     */
    $scope.userLogin = function () {
        $scope.ne = ModalsService.openModal(
            'AuthModalController',      // Controller
            'Sign In',                    // Title
            'views/auth/signin.html',   // Template
            'md',                       // Size
            {}                          // Data
        );

        $scope.ne.result.then(function (data) {
            // Data returned from the modal when closed
            // Redirect to account
        });
    };

    // Dismiss
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);

app.controller('StoreCheckoutModalController', [ '$rootScope', '$scope', '$routeParams', '$location', '$cookies', '$window', 'ApiFactory', 'ModalsService', '$uibModalInstance', 'AlertsService', 'items', 'title', 'view',
    function ($rootScope, $scope, $routeParams, $location, $cookies, $window, ApiFactory, ModalsService, $uibModalInstance, AlertsService, items, title, view)
    {
        $scope.title        = title + ": " + items.product.name;

        $scope.templateView = view;

        $scope.data         = items;

        $scope.modal        = {
            loader: false
        };

        $scope.order = {
            subRange: "1",
            qty: 1,
            subscribe: false
        };

        $scope.isSubscribed = false;

        $scope.itemIsInCart = false;

        $scope.itemSub = null;

        // Functions
        $scope.addToCart = function () {
            // Setup data depending if subscription or not
            var itemData = {};

            if($scope.order.subscribe) {
                itemData = {
                    product_id: $scope.data.product.id,
                    subscription: $scope.order.subRange,
                    image: $scope.data.product.images[0],
                    isSubscription: 1
                }
            } else {
                itemData = {
                    product_id: $scope.data.product.id,
                    image: $scope.data.product.images[0],
                    isSubscription: 0
                }
            }

            if(!$rootScope.cart.getItemById($scope.data.product.id)) {
                $rootScope.cart.addItem(
                    //$rootScope.cart.getTotalItems() + 1,
                    $scope.data.product.id,
                    $scope.data.product.name,
                    $scope.data.product.price,
                    $scope.order.qty,
                    itemData
                );
                AlertsService.add(200, $scope.data.product.name + ' x' + $scope.order.qty + ' has been added to your cart.');
            } else {
                var cartItem = $rootScope.cart.getItemById($scope.data.product.id);
                cartItem.setQuantity($scope.order.qty);
                cartItem.setData(itemData);
                AlertsService.add(200, $scope.data.product.name + ' updated.');
            }
            $rootScope.$broadcast('ngCart:change', {});
            $scope.cancel();
        };

        $scope.checkSubscription = function () {
            // Set default to false
            $scope.isSubscribed = false;
            // Check if we are subscribed to item
            angular.forEach($rootScope.subscriptions, function (v, k) {
                angular.forEach(v.items, function(item, i) {
                    if(item.item.id === $scope.data.product.id) {
                        if(v.state === 'ACTIVE' || v.state === 'CREATED') {
                            $scope.isSubscribed = true;
                            $scope.itemSub = v;
                        }
                    }
                });
            });
        };

        $scope.checkCartItem = function () {
            if($rootScope.cart.getItemById($scope.data.product.id)) {
                var cartItem = $rootScope.cart.getItemById($scope.data.product.id);
                $scope.order.qty = cartItem.getQuantity();
                console.log("Item subscription data", cartItem.getData());

                // Check if current cart item is subscription based
                if(cartItem.getData().isSubscription === 1) {
                    $scope.order.subRange = cartItem.getData().subscription;
                    $scope.order.subscribe = true;
                    $scope.itemIsInCart = true;
                }
            } else {
                $scope.itemIsInCart = false;
            }
        };

        $scope.checkCartItem();
        $scope.checkSubscription();

        // Dismiss
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // Events
        $scope.$on('subscriptions-update', function(event, args) {
            console.log("Subscriptions Updated");
            $scope.checkSubscription();
        });
    }]);

app.controller('StoreReactivateModalController', [ '$rootScope', '$scope', '$routeParams', '$location', '$cookies', 'ApiFactory', 'ModalsService', '$uibModalInstance', 'AlertsService', 'items', 'title', 'view',
    function ($rootScope, $scope, $routeParams, $location, $cookies, ApiFactory, ModalsService, $uibModalInstance, AlertsService, items, title, view)
    {
        $scope.title        = title;

        $scope.templateView = view;

        $scope.data         = items;

        $scope.modal        = {
            loader: false
        };

        $scope.continue = function () {
            // Close modal
            $uibModalInstance.close(true);
        };

        // Dismiss
        $scope.cancel = function () {
            $uibModalInstance.dismiss(false);
        };
    }]);

app.controller('LogoutModalController', [ '$rootScope', '$scope', '$routeParams', '$location', '$cookies', '$window', 'ApiFactory', 'ModalsService', '$uibModalInstance', 'AlertsService', 'items', 'title', 'view',
    function ($rootScope, $scope, $routeParams, $location, $cookies, $window, ApiFactory, ModalsService, $uibModalInstance, AlertsService, items, title, view)
    {
        $scope.title        = title;

        $scope.templateView = view;

        $scope.data         = items;

        $scope.modal        = {
            loader: false
        };

        /**
         * Request logout
         */
        $scope.confirmLogout = function() {
            ApiFactory.auth.logout($rootScope.account.token).success(function (data) {
                // Delete the cookie
                $cookies.remove('shelping_com', {path: '/'});
                // Unset $rootScope data for the account
                $rootScope.account = [];
                // Show notification
                AlertsService.add(200, 'You have been logged out.');
                // Reload page
                $window.location = '/logout';
            }).error(function (data) {
                // Return error response
                // TODO create alert functionality
                console.log("Could not logout.");
            });
        };

        // Dismiss
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);

app.controller('AttachmentModalController', [ '$rootScope', '$scope', '$routeParams', '$location', '$cookies', 'ApiFactory', 'ModalsService', '$uibModalInstance', 'AlertsService', 'items', 'title', 'view',
function ($rootScope, $scope, $routeParams, $location, $cookies, ApiFactory, ModalsService, $uibModalInstance, AlertsService, items, title, view)
{
    $scope.title        = title;

    $scope.templateView = view;

    $scope.data         = items;

    $scope.modal        = {
        loader: false
    };

    $scope.projects = [];

    $scope.msgAttachment = {
        type: '',
        id: null
    };

    ApiFactory.users.getProjects($rootScope.account.id).success(function (response) {
        $scope.projects      = response.data;
    }).error(function (response) {
        console.log("Could not get the user projects.");
    });

    // Select attachment
    $scope.ok = function (type, id) {
        if(id) {
            $scope.msgAttachment.type = type;
            $scope.msgAttachment.id = id;
            $uibModalInstance.close($scope.msgAttachment);
        }
    };

    // Dismiss
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);

app.controller('LocationModalController', [ '$rootScope', '$scope', '$routeParams', '$location', 'ApiFactory', '$uibModalInstance', 'ModalsService', 'items', 'title', 'view', 'NgMap',
function ($rootScope, $scope, $routeParams, $location, ApiFactory, $uibModalInstance, ModalsService, items, title, view, NgMap)
{
    // Show loader
    $scope.modal        = {
        loader: true
    };

    $scope.title = title;

    $scope.templateView = view;

    $scope.data = items;

    // Hide loader
    $scope.modal = {
        loader: false
    };

    $scope.mapZoom = 4;

    $scope.addressType = "['address']";

    $scope.newMap = {
        location: '',
        lat: '55.378051',
        lon: '-3.435973',
        fullAddress: ''
    };

    // Select attachment
    $scope.ok = function () {
        if($scope.newMap.lat && $scope.newMap.lon) {
            $uibModalInstance.close($scope.newMap);
        }
    };

    // Dismiss
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    /**
     * Updates the lat and long to pass back to the view
     */
    $scope.updateLocation = function() {
        NgMap.getGeoLocation($scope.newMap.location).then(function(data){
            $scope.mapZoom = 16;
            $scope.newMap.lat = data.lat();
            $scope.newMap.lon = data.lng();
        });
    };

    // Check if we have location data
    if($scope.data.location) {
        $scope.newMap.location = $scope.data.location.name;
        $scope.updateLocation();
    }

}]);

app.controller('MessageModalController', [ '$rootScope', '$scope', '$routeParams', '$location', '$cookies', 'ApiFactory', 'ModalsService', '$uibModalInstance', 'AlertsService', 'items', 'title', 'view',
function ($rootScope, $scope, $routeParams, $location, $cookies, ApiFactory, ModalsService, $uibModalInstance, AlertsService, items, title, view)
{
    $scope.title        = title;

    $scope.templateView = view;

    $scope.data         = items;

    $scope.modal        = {
        loader: false
    };

    $scope.newForm = {
        recipient: $scope.data.user,
        message: '',
        profile: null,
        attachment: null
    };

    $scope.sendMsg = function () {
        $scope.modal.loader = true;
        ApiFactory.users.sendMessage($scope.account.id,$scope.newForm).success(function (response) {
            // Show notification
            AlertsService.add(200, 'Your message has been sent!');
            // Close modal
            $scope.cancel();
        }).error(function (response) {
            console.log("Could not send the message.");
        });
    };

    $scope.attachment = function () {

        if( $rootScope.account.token ) {
            // Open relative modal
            $scope.ne = ModalsService.openModal(
                'AttachmentModalController',        // Controller
                'Attach your Profile or a Project', // Title
                'views/modals/attachment.html',     // Template
                'lg',                               // Size
                {}                                  // Data

            );
        } else {
            $rootScope.auth.getLogin();
        }

        $scope.ne.result.then(function (data) {
            // Data returned from the modal when closed
            if(data.type == 'profile'){
                $scope.msgForm.profile = data.id;
            }
            if(data.type == 'project'){
                $scope.msgForm.attachment = data.id;
            }
        });

    };

    // Dismiss
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);

app.controller('AlertModalController', [ '$rootScope', '$scope', '$routeParams', '$location', '$cookies', 'ApiFactory', 'ModalsService', '$uibModalInstance', 'AlertsService', 'items', 'title', 'view',
    function ($rootScope, $scope, $routeParams, $location, $cookies, ApiFactory, ModalsService, $uibModalInstance, AlertsService, items, title, view)
    {
        $scope.title        = title;

        $scope.templateView = view;

        $scope.data         = items;

        $scope.modal        = {
            loader: false
        };

        $scope.ok = function () {
            // Close modal
            $uibModalInstance.close(true);
        };

        // Dismiss
        $scope.cancel = function () {
            $uibModalInstance.dismiss(false);
        };
    }]);

app.controller('ConfirmationModalController', [ '$rootScope', '$scope', '$routeParams', '$location', '$cookies', 'ApiFactory', 'ModalsService', '$uibModalInstance', 'AlertsService', 'items', 'title', 'view',
    function ($rootScope, $scope, $routeParams, $location, $cookies, ApiFactory, ModalsService, $uibModalInstance, AlertsService, items, title, view)
    {
        $scope.title        = title;

        $scope.templateView = view;

        $scope.data         = items;

        $scope.modal        = {
            loader: false
        };

        $scope.ok = function () {
            // Close modal
            $uibModalInstance.close(true);
        };

        // Dismiss
        $scope.cancel = function () {
            $uibModalInstance.close(false);
        };
    }]);

app.controller('ShareModalController', [ '$rootScope', '$scope', '$routeParams', '$location', '$cookies', 'ApiFactory', 'ModalsService', '$uibModalInstance', 'AlertsService', 'items', 'title', 'view',
    function ($rootScope, $scope, $routeParams, $location, $cookies, ApiFactory, ModalsService, $uibModalInstance, AlertsService, items, title, view)
    {
        $scope.title        = title;

        $scope.templateView = view;

        $scope.data         = items;

        $scope.modal        = {
            loader: false
        };

        $scope.ok = function () {
            // Close modal
            $uibModalInstance.close(true);
        };

        // Dismiss
        $scope.cancel = function () {
            $uibModalInstance.dismiss(false);
        };
    }]);

app.controller('AccountWithdrawModalController', [ '$rootScope', '$scope', '$routeParams', '$location', '$cookies', '$window', 'ApiFactory', 'ModalsService', '$uibModalInstance', 'AlertsService', 'items', 'title', 'view',
    function ($rootScope, $scope, $routeParams, $location, $cookies, $window, ApiFactory, ModalsService, $uibModalInstance, AlertsService, items, title, view)
    {
        $scope.title        = title;

        $scope.templateView = view;

        $scope.data         = items;

        $scope.modal        = {
            loader: false
        };

        $scope.withdraw = {
            amount: 0.00,
            comment: ''
        };

        // Check we are this user and have permission to request
        if($rootScope.account.id != $scope.data.id) {
            // This is not our account, redirect asap
            $location.path('/403').replace();
        }

        $scope.withdrawRequest = function () {
            // Post to API withdraw request
            ApiFactory.users.withdrawRequest($scope.account.id,$scope.withdraw).success(function (response) {
                // Show notification
                AlertsService.add(200, 'Your request has been sent & will be processed by our team.');
                // Close modal
                $scope.cancel();
            }).error(function (response) {
                console.log("Could not send the request at this time.");
            });
        };

        // Dismiss
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);

app.controller('AccountFundsModalController', [ '$rootScope', '$scope', '$routeParams', '$location', 'ApiFactory', '$uibModalInstance', 'ModalsService', 'items', 'title', 'view', 'AlertsService',
function ($rootScope, $scope, $routeParams, $location, ApiFactory, $uibModalInstance, ModalsService, items, title, view, AlertsService) {
    // Show loader
    $scope.modal        = {
        loader: true
    };

    $scope.title = title;

    $scope.templateView = view;

    $scope.data = items;

    // Select donation type
    $scope.donationType = null;

    // Valid card types
    $scope.cardTypes = ['Visa', 'MasterCard', 'American Express', 'Descover', 'JCB'];

    // Card details
    $scope.payment  = {
        fullName: null,
        email: null,
        projectId: null,
        token: null,
        amount: 1.00,
        total: 1.00,
        anonymous: false
    };

    $scope.card = {
        number: null,
        exp_month: null,
        exp_year: null,
        cvc: null,
        address_zip: null
    };

    $scope.payemtSuccess = false;

    /**
     * Changes fund type
     * @param type = funds, paypal, card, shopping or null
     */
    $scope.setDonationType = function (type) {
        $scope.donationType = type;

        // If type is shopping close modal
        if(type == "shopping") {
            $scope.cancel();
        }
    };

    if(!$rootScope.account.token) {
        $scope.setDonationType("card");
    }

    // Check if we have a related project
    if( $scope.data.projectId ) {
        ApiFactory.projects.get($scope.data.projectId, true).success(function (response) {
            // Push new project
            $scope.project = response.project;
            $scope.payment.projectId = $scope.project.id;
            // Set title
            $scope.title = 'Donate to ' + $scope.project.title;
            // Hide loader
            $scope.modal.loader = false;
        }).error(function (response) {
            // Hide loader
            $scope.modal.loader = false;
            console.log("Could not get project.");
        });
    }

    // If logged in then use account details
    if( $rootScope.account ) {
        $scope.payment.fullName = $rootScope.account.name;
        $scope.card.name = $rootScope.account.name;
    }

    /**
     * Stripe Charge
     * @returns {*}
     */
    $scope.charge = function () {
        $scope.modal.loader = true;
        return stripe.card.createToken($scope.card)
            .then(function (response) {
                // Log token from stripe
                console.log('token created for card ending in ', response.card.last4);

                // Copy scope to custom var
                var payment = angular.copy($scope.card);

                // Scrap card details
                payment = undefined;

                // Set token
                $scope.payment.token = response.id;

                // Log token for debug
                console.log('token created for card ', $scope.payment.token);

                // Validate with server
                // Attempt to make payment to stripe
                ApiFactory.projects.fund($scope.payment).success(function (response) {
                    console.log('successfully paid', response);

                    // Mark as payment successful
                    $scope.payemtSuccess = true;

                    // Show notification
                    AlertsService.add(200, 'You have funded ' + $scope.project.title + ' with £' + $scope.payment.amount);

                    // Reset form details
                    $scope.payment  = {
                        fullName: null,
                        email: null,
                        projectId: null,
                        token: null,
                        amount: 1.00,
                        total: 1.00,
                        anonymous: false
                    };

                    $scope.card = {
                        number: null,
                        exp_month: null,
                        exp_year: null,
                        cvc: null,
                        address_zip: null
                    };
                    $scope.modal.loader = false;
                }).error(function (response) {
                    console.log('There was an error: ', response);
                    $scope.modal.loader = false;
                });
            })
            .then(function (payment) {
                // Success
                console.log('successfully submitted payment for £', payment.amount);
            })
            .catch(function (err) {
                // Catch and print errors
                if (err.type && /^Stripe/.test(err.type)) {
                    console.log('Stripe error: ', err.message)
                    $scope.modal.loader = false;
                }
                else {
                    console.log('Other error occurred, possibly with your API', err.message)
                    $scope.modal.loader = false;
                }
            })
    };

    /**
     * CD Donation
     */
    $scope.donate = function () {
        $scope.modal.loader = true;
        // Create temp data
        var donation = {
            amount: $scope.payment.amount,
            comment: $rootScope.account.name + ' donated £' + $scope.payment.amount + ' to ' + $scope.project.title
        };
        ApiFactory.projects.donate($scope.project.id, donation).success(function (response) {
            // Show notification
            AlertsService.add(200, 'You have donated £' + $scope.payment.amount + ' to ' + $scope.project.title);
            $scope.modal.loader = false;
        }).error(function (response) {
            console.log('There was an error: ', response);
            $scope.modal.loader = false;
        });
    };

    $scope.modal = {
        loader: false
    };

    // Dismiss
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);

app.controller('AccountSubscriptionModalController', [ '$rootScope', '$scope', '$routeParams', '$location', '$cookies', '$window', 'ApiFactory', 'ModalsService', '$uibModalInstance', 'AlertsService', 'items', 'title', 'view',
    function ($rootScope, $scope, $routeParams, $location, $cookies, $window, ApiFactory, ModalsService, $uibModalInstance, AlertsService, items, title, view)
    {
        $scope.title        = title + " - " + items.subscription.state;

        $scope.templateView = view;

        $scope.data         = items;

        $scope.modal        = {
            loader: false
        };

        $scope.url          = $location.absUrl();

        $scope.cancelSub    = false;

        $scope.totalPrice   = $scope.data.subscription.price;

        $scope.plan = $rootScope.getSubscriptionPlanByDuration($scope.data.subscription.duration);

        $scope.subsToPay = [];

        $scope.showPaymentForm = false;

        $scope.hideClose = true;

        console.log($rootScope.subscriptionPlans);
        console.log($scope.plan);

        angular.forEach($scope.data.subscription.items, function(v,k){
            v.newPlan = $scope.plan;
        });

        // Cart vars
        $scope.showCheckout = false;
        $scope.paymentProcessing = false;
        $scope.paymentProcessingComplete = null;
        $scope.project = null;
        $scope.projectId = null;
        $scope.showResult = false;
        $scope.orderResult = {};
        $rootScope.dataLoading = false;

        $scope.updateSubscriptionsOnly = false;

        $scope.cartProjects = [];

        // Valid card types
        $scope.cardTypes = ['Visa', 'MasterCard', 'American Express', 'Descover', 'JCB'];

        $scope.cartData = {
            items: [],
            userId: null,
            address: '',
            stripeToken: null,
            projectId: '',
            storeCard: false,
            sameAddress: false,
            useExistingCard: false,
            address_line1: '',
            address_line2: '',
            address_city: '',
            address_state: '',
            address_zip: ''
        };

        $scope.card = {
            number: null,
            exp_month: null,
            exp_year: null,
            cvc: null,
            name: '',
            address_country: 'UK',
            address_line1: '',
            address_line2: '',
            address_city: '',
            address_state: '',
            address_zip: ''
        };

        // Set user id if logged in
        if($rootScope.account) {
            $scope.cartData.userId = $rootScope.account.id;
            $scope.cartData.email = $rootScope.account.email;
            $scope.card.name = $rootScope.account.name;
        }

        $scope.closeAlert = function () {
            $scope.paymentProcessing = false;
            $scope.paymentProcessingComplete = null;
            $uibModalInstance.close(true);
        };

        var newSubscriptions = [];
        var newItems = {items: []};
        var itemsToSwap = {items: []};
        var index = -1;
        var finalSwapData = [];
        var processComplete = false;

        $scope.updateAddress = function() {
            if($scope.cartData.sameAddress) {
                // Set card address to the same as delivery address
                $scope.card.address_line1   = $scope.cartData.address_line1;
                $scope.card.address_line2   = $scope.cartData.address_line2;
                $scope.card.address_city    = $scope.cartData.address_city;
                $scope.card.address_state   = $scope.cartData.address_state;
                $scope.card.address_zip     = $scope.cartData.address_zip;
            } else {
                // Reset card address
                $scope.card.address_line1   = "";
                $scope.card.address_line2   = "";
                $scope.card.address_city    = "";
                $scope.card.address_state   = "";
                $scope.card.address_zip     = "";
            }
        };

        /**
         * process all purchases and subscriptions
         */
        $scope.checkout = function (form) {
            //$scope.paymentProcessing = true;

            // Do a validation check
            if(form.$invalid) {
                console.log(form.$error.required);
                var errors = null;
                // Gather all errors form.$error.required
                $rootScope.AlertModal(false, 'Checkout Form Invalid', 'Please check the Checkout form for invalid fields.');
                return;
            }

            $scope.paymentProcessing = true;
            $scope.cartData.items = [];

            angular.forEach(newSubscriptions, function (v, k) {
                $scope.cartData.items.push(v);
            });

            //$scope.cartData.userId = null;
            $scope.cartData.address = $scope.card.address_line1 + ", " + $scope.card.address_line2 + ", " + $scope.card.address_city + ", " + $scope.card.address_state + ", " + $scope.card.address_zip;
            $scope.cartData.stripeToken = null;

            // Set card details
            $scope.cartData.card = $scope.card;

            // Set user id if logged in
            if($rootScope.account && $scope.cartData.useExistingCard)
                $scope.cartData.stripeToken = $rootScope.account.cardToken;

            console.log("Final Subs Payment:", $scope.cartData);

            ApiFactory.users.createSubscription($scope.cartData).success(function (response) {
                console.log("Payment Response",response);
                $scope.paymentProcessingComplete = "Success";
                $scope.processSubscriptionUpdates();
                AlertsService.add(200, 'Your subscriptions have been created.');
            }).error(function (response) {
                console.log("Payment Response",response);
                //$scope.paymentProcessingComplete = "Error";
            });
        };

        /**
         * Toggle cancel subscription alert
         */
        $scope.toggleAlert = function () {
            $scope.cancelSub = !$scope.cancelSub;
        };

        /**
         * Update subscription qty
         * @param newVal
         */
        $scope.qtyChange = function (index, newVal) {
            $scope.data.subscription.items[index].quantity = newVal;

            // TODO recalculate new price
            var calcPrice = 0;
            angular.forEach($scope.data.subscription.items, function (v, k) {
                calcPrice += (v.item.price * v.quantity);
            });
            $scope.totalPrice   = calcPrice;
        };

        $scope.itemQueueProcess = function () {
            // checking the items in the sub if it needs to be paid for when moved to new subscription
            // Check if current subscription is active
            angular.forEach($rootScope.subscriptions, function (v, k) {
                if(v.id === $scope.data.subscription.id) {
                    index = k;
                }
            });

            // Create new item arrays
            angular.forEach($scope.data.subscription.items, function (v, k) {
                // If item has same subscription plan id as current subscription
                if(parseInt(v.newPlan) === $scope.plan) {
                    // Add item to subscription items
                    newItems.items.push({
                        itemId: v.item.id,
                        quantity: v.quantity
                    })
                } else {
                    // Add item to be swapped to another subscription
                    itemsToSwap.items.push({
                        itemId: v.item.id,
                        quantity: v.quantity,
                        plan: parseInt(v.newPlan)
                    })
                }
            });
        };

        $scope.processItemSwap = function (){
            finalSwapData = [];

            // First build data for transaction
            angular.forEach(itemsToSwap.items, function (v, k) {
                if (newSubscriptions[v.plan]) {
                    newSubscriptions[v.plan].items.push({
                        itemId: v.itemId,
                        quantity: v.quantity
                    })
                } else {
                    newSubscriptions[v.plan] = {
                        planId: v.plan,
                        userId: $rootScope.account.id,
                        items: [
                            {
                                itemId: v.itemId,
                                quantity: v.quantity
                            }
                        ],
                        attemptConfirmation: true,
                        address: "Secret street 21"
                    };
                }
            });

            console.log("New Subscriptions:", newSubscriptions);

            // Now check if newSubscriptions are active or need payment
            // TODO This is where we swap items or put them in array to pay for
            angular.forEach(newSubscriptions, function (v, k) {
                // Get plan by id
                var plan = $rootScope.getSubscriptionPlanById(parseInt(v.planId));
                var currentSubscription = null;

                // Check if we are subscribed to item
                angular.forEach($rootScope.subscriptions, function (v, k) {
                    // Check if subscribing
                    if (plan != null && v.duration === plan.interval) {
                        currentSubscription = v;
                    }
                });

                // if the subscription already exists for the account
                if (currentSubscription) {
                    var currentToSwap = {items: []};
                    // Update the subscription items
                    for (var i = 0; i < currentSubscription.items.length; i++) {
                        v.items.push({
                            itemId: currentSubscription.items[i].item.id,
                            quantity: currentSubscription.items[i].quantity
                        });
                    }
                    for (var i = 0; i < v.items.length; i++) {
                        currentToSwap.items.push({
                            itemId: v.items[i].itemId,
                            quantity: v.items[i].quantity
                        });
                    }

                    finalSwapData.push({
                        subId: currentSubscription.id,
                        item: currentToSwap
                    });
                } else {
                    // Subscription does not exists for user
                    // Add to subscriptions we need to pay for
                    $scope.subsToPay.push(v);
                }
            });
        };

        $scope.processSubscriptionUpdates = function() { // use finalSwapData
            $scope.modal.loader = true;
            angular.forEach(finalSwapData, function(v,k){
                ApiFactory.users.updateSubscription(v.subId, v.item).success(function (response) {
                    // Show alert
                    //AlertsService.add(200, 'Subscription #' + $scope.data.subscription.id + ' has been updated.');
                    // Broadcast change
                    $rootScope.$broadcast('subscriptions-update');
                    // Reorganize subscriptions for view
                    $rootScope.organizeSubscriptions();
                    processComplete = true;
                }).error(function (response) {
                    console.log('There was an error: ', response);
                });
            });

            // Attempt to update the current subscription items now that we have
            // exchanged all items
            if(index != -1) {
                // Attempt to update the subscription
                ApiFactory.users.updateSubscription($scope.data.subscription.id, newItems).success(function (response) {
                    // Show alert
                    AlertsService.add(200, 'Subscription #' + $scope.data.subscription.id + ' has been updated.');
                    // Broadcast change
                    $rootScope.$broadcast('subscriptions-update');
                    // Reorganize subscriptions for view
                    /*$rootScope.organizeSubscriptions();*/
                    $scope.modal.loader = false;
                }).error(function (response) {
                    console.log('There was an error: ', response);
                    $scope.modal.loader = false;
                });
            }
        };

        /**
         * Stores all changes to subscriptions based on subscription ID
         * TODO need to exchange items only after payment form submitted
         * @param newId = Subscription Id
         */
        $scope.updateSubscription = function () {
            // Get the subscription index
            index = -1;
            newItems = {items: []};
            itemsToSwap = {items: []};
            processComplete = false;

            $scope.itemQueueProcess();
            $scope.processItemSwap();

            // Check if we have items to be swapped
            if(itemsToSwap.items.length > 0) {
                // Check if we need to pay for any subscriptions
                if ($scope.subsToPay.length > 0) {
                    $scope.showPaymentForm = true;
                    return;
                }
            }

            $scope.processSubscriptionUpdates();
        };

        /**
         * Removes a single item from the subscription
         * @param i = item index
         */
        $scope.removeItemSubscription = function(i) {
            $scope.modal.loader = true;
            $rootScope.ConfirmationModal(false, 'Remove Subscription Item', 'Are you sure you would like to remove ' + $scope.data.subscription.items[i].name + ' from your subscription?').then(function(result) {
                if(result) {
                    var newItems = {items: []};

                    // Remove the item from subscription items
                    $scope.data.subscription.items.splice(i, 1);
                    // Recompile an array of items
                    angular.forEach($scope.data.subscription.items, function (v, k) {
                        newItems.items.push({
                            itemId: v.item.id,
                            quantity: v.quantity
                        })
                    });
                    // Update subscription
                    ApiFactory.users.updateSubscription($scope.data.subscription.id, newItems).success(function (response) {
                        // Show alert
                        AlertsService.add(200, 'Subscription #' + $scope.data.subscription.id + ' has been updated.');
                        // Broadcast change
                        $rootScope.$broadcast('subscriptions-update');
                        // Reorganize subscriptions for view
                        $rootScope.organizeSubscriptions();
                        $scope.modal.loader = false;
                    }).error(function (response) {
                        console.log('There was an error: ', response);
                    });
                }
            });
        };

        $scope.subscriptionPayment = function (subscriptions) {
            // Open relative modal
            $scope.ne = ModalsService.openModal(
                'AccountSubscriptionPaymentModalController',  // Controller
                'Subscription payment details', // Title
                'views/modals/subscription-payment-form.html',    // Template
                'lg',                       // Size
                {
                    subtext: "Some of the changes you have made require you to confirm your card details, please fill in the following form to continue with your changes.",
                    subscriptions: subscriptions
                }                          // Data
            );

            $scope.ne.result.then(function (data) {
                // Data returned from the modal when closed
                console.log(data);

                //$scope.cancel();
            });
        };


        /**
         * Cancels current subscription
         */
        /* Todo Call API to remove subscription before splicing from account sub array */
        $scope.cancelSubscription = function () {
            // Get the subscription index
            var index = -1;
            angular.forEach($rootScope.subscriptions, function (v, k) {
                if(v.id === $scope.data.subscription.id) {
                    index = k;
                }
            });

            // Attempt to cancel the subscription
            if(index != -1) {
                $scope.modal.loader = true;
                var newItems = {items: []};

                // Attempt to cancel the subscription

                // Attempt to update the subscription
                ApiFactory.users.updateSubscription($scope.data.subscription.id, newItems).success(function (response) {
                    // Show alert
                    AlertsService.add(200, 'Subscription #' + $scope.data.subscription.id + ' has been canceled.');
                    // Broadcast change
                    $rootScope.$broadcast('subscriptions-update');
                    // Reorganize subscriptions for view
                    $rootScope.organizeSubscriptions();
                    $uibModalInstance.close(true);
                }).error(function (response) {
                    console.log('There was an error: ', response);
                });
            }
        };

        // Dismiss
        $scope.cancel = function () {
            //$uibModalInstance.dismiss('cancel');
            $uibModalInstance.close(false);
        };
    }]);

app.controller('AccountSubscriptionPaymentModalController', [ '$rootScope', '$scope', '$routeParams', '$location', 'ApiFactory', '$uibModalInstance', 'ModalsService', 'items', 'title', 'view', 'stripe', 'AlertsService',
    function ($rootScope, $scope, $routeParams, $location, ApiFactory, $uibModalInstance, ModalsService, items, title, view, stripe, AlertsService) {
        // Show loader
        $scope.modal        = {
            loader: true
        };

        $scope.title = title;

        $scope.templateView = view;

        $scope.data = items;

        console.log($scope.data);

        $scope.paymentProcessing = false;
        $scope.paymentProcessingComplete = null;
        $scope.project = null;
        $scope.projectId = null;
        $rootScope.dataLoading = false;

        $scope.cartProjects = [];

        // Valid card types
        $scope.cardTypes = ['Visa', 'MasterCard', 'American Express', 'Descover', 'JCB'];

        $scope.cartData = {
            items: [],
            userId: $rootScope.account.id,
            address: '',
            stripeToken: null,
            email: $rootScope.account.email
        };

        $scope.card = {
            name: $rootScope.account.name,
            number: null,
            exp_month: null,
            exp_year: null,
            cvc: null,
            address_country: 'UK',
            address_line1: null,
            address_line2: null,
            address_city: null,
            address_state: null,
            address_zip: null
        };

        /**
         * process all purchases and subscriptions
         */
        $scope.checkout = function () {
            $scope.paymentProcessing = true;

            $scope.cartData.items = $scope.data.subscriptions;
            //$scope.cartData.userId = null;
            $scope.cartData.address = $scope.card.address_line1 + ", " + $scope.card.address_line2 + ", " + $scope.card.address_city + ", " + $scope.card.address_state + ", " + $scope.card.address_zip;
            $scope.cartData.stripeToken = null;

            stripe.card.createToken($scope.card)
                .then(function (response) {
                    if(response.error) {
                        $scope.paymentProcessingComplete = "Error";
                        console.error("There was an error.");
                        return;
                    }
                    // Log token from stripe
                    console.log('token created for card ending in ', response.card.last4);

                    // Set token
                    $scope.cartData.stripeToken = response.id;

                    // Set card details
                    $scope.cartData.card = $scope.card;

                    // Log token for debug
                    console.log('token created for card ', $scope.cartData.stripeToken);

                    // Set user id if logged in
                    if($rootScope.account) {
                        $scope.cartData.userId = $rootScope.account.id;
                        $scope.cartData.email = $rootScope.account.email;
                    }

                    console.log("New Subs Payment:", $scope.cartData);

                    ApiFactory.cart.checkout($scope.cartData).success(function (response) {
                        console.log("Payment Response",response);
                        //$scope.paymentProcessingComplete = "Success";
                        //AlertsService.add(200, 'Your subscriptions have been created.');
                        $uibModalInstance.close(true);
                    }).error(function (response) {
                        //$scope.paymentProcessingComplete = "Error";
                        $uibModalInstance.close(false);
                    });
                });
        };

        $scope.modal = {
            loader: false
        };

        // Dismiss
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }]);

app.controller('AccountNotificationsModalController', [ '$rootScope', '$scope', '$routeParams', '$location', '$cookies', '$window', 'ApiFactory', 'ModalsService', '$uibModalInstance', 'AlertsService', 'items', 'title', 'view',
    function ($rootScope, $scope, $routeParams, $location, $cookies, $window, ApiFactory, ModalsService, $uibModalInstance, AlertsService, items, title, view)
    {
        $scope.title        = title;

        $scope.templateView = view;

        $scope.data         = items;

        $scope.modal        = {
            loader: false
        };

        $scope.url          = $location.absUrl();

        // Scrollbar
        $scope.scrollerSettings = {
            autoHideScrollbar: true,
            advanced:{
                updateOnContentResize: true
            },
            setHeight: 600,
            scrollInertia: 0,
            scrollButtons: {
                scrollAmount: 'auto', // scroll amount when button pressed
                enable: false // enable scrolling buttons by default
            },
            axis: 'y'
        };

        /**
         * Determine if notification has a view page
         * @param notification
         * @returns {boolean}
         */
        $scope.canView = function (notification) {
            // what to do with type
            switch (notification.type) {
                case 'OWNED_PROJECT_FUND_INCOME':
                    return true;
                    break;
                case 'OWNED_PROJECT_GOT_DONATION':
                    return true;
                    break;
                case 'PROJECT_APPROVED':
                    return true;
                    break;
                case 'OWNED_PROJECT_DELETED':
                    return true;
                    break;
                case 'CHAT_MESSAGE':
                    return true;
                    break;
                case 'NEW_INTERESTING_PROJECT':
                    return true;
                    break;
                default:
                    return false;
                    break;
            }
        };

        /**
         * If notification can be viewed, determine what route to redirect to.
         * @param notification
         */
        $scope.viewNotification = function (notification) {
            // what to do with type
            switch (notification.type) {
                case 'OWNED_PROJECT_FUND_INCOME':
                    $location.path('projects/' + notification.payload.data.projectId);
                    break;
                case 'OWNED_PROJECT_GOT_DONATION':
                    $location.path('projects/' + notification.payload.data.projectId);
                    break;
                case 'PROJECT_APPROVED':
                    $location.path('projects/' + notification.payload.data.projectId);
                    break;
                case 'OWNED_PROJECT_DELETED':
                    $location.path('projects/' + notification.payload.data.projectId);
                    break;
                case 'CHAT_MESSAGE':
                    $location.path('profile/' + $rootScope.account.id + '/messages/' + notification.payload.data.chatId + '#' + notification.payload.data.msgId);
                    break;
                case 'NEW_INTERESTING_PROJECT':
                    $location.path('projects/' + notification.payload.data.projectId);
                    break;
            }

            // close modal
            $scope.cancel();
        };

        /**
         * Deletes notification based on Id
         * @param id = Notification ID
         */
        $scope.deleteNotification = function (id) {
            $rootScope.ConfirmationModal(
                false,
                'Delete Notification',
                'Are you sure you would like to delete this notification?').then(function(result) {
                if (result) {
                    $scope.modal.loader = true;
                    ApiFactory.users.removeNotification($rootScope.account.id, id).success(function (result) {
                        console.log(result);
                        $rootScope.getNotifications();
                        $scope.modal.loader = false;
                        AlertsService.add(200, 'Notification was deleted!');
                        //$rootScope.notifications = result.data;
                    }).error(function (result) {
                        console.log(result);
                        AlertsService.add(200, 'Could not delete the current notification!');
                        $scope.modal.loader = false;
                    });
                }
            });
        };

        // Dismiss
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);

app.controller('HelpModalController', [ '$rootScope', '$scope', '$routeParams', '$location', 'ApiFactory', '$uibModalInstance', 'ModalsService', 'items', 'title', 'view', 'AlertsService',
    function ($rootScope, $scope, $routeParams, $location, ApiFactory, $uibModalInstance, ModalsService, items, title, view, AlertsService) {
        // Show loader
        $scope.modal        = {
            loader: true
        };

        $scope.title = title;

        $scope.templateView = view;

        $scope.data = items;

        // Show help screen
        $scope.screenHelp = $rootScope.getHelpText($scope.data.id);

        $scope.modal = {
            loader: false
        };

        // Dismiss
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }]);

app.controller('FeedbackModalController', [ '$rootScope', '$scope', '$routeParams', '$location', '$cookies', '$window', 'ApiFactory', 'ModalsService', '$uibModalInstance', 'AlertsService', 'items', 'title', 'view',
    function ($rootScope, $scope, $routeParams, $location, $cookies, $window, ApiFactory, ModalsService, $uibModalInstance, AlertsService, items, title, view)
    {
        $scope.title        = title;

        $scope.templateView = view;

        $scope.data         = items;

        $scope.modal        = {
            loader: false
        };

        $scope.feedback = {
            type: 'FEEDBACK',
            text: ''
        };

        // Check we are this user and have permission to request
        /*if($rootScope.account.id != $scope.data.ownerId) {
         // This is not our account, redirect asap
         $location.path('/403').replace();
         }*/

        $scope.postFeedback = function () {
            var errors = "";

            // Check form validation
            if($scope.feedback.text.length == 0)
                errors += "Please enter valid feedback, the feedback message must not be empty.";

            if(errors.length > 0) {
                $rootScope.AlertModal(false, "Feedback Form Invalid", errors);
                return;
            }

            $scope.modal.loader = true;

            // Post to API withdraw request
            ApiFactory.global.feedback($scope.feedback).success(function (response) {
                console.log(response);
                // Show notification
                AlertsService.add(200, 'Your feedback has been submitted & will be processed by our team.');
                // Close modal
                $scope.cancel();
            }).error(function (response) {
                console.log("Could not send the feedback at this time.");
                console.log(response);
                $scope.modal.loader = false;
            });
        };

        // Dismiss
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);

app.controller('CartRedirectModalController', [ '$rootScope', '$scope', '$routeParams', '$location', '$cookies', '$window', 'ApiFactory', 'ModalsService', '$uibModalInstance', 'AlertsService', 'items', 'title', 'view',
    function ($rootScope, $scope, $routeParams, $location, $cookies, $window, ApiFactory, ModalsService, $uibModalInstance, AlertsService, items, title, view)
    {
        $scope.title        = title;

        $scope.templateView = view;

        $scope.data         = items;

        $scope.modal        = {
            loader: false
        };

        $scope.cartForm = {
            email: ''
        };

        /*$scope.storeUserCart = function () {
            var errors = "";

            // Check form validation
            if($scope.feedback.text.length == 0)
                errors += "Please enter valid feedback, the feedback message must not be empty.";

            if(errors.length > 0) {
                $rootScope.AlertModal(false, "Feedback Form Invalid", errors);
                return;
            }

            $scope.modal.loader = true;

            // Post to API withdraw request
            ApiFactory.global.feedback($scope.feedback).success(function (response) {
                console.log(response);
                // Show notification
                AlertsService.add(200, 'Your feedback has been submitted & will be processed by our team.');
                // Close modal
                $scope.cancel();
            }).error(function (response) {
                console.log("Could not send the feedback at this time.");
                console.log(response);
                $scope.modal.loader = false;
            });
        };*/

        // Dismiss
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);

// endregion