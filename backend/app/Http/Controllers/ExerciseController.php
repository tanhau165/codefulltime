<?php

namespace App\Http\Controllers;

use App\Account;
use App\Exercise;
use App\Submission;
use Illuminate\Http\Request;

class ExerciseController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api',
            ['except' => [
                'GetAll',
                'GetOne',
                'GetByTeam',
                'GetByUsername',
                'ExerciseSubmitted'

            ]]
        );
    }

    public function ExerciseSubmitted(Request $request)
    {
        $id = $request->id;
        $exercises = [];
        $exercises_code = [];
        $account = Account::where('id', $id)->first();
        $submissions = Submission::where('username', $account->username)->get();
        $allExercise = Exercise::all();
        foreach ($submissions as $exercise) {
            array_push($exercises_code, $exercise->exercise_code);
        }
        array_unique($exercises);

        foreach ($allExercise as $exercise) {
            if (in_array($exercise->exercise_code, $exercises_code)) {
                array_push($exercises, $exercise);
            }
        }

        return response()->json([
            'exercises' => $exercises
        ], 200);

    }

    public function GetAll()
    {
        $exercises = Exercise::all();
        return response()->json([
            'exercises' => $exercises
        ], 200);
    }

    public function GetNew(){
        $exercises = Exercise::all();
    }

    public function GetOne(Request $request)
    {
        $exercise = Exercise::where('exercise_code', $request->exercise_code)->first();
        if ($exercise == null) {

            return response()->json([
                'error' => 'Exercise with code ' . $request->exercise_code . ' not found'
            ], 404);
        }
        return response()->json([
            'exercise' => $exercise
        ], 200);
    }

    public function GetByTeam(Request $request)
    {
        $code_team = $request->code_team;
        $exercises = Exercise::where('code_team', $code_team)->get();
        return response()->json([
            'exercises' => $exercises
        ], 200);
    }

    public function GetByUsername(Request $request)
    {
        $username = $request->username;
        $exercises = Exercise::where('username', $username)->get();
        return response()->json([
            'exercises' => $exercises
        ], 200);
    }

    public function GetOfMe()
    {
        $account = auth()->user();
        $username = $account->username;
        $exercises = Exercise::where('username', $username)->get();
        return response()->json([
            'exercises' => $exercises
        ], 200);
    }


    public function Add(Request $request)
    {
        $account = auth()->user();

        if ($account->role == 1) {
            return response()->json([
                'error' => 'You aren\'t a teacher or administrator'
            ], 400);
        }
        $request->merge([
            'username' => $account->username,
            'best_score' => 0
        ]);
        $exer = Exercise::where('exercise_code', $request->exercise_code)->first();
        if ($exer != null) {
            return response()->json([
                'error' => 'Exercise code already'
            ], 400);
        }
        Exercise::create($request->all());

        return response()->json([
            'message' => 'Add new exercise successfully',
            'exercise' => $request->all()
        ], 201);
    }

    public function Update(Request $request)
    {
        $account = auth()->user();

        if ($account->role == 1) {
            return response()->json([
                'error' => 'You aren\'t a teacher or administrator'
            ], 400);
        }
        $request->merge([
            'username' => $account->username
        ]);
        Exercise::find($request->exercise_code)->update($request->all());

        return response()->json([
            'message' => 'Update team ' . $request->exercise_code . ' successfully',
            'exercis' => $request->all()
        ], 201);
    }
}
