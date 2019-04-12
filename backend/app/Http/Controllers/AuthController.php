<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangPassRq;
use http\Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests\SignUpRequest;
use App\User;
use Tymon\JWTAuth\JWTAuth;


class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */


    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register', 'changepass', 'Rank', 'TopRank']]);
    }


    public function Rank()
    {
        $accounts = User::orderby('score', 'desc')->get();
        return response()->json([
            'accounts' => $accounts
        ], 200);
    }

    public function TopRank()
    {
        $accounts = User::orderby('score', 'desc')->take(10)->get();
        return response()->json([
            'accounts' => $accounts
        ], 200);
    }


    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['username', 'password']);

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Username or password does\'t exist'], 401);
        }

        return $this->respondWithToken($token);
    }

    public function register(SignUpRequest $request)
    {
        $c = round(microtime(true) * 1000);
        $code = $c . rand_string(20);
        $request->merge([
            'score' => 0,
            'avatar' => 'https://zero1.sg/img/accountlogin-icon.png',
            'cup' => 0,
            'id'=>$code
        ]);
        try {
            User::create($request->all());
        } catch (\Exception $exception) {
            return response()->json(['error' => 'Username already'], 400);

        }
        return $this->login($request);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'name' => auth()->user()->name,
            'role' => auth()->user()->role
        ]);
    }

    public function changepass(ChangPassRq $rq)
    {

        try {
            $credentials = request(['username', 'password']);
            if (!$token = auth()->attempt($credentials)) {
                return response()->json(['error' => 'Old password not match'], 400);
            }
            $newPass = $rq->new_password;
            $user = User::where('username', $rq->username)->first();
            $user->update(['password' => $newPass]);
        } catch (\Error $ex) {
            return response()->json(['error' => 'Change password error'], 401);
        }
        return response()->json(['message' => 'Change password successfully'], 200);


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
