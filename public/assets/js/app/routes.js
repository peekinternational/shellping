/**
 * Created by Ben.Hamlett on 12/04/2017.
 */
// Angular Routes
app.config(function configure($routeProvider, $locationProvider) {
    // Dashboard
    $routeProvider

    /** Frontend */

    // Home
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeController',
            label: 'Home',
            options: {hidden: true}
        })
        .when('/403', {
            templateUrl: 'views/403.html'
        })
        .when('/404', {
            templateUrl: 'views/404.html'
        })
        .when('/advertorial', {
            templateUrl: 'views/advertorial.html'
        })
        .when('/terms-of-service', {
            templateUrl: 'views/terms-of-service.html',
            label: 'Terms of Service'
        })
        .when('/privacy-policy', {
            templateUrl: 'views/privacy-policy.html',
            label: 'Privacy Policy'
        })
        .when('/calculator', {
            templateUrl: 'views/calculator.html',
            controller: 'FundCalculatorController',
            label: 'Funds Calculator'
        })
        .when('/projects', {
            templateUrl: 'views/projects/index.html',
            controller: 'CategoryController',
            label: 'Projects'
        })
        .when('/projects/create', {
            templateUrl: 'views/projects/create.html',
            controller: 'ProjectCreateController',
            loginRequired: true,
            label: 'Create Project'
        })
        .when('/projects/:id/edit', {
            templateUrl: 'views/projects/create.html',
            controller: 'ProjectCreateController',
            loginRequired: true,
            label: 'Edit Project'
        })
        .when('/projects/:id?', {
            templateUrl: 'views/projects/view.html',
            controller: 'ProjectViewController',
            label: 'Project'
        })
        .when('/projects/:id/payments', {
            templateUrl: 'views/modals/payment.html'
        })
        .when('/projects/:id/claim?', {
            templateUrl: 'views/projects/transfer.html',
            controller: 'ProjectClaimController',
            loginRequired: true,
            label: 'Claim Project Ownership'
        })
        .when('/projects?', {
            templateUrl: 'views/projects/index.html',
            controller: 'CategoryController'
        })
        /*.when('/users?', {
            templateUrl: 'views/users/index.html',
            controller: 'UsersIndexController',
            label: 'Users'

        })*/
        .when('/users/:id', {
            templateUrl: 'views/users/view.html',
            controller: 'UsersViewController',
            label: 'Users'

        })
        .when('/account/password/reset?', {
            templateUrl: 'views/users/password-reset.html',
            controller: 'UsersPasswordResetController',
            label: 'Reset Password'

        })
        .when('/account/signup?', {
            templateUrl: 'views/account/signup.html',
            controller: 'AccountSignupController',
            label: 'Account Signup'
        })
        .when('/account/:id/edit', {
            templateUrl: 'views/account/edit.html',
            controller: 'UserEditController',
            loginRequired: true,
            idCheck: true,
            label: 'Account Profile'
        })
        .when('/account/:id/edit/password', {
            templateUrl: 'views/account/editPassword.html',
            controller: 'UserEditPasswordController',
            loginRequired: true,
            idCheck: true,
            label: 'Change Password',
        })
        .when('/account/:id/settings', {
            templateUrl: 'views/account/settings.html',
            controller: 'UserSettingsController',
            loginRequired: true,
            idCheck: true,
            label: 'Account Settings'
        })
        .when('/account/:id/subscriptions', {
            templateUrl: 'views/account/subscriptions.html',
            controller: 'UserSubscriptionsController',
            loginRequired: true,
            idCheck: true,
            label: 'Account Subscriptions'
        })
        .when('/account/:id/project-manager', {
            templateUrl: 'views/account/project-manager.html',
            controller: 'UserProjectManagerController',
            loginRequired: true,
            idCheck: true,
            label: 'My Projects'
        })
        .when('/account/:id/supported-projects', {
            templateUrl: 'views/account/supported-projects.html',
            controller: 'UserProjectManagerController',
            loginRequired: true,
            idCheck: true,
            label: 'My Supported Projects'
        })
	    .when('/account/:id/funds', {
            templateUrl: 'views/account/funds.html',
            controller: 'UserFundsController',
            loginRequired: true,
            idCheck: true,
            label: 'Account Funds'
        })
        .when('/account/:id/purchase-history', {
            templateUrl: 'views/account/purchase-history.html',
            controller: 'UserPurchaseHistoryController',
            loginRequired: true,
            idCheck: true,
            label: 'Account Purchase History'
        })
        .when('/account/:id/messages', {
            templateUrl: 'views/account/messages/index.html',
            controller: 'UserMessagesIndexController',
            loginRequired: true,
            idCheck: true,
            label: 'Inbox'
        })
        .when('/account/:id/messages/:msg', {
            templateUrl: 'views/account/messages/view.html',
            controller: 'UserMessagesViewController',
            loginRequired: true,
            idCheck: true,
            label: 'Message'
        })
        /*.when('/shops?', {
            templateUrl: 'views/shops/index.html',
            controller: 'ShopsIndexController',
            label: 'Shops'
        })*/
        .when('/store', {
            templateUrl: 'views/store/index.html',
            controller: 'StoreIndexController',
            label: 'Store'
        })
        .when('/store/product/:id?', {
            templateUrl: 'views/store/view.html',
            controller: 'StoreViewController',
            label: 'Product'
        })
        .when('/store/cart', {
            templateUrl: 'views/store/cart.html',
            controller: 'StoreCartController',
            label: 'Cart'
        })
        .when('/store/cart/checkout', {
            templateUrl: 'views/projects/index.html',
            controller: 'CategoryController',
            label: 'Checkout'
        })
        .when('/account/activation?', {
            templateUrl: 'views/auth/activation.html',
            controller: 'AuthActivationController',
            label: 'Account Activation'
        })
        .when('/logout', {
            templateUrl: 'views/auth/post-logout.html',
            controller: 'LogoutController',
            label: 'Logged Out'
        })
        // Otherwise
        .otherwise({ redirect: '/' });

    // use the HTML5 History API
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});

// Authentication Interceptor
app.factory('authHttpResponseInterceptor',['$q','$location','$window', function($q,$location, $window){
    return {
        response: function(response){
            if (response.status === 408) {
                console.log("Response 408");
            }
            return response || $q.when(response);
        },
        responseError: function(rejection) {
            if (rejection.status === 408) {
                console.log("Response Error 408",rejection);
                $window.location.reload();
            }
            return $q.reject(rejection);
        }
    }
}]);
app.config(['$httpProvider',function($httpProvider) {
    //Http Intercpetor to check auth failures for xhr requests
    $httpProvider.interceptors.push('authHttpResponseInterceptor');
}]);
