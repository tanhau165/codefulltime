<?php

namespace App\Http\Controllers;

use App\Pastes;
use Illuminate\Http\Request;

class PasteController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api',
            ['except' => [
                'GetByCollection',
                'GetOne',
                'GetByUsername',
            ]]
        );
    }


    public function GetAll()
    {
        return response()->json([
            'pastes' => Pastes::all()
        ], 200);
    }

    public function GetOne(Request $request)
    {
        $code_paste = $request->code_paste;
        return response()->json([
            'paste' => Pastes::where('code_paste', $code_paste)->first()
        ], 200);

    }

    public function GetByUsername(Request $request)
    {
        $username = $request->username;
        return response()->json([
            'paste' => Pastes::where('username', $username)->first()
        ], 200);

    }

    public function PasteOfMe(Request $request)
    {
        $username = $request->username;
        return response()->json([
            'paste' => Pastes::where('username', $username)->first()
        ], 200);

    }

    public function Add(Request $request)
    {
        $account = auth()->user();
        $c = round(microtime(true) * 1000);
        $code = $c . rand_string(20);

        $request->merge([
            'username' => $account->username,
            'number_of_like' => 0,
            'number_of_view' => 0,
            'code_paste' => $code
        ]);
        Pastes::create($request->all());
        return response()->json([
            'message' => 'Add new pastes successfully',
            'paste' => $request->all()
        ], 200);
    }

    public function Update(Request $request)
    {
        auth()->user();
        Pastes::find($request->code_paste)
            ->update($request->all());

        return response()->json([
            'message' => 'Update paste successfully',
            'paste' => $request->all()
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
