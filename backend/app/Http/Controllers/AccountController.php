<?php

namespace App\Http\Controllers;

use App\Account;
use Illuminate\Http\Request;

class AccountController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['Rank', 'TopRank', 'GetAccountByID']]);
    }

    public function GetAccountByID(Request $request)
    {
        $id = $request->id;

        $account = Account::where('id', $id)->first();
        return response()->json([
            'account' => $account
        ], 200);
    }

    public function ChangeInfo(Request $request)
    {
        $acoount = auth()->user();
        Account::where('username', $acoount->username)->update($request->all());
        return response()->json([
            'message' => 'Update profile successfully'
        ], 200);
    }

    public function ChangeAvatar(Request $request)
    {
        $account = auth()->user();
        $link = $request->avatar;
        try {
            Account::where('username', $account->username)->update([
                'avatar' => $link
            ]);
            return response()->json([
                'message' => 'Change avatar successfully.'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Change avatar not complete.'
            ], 401);
        }
    }

    public function Rank()
    {
        $accounts = Account::orderby('score', 'desc')->get();
        return response()->json([
            'accounts' => $accounts
        ], 200);
    }

    public function TopRank()
    {
        $accounts = Account::orderby('score', 'desc')->take(10)->get();
        return response()->json([
            'accounts' => $accounts
        ], 200);
    }
}
