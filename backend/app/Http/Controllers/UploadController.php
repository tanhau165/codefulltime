<?php

namespace App\Http\Controllers;

use App\Medias;
use App\NewsFeed;
use Faker\Provider\Image;
use Illuminate\Http\Request;

class UploadController extends Controller
{


    public function urlResoure()
    {
        return $linkURL = 'http://codefulltime.com';

    }

    public function __construct()
    {
        $this->middleware('auth:api',
            ['except' => []]
        );
    }

    public function uploadAvatar(Request $request)
    {
        $account = auth()->user();
        $file = $request->file('filename');
        $c = round(microtime(true) * 1000);
        $link = $this->urlResoure() . '/files/' . $account->username . '/';
        $newName = $account->id . $c . $file->getClientOriginalName();
        $file->move(public_path() . $link, $newName);
        return response()->json([
            'link' => $this->urlResoure() . '/public' . $link . $newName
        ]);
    }

    public function uploadImage(Request $request)
    {

        $account = auth()->user();
        $id = $account->id;
        $c = round(microtime(true) * 1000);
        $data = [];
        $code_news_feeds = $id . $c . $account->username;
        $time = date('h:i:s d-m-Y');
        $news_feed = new NewsFeed();
        $news_feed->code_news_feeds = $code_news_feeds;
        $news_feed->content_feeds = '';
        $news_feed->number_of_like = 0;
        $news_feed->username = $account->username;
        $news_feed->time_add = $time;
        $news_feed->save();


        foreach ($request->file('filename') as $file) {
            $name = $id . $c . $file->getClientOriginalName();
            $file->move(public_path() . '/files/', $name);
            $media = new Medias();
            $media->code_media = $id . $c . rand_string(20);
            $media->type_media = $file->getClientMimeType();
            $media->link_media = $this->urlResoure() . '/public' . '/files/' . $name;
            $media->code_news_feeds = $code_news_feeds;
            $media->size = $file->getSize();
            $media->name = $file->getClientOriginalName();
            $media->username = $account->username;
            $media->save();
            array_push($data, $media);

        }
        return response()->json([
            'data' => $data,
            'message' => 'media-success',
            'newsfeed' => $news_feed
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
