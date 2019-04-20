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
        Route::post('team/edit', 'TeamsController@Update');
        Route::get('teams', 'TeamsController@Get');


        // Collections
        Route::post('collection/add', 'CollectionsController@Add');
        Route::post('collection/edit', 'CollectionsController@Update');
        Route::post('collection/hide/{code_collection}', 'CollectionsController@Hide');
        Route::post('collection/show/{code_collection}', 'CollectionsController@Show');
        Route::post('collection/list-collection/get', 'CollectionsController@GetCollectionByID');

        // Examination
        Route::post('examination/add', 'ExaminationController@Add');
        Route::post('examination/edit', 'ExaminationController@Update');
        Route::post('examination/hide/{code_examination}', 'ExaminationController@Hide');
        Route::post('examination/show/{code_examination}', 'ExaminationController@Show');

        // Report Examination
        Route::post('rp-examination/add', 'ReportExaminationsController@Add');
        Route::post('rp-examination/me', 'ReportExaminationsController@RpExaminationOfMe');


        // Exercise
        Route::post('exercise/add', 'ExerciseController@Add');
        Route::post('exercise/edit', 'ExerciseController@Update');
        Route::post('exercises/me', 'ExerciseController@GetOfMe');

        // Submission
        Route::post('submission/add', 'SubmissionController@Add');
        Route::post('submissions/me', 'SubmissionController@GetOfMe');


        //ReportError
        Route::post('rp-error/add', 'ReportErrorController@Add');
        Route::post('rp-errors/me', 'ReportErrorController@GetOfMe');

        //Keyword
        Route::post('/key-words/me', 'KeyWordController@GetOfMe');


        //Pastes
        Route::post('/paste/add', 'PasteController@Add');
        Route::post('/paste/edit', 'PasteController@Update');
        Route::post('/pastes/me', 'PasteController@PasteOfMe');

        // Account
        Route::post('accounts', 'AccountController@Rank');
        Route::post('accounts/top', 'AccountController@TopRank');
        Route::post('account/change/avatar', 'AccountController@ChangeAvatar');
        Route::post('account/change/info', 'AccountController@ChangeInfo');


        // Comment
        Route::post('comment/add', 'CommentController@Add');

        // Ans Comment
        Route::post('ans-comment/add', 'AnsCommentController@Add');

        // News feed
        Route::post('news-feed/add', 'NewsFeedController@Add');


        // upload
        Route::post('uploads/img', 'UploadController@uploadImage');
        Route::post('uploads/avatar', 'UploadController@uploadAvatar');

        // Like
        Route::post('like/add', 'LikeObjectController@AddLike');
        Route::post('like/is-like', 'LikeObjectController@IsLike');

    });

    Route::group(['prefix' => 'client'], function () {
        // Team
        Route::get('teams', 'TeamsController@All');
        Route::get('teams/get/location/{location}', 'TeamsController@GetByLocation');
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
        Route::get('rp-examinations/get/username/{username}', 'ReportExaminationsController@GetByUsername');
        Route::get('rp-examinations/get/top/{number_row}', 'ReportExaminationsController@GetWithRow');
        Route::get('rp-examinations/get/exercise-answered/{id}', 'ReportExaminationsController@GetListExerciseAnswered');


        // Exercise
        Route::get('/exercises', 'ExerciseController@GetAll');
        Route::get('/exercise/get/one/{exercise_code}', 'ExerciseController@GetOne');
        Route::get('/exercises/get/team/{code_team}', 'ExerciseController@GetByTeam');
        Route::get('/exercises/get/username/{username}', 'ExerciseController@GetByUsername');
        Route::get('/exercises/get/exercise-submitted/{id}', 'ExerciseController@ExerciseSubmitted');

        // Submission
        Route::get('/submissions', 'SubmissionController@GetAll');
        Route::get('/submissions/get/top/{number_row}', 'SubmissionController@GetWithRow');
        Route::get('/submissions/get/exercise/{exercise_code}', 'SubmissionController@GetWithExercise');
        Route::get('/submission/get/one/{code_submission}', 'SubmissionController@GetOne');
        Route::get('/submissions/get/id/{id}', 'SubmissionController@GetByID');

        //ReportError
        Route::get('/rp-errors', 'ReportErrorController@GetAll');
        Route::get('/rp-error/get/one/{code_error}', 'ReportErrorController@GetOne');
        Route::get('/rp-errors/get/username/{username}', 'ReportErrorController@GetByUsername');


        //Keyword
        Route::get('/key-words', 'KeyWordController@GetAll');
        Route::get('/key-word/get/one/{key_word}', 'KeyWordController@GetOne');
        Route::get('/key-words/get/username/{username}', 'KeyWordController@GetByUsername');
        Route::get('/key-word/search/{key_word}', 'KeyWordController@Add');

        //Paste
        Route::get('/pastes', 'PasteController@GetAll');
        Route::get('/paste/get/one/{code_paste}', 'PasteController@GetOne');
        Route::get('/pastes/get/username/{username}', 'PasteController@GetByUsername');

        // Comment
        Route::get('comments', 'CommentController@GetAll');
        Route::get('comments/get/object/{code_object}', 'CommentController@GetOne');

        // Ans Comment
        Route::get('ans-comments', 'AnsCommentController@GetAll');
        Route::get('ans-comments/get/comment/{code_comment}', 'AnsCommentController@GetWithComment');

        // Account
        Route::get('account/get/id/{id}', 'AccountController@GetAccountByID');


        // Tesst
        Route::get('test/{id}', function (\Illuminate\Http\Request $request){


            dd(\App\Http\Controllers\CupController::CalcCup($request->id));

        });

        // New feeds
        Route::get('news-feeds', 'NewsFeedController@GetAll');
        Route::get('news-feeds/page/{page}', 'NewsFeedController@GetWithPage');


    });
});

header('Access-Control-Allow-Origin:  *');
header('Access-Control-Allow-Methods:  POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers:  Content-Type, X-Auth-Token, Origin, Authorization, application/json');
//php artisan cache:clear && php artisan view:clear && php artisan route:clear && php artisan clear-compiled && php artisan config:cache && php artisan serve
