<?php

namespace App\Http\Controllers;

use App\Medias;
use App\NewsFeed;
use Illuminate\Http\Request;

class NewsFeedController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['GetAll', 'GetOne', 'GetByUsername', 'GetWithPage']]);
    }

    public function GetWithPage(Request $request)
    {
        $page = (int)$request->page;
        if ($page == 1) {
            $list = NewsFeed::orderby('code_news_feeds', 'desc')->skip(0)->take(2)->get();
        }else{
            $list = NewsFeed::orderby('code_news_feeds', 'desc')->skip(($page - 1) * 2)->take(2)->get();
        }
        return response()->json([
            'news_feeds' => $list
        ], 200);
    }

    public function GetAll()
    {
        $list = NewsFeed::orderby('code_news_feeds', 'desc')->get();
        return response()->json([
            'news_feeds' => $list
        ], 200);
    }

    public function GetOne(Request $request)
    {
        $list = NewsFeed::where('code_news_feeds', $request->code_news_feeds)->orderby('code_news_feeds', 'desc')->first();
        return response()->json([
            'news_feed' => $list
        ], 200);
    }


    public function GetByUsername(Request $request)
    {
        $list = NewsFeed::where('username', $request->username)->orderby('code_news_feeds', 'desc')->get();
        return response()->json([
            'news_feeds' => $list
        ], 200);
    }

    public function GetForMe()
    {
        $account = auth()->user();
        $list = NewsFeed::where('username', $account->username)->orderby('code_news_feeds', 'desc')->get();
        return response()->json([
            'news_feeds' => $list
        ], 200);
    }

    public function Add(Request $request)
    {
        $content_feeds = $request->content_feeds;
        $code = $request->code_news_feeds;

        NewsFeed::where('code_news_feeds', $code)->update([
            'content_feeds' => $content_feeds
        ]);
        $news_feed = NewsFeed::where('code_news_feeds', $code)->first();
        return response()->json([
            'message' => 'Create new post successfully',
            'news_feed' => $news_feed
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
