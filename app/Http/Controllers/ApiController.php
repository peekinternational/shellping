<?php

namespace App\Http\Controllers;

use App\Api;
use Illuminate\Http\Request;
use GuzzleHttp;
use GuzzleHttp\Subscriber\Oauth\Oauth1;
use Stripe\Source;
use Stripe\Stripe;
use Stripe\Customer;
use Stripe\Plan;
use Stripe\Subscription;
use Stripe\Invoice;
use Stripe\Token;

class ApiController extends Controller
{
    #region Constructors

    /**
     * StripeController constructor.
     */
    public function __construct()
    {
        //
        $this->api = new Api;
        $this->stripe = new Stripe;

        // Set stripe api key
        $this->stripe->setApiKey("sk_test_vh4LK3DF0I2zy2XQ2nEYh4lL");
    }

    #endregion

    #region Global functions

    /**
     * Gets all premade texts to show on frontend
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function screenTexts(Request $req) {
        try {
            return $this->api->screenTexts($req->header('Authorization'));
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    /**
     * Gets all premade help texts to show on frontend
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function helpTexts(Request $req) {
        try {
            return $this->api->helpTexts($req->header('Authorization'));
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    /**
     * Gets all subscription plans
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function subscriptionPlans(Request $req) {
        try {
            return $this->api->subscriptionPlans($req->header('Authorization'));
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    /**
     * Submits feedback
     * @param Request $req = feedback data
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function postFeedback(Request $req) {
        try {
            return $this->api->postFeedback($req->getContent(), $req->header('Authorization'));
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    #endregion

    #region Auth functions

    /**
     * User Signup
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function signup(Request $req) {
        try {
            $data = [
                "name" => $req->input('full_name'),
                "password" => $req->input('password'),
                "email" => $req->input('email'),
                "username" => $req->input('username'),
                "gender" => $req->has('gender') ? $req->input('gender') : '',
                "about" => $req->has('about') ? $req->input('about') : '',
                "phone" => $req->has('phone') ? $req->input('phone') : '',
                "notificationToken" => $req->has('notificationToken') ? $req->input('notificationToken') : '',
                "project" => $req->has('project') ? $req->input('project') : null
            ];
            $account = $this->api->signup($data);

            // Check that the account was created
            /*if(!is_null($account)) {
                // Create stripe customer based on account details.
                Customer::create([
                    "description" => "Customer for " . $req->input('full_name'),
                    "email" => $req->input('email')
                ]);
            }*/

