<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Charge;
use Stripe\Stripe;
use App\Stripe as StripeApi;

class StripeController extends Controller
{
    /**
     * StripeController constructor.
     */
    public function __construct()
    {
        //
    }

    /**
     * Attempts to charge a valid card to stripe
     * @param Request $req
     * @return \Illuminate\Http\JsonResponse
     */
    public function payment(Request $req) {
        try{
            // Set the api key
            Stripe::setApiKey(StripeApi::secretKey());
            // Charge card with form data
            $charge = Charge::create([
                'amount'    => $req->input('amount'),
                'currency'  => 'gbp',
                'source'    => $req->input('token')
            ]);

            // Return success response with charge data
            return response()->json([
                'success' => $charge
            ], 200);
        } catch (\Exception $e) {
            // Error Response
            return response()->json([
                "errors" => $e->getMessage()
            ], 403);
        }
    }
}
