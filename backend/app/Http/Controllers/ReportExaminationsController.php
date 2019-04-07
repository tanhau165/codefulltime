<?php

namespace App\Http\Controllers;

use App\ReportExaminations;
use App\User;
use Illuminate\Http\Request;

class ReportExaminationsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api',
            ['except' => [
                'GetAll',
                'GetByUsername'
            ]]
        );
    }

    public function GetAll()
    {
        $list = ReportExaminations::all();
        return response()->json([
            'status' => 'success',
            'listRpExam' => $list
        ], 200);
    }

    public function GetByUsername(Request $request)
    {
        $username = $request->username;
        $list = ReportExaminations::where('username', $username)->get();

        return response()->json([
            'status' => 'success',
            'listRpExam' => $list,
            'username' => $username
        ], 200);
    }

    public function RpExaminationOfMe()
    {
        $account = auth()->user();
        $list = ReportExaminations::where('username', $account->username)->get();

        return response()->json([
            'status' => 'success',
            'listRpExam' => $list,
            'username' => $account->username
        ], 200);
    }

    public function Add(Request $request)
    {
        $account = auth()->user();

        // Lay ra so lan submit voi collection nay
        $rp = ReportExaminations::where('username', $account->username)
            ->where('code_collection', $request->code_collection)
            ->orderby('times_submit', 'desc')
            ->first();

        // Lay diem cao nhat
        $obj = ReportExaminations::where('username', $account->username)
            ->where('code_collection', $request->code_collection)
            ->orderby('score', 'desc')
            ->first();
        if ($obj != null) {
            $bestScore = $obj->score;
        } else {
            $bestScore = 0;
        }

        if ($rp == null) { // chua lan nao
            $request->merge([
                'username' => $account->username,
                'times_submit' => 0
            ]);
        } else {
            $request->merge([
                'username' => $account->username,
                'times_submit' => ($rp->times_submit + 1)
            ]);
        }

        try {
            ReportExaminations::create($request->all());
            // Update score
            if ($bestScore < $request->score) {
                User::where('username', $account->username)
                    ->update([
                        'score' => ($account->score - $bestScore + $request->score)
                    ]);
                return response()->json([
                    'status' => 'success',
                    'update_score' => 'yes',
                    'report_examination' => $request->all()
                ], 200);
            }
            return response()->json([
                'status' => 'success',
                'update_score' => 'no',
                'report_examination' => $request->all()
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'status' => $e,
                'update_score' => 'no',
                'report_examination' => $request->all()
            ], 500);

        }

    }


}
