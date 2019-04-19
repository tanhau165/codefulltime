<?php

namespace App\Http\Controllers;

use App\AnsComment;
use Illuminate\Http\Request;

class AnsCommentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['GetWithComment', 'GetAll']]);
    }

    public function Add(Request $request)
    {
        $account = auth()->user();
        $c = round(microtime(true) * 1000);
        $code = $c . rand_string(25);
        $time = date('h:i:s d-m-Y');
        $request->merge([
            'ans_code_comment' => $code,
            'username' => $account->username,
            'time' => $time
        ]);

        AnsComment::create($request->all());
        return response()->json([
            'ans_comment' => AnsComment::where('ans_code_comment', $code)->first(),
            'message' => 'success'
        ], 200);
    }

    public function GetWithComment(Request $request)
    {
        $code_comment = $request->code_comment;
        $comments = AnsComment::where('code_comment', $code_comment)->get();
        return response()->json([
            'ans_comments' => $comments
        ]);

    }

    public function GetAll()
    {
        $comments = AnsComment::all();
        return response()->json([
            'ans_comments' => $comments
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