<?php
Route::group([
    'middleware' => 'api',
], function () {

    Route::post('login', 'AuthController@login');
    Route::post('register', 'AuthController@register');
    Route::post('logout', 'AuthController@logout');
    Route::post('me', 'AuthController@me');
    Route::post('changepass', 'AuthController@changepass');
    Route::post('sendPasswordResetLink', 'ResetPasswordController@sendEmail');
    Route::post('resetPassword', 'ChangePasswordController@process');
    Route::post('refresh', 'AuthController@refresh');

});

//php artisan cache:clear
//php artisan view:clear
//php artisan route:clear
//php artisan clear-compiled
//php artisan config:cache