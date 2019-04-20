<?php

namespace App\Http\Controllers;

use App\Examinations;
use App\Exercise;
use App\KeyWord;
use App\Medias;
use App\NewsFeed;
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
        $list = [];
        $result = [];
        $key_word = $request->key_word;
        $keyword = KeyWord::where('key_word', $key_word)->first();
        if ($keyword == null) {
            $request->merge([
                'times_search' => '1',
                'key_word' => $key_word
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
        $listExercise = Exercise
            ::whereRaw('lower(question) like "%' . strtolower($key_word) . '%"')
            ->orWhereRaw('lower(exercise_code) like "%' . strtolower($key_word) . '%"')
            ->orWhereRaw('lower(name) like "%' . strtolower($key_word) . '%"')
            ->get();

        $listExamination = Examinations
            ::whereRaw('lower(question) like "%' . strtolower($key_word) . '%"')
            ->orWhereRaw('lower(code_examination) like "%' . strtolower($key_word) . '%"')
            ->orWhereRaw('lower(explain_question) like "%' . strtolower($key_word) . '%"')
            ->get();

        $listNewsFeed = NewsFeed
            ::whereRaw('lower(content_feeds) like "%' . strtolower($key_word) . '%"')
            ->get();

        $listMedias = Medias
            ::whereRaw('lower(link_media) like "%' . strtolower($key_word) . '%"')
            ->get();

        $result['examinations'] = $listExamination;
        $result['exercises'] = $listExercise;
        $result['news_feeds'] = $listNewsFeed;
        $result['medias'] = $listMedias;

        return response()->json([
            'message' => 'Search for key word: ' . $key_word,
            'list' => $result,
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
