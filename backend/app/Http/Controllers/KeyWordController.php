<?php

namespace App\Http\Controllers;

use App\Examinations;
use App\Exercise;
use App\KeyWord;
use App\Pastes;
use Illuminate\Http\Request;

class KeyWordController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api',
            ['except' => [
                'GetByCollection',
                'GetOne',
                'GetByUsername',
                'GetAll',
                'Add'
            ]]
        );
    }

    public function Add(Request $request)
    {
        $key_word = $request->key_word;
        $keyword = KeyWord::where('key_word', $key_word)->first();
        if ($keyword == null) {
            $request->merge([
                'times_search' => '1',
                'key_word'=> $key_word
            ]);
            KeyWord::create($request->all());
        } else {
            KeyWord::where('key_word', $key_word)->update([
                'times_search' => ($keyword->times_search + 1),
            ]);
            $request->merge([
                'times_search' => ($keyword->times_search + 1),
            ]);
        }
//        $listPastes = Pastes::where('username', 'like', '%' . $key_word . '%')
//            ->orWhere('name', 'like', '%' . $key_word . '%')
//            ->orWhere('content', 'like', '%' . $key_word . '%')
//            ->orWhere('slug', 'like', '%' . str_slug($key_word) . '%')
//            ->get();
//
//        $listExercise = Exercise::where('question', 'like', '%' . $key_word . '%')
//            ->orWhere('explain', 'like', '%' . $key_word . '%')
//            ->orWhere('name', 'like', '%' . $key_word . '%')
//            ->get();
//
//        $listExamination = Examinations::where('question', 'like', '%' . $key_word . '%')
//            ->orWhere('answer_a', 'like', '%' . $key_word . '%')
//            ->orWhere('answer_b', 'like', '%' . $key_word . '%')
//            ->orWhere('answer_c', 'like', '%' . $key_word . '%')
//            ->orWhere('answer_d', 'like', '%' . $key_word . '%')
//            ->get();
//
//
//        $list = array();
//
//        foreach ($listPastes as $paste) {
//            array_push($list, $paste);
//        }
//
//        foreach ($listExercise as $paste) {
//            array_push($list, $paste);
//        }
//
//        foreach ($listExamination as $paste) {
//            array_push($list, $paste);
//        }

        return response()->json([
            'message' => 'Search for key word: ' . $key_word,
//            'list' => $list,
            'keyword' => $request->all()
        ], 200);
    }

    public function GetAll()
    {
        $keyWords = KeyWord::all();
        return response()->json([
            'keywords' => $keyWords
        ], 200);
    }

    public function GetOne(Request $request)
    {
        $key_word = $request->key_word;
        $keyword = KeyWord::where('key_word', $key_word)->first();
        return response()->json([
            'keyword' => $keyword
        ], 200);

    }

    public function GetByUsername(Request $request)
    {
        $username = $request->username;
        $keyword = KeyWord::where('username', $username)->first();
        return response()->json([
            'keyword' => $keyword
        ], 200);

    }

    public function GetOfMe()
    {
        $account = auth()->user();
        $username = $account->username;
        $keywords = KeyWord::where('username', $username)->get();
        return response()->json([
            'keywords' => $keywords
        ], 200);

    }
}
