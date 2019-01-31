/**
 * Created by Ben.Hamlett on 13/04/2017.
 */
/**
 * Each function makes a request to the API
 * some methods require a header to be present
 * @return array - depending on the response
 */
app.factory('ApiFactory', function ( $http, $cookies ) {
    var cAuth   = {};
    //JSON.parse($cookies.get('complete-doddle-session'))
    if($cookies.get('shelping_com')) {
        var cData = jQuery.parseJSON($cookies.get('shelping_com'));
        cAuth = { "Authorization" : cData.token };
    }

    return {
        global: {
            screenText: function screenText() {
                return $http.get('api/screen-text', {
                    ignoreLoadingBar: true,
                    skipAuthorization: true
                })
            },
            helpText: function helpText() {
                return $http.get('api/help-text', {
                    ignoreLoadingBar: true,
                    skipAuthorization: true
                })
            },
            plans: function plans() {
                return $http.get('api/subscription-plans', {
                    ignoreLoadingBar: true,
                    skipAuthorization: true
                })
            },
            feedback: function feedback(data) {
                return $http.post('api/feedback', data, {
                    headers: cAuth,
                    ignoreLoadingBar: true,
                    skipAuthorization: true
                })
            }
        },
        auth: {
            /**
             * User login
             * @param data = email & password
             * @returns {*} with user & session token
             */
            login: function login(data) {
                return $http.post('api/login', data, {
                    ignoreLoadingBar: true,
                    skipAuthorization: true
                });
            },
            resetPass: function resetPass(data) {
                return $http.post('api/users/password/reset', data, {
                    ignoreLoadingBar: true,
                    skipAuthorization: true
                });
            },
            resetPassToken: function resetPassToken(data) {
                return $http.post('api/users/password/reset/token', data, {
                    ignoreLoadingBar: true,
                    skipAuthorization: true
                });
            },
            socialLogin: function facebookLogin(provider, token) {
                return $http.post('api/auth/social',
                    {
                        'token': token,
                        'provider': provider
                    },
                    {
                    ignoreLoadingBar: true
                });
            },
            logout: function logout(data) {
                return $http.get('api/logout', {
                    ignoreLoadingBar: true,
                    skipAuthorization: true
                })
            },
            signup: function signup(data) {
                return $http.post('api/signup', data, {
                    ignoreLoadingBar: true,
                    skipAuthorization: true
                });
            },
            authenticate: function authenticate() {
                return $http.get('api/authenticate', {
                    headers: cAuth,
                    ignoreLoadingBar: true,
                    skipAuthorization: false
                })
            },
            activateAccount: function activateAccount(data) {
                return $http.post('api/auth/account/activation', data, {
                    ignoreLoadingBar: true,
                    skipAuthorization: true
                });
            }
        },
        projects: {
            all: function all() {
                return $http.get('api/projects', {
                    headers: cAuth,
                    skipAuthorization: true
                });
            },
            random: function random(count) {
                return $http.get('api/projects/random', {
                    headers: cAuth,
                    skipAuthorization: true,
                    ignoreLoadingBar: true
                });
            },
            list: function list(page, cat, swLat, swLon, neLat, neLon, order, asc, firstLoad) {
                var ignoreLoader = true;
                if(firstLoad) {
                    page = 0;
                    ignoreLoader = true;
                }
                var url = 'api/projects/list?page=' + page;
                // add params
                if( cat.length > 0 )
                    url += '&categories=' + cat;
                if( swLat )
                    url += '&swLat=' + swLat;
                if( swLon )
                    url += '&swLon=' + swLon;
                if( neLat )
                    url += '&neLat=' + neLat;
                if( neLon )
                    url += '&neLon=' + neLon;

                url += '&order=' + order + '&ascending=' + asc;
                return $http.get(url, {
                    ignoreLoadingBar: ignoreLoader,
                    skipAuthorization: true
                });
            },
            search: function search(term) {
                return $http.get('api/projects/search?term=' + term, {
                    ignoreLoadingBar: false,
                    headers: cAuth,
                    skipAuthorization: true
                });
            },
            get: function get(id, loader) {
                return $http.get('api/projects/' + id, {
                    ignoreLoadingBar: loader,
                    headers: cAuth,
                    skipAuthorization: true
                });
            },
            store: function store(data) {
                /*return $http.post('api/projects', data, {
                    headers: cAuth
                });*/
                if($cookies.get('shelping_com')) {
                    var cData = jQuery.parseJSON($cookies.get('shelping_com'));
                    var tmpAuth = cData.token
                }
                return $http({
                    method: 'POST',
                    url: 'api/projects',
                    headers: {
                        'Authorization': tmpAuth,
                        'Content-Type': undefined
                    },
                    skipAuthorization: true,
                    data: data,
                    transformRequest: function (data, headersGetter) {
                        var formData = new FormData();
                        angular.forEach(data, function (value, key) {
                            formData.append(key, value);
                        });

                        var headers = headersGetter();
                        delete headers['content-type'];

                        return formData;
                    }
                });
            },
            submitReview: function submitReview(id, data) {
                return $http.post('api/projects/' + id + '/rating', data, {
                    headers: cAuth,
                    ignoreLoadingBar: true,
                    skipAuthorization: true
                });
            },
            reviewReply: function reviewReply(id, user, data) {
                return $http.post('api/projects/' + id + '/rating/reply/' + user, data, {
                    headers: cAuth,
                    ignoreLoadingBar: true,
                    skipAuthorization: true
                });
            },
            back: function back(id) {
                return $http.get('api/projects/' + id + '/backer', {
                    headers: cAuth,
                    ignoreLoadingBar: true,
                    skipAuthorization: true
                });
            },
            unback: function unback(id) {
                return $http.get('api/projects/' + id + '/unback', {
                    headers: cAuth,
                    ignoreLoadingBar: true,
                    skipAuthorization: true
                });
            },
            fund: function fund(data) {
                return $http.post('api/stripe/charge', data, {
                    ignoreLoadingBar: true,
                    skipAuthorization: true
                });
            },
            donate: function donate(id, data) {
                return $http.post('api/projects/' + id + '/donate', data, {
                    headers: cAuth,
                    ignoreLoadingBar: true,
                    skipAuthorization: true
                });
            },
            pause: function pause(id) {
                return $http.get('api/projects/' + id + '/pause', {
                    headers: cAuth,
                    ignoreLoadingBar: true,
                    skipAuthorization: true
                })
            },
            resume: function resume(id) {
                return $http.get('api/projects/' + id + '/resume', {
                    headers: cAuth,
                    ignoreLoadingBar: true,
                    skipAuthorization: true
                })
            },
            edit: function edit(id, data) {
                if($cookies.get('shelping_com')) {
                    var cData = jQuery.parseJSON($cookies.get('shelping_com'));
                    var tmpAuth = cData.token
                }
                return $http({
                    method: 'POST',
                    url: 'api/projects/' + id + '/edit',
                    headers: {
                        'Authorization': tmpAuth,
                        'Content-Type': undefined
                    },
                    skipAuthorization: true,
                    data: data,
                    transformRequest: function (data, headersGetter) {
                        var formData = new FormData();
                        angular.forEach(data, function (value, key) {
                            formData.append(key, value);
                        });

                        var headers = headersGetter();
                        delete headers['content-type'];

                        return formData;
                    }
                });
                /*return $http.post('api/projects/' + id + '/edit', data, {
                    headers: cAuth,
                    ignoreLoadingBar: true,
                    skipAuthorization: true
                });*/
            },
            remove: function remove(id, reason) {
                return $http.get('api/projects/' + id + '/delete?comment=' + reason, {
                    headers: cAuth,
                    ignoreLoadingBar: true,
                    skipAuthorization: true
                })
            },
            withdrawRequest: function withdrawRequest(id, data) {
                return $http.post('api/projects/' + id + '/funds/withdraw', data, {
                    headers: cAuth,
                    ignoreLoadingBar: true,
                    skipAuthorization: true
                })
            },
            report: function report(id, data) {
                return $http.post('api/projects/' + id + '/report', data, {
                    headers: cAuth,
                    ignoreLoadingBar: true,
                    skipAuthorization: true
                })
            },
            generateTransferToken: function generateTransferToken(id) {
                return $http.post('api/projects/' + id + '/transfer-token', null, {
                    headers: cAuth,
                    ignoreLoadingBar: true,
                    skipAuthorization: true
                });
            },
            requestTransfer: function requestTransfer(id, token) {
                return $http.post('api/projects/' + id + '/transfer-request', token, {
                    headers: cAuth,
                    ignoreLoadingBar: false,
                    skipAuthorization: true
                });
            },
        },
        shops: {
            list: function list(page, cat, firstLoad) {
                var ignoreLoader = true;
                if(firstLoad) {
                    page = 0;
                    ignoreLoader = false;
                }
                var url = 'api/shops?page=' + page;
                // add params
                if( cat )
                    url += '&categories=' + cat;
                return $http.get(url, {
                    ignoreLoadingBar: ignoreLoader,
                    skipAuthorization: true
                });
            },
            link: function link(id, user, project) {
                var url = 'api/shops/' + id;
                // add params
                if( user )
                    url += '&user=' + user;
                if( project )
                    url += '&project=' + project;
                return $http.get(url, {
                    headers: cAuth,
                    ignoreLoadingBar: true,
                    skipAuthorization: true
                });
            }
        },
        categories: {
            all: function all() {
                return $http.get('api/categories', {
                    headers: cAuth,
                    skipAuthorization: true
                });
            },
            allShop: function all() {
                return $http.get('api/categories/shops', {
                    headers: cAuth,
                    skipAuthorization: true
                });
            }
        },
        skills: {
            all: function all() {
                return $http.get('api/skills', {
                    headers: cAuth,
                    skipAuthorization: true
                });
            }
        },
        interests: {
            all: function all() {
                return $http.get('api/interests', {
                    headers: cAuth,
                    skipAuthorization: true
                });
            }
        },
        users: {
            all: function all (page, interests, skills, firstLoad) {
                var ignoreLoader = true;
                if(firstLoad) {
                    page = 0;
                    ignoreLoader = false;
                }

                var url = 'api/users?page=' + page;
                // add params
                if( interests.length > 0 )
                    url += '&interests=' + interests;
                if( skills.length > 0 )
                    url += '&skills=' + skills;
                /*if( swLat )
                    url += '&swLat=' + swLat;
                if( swLon )
                    url += '&swLon=' + swLon;
                if( neLat )
                    url += '&neLat=' + neLat;
                if( neLon )
                    url += '&neLon=' + neLon;*/

                return $http.get(url, {
                    headers: cAuth,
                    ignoreLoadingBar: ignoreLoader,
                    skipAuthorization: true
                });
            },
            get: function get(id) {
                return $http.get('api/users/' + id, {
                    headers: cAuth,
                    skipAuthorization: true
                });
            },
            search: function search(data, page) {
                var ignoreLoader = true;
                if(!page) {
                    page = 0;
                    var ignoreLoader = false;
                }
                return $http.get('api/users/search?name=' + data + '&page=' + page, {
                    headers: cAuth,
                    ignoreLoadingBar: ignoreLoader,
                    skipAuthorization: true
                });
            },
            block: function block(id, method) {
                return $http.get('api/users/' + id + '/block?method=' + method, {
                    headers: cAuth,
                    ignoreLoadingBar: true,
                    skipAuthorization: true
                });
            },
            getProfile: function getProfile(id) {
                return $http.get('api/users/' + id + '/profile', {
                    headers: cAuth,
                    skipAuthorization: true
                });
            },
            storeAvatar: function storeAvatar(id, data) {
                if($cookies.get('shelping_com')) {
                    var cData = jQuery.parseJSON($cookies.get('shelping_com'));
                    var tmpAuth = cData.token
                }
                return $http({
                    method: 'POST',
                    url: 'api/account/' + id + '/avatar',
                    headers: {
                        'Authorization': tmpAuth,
                        'Content-Type': undefined
                    },
                    ignoreLoadingBar: true,
                    skipAuthorization: true,
                    data: data,
                    transformRequest: function (data, headersGetter) {
                        var formData = new FormData();
                        angular.forEach(data, function (value, key) {
                            formData.append(key, value);
                        });

                        var headers = headersGetter();
                        delete headers['content-type'];

                        return formData;
                    }
                });
            },
            storeProfile: function storeProfile(id, data) {
                return $http.post('api/users/' + id + '/profile', data, {
                    headers: cAuth,
                    ignoreLoadingBar: true,
                    skipAuthorization: true
                });
            },
            getSettings: function getSettings(id) {
                return $http.get('api/account/' + id + '/settings' , {
                    headers: cAuth,
                    ignoreLoadingBar: true,
                    skipAuthorization: true
                });
            },
            storeSettings: function storeSettings(id, data) {
                return $http.post('api/account/' + id + '/settings', data, {
                    headers: cAuth,
                    ignoreLoadingBar: true,
                    skipAuthorization: true
                });
            },
            getFunds: function getFunds(id) {
                return $http.get('api/account/' + id + '/funds', {
                    headers: cAuth,
                    skipAuthorization: true
                });
            },
            getPurchases: function getPurchases(id) {
                return $http.get('api/account/' + id + '/purchases', {
                    headers: cAuth,
                    skipAuthorization: true
                });
            },
            getInvoices: function getInvoices(id) {
                return $http.get('api/account/' + id + '/invoices', {
                    headers: cAuth,
                    skipAuthorization: true
                });
            },
            getProjects: function getProjects(id) {
                return $http.get('api/users/' + id + '/projects', {
                    headers: cAuth,
                    skipAuthorization: true
                });
            },
            getBackedProjects: function getBackedProjects(id) {
                return $http.get('api/users/' + id + '/projects/backed', {
                    headers: cAuth,
                    skipAuthorization: true
                });
            },
            stopBacking: function stopBacking(id) {
                return $http.delete('api/projects/' + id + '/backers', {
                    headers: cAuth,
                    ignoreLoadingBar: true,
                    skipAuthorization: true
                });
            },
            getNotifications: function getNotifications(id) {
                return $http.get('api/account/' + id + '/notifications', {
                    headers: cAuth,
                    ignoreLoadingBar: true,
                    skipAuthorization: true
                });
            },
            removeNotification: function getNotifications(account, id) {
                return $http.get('api/account/' + account + '/notifications/remove/' + id, {
                    headers: cAuth,
                    ignoreLoadingBar: true,
                    skipAuthorization: true
                });
            },
            getMessages: function getMessages(id) {
                return $http.get('api/account/' + id + '/messages', {
                    headers: cAuth,
                    ignoreLoadingBar: false,
                    skipAuthorization: true
                });
            },
            getMessage: function getMessages(id, msg) {
                return $http.get('api/account/' + id + '/messages/' + msg, {
                    headers: cAuth,
                    ignoreLoadingBar: true,
                    skipAuthorization: true
                });
            },
            sendMessage: function getMessages(id, data) {
                return $http.post('api/account/' + id + '/messages', data, {
                    headers: cAuth,
                    ignoreLoadingBar: true,
                    skipAuthorization: true
                });
            },
            withdrawRequest: function withdrawRequest(id, data) {
                return $http.post('api/account/' + id + '/funds/withdraw', data, {
                    headers: cAuth,
                    ignoreLoadingBar: true,
                    skipAuthorization: true
                })
            },
            getSubscriptions: function getSubscriptions(id) {
                return $http.get('api/account/' + id + '/subscriptions', {
                    headers: cAuth,
                    ignoreLoadingBar: false,
                    skipAuthorization: true
                });
            },
            updateSubscription: function updateSubscription(subId, data) {
                return $http.post('api/account/subscriptions/' + subId + '/update', data, {
                    headers: cAuth,
                    ignoreLoadingBar: true,
                    skipAuthorization: true
                })
            },
            createSubscription: function createSubscription(data) {
                return $http.post('api/account/subscribe', data, {
                    headers: cAuth,
                    ignoreLoadingBar: false,
                    skipAuthorization: true
                })
            },
            cancelSubscription: function cancelSubscription(subId) {
                return $http.get('api/account/subscriptions/' + subId + '/cancel', {
                    headers: cAuth,
                    ignoreLoadingBar: false,
                    skipAuthorization: true
                });
            },
            storeCardData: function storeCardData(id, data) {
                return $http.post('api/users/' + id + '/card', data, {
                    headers: cAuth,
                    ignoreLoadingBar: false,
                    skipAuthorization: true
                });
            },
        },
        store: {
            all: function all() {
                return $http.get('api/store/items', {
                    headers: cAuth,
                    skipAuthorization: true
                })
            },
            list: function list(page, cat, firstLoad) {
                var ignoreLoader = true;
                if(firstLoad) {
                    page = 0;
                    ignoreLoader = false;
                }
                var url = 'api/store/items?page=' + page;
                // add params
                if( cat )
                    url += '&categories=' + cat;
                return $http.get(url, {
                    ignoreLoadingBar: ignoreLoader,
                    skipAuthorization: true
                });
            },
            get: function get(id) {
                return $http.get('api/store/items/' + id, {
                    headers: cAuth,
                    skipAuthorization: true
                })
            }
        },
        cart: {
            checkout: function checkout(data) {
                return $http.post('api/store/cart/checkout', data, {
                    headers: cAuth,
                    ignoreLoadingBar: false,
                    skipAuthorization: true
                })
            }
        }
    }
});