            return $account;
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    /**
     * User email login
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function login(Request $req) {
        try {
            $user = $this->api->login($req->input('email'), $req->input('password'));

            // Check if user was logged in
            $response = json_decode($user);

            if($response->token) {
                // Check if user has a related stripe customer
                /*$customers = Customer::all([
                    "email" => $req->input('email'),
                    "limit" => 1
                ]);

                // If not then create one
                // Create stripe customer based on account details.
                if(count($customers->data) == 0) {
                    Customer::create([
                        "description" => "Customer for " . $response->name,
                        "email" => $req->input('email')
                    ]);
                }*/
            }

            return $user;
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    public function passwordReset(Request $req) {
        try {
            return $this->api->passwordReset($req->input('email'));
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    public function passwordResetToken(Request $req) {
        try {
            return $this->api->passwordResetToken($req->input('password'), $req->input('token'));
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    public function getAccountActivation(Request $req) {
        try {
            return $this->api->activateAccount($req->input('token'));
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    public function socialLogin(Request $req) {
        try {
            $response = $this->api->socialLogin($req->input('provider'), $req->input('token'));

            return $response;

        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    public function twitterLogin(Request $req) {
        try {
            $response = $this->api->twitterLogin($req->input('oauth_token') , $req->input('oauth_verifier'), $req->input('redirectUri'));

            return $response;

        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    /**
     * User logout
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function logout(Request $req) {
        try {
            $response = $this->api->logout($req->header('Authorization'));

            return $response;

        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    public function authenticate(Request $req) {
        try {
            $response = $this->api->authenticate($req->header('Authorization'));

            return $response;

        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    #endregion

    #region Project functions

    /**
     * Get all projects from API
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function allProjects(Request $req) {
        try {
            return $this->api->allProjects();
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    /**
     * Get random list of projects from API
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function randomProjects(Request $req) {
        try {
            return $this->api->randomProjects();
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    /**
     * Gets list of projects based on route params
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function getProjects(Request $req) {
        try {
            $projects = $this->api->getProjects(
                $req->get('page'),
                $req->get('categories'),
                $req->get('swLat'),
                $req->get('swLon'),
                $req->get('neLat'),
                $req->get('neLon'),
                $req->get('order'),
                $req->get('ascending')
            );
            return $projects;
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    public function searchProjects(Request $req) {
        try {
            return $this->api->searchProjects($req->get('term'), $req->header('Authorization'));
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    /**
     * Get single project based on ID
     * @param $id   = Project Id
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function getProject($id, Request $req) {
        try {
            return $this->api->getProject($id, $req->header('Authorization'));
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    /**
     * Creates a new project with input data
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function createProject(Request $req) {
        try {
            $logo = '';
            $logoString = '';
            // Check if we have image file
            if($req->hasFile('logo')) {
                // Determine the file data
                $file       = $req->file('logo');
                $name       = $file->getClientOriginalName();
                $type       = $file->getMimeType();
                // Store the file to API
                $logo = $this->api->uploadFile($name, $type, $file, $req->header('Authorization'));
                //return $this->api->uploadFile($name, $type, $file, $req->header('Authorization'));
                //return $file->size();
            }
            // Build form data
            $tags = explode(",", $req->get('tags'));
            $cats = explode(",", $req->get('category'));

            // Set avatar link
            if($req->hasFile('logo')) {
                $logoString = (string)$logo;
                $logoString = str_replace('"', '', $logoString);
            }

            $formData = [
                'title' => $req->get('title'),
                'desc' => $req->get('desc'),
                'categories' => $cats,
                'location' => [
                    'latitude' => $req->get('lat'),
                    'longitude' => $req->get('lon'),
                ],
                'locationName' => $req->get('locationName'),
                'logo'  => $logoString,
                'tags' => $tags,
                'web' => $req->get('web'),
                'fb' => $req->get('fb'),
            ];

            // Create json string
            // Attempt to store new project to API
            $newProject = $this->api->createProject($formData, $req->header('Authorization'));

            //$this->api->updateProjectTags($newProject->id, $tags, $req->header('Authorization'));

            return $newProject;
            //echo json_encode($cats);
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    /**
     * Adds a rating to project with input data
     * @param $id   = Project Id
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|string
     */
    public function rateProject($id, Request $req) {
        try {
            $this->api->rateProject($id, $req->getContent(), $req->header('Authorization'));

            return $this->api->getProjectReviews($id, $req->header('Authorization'));

        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    /**
     * Reply to user review / rating
     * @param $id = Project id
     * @param $user = User id
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function rateProjectReply($id, $user, Request $req) {
        try {
            return $this->api->rateProjectReply($id, $user, $req->getContent(), $req->header('Authorization'));
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    /**
     * Assignes current user as a backer of given project
     * @param $id   = Project Id
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function backProject($id, Request $req) {
        try {
            return $this->api->backProject($id, $req->header('Authorization'));
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    /**
     * Removes current user as a backer of given project
     * @param $id   = Project Id
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function unbackProject($id, Request $req) {
        try {
            return $this->api->unbackProject($id, $req->header('Authorization'));
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    /**
     * * Will attempt to add funds to the project based on Input data
     * @param $id
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function donateProject($id, Request $req) {
        try {
            return $this->api->donateProject($id, $req->getContent(), $req->header('Authorization'));
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    /**
     * Sets project status to Paused
     * @param $id   = Project Id
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function pauseProject($id, Request $req) {
        try {
            return $this->api->pauseProject($id, $req->header('Authorization'));
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    /**
     * Sets project status to Active
     * @param $id   = Project Id
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function resumeProject($id, Request $req) {
        try {
            return $this->api->resumeProject($id, $req->header('Authorization'));
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    /**
     * Updates the project details based on Input data
     * @param $id   = Project Id
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function editProject($id, Request $req) {
        try {
            $logo = '';
            // Check if we have image file
            if($req->hasFile('logo')) {
                // Determine the file data
                $file       = $req->file('logo');
                $name       = $file->getClientOriginalName();
                $type       = $file->getMimeType();
                // Store the file to API
                $logo = $this->api->uploadFile($name, $type, $file, $req->header('Authorization'));
                //return $this->api->uploadFile($name, $type, $file, $req->header('Authorization'));
                //return $file->size();
            }

            // Build form data
            $tags = explode(",", $req->get('tags'));
            $cats = explode(",", $req->get('category'));

            // Set avatar link
            $logoString = "";
            if($logo) {
                $logoString = (string)$logo;
                $logoString = str_replace('"', '', $logoString);
            } else {
                $logoString = $req->get('logo');
            }

            $formData = [
                'title' => $req->get('title'),
                'desc' => $req->get('desc'),
                'categories' => $cats,
                'location' => [
                    'latitude' => $req->get('lat'),
                    'longitude' => $req->get('lon'),
                ],
                'locationName' => $req->get('locationName'),
                'logo'  => $logoString,
                'tags' => $tags,
                'web' => $req->get('web'),
                'fb' => $req->get('fb'),
            ];

            $newProject = $this->api->updateProject($id, $formData, $req->header('Authorization'));

            $this->api->updateProjectTags($id, $tags, $req->header('Authorization'));

            return $newProject;
            //return json_encode($logoString);
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    /**
     * Removes all backers and archives the project, reason is also given for deltion
     * @param $id   = Project Id
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function deleteProject($id, Request $req) {
        try {
            return $this->api->deleteProject($id, $req->input('comment'), $req->header('Authorization'));
            // return json_decode($req->getContent());
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    /**
     * @param $id = Project ID
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function postProjectWithdraw($id, Request $req) {
        try {
            return $this->api->postProjectWithdraw($id, $req->getContent(), $req->header('Authorization'));
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    /**
     * Submits a report for project
     * @param $id = Project id
     * @param Request $req = report data
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function reportProject($id, Request $req) {
        try {
            return $this->api->reportProject($id, $req->getContent(), $req->header('Authorization'));
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    /**
     * Generates a project transfer token
     * @param $id = Project id
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function generateProjectToken($id, Request $req) {
        try {
            return $this->api->generateProjectToken($id, $req->header('Authorization'));
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    /**
     * @param $id
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function transferProjectRequest($id, Request $req) {
        try {
            return $this->api->transferProjectRequest($id, $req->getContent(), $req->header('Authorization'));
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    #endregion

    #region Storefront functions
    /**
     * Gets all items
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function getStoreItems(Request $req) {
        try {
            return $this->api->getStoreItems($req->get('page'));
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    /**
     * Get single item based on ID
     * @param $id   = Item Id
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function getStoreItem($id, Request $req) {
        try {
            return $this->api->getStoreItem($id, $req->header('Authorization'));
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    #endregion

    #region Affiliate Shop functions ( Obsolete )

    /**
     * Gets all shops
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function getShops(Request $req) {
        try {
            return $this->api->getShops($req->get('page'), $req->get('categories'));
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    /**
     * Gets a single shop
     * @param $id   = Shop Id
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function getShop($id, Request $req) {
        try {
            return $this->api->getShop($id, $req->all());
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    #endregion

    #region Enumerable

    /**
     * Gets all categories
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function getCategories(Request $req) {
        try {
            return $this->api->getCategories();
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    /**
     * Gets all shop categories
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function getShopCategories(Request $req) {
        try {
            return $this->api->getShopCategories();
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    /**
     * Gets all skills ( Not Used Anymore )
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function getSkills(Request $req) {
        try {
            return $this->api->getSkills();
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    /**
     * Gets all interests ( Not Used Anymore )
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function getInterests(Request $req) {
        try {
            return $this->api->getInterests();
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    #endregion

    #region User functions

    /**
     * Gets all users for given page number ( default is 0 if no page is provided )
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function getUsers(Request $req) {
        try {
            $users = $this->api->getUsers(
                $req->get('page'),
                $req->get('interests'),
                $req->get('skills')
            );
            return $users;
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    public function searchUsers(Request $req) {
        try {
            return $this->api->searchUsers($req->get('name'), $req->header('Authorization'));
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    /**
     * Gets a single users details based on Id
     * @param $id   = User Id
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function getUser($id, Request $req) {
        try {
            return $this->api->getUser($id);
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    /**
     * Gets all user related projects
     * @param $id   = User Id
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function getUserProjects($id, Request $req) {
        try {
            return $this->api->getUserProjects($id, $req->header('Authorization'));
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    /**
     * Gets all pojects the user is Backing
     * @param $id   = User Id
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function getUserBackedProjects($id, Request $req) {
        try {
            return $this->api->getUserBackedProjects($id, $req->header('Authorization'));
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    #endregion

    #region User Action functions

    /**
     * Current user blocks another user based on Id, if user is already blocked then we will unblock
     * @param $id   = User to block Id
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function blockUser($id, Request $req) {
        try {
            return $this->api->blockUser($id, $req->get('method'), $req->header('Authorization'));
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    #endregion

    #region Account functions

    /**
     * Gets current users fund details
     * @param $id   = User ud
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function getAccountFunds($id, Request $req) {
        try {
            return $this->api->getAccountFunds($id, $req->header('Authorization'));
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    /**
     * Gets current users purchase history
     * @param $id   = User id
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function getAccountPurchases($id, Request $req) {
        try {
            return $this->api->getAccountPurchases($id, $req->header('Authorization'));
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    /**
     * Gets current users invoices history
     * @param $id   = User id
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function getAccountInvoices($id, Request $req) {
        try {
            return $this->api->getAccountInvoices($id, $req->header('Authorization'));
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    /**
     * Gets current users profile details
     * @param $id   = User id
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function getAccountProfile($id, Request $req) {
        try {
            return $this->api->getAccountProfile($id, $req->header('Authorization'));
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    /**
     * Updates the users avatar
     * @param $id   = User id
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function updateAccountAvatar($id, Request $req) {
        try {
            // Check if we have image file
            if($req->hasFile('photo')) {
                $newAvatar = '';
                // Determine the file data
                $file       = $req->file('photo');
                $name       = $file->getClientOriginalName();
                $type       = $file->getMimeType();
                // Store the file to API
                $newAvatar = $this->api->uploadFile($name, $type, $file, $req->header('Authorization'));
                //return $this->api->uploadFile($name, $type, $file, $req->header('Authorization'));
                //return $newAvatar;

                $avatarString = (string)$newAvatar;
                $avatarString = str_replace('"','',$avatarString);

                $user = [
                    'photo' => $avatarString
                ];

                return $this->api->updateAccountProfile($id, $user, $req->header('Authorization'));
            }
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    /**
     * Updates users profile details based on input
     * @param $id   = User id
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function updateAccountProfile($id, Request $req) {
        try {
            return $this->api->updateAccountProfile($id, $req->getContent(), $req->header('Authorization'));
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    /**
     * @param $id
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function updateAccountCard($id, Request $req) {
        try {
            return $this->api->updateAccountCard($id, $req->getContent(), $req->header('Authorization'));
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }


    /**
     * Gets current users account settings
     * @param $id   = User id
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function getAccountSettings($id, Request $req) {
        try {
            return $this->api->getAccountSettings($id, $req->header('Authorization'));
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    /**
     * Updates current users account settings based on Input
     * @param $id   = User id
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function updateAccountSettings($id, Request $req) {
        try {
            return $this->api->updateAccountSettings($id, $req->getContent(), $req->header('Authorization'));
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    /**
     * Gets current users recent notifications
     * @param $id   = User id
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function getAccountNotifications($id, Request $req) {
        try {
            return $this->api->getAccountNotifications($id, $req->header('Authorization'));
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    /**
     * Removes relative notification
     * @param $id   = Notification ID
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse
     */
    public function removeAccountNotifications($id, $nId, Request $req) {
        try {
            return $this->api->removeAccountNotifications($nId, $req->header('Authorization'));
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    /**
     * Gets current users messages
     * @param $id   = User id
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function getAccountMessages($id, Request $req) {
        try {
            return $this->api->getAccountMessages($id, $req->header('Authorization'));
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    /**
     * Gets all sub messages of a message record based on Id of user and Id of message
     * @param $id   = User id
     * @param $msg  = Message id
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function getAccountMessage($id, $msg, Request $req) {
        try {
            return $this->api->getAccountMessage($id, $msg, $req->header('Authorization'));
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    /**
     * Sends a message to a user from current user
     * @param $id   = Current user id
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function sendAccountMessage($id, Request $req) {
        try {
            return $this->api->sendAccountMessage($req->getContent(), $req->header('Authorization'));
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    /**
     * Post request to API to withdraw available funds
     * @param $id = Account Id
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse
     */
    public function postAccountWithdraw($id, Request $req) {
        try {
            return $this->api->postAccountWithdraw($id, $req->getContent(), $req->header('Authorization'));
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    /**
     * Get relative subscriptions for account id
     * @param $id = Account id
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function getAccountSubscriptions($id, Request $req) {
        try {
            return $this->api->getAccountSubscriptions($id, $req->header('Authorization'));
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    /**
     * Updates subscription items for account
     * @param $id   = Subscription id
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateAccountSubscription($id, Request $req) {
        try {
            return $this->api->updateAccountSubscription($id, $req->getContent(), $req->header('Authorization'));
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    /**
     * Cancels subscription based on subscription id
     * @param $id = subscription id
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse|\Psr\Http\Message\StreamInterface
     */
    public function cancelAccountSubscription($id, Request $req) {
        try {
            return $this->api->cancelAccountSubscription($id, $req->header('Authorization'));
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    #endregion

    #region Cart Functions

    /**
     * Attempts to charge a valid card to stripe
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse
     */
    public function stripePayment(Request $req) {
        try {
            return $this->api->stripePayment($req->getContent(), $req->header('Authorization'));
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }

    /**
     * Generate token from stripe
     * @param $cardData = EG: {
     * "id":"tok_1ChzoJEpNwkjKAlhI739Ecul",
     * "object":"token","card":{"id":"card_1ChzoIEpNwkjKAlh8RIW37Bt","object":"card","address_city":"doncaster","address_country":"UK","address_line1":"40 truro aveneu",
     * "address_line1_check":"unchecked","address_line2":"wheatley","address_state":"south yorkshire","address_zip":"dn24pr","address_zip_check":"unchecked","brand":"Visa",
     * "country":"US","cvc_check":"unchecked","dynamic_last4":null,"exp_month":12,"exp_year":2019,"fingerprint":"hbafrv5DLgh9KicW","funding":"credit","last4":"4242","metadata":[],
     * "name":null,"tokenization_method":null},"client_ip":"82.44.40.211","created":1530191119,"livemode":false,"type":"card","used":false}
     * @return \Exception|Token
     */
    public function stripeToken($cardData) {
        try {
            $newCardArr = [
                "number" => $cardData->number,
                "exp_month" => $cardData->exp_month,
                "exp_year" => $cardData->exp_year,
                "cvc" => $cardData->cvc,
                "address_country" => "UK",
                "address_line1" => $cardData->address_line1,
                "address_line2" => isset($cardData->address_line2) ? $cardData->address_line2 : '',
                "address_city" => isset($cardData->address_city) ? $cardData->address_city : '',
                "address_state" => isset($cardData->address_state) ? $cardData->address_state : '',
                "address_zip" => $cardData->address_zip,
            ];
            return Token::create([
                "card" => $newCardArr
            ]);
        } catch (\Exception $e) {
            return $e;
        }
    }

    /**
     * @param $cardData
     * @return \Exception|Source
     */
    public function stripeSource($cardData) {
        try {
            /*$newCardArr = [
                "number" => $cardData->number,
                "exp_month" => $cardData->exp_month,
                "exp_year" => $cardData->exp_year,
                "cvc" => $cardData->cvc,
                "address_country" => "UK",
                "address_line1" => $cardData->address_line1,
                "address_line2" => isset($cardData->address_line2) ? $cardData->address_line2 : '',
                "address_city" => isset($cardData->address_city) ? $cardData->address_city : '',
                "address_state" => isset($cardData->address_state) ? $cardData->address_state : '',
                "address_zip" => $cardData->address_zip,
            ];*/
            return Source::create([
                "type" => "card",
                "token" => $cardData
            ]);
        } catch (\Exception $e) {
            return $e;
        }
    }

    /**
     * Handles subscriptions and single purchases from the cart data
     * @param Request $req = cart data
     * @return array|\Illuminate\Http\JsonResponse
     */
    public function postCartCheckout(Request $req) {
        try {
            $data = json_decode($req->getContent());
            $subscriptionIds = [];
            $allSubscriptions = [];
            $singlePurchaseItems = [];
            $autoAttemptPayment = false;
            $cardData = $data->card;
            $accountToken = null;

            $returnData = [
                "subscriptions" => [],
                "purchases" => null
            ];

            // Check if user is to store card to account
            if(isset($data->storeCard) && ($data->storeCard == true || $data->storeCard == 1)) {
                // Set card source
                $newSource = ["token" => $this->stripeSource($data->stripeToken)->id];

                // Call to store card data
                $accountToken = $this->api->storeCardToken($data->userId, $newSource, $req->header('Authorization'));

                // Auto confirm subs
                $autoAttemptPayment = true;
            }



            // Check if user wants to used stored card data
            if(!$data->useExistingCard) {
                // Generate new stripe token
                $data->stripeToken = $this->stripeToken($cardData);
            } else {
                // We have account source token & want to use it
                $accountToken = ['id' => $data->stripeToken];
                $autoAttemptPayment = true;
            }

            // gather all subscription id's from items
            foreach ($data->items as $item) {
                // Check if item is a subscription
                if ($item->_data->isSubscription == 1) {

                    // Check if subscription id in array
                    if (!in_array($item->_data->subscription, $subscriptionIds)) {
                        // If not in array add subscription
                        array_push($subscriptionIds, $item->_data->subscription);
                    }
                } else {
                    // Add new single purchase item
                    $newItem = ["itemId" => $item->_id, "quantity" => $item->_quantity];
                    array_push($singlePurchaseItems, $newItem);
                }
            }

            // Subscribe to item/s based on subscription id
            foreach ($subscriptionIds as $sub) {
                // create new instance of subscription data
                $newSubscription = [
                    'planId' => $sub,
                    'userId' => $data->userId,
                    'items' => [],
                    'attemptConfirmation' => $autoAttemptPayment,
                    'address' => $data->address
                ];

                foreach ($data->items as $item) {
                    // If item is not subscription
                    if ($item->_data->isSubscription != 1) {
                        // Skip item
                        break;
                    }

                    // Check if items subscription id is equal to current subscription id
                    if ($item->_data->subscription == $sub) {
                        $newItem = [
                            'itemId' => $item->_data->product_id,
                            'quantity' => $item->_quantity,
                        ];

                        // Add new item to array
                        array_push($newSubscription['items'], $newItem);
                    }
                }

                $sub = $this->api->setupSubscription($newSubscription, $req->header('Authorization'));
                $sub = json_decode($sub);

                // If subscription setup and first subscription item
                if (!is_null($sub) && !$autoAttemptPayment) {
                    // Attempt to process subscription
                    $returnedSubscription = $this->api->confirmSubscription($sub->id, ['token' => $data->stripeToken->id], $req->header('Authorization'));
                    array_push($allSubscriptions, $returnedSubscription);
                    // Now that the first payment processed we can use the stored card details for the rest
                    // of the subscriber's items in our array
                    $autoAttemptPayment = true;
                }

                //return print(json_encode($newSubscription));
                array_push($returnData['subscriptions'], $sub);
            }

            //return json_encode($allSubscriptions);

            // Single purchase item/s
            if (count($singlePurchaseItems) > 0) {

                // Check what token to use
                // $tokenToUse = $data->useExistingCard || $data->storeCard ? $accountToken["id"] : $data->newToken->id; // API should of used $accountToken but instead omits it :/

                // Attempt to purchase item without sub
                $newSinglePurchase = [
                    'email' => $data->email,
                    'address' => $data->address,
                    'projectId' => $req->header('Authorization') != null ? null : $data->projectId, // Only need if not authorized ( signed in )
                    'items' => $singlePurchaseItems
                ];

                // Only send token data if account token is null
                if(is_null($accountToken)) {
                    $data->newToken = $this->stripeToken($cardData);
                    $newSinglePurchase['token'] = $data->newToken->id;
                }

                //return $newSinglePurchase;

                // Single purchase and not subscription
                $newPurchase = $this->api->itemSinglePurchase($newSinglePurchase, $req->header('Authorization'));
                $newPurchase = json_decode($newPurchase);

                $returnData['purchases'] = $newPurchase;
            }

            /*foreach ($data->items as $item) {
                // Check if item is a subscription
                if ($item->_data->isSubscription == 0) {
                    // Generate new stripe token
                    $newToken = $this->stripeToken($cardData);

                    // Attempt to purchase item without sub
                    $newSinglePurchase = [
                        'itemId' => $item->_data->product_id,
                        'quantity' => $item->_quantity,
                        'email' => $data->email,
                        'address' => $data->address,
                        'projectId' => $data->projectId,
                        'token' => $newToken
                    ];

                    // Single purchase and not subscription
                    $newPurchase = $this->api->itemSinglePurchase($newSinglePurchase, $req->header('Authorization'));

                    $returnData->purchases->push($newPurchase);
                }
            }*/

            // Return some data
            return $returnData;
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage(),
                "file"  => $e->getFile(),
                "line"  => $e->getLine(),
                "data"  => $data
            ], 403);
        }
    }

    // Test Functions
    /*public function postCartCheckout(Request $req) {
        try {
            $data = json_decode($req->getContent());

            $subIds = [];

            //
            foreach($data->items as $item) {
                // Check if item is a subscription
                if($item->_data->isSubscription == 1) {
                    // Create subscription
                    $newSub = Subscription::create([
                        "customer" => "cus_CMLEBJBK0ixZaY",
                        "items" => [
                            [
                                "plan" => "plan_52210001"
                            ]
                        ]
                    ]);

                    // Add new subscription to array
                    //array_push($subIds, $newSub->id);
                }
            }

            // Create invoice
            // This should create a new invoice that contains all remaining unpaid items.
            $newInvoice = Invoice::create([
                "customer" => "cus_CMLOwCduOjCUID"
                ]);

            //return $subscription;

        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }*/

    /**
     * Attempts to setup subscription/s based on data passed
     * @param Request $req = Subscription related data
     * @return array|\Illuminate\Http\JsonResponse
     */
    public function setupSubscriptions(Request $req) {
        try {
            $data = json_decode($req->getContent());
            $cardData = $data->card;
            $allSubscriptions = [];
            $accountToken = null;
            $autoConfirm = true;

            //return $data->items;

            // Check if user wants to used stored card data
            if(isset($data->useExistingCard) && ($data->useExistingCard == true || $data->useExistingCard == 1)) {
                $accountToken = ["id" => $data->stripeToken];
            } else {
                $autoConfirm = false;
            }

            // Subscribe to item/s based on subscription id
            for ($i = 0; $i < count($data->items); $i++) {
                // create new instance of subscription data
                $newSubscription = [
                    'planId' => $data->items[$i]->planId,
                    'userId' => $data->userId,
                    'items' => $data->items[$i]->items,
                    'attemptConfirmation' => $autoConfirm,
                    'address' => $data->address
                ];

                $newSub = $this->api->setupSubscription($newSubscription, $req->header('Authorization'));
                $newSub = json_decode($newSub);

                // If subscription setup and first subscription item
                if (!is_null($newSub) && !$autoConfirm) {
                    // Generate new stripe token
                    $data->newToken = $this->stripeToken($cardData);
                    // Attempt to process subscription
                    $returnedSubscription = $this->api->confirmSubscription($newSub->id, ['token' => $data->newToken->id], $req->header('Authorization'));
                    array_push($allSubscriptions, $returnedSubscription);
                } else {
                    array_push($allSubscriptions, $newSub);
                }
            }

            return $allSubscriptions;
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage(),
                "file"  => $e->getFile(),
                "line"  => $e->getLine(),
                "data"  => $data
            ], 403);
        }
    }

    #endregion

    #region STATIC VIEWS FOR SOCIAL MEDIA LINT

    // Projects
    public function getProjectsIndexStatic(Request $req) {
        $data = $this->api->getProjects(0, $req->get('category'));
        $data = json_decode($data, true);
        $data = $data['data'];

        //return $data;
        return view('static.projects.index', compact('data'));
    }

    public function getProjectStatic($id, Request $req) {
        $data = $this->api->getProject($id, $req->header('Authorization'));
        $data = json_decode($data, true);
        $data = $data['project'];

        //return $data;
        return view('static.projects.view', compact('data'));
    }

    // Storefront

    // Users
    public function getUserStatic($id, Request $req) {
        $data = $this->api->getUser($id);
        $data = json_decode($data, true);

        //return $data;
        return view('static.user', compact('data'));
    }

    #endregion
}
