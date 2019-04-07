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

    Route::group(['prefix' => 'admin'], function () {

        // Teams
        Route::post('team/add', 'TeamsController@Add');
        Route::get('teams', 'TeamsController@Get');


        // Collections
        Route::post('collection/add', 'CollectionsController@Add');
        Route::post('collection/update', 'CollectionsController@Update');
        Route::post('collection/hide/{code_collection}', 'CollectionsController@Hide');
        Route::post('collection/show/{code_collection}', 'CollectionsController@Show');


        // Examination
        Route::post('examination/add','ExaminationController@Add');
        Route::post('examination/update','ExaminationController@Update');
        Route::post('examination/hide/{code_examination}', 'ExaminationController@Hide');
        Route::post('examination/show/{code_examination}', 'ExaminationController@Show');

        // Report Examination
        Route::post('rp-examination/add', 'ReportExaminationsController@Add');

    });

    Route::group(['prefix' => 'client'], function () {
        // Team
        Route::get('teams', 'TeamsController@All');
        Route::get('team/get/{code_team}', 'TeamsController@GetOne');

        // Collection
        Route::get('collection/get/{code_team}', 'CollectionsController@GetByTeam');
        Route::get('collection/one/{code_collection}', 'CollectionsController@GetOne');
        Route::get('collections', 'CollectionsController@GetAll');


        // Examination
        Route::get('examination/get/{code_collection}', 'ExaminationController@GetByCollection');
        Route::get('examination/one/{code_examination}', 'ExaminationController@GetOne');
        Route::get('examinations', 'ExaminationController@GetAll');


        // Report Examination
        Route::get('rp-examinations', 'ReportExaminationsController@GetAll');
        Route::get('rp-examination/get/{username}', 'ReportExaminationsController@GetByUsername');
        Route::post('rp-examination/me', 'ReportExaminationsController@RpExaminationOfMe');

    });

});

//php artisan cache:clear && php artisan view:clear && php artisan route:clear && php artisan clear-compiled && php artisan config:cache && php artisan serve