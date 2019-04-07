<?php

namespace App\Http\Controllers;

use App\Teams;
use Illuminate\Http\Request;

class TeamsController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api',
            ['except' => [
                'All',
                'GetOne'
            ]]
        );
    }

    public function All()
    {
        $listTeam = Teams::all();
        return response()->json(['teams' => $listTeam], 200);
    }

    public function Get()
    {
        $account = auth()->user();
        if ($account->role == 1) {
            return response()->json([
                'error' => 'You aren\'t a teacher'
            ], 400);
        }
        $listTeam = Teams::where('teacher', $account->username)->get();
        return response()->json([
            'teams' => $listTeam,
            'username' => $account->username
        ], 200);
    }

    public function GetOne(Request $request)
    {
        $account = auth()->user();
        if ($account->role == 1) {
            return response()->json(['error' => 'You aren\'t a teacher'], 400);
        }
        $listTeam = Teams::where('teacher', $account->username)
            ->where(['code_team' => $request->code_team])
            ->first();
        return response()->json([
            'team' => $listTeam,
            'username' => $account->username
        ], 200);
    }

    public function Add(Request $request)
    {
        $account = auth()->user();
        if ($account->role == 1 || $account->role == 2) {
            return response()->json([
                'error' => 'You aren\'t a administrator'
            ], 400);
        }
        Teams::create($request->all());
        return response()->json([
            'status' => 'success',
            'data' => $request->all()
        ]);
    }
}
