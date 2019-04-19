<?php

namespace App\Http\Controllers;

use App\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['GetOne', 'GetAll']]);
    }

    public function Add(Request $request)
    {
        $account = auth()->user();
        $c = round(microtime(true) * 1000);
        $code = $c . rand_string(25);
        $time = date('h:i:s d-m-Y');
        $request->merge([
            'code_comment' => $code,
            'username' => $account->username,
            'time' => $time
        ]);

        Comment::create($request->all());
        return response()->json([
            'comment' => Comment::where('code_comment', $code)->first(),
            'message' => 'success'
        ], 200);
    }

    public function GetOne(Request $request)
    {
        $codeObject = $request->code_object;
        $comments = Comment::where('code_object', $codeObject)->orderby('code_comment', 'desc')->get();
        return response()->json([
            'comments' => $comments
        ]);
    }

    public function GetAll()
    {
        $comments = Comment::orderby('code_comment', 'desc')->get();
        return response()->json([
            'comments' => $comments
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
