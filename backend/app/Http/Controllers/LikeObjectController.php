<?php

namespace App\Http\Controllers;

use App\LikeObject;
use Illuminate\Http\Request;

class LikeObjectController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api',
            ['except' => [
            ]]
        );
    }

    public function IsLike(Request $request)
    {
        $codeObj = $request->code_object;
        $account = auth()->user();
        $isLike = LikeObject::where('username', $account->username)->where('code_object', $codeObj)->first();
        if ($isLike == null) {
            $listAccount = LikeObject::where('code_object', $codeObj)->get();
            $number_of_like = count($listAccount);
            return response()->json([
                'status' => 0,
                'number_of_like' => $number_of_like,
                'accounts' => $listAccount
            ]);
        }
        $listAccount = LikeObject::where('code_object', $codeObj)->get();
        $number_of_like = count($listAccount);
        return response()->json([
            'status' => 1,
            'number_of_like' => $number_of_like,
            'accounts' => $listAccount
        ]);
    }

    public function AddLike(Request $request)
    {
        $account = auth()->user();
        $codeObj = $request->code_object;

        $isLike = LikeObject::where('username', $account->username)->where('code_object', $codeObj)->first();
        if ($isLike != null) {
            LikeObject::where('username', $account->username)->where('code_object', $codeObj)->delete();
            $listAccount = LikeObject::where('code_object', $codeObj)->get();
            $number_of_like = count($listAccount);
            return response()->json([
                'status' => 0,
                'number_of_like' => $number_of_like,
                'accounts' => $listAccount
            ]);
        }

        $c = round(microtime(true) * 1000);
        $code = $c . rand_string(20);
        $request->merge([
            'code_like' => $code,
            'username' => $account->username
        ]);
        LikeObject::create($request->all());
        $listAccount = LikeObject::where('code_object', $codeObj)->get();
        $number_of_like = count($listAccount);
        return response()->json([
            'status' => 1,
            'number_of_like' => $number_of_like,
            'accounts' => $listAccount
        ]);

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