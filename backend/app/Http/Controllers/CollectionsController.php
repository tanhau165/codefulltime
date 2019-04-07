<?php

namespace App\Http\Controllers;

use App\Collections;
use Illuminate\Http\Request;

class CollectionsController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api',
            ['except' => [
                'GetByTeam',
                'GetAll',
                'GetOne'
            ]]
        );
    }

    public function GetAll()
    {
        try {
            $collection = Collections::all();
            return response()->json(['status' => 'success', 'data' => $collection], 200);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'data' => $e], 500);
        }
    }

    public function GetByTeam(Request $request)
    {
        $code_team = $request->code_team;

        try {
            $collection = Collections::where('code_team', $code_team)->get();
            return response()->json([
                'status' => 'success',
                'collections' => $collection
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'data' => $e
            ], 500);
        }
    }

    public function GetOne(Request $request)
    {
        $code_collection = $request->code_collection;

        try {
            $collection = Collections::where('code_collection', $code_collection)
                ->first();

            return response()->json([
                'status' => 'success',
                'data' => $collection
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'data' => $e
            ], 500);
        }
    }

    public function Add(Request $request)
    {
        $account = auth()->user();
        if ($account->role == 1) {
            return response()->json([
                'error' => 'You aren\'t a teacher'
            ], 400);
        }

        try {
            Collections::create($request->all());
            return response()->json([
                'status' => 'success',
                'data' => $request->all()
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'data' => $request->all()
            ], 500);
        }

    }

    public function Update(Request $request)
    {
        $account = auth()->user();
        if ($account->role == 1) {
            return response()->json([
                'error' => 'You aren\'t a teacher'
            ], 400);
        }

        try {
            Collections::find($request->code_collection)->update($request->all());
            return response()->json([
                'status' => 'success',
                'data' => $request->all()
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'data' => $e
            ], 500);
        }
    }

    public function Hide(Request $request)
    {
        $account = auth()->user();
        if ($account->role == 1) {
            return response()->json([
                'error' => 'You aren\'t a teacher'
            ], 400);
        }
        $code_collection = $request->code_collection;

        try {
            Collections::where('code_collection', $code_collection)
                ->update([
                    'status' => 0
                ]);
            $collection = Collections::where('code_collection', $code_collection)
                ->first();
            return response()->json([
                'status' => 'success',
                'data' => $collection
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'data' => $e
            ], 500);
        }
    }

    public function Show(Request $request)
    {
        $account = auth()->user();
        if ($account->role == 1) {
            return response()->json([
                'error' => 'You aren\'t a teacher'
            ], 400);
        }
        $code_collection = $request->code_collection;

        try {
            Collections::where('code_collection', $code_collection)
                ->update([
                    'status' => 1
                ]);
            $collection = Collections::where('code_collection', $code_collection)
                ->first();
            return response()->json([
                'status' => 'success',
                'data' => $collection
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'data' => $e
            ], 500);
        }
    }


}
