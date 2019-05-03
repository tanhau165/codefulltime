<?php

namespace App\Http\Controllers;

use App\Account;
use App\Medias;
use Illuminate\Http\Request;

class MediasController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api',
            ['except' => [
                'GetById'
            ]]
        );
    }

    public function GetById(Request $request)
    {
        $acc = Account::where('id', $request->id)->first();

        return response()->json([
            'medias' => Medias::where('username', $acc->username)->get()
        ]);

    }

}
