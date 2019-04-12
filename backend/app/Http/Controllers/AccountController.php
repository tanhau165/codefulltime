<?php

namespace App\Http\Controllers;

use App\Account;
use Illuminate\Http\Request;

class AccountController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['Rank','TopRank']]);
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
