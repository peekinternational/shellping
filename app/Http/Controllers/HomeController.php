<?php

namespace App\Http\Controllers;

use App\Api;
use Jaybizzle\CrawlerDetect\CrawlerDetect;

class HomeController extends Controller
{
    /**
     * HomeController constructor.
     */
    public function __construct()
    {
        //
    }

    public function index() {

        $crawlerDetect = new CrawlerDetect;

        $userAgent = $_SERVER['HTTP_USER_AGENT'];
        $urlRequest = $_SERVER['REQUEST_URI'];
        $debug = false;

        /*if(strpos($userAgent, 'facebook') !== false || strpos($userAgent, 'twitter') !== false || strpos($userAgent, 'pinterest') !== false || strpos($userAgent, 'Google') !== false) {*/
        if($crawlerDetect->isCrawler() || $debug) {

            // Check if single project view
            if(strpos($urlRequest, '/projects/') !== false) {
                $dataId = substr($urlRequest, strrpos($urlRequest, 'projects/'));
                if($dataId != null) {
                    return redirect('static/' . $dataId);
                }
            }

            // Check if project index
            if(strpos($urlRequest, '/projects') !== false) {
                    return redirect('static/projects');
            }

            // Check if single user view
            if(strpos($urlRequest, '/users/') !== false) {
                $dataId = substr($urlRequest, strrpos($urlRequest, 'users/'));
                if($dataId != null) {
                    return redirect('static/users/' . $dataId);
                }
            }

            return view('static.default');
        }

        // Return normal view if not crawler
        return view('layouts.default');
    }
}
