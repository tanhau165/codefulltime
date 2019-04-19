<?php
Route::get('/', function () {
    return View::make('index');
});
Route::any('{catchall}', function() {
    return View::make('index');
})->where('catchall', '.*');

Route::get('/test', 'CupController@CalcCup');
header('Access-Control-Allow-Origin:  *');
header('Access-Control-Allow-Methods:  POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers:  Content-Type, X-Auth-Token, Origin, Authorization, application/json');


// ad3bc6d390e3cdf ID
// 5e581c74be1f6b222d92a487df81639da6124ab1 Secret