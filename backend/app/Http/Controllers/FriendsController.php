<?php

namespace App\Http\Controllers;

use App\Account;
use App\Friends;
use Illuminate\Http\Request;

class FriendsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api',
            ['except' => [
                'GetById'
            ]]
        );
    }

    public function IsFriend(Request $request)
    {

        $account = auth()->user();
        $username = $account->username;


        $friend_id = $request->friend_id;

        $acc = Account::where('id', $friend_id)->first();
        $friend_username = $acc->username;

        $ok = Friends::where('friend_username', $friend_username)->where('username', $username)->first();
        if ($ok == null) {
            $ok = Friends::where('username', $friend_username)->where('friend_username', $username)->first();
        }

        if ($ok == null) {
            return response()->json([
                'message' => 0
            ], 200);
        } else {
            if ($ok->accept == 1) {
                return response()->json([
                    'message' => 1
                ], 200);
            } else {
                return response()->json([
                    'message' => 2
                ], 200);
            }
        }

    }

    public function GetById(Request $request)
    {
        $acc = Account::where('id', $request->id)->first();
        $usernameIsFriend = [];
        $usernameRequest = [];
        $sentUsername = [];
        $dsFriend = Friends::where('username', $acc->username)
            ->orWhere('friend_username', $acc->username)
            ->get();

        foreach ($dsFriend as $f) {
            if ($f->accept == 2) {
                array_push($usernameIsFriend, $f->friend_username);
                array_push($usernameIsFriend, $f->username);
            } else {
                if ($f->friend_username == $acc->username) {
                    array_push($usernameRequest, $f->username);
                }
                if ($f->username == $acc->username) {
                    array_push($sentUsername, $f->friend_username);
                }
            }
        }
        $usernameIsFriend = array_unique($usernameIsFriend);
        $usernameIsFriend = $this->removeInArrary($usernameIsFriend, $acc->username);

        $usernameRequest = array_unique($usernameRequest);
        $usernameRequest = $this->removeInArrary($usernameRequest, $acc->username);


        $sentUsername = array_unique($sentUsername);
        $sentUsername = $this->removeInArrary($sentUsername, $acc->username);

        $friends = Account::whereIn('username', $usernameIsFriend)->get();

        $friendsRequest = Account::whereIn('username', $usernameRequest)->get();

        $friendsSent = Account::whereIn('username', $sentUsername)->get();


        return response()->json([
            'friends' => $friends,
            'friendsRequest' => $friendsRequest,
            'friendsSent' => $friendsSent
        ], 200);
    }


    public function removeInArrary($arr, $needed)
    {
        $a = [];
        foreach ($arr as $abc) {
            if ($abc != $needed) {
                array_push($a, $abc);
            }
        }
        return $a;

    }

    public function Remove(Request $request)
    {
        $account = auth()->user();
        $friend = Account::where('id', $request->id)->first();

        Friends::where('friend_username', $friend->username)->where('username', $account->username)->delete();
        Friends::where('username', $friend->username)->where('friend_username', $account->username)->delete();

        return response()->json([
            'message' => 'Deleted friend !',
        ], 200);
    }

//    public function RemoveById(Request $request)
//    {
//        $account = auth()->user();
//        $acc_friend = Account::where('id', $request->id)->first();
//        Friends::where('friend_username', $acc_friend->username)->where('username', $account->username)->delete();
//        return response()->json([
//            'message' => 'Deleted friend !',
//        ], 200);
//    }

    public function Accept(Request $request)
    {
        $account = auth()->user();
        $friend = Account::where('id', $request->id)->first();


        Friends::where('friend_username', $friend->username)->where('username', $account->username)->update([
            'accept' => 2
        ]);

        Friends::where('username', $friend->username)->where('friend_username', $account->username)->update([
            'accept' => 2
        ]);

        return response()->json([
            'message' => 'Added friend !'
        ], 200);
    }


    public function SendRequestAddFriend(Request $request)
    {
        $account = auth()->user();
        $c = round(microtime(true) * 1000);
        $code = $c . rand_string(20);

        $friend_id = $request->friend_id;

        $acc = Account::where('id', $friend_id)->first();
        $friend_username = $acc->username;

        $request->merge([
            'friend_username' => $friend_username,
            'username' => $account->username,
            'code_friend' => $code,
            'time_add' => date('h:i:s d-m-Y'),
            'accept' => 1
        ]);

        Friends::create($request->all());

        return response()->json([
            'message' => 'Sent request !'
        ], 201);
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
