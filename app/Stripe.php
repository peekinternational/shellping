<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Stripe extends Model
{
    /**
     * Api constructor.
     */
    public function __construct() {
        $this->apiKey = config('app.stripe.secret_key');
    }

    public static function secretKey() {
        return config('app.stripe.secret_key');
    }
}
