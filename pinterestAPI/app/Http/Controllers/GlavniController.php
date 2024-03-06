<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GlavniController extends Controller
{
    public function uspesno($podaci, $poruka, $status = 200)
    {
        return response()->json([
            'podaci' => $podaci,
            'poruka' => $poruka,
            'status' => $status
        ]);
    }

    public function greska($poruka, $greske = [], $status = 404)
    {
        return response()->json([
            'poruka' => $poruka,
            'greske' => $greske,
            'status' => $status
        ]);
    }
}
