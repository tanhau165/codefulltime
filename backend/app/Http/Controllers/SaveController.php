<?php

namespace App\Http\Controllers;

use App\Account;
use App\Friends;
use App\Save;
use Illuminate\Http\Request;

class SaveController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api',
            ['except' => [
                'GetByID',
            ]]
        );
    }

    public function GetByID(Request $request){
        $acc = Account::where('id', $request->id)->first();
        $friends = Save::where('username', $acc->username)->get();
        return response()->json([
            'saved' => $friends
        ], 200);
    }

    public function Add(Request $request)
    {
        $account = auth()->user();
        $c = round(microtime(true) * 1000);
        $code = $c . rand_string(20);
        $request->merge([
            'code_save' => $code,
            'username' => $account->username
        ]);

        $exits = Save::where('username', $account->username)->where('code_object', $request->code_object)->get();
        if ($exits == null) {
            Save::create($request->all());
        }
        return response()->json([
            'message' => 'Saved !'
        ], 200);

    }

}

function rand_string($length)
{
    $str = "";
    $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    $size = strlen($chars);
    for ($i = 0; $i < $length; $i++) {
        $str .= $chars[rand(0, $size - 1)];
    }
    $str = substr(str_shuffle($chars), 0, $length);
    return $str;
}