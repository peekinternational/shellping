<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use GuzzleHttp;
use GuzzleHttp\Subscriber\Oauth\Oauth1;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class Api extends Model
{
    #region Constructors

    /**
     * Api constructor.
     */
    public function __construct() {
        $this->apiUrl   = config('app.api.url');
        $this->client   = new GuzzleHttp\Client(['base_uri' => $this->apiUrl]);
    }

    public function url() {
        return $this->apiUrl;
    }

    #endregion

    #region Global functions

    /**
     * Gets all premade texts to show on frontend
     * @return \Psr\Http\Message\StreamInterface
     */
    public function screenTexts() {
        $url = $this->apiUrl . 'texts';

        $request = $this->client->get($url);

        return $request->getBody();
    }

    /**
     * Gets all premade help screens
     * @return \Psr\Http\Message\StreamInterface
     */
    public function helpTexts() {
        $url = $this->apiUrl . 'helps';

        $request = $this->client->get($url);

        return $request->getBody();
    }

    /**
     * Gets all subscription plans
     * @return \Psr\Http\Message\StreamInterface
     */
    public function subscriptionPlans() {
        $url = $this->apiUrl . 'subscriptions/plans';

        $request = $this->client->get($url);

        return $request->getBody();
    }

    /**
     * @param $data
     * @param $token
     * @return \Psr\Http\Message\StreamInterface
     */
    public function postFeedback($data, $token) {
        $url = $this->apiUrl . 'emails/feedback';

        $request = $this->client->post($url, [
            'headers' => [
                'Authorization'     => (string)$token
            ],
            'json' => json_decode($data)
        ]);

        return $request->getBody();
    }

    #endregion

    #region Auth functions

    /**
     * Register account with api
     * @param $data = Account data
     * @return \Psr\Http\Message\StreamInterface
     */
    public function signup($data) {
        $url = $this->apiUrl . 'users';

        $request = $this->client->post($url, [
            'json' => $data
        ]);

        return $request->getBody();
    }

    /**
     * Login to api
     * @param $email
     * @param $pass
     * @return \Psr\Http\Message\StreamInterface
     */
    public function login($email, $pass) {
        $url = $this->apiUrl . 'users/session';

        $request = $this->client->post($url, [
            'json' => [
                'email'     => $email,
                'password'  => $pass
            ]
        ]);

        return $request->getBody();
    }

    /**
     * Reset password request
     * @param $email
     * @return \Psr\Http\Message\StreamInterface
     */
    public function passwordReset($email) {
        $url = $this->apiUrl . 'users/password/reset';

        $request = $this->client->post($url, [
            'json' => [
                'email'     => $email
            ]
        ]);

        return $request->getBody();
    }

    /**
     * @param $password
     * @param $token
     * @return \Psr\Http\Message\StreamInterface
     */
    public function passwordResetToken($password, $token) {
        $url = $this->apiUrl . 'users/password/reset/' . $token;

        $request = $this->client->post($url, [
            'json' => [
                'password'     => $password
            ]
        ]);

        return $request->getBody();
    }

    /**
     * @param $token
     * @return \Psr\Http\Message\StreamInterface
     */
    public function activateAccount($token) {
        $url = $this->apiUrl . 'users/verification?token=' . $token;

        $request = $this->client->get($url);

        return $request->getBody();
    }

    /**
     *
     * @param $provider
     * @param $authToken
     * @return \Psr\Http\Message\StreamInterface
     */
    public function socialLogin($provider, $authToken) {
        $url = $this->apiUrl . 'users/facebook';
        switch ($provider) {
            case 'facebook':
                $url = $this->apiUrl . 'users/facebook';
                break;
            case 'twitter':
                $url = $this->apiUrl . 'users/twitter';
                break;
            case 'google':
                $url = $this->apiUrl . 'users/googleplus';
                break;
            case 'linkedin':
                $url = $this->apiUrl . 'users/linkedin';
                break;
        }

        $request = $this->client->post($url, [
            'json' => [
                "externalToken" => (string)$authToken
            ]
        ]);

        return $request->getBody();
    }

    public function twitterLogin($authToken = null, $verifier = null, $redirect = null) {
        if (!$authToken || !$verifier)
        {
            $stack = GuzzleHttp\HandlerStack::create();
            $requestTokenOauth = new Oauth1([
                'consumer_key' => 'U5f2k207VHLlOl0qxXqOKyo3R',
                'consumer_secret' => 'mgpZds22W5uedgZzdWYtTccoKF8Fln7PzeMLQD3rqVYpE6ecOd',
                'callback' => $redirect,
                'token' => '',
                'token_secret' => ''
            ]);
            $stack->push($requestTokenOauth);
            $client = new GuzzleHttp\Client([
                'handler' => $stack,
                'verify' => false
            ]);
            // Step 1. Obtain request token for the authorization popup.
            $requestTokenResponse = $client->request('POST', 'https://api.twitter.com/oauth/request_token', [
                'auth' => 'oauth'
            ]);
            $oauthToken = array();
            parse_str($requestTokenResponse->getBody(), $oauthToken);
            return response()->json($oauthToken);
        } else {
            // Step 2. Get twitter auth tokens
            // Get the token using oath1 tokens
            $stack = GuzzleHttp\HandlerStack::create();
            $accessTokenOauth = new Oauth1([
                'consumer_key' => 'U5f2k207VHLlOl0qxXqOKyo3R',
                'consumer_secret' => 'mgpZds22W5uedgZzdWYtTccoKF8Fln7PzeMLQD3rqVYpE6ecOd',
                'token' => $authToken,
                'verifier' => $verifier,
                'token_secret' => ''
            ]);
            $stack->push($accessTokenOauth);
            $client = new GuzzleHttp\Client([
                'handler' => $stack,
                'verify' => false
            ]);
            // Step 3. Exchange oauth token and oauth verifier for access token.
            $accessTokenResponse = $client->request('POST', 'https://api.twitter.com/oauth/access_token', [
                'auth' => 'oauth'
            ]);
            $accessToken = array();
            parse_str($accessTokenResponse->getBody(), $accessToken);

            return response()->json($accessToken);
        }
    }

    /**
     * Logout from api
     * @param $token
     * @return \Psr\Http\Message\StreamInterface
     */
    public function logout($token) {
        $url = $this->apiUrl . 'users/session';

        $request = $this->client->delete($url, [
            'headers' => [
                'Authorization'     => (string)$token
            ],
        ]);

        return $request->getBody();
    }

    /**
     * Authenticate user session with api
     * @param $token
     * @return \Psr\Http\Message\StreamInterface
     */
    public function authenticate($token) {
        $url = $this->apiUrl . 'users/session';

        $request = $this->client->get($url, [
            'headers' => [
                'Authorization'     => (string)$token
            ],
        ]);

        return $request->getBody();
    }

    #endregion

    #region Project functions

    /**
     * Get all projects from api
     * @return \Psr\Http\Message\StreamInterface
     */
    public function allProjects() {
        $url = $this->apiUrl . 'projects';

        $request = $this->client->get($url);

        return $request->getBody();
    }

    /**
     * Get 8 random projects from api
     * @return \Psr\Http\Message\StreamInterface
     */
    public function randomProjects() {
        $url = $this->apiUrl . 'projects/random?max=8';

        $request = $this->client->get($url);

        return $request->getBody();
    }

    /**
     * Searches projects based on term
     * @param $term     = search term
     * @param $token    = Auth token
     * @return \Psr\Http\Message\StreamInterface
     */
    public function searchProjects($term, $token) {
        $url = $this->apiUrl . 'projects/search?q=' . $term;

        $request = $this->client->get($url, [
            'headers' => [
                'Authorization'     => (string)$token
            ]
        ]);

        return $request->getBody();
    }

    /**
     * Get list of projects from api based on params
     * @param int $page     = Page no.
     * @param null $cat     = Category id
     * @param null $swLat   = South West Latitude
     * @param null $swLon   = South West Longitude
     * @param null $neLat   = North East Latitude
     * @param null $neLon   = North East Longitude
     * @return \Psr\Http\Message\StreamInterface
     */
    public function getProjects($page = 0, $cat = null, $swLat = null, $swLon = null, $neLat = null, $neLon = null, $order = 'createdDate', $asc = false) {
        $url = $this->apiUrl . 'projects?page=' . $page;
        // check & add params
        if( $cat ) {
            // Break string apart
            $newCats = $pieces = explode(",", $cat);
            // foreach category id add to request
            foreach($newCats as $c) {
                $url .= '&category=' . $c;
            }
        }
        if( $swLat ) {
            $url .= '&swLat=' . $swLat;
        }
        if( $swLon ) {
            $url .= '&swLon=' . $swLon;
        }
        if( $neLat ) {
            $url .= '&neLat=' . $neLat;
        }
        if( $neLon ) {
            $url .= '&neLon=' . $neLon;
        }

        $url .= '&order=' . $order . '&ascending=' . $asc;

        $request = $this->client->get($url);

        return $request->getBody();
    }

    /**
     * Get single project from api based on id param
     * @param $id
     * @param $token
     * @return \Psr\Http\Message\StreamInterface
     */
    public function getProject($id, $token = null) {
        $url = $this->apiUrl . 'projects/' . $id;
        $url2 = $this->apiUrl . 'projects/' . $id . '/reviews';

        $request = $this->client->get($url, [
            'headers' => [
                'Authorization'     => (string)$token
            ]
        ]);
        /*$request2 = $this->client->get($url2, [
            'headers' => [
                'Authorization'     => (string)$token
            ]
        ]);*/

        $response = [
            'project'   => json_decode($request->getBody()),
            //'reviews'  => json_decode($request2->getBody())
        ];

        //return json_encode($response);
        return $request->getBody();
    }

    /**
     * Get related reviews from project
     * @param $id = Project ID
     * @param null $token
     * @return string
     */
    public function getProjectReviews($id, $token = null) {
        $url = $this->apiUrl . 'projects/' . $id . '/reviews';

        $request = $this->client->get($url, [
            'headers' => [
                'Authorization'     => (string)$token
            ]
        ]);

        return $request->getBody();
    }

    /**
     * Store project in api / database
     * @param $data     = Project data
     * @param $token    = Auth token
     * @return \Psr\Http\Message\StreamInterface
     */
    public function createProject($data, $token) {
        $url = $this->apiUrl . 'projects';
        $request = $this->client->post($url, [
            'headers' => [
                'Authorization'     => (string)$token,
                'Content-Type'      => 'application/json'
            ],
            'json' => $data
        ]);

        return $request->getBody();
    }

    /**
     * Submits a review and rating to a single project
     * @param $id       = Project id
     * @param $data     = Review data
     * @param $token    = Auth token
     * @return \Psr\Http\Message\StreamInterface
     */
    public function rateProject($id, $data, $token) {
        $url = $this->apiUrl . 'projects/' . $id . '/rating';

        $request = $this->client->put($url, [
            'headers' => [
                'Authorization'     => (string)$token
            ],
            'json' => json_decode($data)
        ]);

        return $request->getBody();
    }

    /**
     * Reply to a user comment, project owner only
     * @param $id = Project id
     * @param $user = User id
     * @param $data = Comment
     * @param $token
     * @return \Psr\Http\Message\StreamInterface
     */
    public function rateProjectReply($id, $user, $data, $token) {
        $url = $this->apiUrl . 'projects/' . $id . '/rating/votes/' . $user . '/reply' ;

        $request = $this->client->put($url, [
            'headers' => [
                'Authorization'     => (string)$token
            ],
            'json' => json_decode($data)
        ]);

        return $request->getBody();
    }

    /**
     * Add current user as backer of project to api based on project id
     * @param $id       = Project id
     * @param $token    = Auth token
     * @return \Psr\Http\Message\StreamInterface
     */
    public function backProject($id, $token) {
        $url = $this->apiUrl . 'projects/' . $id . '/backers';

        $request = $this->client->put($url, [
            'headers' => [
                'Authorization'     => (string)$token
            ]
        ]);

        return $request->getBody();
    }

    /**
     * Remove current user as backer of project to api based on project id
     * @param $id       = Project id
     * @param $token    = Auth token
     * @return \Psr\Http\Message\StreamInterface
     */
    public function unbackProject($id, $token) {
        $url = $this->apiUrl . 'projects/' . $id . '/backers';

        $request = $this->client->delete($url, [
            'headers' => [
                'Authorization'     => (string)$token
            ]
        ]);

        return $request->getBody();
    }

    /**
     * Attempts to transfer funds from logged in user to project
     * @param $id
     * @param $token
     * @return \Psr\Http\Message\StreamInterface
     */
    public function donateProject($id, $data, $token) {
        $url = $this->apiUrl . 'funds/donations/project/' . $id;

        $request = $this->client->post($url, [
            'headers' => [
                'Authorization'     => (string)$token,
                'Content-Type'      => 'application/json'
            ],
            'json'  => json_decode($data)
        ]);

        return $request->getBody();
    }

    /**
     * Pauses project based on Id
     * @param $id       = Project id
     * @param $token    = Auth token
     * @return \Psr\Http\Message\StreamInterface
     */
    public function pauseProject($id, $token) {
        $url = $this->apiUrl . 'projects/' . $id . '/pause';

        $request = $this->client->put($url, [
            'headers' => [
                'Authorization'     => (string)$token,
                'content-type' => 'application/json'
            ]
        ]);

        return $request->getBody();
    }

    /**
     * Resumes project based on Id
     * @param $id       = Project id
     * @param $token    = Auth token
     * @return \Psr\Http\Message\StreamInterface
     */
    public function resumeProject($id, $token) {
        $url = $this->apiUrl . 'projects/' . $id . '/pause';

        $request = $this->client->delete($url, [
            'headers' => [
                'Authorization'     => (string)$token,
                'content-type' => 'application/json'
            ]
        ]);

        return $request->getBody();
    }

    /**
     * Updats project in api / database
     * @param $id       = Project id
     * @param $data     = Project data
     * @param $token    = Auth token
     * @return \Psr\Http\Message\StreamInterface
     */
    public function updateProject($id, $data, $token) {
        $url = $this->apiUrl . 'projects/' . $id;

        $request = $this->client->put($url, [
            'headers' => [
                'Authorization'     => (string)$token,
                'content-type' => 'application/json'
            ],
            'json' => $data
        ]);

        return $request->getBody();
    }

    /**
     * Updates the projects tags
     * @param $id       = Project id
     * @param $data     = Tag data
     * @param $token    = Auth token
     * @return \Psr\Http\Message\StreamInterface
     */
    public function updateProjectTags($id, $data, $token) {
        $url = $this->apiUrl . 'projects/' . $id . '/tags';

        $request = $this->client->put($url, [
            'headers' => [
                'Authorization'     => (string)$token,
                'content-type' => 'application/json'
            ],
            'json' => $data
        ]);

        return $request->getBody();
    }

    /**
     * Deletes project based on Id with given reason
     * @param $id       = Project id
     * @param $reason   = (String) Reson for deletion
     * @param $token    = Auth token
     * @return \Psr\Http\Message\StreamInterface
     */
    public function deleteProject($id, $reason, $token) {
        $url = $this->apiUrl . 'projects/' . $id . '/delete';

        $request = $this->client->post($url, [
            'headers' => [
                'Authorization'     => (string)$token
            ],
            'json' => [
                'comment' => $reason
            ]
        ]);

        return $request->getBody();
    }

    /**
     * @param $id
     * @param $data
     * @param $token
     * @return \Psr\Http\Message\StreamInterface
     */
    public function postProjectWithdraw($id, $data, $token) {
        $url = $this->apiUrl . 'funds/withdrawal-requests/project/' . $id;

        $request = $this->client->post($url, [
            'headers' => [
                'Authorization'     => (string)$token
            ],
            'json' => json_decode($data)
        ]);

        return $request->getBody();
    }

    /**
     * @param $id
     * @param $data
     * @param $token
     * @return \Psr\Http\Message\StreamInterface
     */
    public function reportProject($id, $data, $token) {
        $url = $this->apiUrl . 'emails/projects/' . $id . '/report';

        $request = $this->client->post($url, [
            'headers' => [
                'Authorization'     => (string)$token
            ],
            'json' => json_decode($data)
        ]);

        return $request->getBody();
    }

    /**
     * @param $id
     * @param $token
     * @return \Psr\Http\Message\StreamInterface
     */
    public function generateProjectToken($id, $token) {
        $url = $this->apiUrl . 'projects/' . $id . '/transfer';

        $request = $this->client->post($url, [
            'headers' => [
                'Authorization'     => (string)$token,
                'content-type' => 'application/json'
            ],
            'json' => ['userId' => null]
        ]);

        return $request->getBody();
    }

    /**
     * @param $id
     * @param $data
     * @param $token
     * @return \Psr\Http\Message\StreamInterface
     */
    public function transferProjectRequest($id, $data, $token) {
        $url = $this->apiUrl . 'projects/' . $id . '/transfer/' . $data;

        $request = $this->client->post($url, [
            'headers' => [
                'Authorization'     => (string)$token,
                'content-type' => 'application/json'
            ],
            'json' => json_decode("{}")
        ]);

        return $request->getBody();
    }

    #endregion

    #region Store functions

    /**
     * Get all store items
     * @param int $page     = Page no.
     * @return \Psr\Http\Message\StreamInterface
     */
    public function getStoreItems($page = 0) {
        $url = $this->apiUrl . 'items?page=' . $page;

        $request = $this->client->get($url);

        return $request->getBody();
    }

    /**
     * Get single item from api based on id param
     * @param $id
     * @param $token
     * @return \Psr\Http\Message\StreamInterface
     */
    public function getStoreItem($id, $token = null) {
        $url = $this->apiUrl . 'items/' . $id;

        $request = $this->client->get($url, [
            'headers' => [
                'Authorization'     => (string)$token
            ]
        ]);

        $response = [
            'item'   => json_decode($request->getBody())
        ];

        return json_encode($response);
    }

    /**
     * Setup a new subscription
     * @param $data
     * @param $token
     * @return \Psr\Http\Message\StreamInterface
     */
    public function setupSubscription($data, $token = null) {
        $url = $this->apiUrl . 'subscriptions';

        $request = $this->client->post($url, [
            'headers' => [
                'Authorization'     => (string)$token,
                'Content-Type'      => 'application/json'
            ],
            'json' => $data
        ]);

        return $request->getBody();
    }

    /**
     * Confirms subscription (attempts to make initial payment
     * @param $id = Subscription ID
     * @param $data = Stripe token { "token": "stripe_card_token"
     * @param null $token = Auth token
     * @return \Psr\Http\Message\StreamInterface
     */
    public function confirmSubscription($id, $data, $token = null) {
        $url = $this->apiUrl . 'subscriptions/' . $id . '/subscribe';

        $request = $this->client->post($url, [
            'headers' => [
                'Authorization'     => (string)$token,
                'Content-Type'      => 'application/json'
            ],
            'json' => $data
        ]);

        return $request->getBody();
    }

    /**
     * One of purchase of an item
     * @param $data         = purchase request data
     * @param null $token   = Auth token
     * @return \Psr\Http\Message\StreamInterface
     */
    public function itemSinglePurchase($data, $token = null) {
        $url = $this->apiUrl . 'purchases';

        /*if(is_string($data)) {
            $data = json_decode($data);
        } else {
            $data = json_encode($data);
            $data = json_decode($data);
        }*/

        $request = $this->client->post($url, [
            'headers' => [
                'Authorization'     => (string)$token,
                'Content-Type'      => 'application/json'
            ],
            'json' => $data
        ]);

        return $request->getBody();
    }

    /**
     * Stores card token to account based on id
     * @param $id           = Account id
     * @param $data         = Stripe card token
     * @param null $token   = Auth token
     * @return \Psr\Http\Message\StreamInterface
     */
    public function storeCardToken($id, $data, $token = null) {
        $url = $this->apiUrl . 'users/' .$id. '/card';

        $request = $this->client->put($url, [
            'headers' => [
                'Authorization'     => (string)$token,
                'Content-Type'      => 'application/json'
            ],
            'json' => $data
        ]);

        return $request->getBody();
    }

    #endregion

    #region Affiliate functions ( obsolete )

    /**
     * Get list of shops from api based on params
     * @param int $page     = Page no.
     * @param null $cat     = Category Id
     * @return \Psr\Http\Message\StreamInterface
     */
    public function getShops($page = 0, $cat = null) {
        $url = $this->apiUrl . 'shops?page=' . $page;

        // check & add params
        if( $cat ) {
            // Break string apart
            $newCats = $pieces = explode(",", $cat);
            // foreach category id add to request
            foreach($newCats as $c) {
                $url .= '&category=' . $c;
            }
        }

        $request = $this->client->get($url);

        return $request->getBody();
    }

    public function getShop($id, $data = null) {
        $url = $this->apiUrl . 'r?shop=' . $id;

        if($data) {
            if ($data->userId) {
                $url .= '?user=' . $data->user;
            }

            if ($data->projectId) {
                $url .= '?project=' . $data->project;
            }
        }

        $request = $this->client->get($url, [
            'allow_redirects' => false
        ]);

        return $request->getHeader('Location');
    }

    #endregion

    #region Enumerable

    /**
     * Get all categories from api
     * @return \Psr\Http\Message\StreamInterface
     */
    public function getCategories() {
        $url = $this->apiUrl . 'categories';

        $request = $this->client->get($url);

        return $request->getBody();
    }

    /**
     * Get all categories from api
     * @return \Psr\Http\Message\StreamInterface
     */
    public function getShopCategories() {
        $url = $this->apiUrl . 'categories/shops';

        $request = $this->client->get($url);

        return $request->getBody();
    }

    /**
     * Get all skills from api
     * @return \Psr\Http\Message\StreamInterface
     */
    public function getSkills() {
        $url = $this->apiUrl . 'skills';

        $request = $this->client->get($url);

        return $request->getBody();
    }

    /**
     * Get all interests from api
     * @return \Psr\Http\Message\StreamInterface
     */
    public function getInterests() {
        $url = $this->apiUrl . 'interests';

        $request = $this->client->get($url);

        return $request->getBody();
    }

    #endregion

    #region Users functions

    /**
     * Get all users from api
     * @return \Psr\Http\Message\StreamInterface
     */
    public function getUsers($page = 0, $interests = null, $skills = null) {
        $url = $this->apiUrl . 'users?page=' . $page;
        // check & add params
        if( $interests ) {
            // Break string apart
            $newInterests = $pieces = explode(",", $interests);
            // foreach category id add to request
            foreach($newInterests as $c) {
                $url .= '&interest=' . $c;
            }
        }
        if( $skills ) {
            // Break string apart
            $newSkills = $pieces = explode(",", $skills);
            // foreach category id add to request
            foreach($newSkills as $c) {
                $url .= '&skill=' . $c;
            }
        }
        /*if( $swLat ) {
            $url .= '&swLat=' . $swLat;
        }
        if( $swLon ) {
            $url .= '&swLon=' . $swLon;
        }
        if( $neLat ) {
            $url .= '&neLat=' . $neLat;
        }
        if( $neLon ) {
            $url .= '&neLon=' . $neLon;
        }*/

        $request = $this->client->get($url);

        return $request->getBody();
    }

    /**
     * Search users based on name or email
     * @param $data = (String) Name or Email of user
     * @return \Psr\Http\Message\StreamInterface
     */
    public function searchUsers($data, $token, $page = 0) {
        $url = $this->apiUrl . 'users/search?q=' . $data . '&page=' . $page;

        $request = $this->client->get($url, [
            'headers' => [
                'Authorization'     => (string)$token,
                'Content-Type'      => 'application/json'
            ]
        ]);

        return $request->getBody();
    }

    /**
     * Get single user from api based on id
     * @param $id   = User id
     * @return \Psr\Http\Message\StreamInterface
     */
    public function getUser($id) {
        $url = $this->apiUrl . 'users/' . $id;

        $request = $this->client->get($url);

        return $request->getBody();
    }

    /**
     * Get users owned projects from api based on user id
     * @param $id   = User id
     * @param $token   = Auth token
     * @return \Psr\Http\Message\StreamInterface
     */
    public function getUserProjects($id, $token = null) {
        $url = $this->apiUrl . 'users/' . $id . '/projects';

        $request = $this->client->get($url, [
            'headers' => [
                'Authorization'     => (string)$token
            ]
        ]);

        return $request->getBody();
    }

    /**
     * Get users backed projects from api based on user id
     * @param $id       = User id
     * @param $token    = Auth token
     * @return \Psr\Http\Message\StreamInterface
     */
    public function getUserBackedProjects($id, $token) {
        $url = $this->apiUrl . 'users/' . $id .'/projects/backed';

        $request = $this->client->get($url, [
            'headers' => [
                'Authorization'     => (string)$token
            ]
        ]);

        return $request->getBody();
    }

    #endregion

    #region User Action functions

    /**
     * Un/Blocks user with given Id
     * @param $id       = User to block / unblock
     * @param $method   = 'block' or 'unblock'
     * @param $token    = Auth token
     * @return \Psr\Http\Message\StreamInterface
     */
    public function blockUser($id, $method, $token) {
        $url = $this->apiUrl . 'users/' . $id . '/block';

        if($method === 'block') {
            $request = $this->client->put($url, [
                'headers' => [
                    'Authorization'     => (string)$token
                ]
            ]);
        }

        if($method === 'unblock') {
            $request = $this->client->delete($url, [
                'headers' => [
                    'Authorization'     => (string)$token
                ]
            ]);
        }

        return $request->getBody();
    }

    #endregion

    #region Account functions

    /**
     * Get users fund details from api based on user id
     * @param $id       = User id
     * @param $token    = Auth token
     * @return \Psr\Http\Message\StreamInterface
     */
    public function getAccountFunds($id, $token) {
        $url = $this->apiUrl . 'funds/user/' . $id;

        $request = $this->client->get($url, [
            'headers' => [
                'Authorization'     => (string)$token
            ]
        ]);

        return $request->getBody();
    }

    /**
     * Get users purchase history from api based on user id
     * @param $id       = User id
     * @param $token    = Auth token
     * @return \Psr\Http\Message\StreamInterface
     */
    public function getAccountPurchases($id, $token) {
        $url = $this->apiUrl . 'users/' . $id . '/purchases';

        $request = $this->client->get($url, [
            'headers' => [
                'Authorization'     => (string)$token
            ]
        ]);

        return $request->getBody();
    }

    /**
     * Get users invoice history from api based on user id
     * @param $id       = User id
     * @param $token    = Auth token
     * @return \Psr\Http\Message\StreamInterface
     */
    public function getAccountInvoices($id, $token) {
        $url = $this->apiUrl . 'users/' . $id . '/invoices';

        $request = $this->client->get($url, [
            'headers' => [
                'Authorization'     => (string)$token
            ]
        ]);

        return $request->getBody();
    }

    /**
     * Get users profile details from api based on user id
     * @param $id       = User id
     * @param $token    = Auth token
     * @return \Psr\Http\Message\StreamInterface
     */
    public function getAccountProfile($id, $token) {
        $url = $this->apiUrl . 'users/' . $id;

        $request = $this->client->get($url, [
            'headers' => [
                'Authorization'     => (string)$token
            ]
        ]);

        return $request->getBody();
    }

    /**
     * Update users profile details on api based on user id
     * @param $id       = User id
     * @param $data     = Profile data
     * @param $token    = Auth token
     * @return \Psr\Http\Message\StreamInterface
     */
    public function updateAccountProfile($id, $data, $token) {
        $url = $this->apiUrl . 'users/' . $id;
        $newData = $data;

        if(is_string($data)) {
            $newData = json_decode($data);
        } else {
            $newData = json_encode($data);
            $newData = json_decode($newData);
        }

        $request = $this->client->put($url, [
            'headers' => [
                'Authorization'     => (string)$token,
                'Content-Type'      => 'application/json'
            ],
            'json'  => $newData
        ]);

        return $request->getBody();
    }

    /**
     * @param $id
     * @param $data
     * @param $token
     * @return \Psr\Http\Message\StreamInterface
     */
    public function updateAccountCard($id, $data, $token) {
        $url = $this->apiUrl . 'users/' . $id . '/card';

        if(is_string($data)) {
            $data = json_decode($data);
        } else {
            $data = json_encode($data);
        }

        $request = $this->client->put($url, [
            'headers' => [
                'Authorization'     => (string)$token,
                'Content-Type'      => 'application/json'
            ],
            'json'  => $data
        ]);

        return $request->getBody();
    }

    /**
     * Get users account settings from api based on user id
     * @param $id       = User id
     * @param $token    = Auth token
     * @return \Psr\Http\Message\StreamInterface
     */
    public function getAccountSettings($id, $token) {
        $url = $this->apiUrl . 'users/' . $id . '/settings';

        $request = $this->client->get($url, [
            'headers' => [
                'Authorization'     => (string)$token
            ]
        ]);

        return $request->getBody();
    }

    /**
     * Update users account settings on api based on user id
     * @param $id       = User id
     * @param $data     = Profile data
     * @param $token    = Auth token
     * @return \Psr\Http\Message\StreamInterface
     */
    public function updateAccountSettings($id, $data, $token) {
        $url = $this->apiUrl . 'users/' . $id . '/settings';

        $request = $this->client->put($url, [
            'headers' => [
                'Authorization'     => (string)$token
            ],
            'json'  => json_decode($data)
        ]);

        return $request->getBody();
    }

    /**
     * Get users related notifications based on user id
     * @param $id       = User id
     * @param $token    = Auth token
     * @return \Psr\Http\Message\StreamInterface
     */
    public function getAccountNotifications($id, $token) {
        $url = $this->apiUrl . 'notifications/users/' . $id;

        $request = $this->client->get($url, [
            'headers' => [
                'Authorization'     => (string)$token
            ]
        ]);

        return $request->getBody();
    }

    /**
     * Deletes relative notification based on id
     * @param $id       = Notification id
     * @param $token    = Auth token
     * @return \Psr\Http\Message\StreamInterface
     */
    public function removeAccountNotifications($id, $token) {
        $url = $this->apiUrl . 'notifications/' . $id;

        $request = $this->client->delete($url, [
            'headers' => [
                'Authorization'     => (string)$token
            ]
        ]);

        return $request->getBody();
    }

    /**
     * Get user related messages
     * @param $id       = User id
     * @param $token    = Auth token
     * @return \Psr\Http\Message\StreamInterface
     */
    public function getAccountMessages($id, $token) {
        $url = $this->apiUrl . 'chats';

        $request = $this->client->get($url, [
            'headers' => [
                'Authorization'     => (string)$token
            ]
        ]);

        return $request->getBody();
    }

    /**
     * Get user related message based on message id
     * @param $id       = User id
     * @param $msg      = Message id
     * @param $token    = Auth token
     * @return \Psr\Http\Message\StreamInterface
     */
    public function getAccountMessage($id, $msg, $token) {
        $url = $this->apiUrl . 'chats/' . $msg;
        $url2 = $this->apiUrl . 'chats/' . $msg . '/messages';

        $request = $this->client->get($url, [
            'headers' => [
                'Authorization'     => (string)$token
            ]
        ]);

        $request2 = $this->client->get($url2, [
            'headers' => [
                'Authorization'     => (string)$token
            ]
        ]);

        $response = [
            'message'   => json_decode($request->getBody()),
            'messages'  => json_decode($request2->getBody())
        ];

        return json_encode($response);
    }

    /**
     * Send a message to another user
     * @param $data     = Recipient id, Message text
     * @param $token    = Auth token
     * @return \Psr\Http\Message\StreamInterface
     */
    public function sendAccountMessage($data, $token) {
        $url = $this->apiUrl . 'chats';

        $request = $this->client->post($url, [
            'headers' => [
                'Authorization'     => (string)$token
            ],
            'json' => json_decode($data)
        ]);

        return $request->getBody();
    }

    /**
     * Request account withdrawal
     * @param $id       = Account id
     * @param $data     = Amount & Comment
     * @param $token    = Auth token
     * @return \Psr\Http\Message\StreamInterface
     */
    public function postAccountWithdraw($id, $data, $token) {
        $url = $this->apiUrl . 'funds/withdrawal-requests/user/' . $id;

        $request = $this->client->post($url, [
            'headers' => [
                'Authorization'     => (string)$token
            ],
            'json' => json_decode($data)
        ]);

        return $request->getBody();
    }

    /**
     * Get relative subscriptions for account id
     * @param $id = Account id
     * @param $token = Auth token
     * @return \Psr\Http\Message\StreamInterface
     */
    public function getAccountSubscriptions($id, $token) {
        $url = $this->apiUrl . 'users/' . $id . "/subscriptions";

        $request = $this->client->get($url, [
            'headers' => [
                'Authorization'     => (string)$token
            ]
        ]);

        return $request->getBody();
    }

    public function updateAccountSubscription($id, $data, $token) {
        $url = $this->apiUrl . 'subscriptions/' . $id;

        $request = $this->client->put($url, [
            'headers' => [
                'Authorization'     => (string)$token
            ],
            'json' => json_decode($data)
        ]);

        return $request->getBody();
    }

    /***
     * Cancel relative subscription based on id
     * @param $id = Subscription id
     * @param $token = Auth token
     * @return \Psr\Http\Message\StreamInterface
     */
    public function cancelAccountSubscription($id, $token) {
        $url = $this->apiUrl . 'subscriptions/' . $id;

        $request = $this->client->delete($url, [
            'headers' => [
                'Authorization'     => (string)$token
            ]
        ]);

        return $request->getBody();
    }

    #endregion

    #region Other functions

    /**
     * Attempts to make a payment to Stripe via the API
     * @param $data     = Payment data
     * @param $token    = Auth token
     * @return \Psr\Http\Message\StreamInterface
     */
    public function stripePayment($data, $token) {
        $url = $this->apiUrl . 'stripe/charge';

        $request = $this->client->post($url, [
            'headers' => [
                'Authorization'     => (string)$token
            ],
            'json' => json_decode($data)
        ]);

        return $request->getBody();
    }

    /**
     * Uploads a file to the API
     * @param $fileName
     * @param $fileType
     * @param $file
     * @param $token
     * @return \Psr\Http\Message\StreamInterface
     */
    public function uploadFile($fileName, $fileType, $file, $token) {
        $url = $this->apiUrl . 'uploads';

        $content = file_get_contents($file->getPathName());

        $request = $this->client->post($url, [
            'headers' => [
                'Authorization'     => (string)$token,
                'Content-Type'      => (string)$fileType,
                'X-Filename'        => (string)$fileName
            ],
            'body' => $content
        ]);

        //return $request->getBody();

        // Commit the new file to the API
        $fileId = json_decode($request->getBody());
        $url2 = $this->apiUrl . 'uploads/'.$fileId.'/commit';

        $request2 = $this->client->get($url2, [
            'headers' => [
                'Authorization'     => (string)$token,
                'Content-Type'      => '*/*'
            ]
        ]);

        return $request2->getBody();
    }

    #endregion
}
