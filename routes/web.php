<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$app->get('/', 'HomeController@index');

$app->group(['prefix' => 'api'], function() use ($app) {
    // Global text
    $app->get('screen-text', ['uses' => 'ApiController@screenTexts']);
    $app->get('help-text', ['uses' => 'ApiController@helpTexts']);
    $app->get('subscription-plans', ['uses' => 'ApiController@subscriptionPlans']);

    // Post feedback
    $app->post('feedback', ['uses' => 'ApiController@postFeedback']);

    // Auth login to account
    $app->post('signup', ['uses' => 'ApiController@signup']);
    // Auth login to account
    $app->post('login', ['uses' => 'ApiController@login']);
    $app->post('auth/social', ['uses' => 'ApiController@socialLogin']);
    $app->post('auth/twitter', ['uses' => 'ApiController@twitterLogin']);
    // Auth logout of account
    $app->get('logout', ['uses' => 'ApiController@logout']);
    // Authenticate account
    $app->get('authenticate', ['uses' => 'ApiController@authenticate']);

    // Get all Projects
    $app->get('projects', ['uses' => 'ApiController@allProjects']);
    // Get list of Projects based on params
    $app->get('projects/list', ['uses' => 'ApiController@getProjects']);
    // Get projects related to search
    $app->get('projects/search', ['uses' => 'ApiController@searchProjects']);
    // Get list of random Projects
    $app->get('projects/random', ['uses' => 'ApiController@randomProjects']);
    // Get single Project based on Id
    $app->get('projects/{id}', ['uses' => 'ApiController@getProject']);
    // Review single project based on Id
    $app->post('projects/{id}/rating', ['uses' => 'ApiController@rateProject']);
    // Reply to single review based on Id and userId
    $app->post('projects/{id}/rating/reply/{user}', ['uses' => 'ApiController@rateProjectReply']);
    // Back single project based on id
    $app->get('projects/{id}/backer', ['uses' => 'ApiController@backProject']);
    // Stop backing single project based on id
    $app->get('projects/{id}/unback', ['uses' => 'ApiController@unbackProject']);
    // Fund single project based on Id
    $app->post('projects/{id}/donate', ['uses' => 'ApiController@donateProject']);
    // Pause project based on Id
    $app->get('projects/{id}/pause', ['uses' => 'ApiController@pauseProject']);
    // Resumes project based on Id
    $app->get('projects/{id}/resume', ['uses' => 'ApiController@resumeProject']);
    // Update project details based on Id
    $app->post('projects/{id}/edit', ['uses' => 'ApiController@editProject']);
    // Delete project based on Id
    $app->get('projects/{id}/delete', ['uses' => 'ApiController@deleteProject']);
    // Post fund withdrawal request for project
    $app->post('projects/{id}/funds/withdraw', ['uses' => 'ApiController@postProjectWithdraw']);
    // Create a new project
    $app->post('projects', ['uses' => 'ApiController@createProject']);
    // Report project
    $app->post('projects/{id}/report', ['uses' => 'ApiController@reportProject']);
    // Generate transfer token
    $app->post('projects/{id}/transfer-token', ['uses' => 'ApiController@generateProjectToken']);
    // Try to transfer project ownership
    $app->post('projects/{id}/transfer-request', ['uses' => 'ApiController@transferProjectRequest']);

    // Get all Items
    $app->get('store/items', ['uses' => 'ApiController@getStoreItems']);
    // Get single Item based on ID
    $app->get('store/items/{id}', ['uses' => 'ApiController@getStoreItem']);
    // Checkout
    $app->post('store/cart/checkout', ['uses' => 'ApiController@postCartCheckout']);

    // Get all Users
    $app->get('users', ['uses' => 'ApiController@getUsers']);
    // Search all Users
    $app->get('users/search', ['uses' => 'ApiController@searchUsers']);
    // Get single User based on Id
    $app->get('users/{id}', ['uses' => 'ApiController@getUser']);
    // Get single User related Projects
    $app->get('users/{id}/projects', ['uses' => 'ApiController@getUserProjects']);
    // Get single User related Backed Projects
    $app->get('users/{id}/projects/backed', ['uses' => 'ApiController@getUserBackedProjects']);
    $app->post('users/password/reset', ['uses' => 'ApiController@passwordReset']);
    $app->post('users/password/reset/token', ['uses' => 'ApiController@passwordResetToken']);

    // User Actions
    // Block and Unblock user
    $app->get('users/{id}/block', ['uses' => 'ApiController@blockUser']);

    // Get all Shops
    $app->get('shops', ['uses' => 'ApiController@getShops']);
    // Redirect to shop page based on shop Id, project and user id optional
    $app->get('shops/{id}', ['uses' => 'ApiController@getShop']);

    // Get all Categories Projects and Shops
    $app->get('categories', ['uses' => 'ApiController@getCategories']);
    $app->get('categories/shops', ['uses' => 'ApiController@getShopCategories']);

    // Get all Skills
    $app->get('skills', ['uses' => 'ApiController@getSkills']);

    // Get all Interests
    $app->get('interests', ['uses' => 'ApiController@getInterests']);

    // Get account funds for user based on Id
    $app->get('account/{id}/funds', ['uses' => 'ApiController@getAccountFunds']);
    // Get account profile for user based on Id
    $app->get('users/{id}/profile', ['uses' => 'ApiController@getAccountProfile']);
    // Update account profile for user based on Id
    $app->post('users/{id}/profile', ['uses' => 'ApiController@updateAccountProfile']);
    // Update account avatar
    $app->post('account/{id}/avatar', ['uses' => 'ApiController@updateAccountAvatar']);
    // Get account funds for user based on Id
    $app->get('account/{id}/funds', ['uses' => 'ApiController@getAccountFunds']);
    // Get account purchase history for user based on Id
    $app->get('account/{id}/purchases', ['uses' => 'ApiController@getAccountPurchases']);
    // Get account invoice history for user based on Id
    $app->get('account/{id}/invoices', ['uses' => 'ApiController@getAccountInvoices']);
    // Get account settings for user based on Id
    $app->get('account/{id}/settings', ['uses' => 'ApiController@getAccountSettings']);
    // Update account settings for user based on Id
    $app->post('account/{id}/settings', ['uses' => 'ApiController@updateAccountSettings']);
    // Get account notifications based on user Id
    $app->get('account/{id}/notifications', ['uses' => 'ApiController@getAccountNotifications']);
    // Remove account notification
    $app->get('account/{id}/notifications/remove/{nId}', ['uses' => 'ApiController@removeAccountNotifications']);
    // Get account messages based on user Id
    $app->get('account/{id}/messages', ['uses' => 'ApiController@getAccountMessages']);
    // Send account message
    $app->post('account/{id}/messages', ['uses' => 'ApiController@sendAccountMessage']);
    // Get account message based on user Id & message Id
    $app->get('account/{id}/messages/{msg}', ['uses' => 'ApiController@getAccountMessage']);
    // Post fund withdrawal request
    $app->post('account/{id}/funds/withdraw', ['uses' => 'ApiController@postAccountWithdraw']);
    // Update account card for user based on Id
    $app->post('users/{id}/card', ['uses' => 'ApiController@updateAccountCard']);

    // Account activation
    $app->post('auth/account/activation', ['uses' => 'ApiController@getAccountActivation']);

    // Subscriptions
    $app->get('account/{id}/subscriptions', ['uses' => 'ApiController@getAccountSubscriptions']);
    $app->post('account/subscribe', ['uses' => 'ApiController@setupSubscriptions']);
    $app->post('account/subscriptions/{id}/update', ['uses' => 'ApiController@updateAccountSubscription']);
    $app->get('account/subscriptions/{id}/cancel', ['uses' => 'ApiController@cancelAccountSubscription']);

    // Payments
    $app->post('stripe/charge', ['uses' => 'ApiController@stripePayment']);
});

$app->group(['prefix' => 'static'], function() use ($app) {
    $app->get('projects', ['uses' => 'ApiController@getProjectsIndexStatic']);
    // Get single Project based on Id
    $app->get('projects/{id}', ['uses' => 'ApiController@getProjectStatic']);
    // Get single User based on Id
    $app->get('users/{id}', ['uses' => 'ApiController@getUserStatic']);
});

$app->get('/{path}', 'HomeController@index');

$app->get('{view}/{id}', 'HomeController@index');
$app->get('{view}/{id}/{action}', 'HomeController@index');
$app->get('{view}/{id}/{action}/{id2}', 'HomeController@index');
$app->get('projects/{id}/payments', 'HomeController@index');// Allow multiple URI segments



