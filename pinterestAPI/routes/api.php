<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BoardController;
use App\Http\Controllers\PinController;
use App\Http\Controllers\FollowersController;
use App\Http\Controllers\LogovanjeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', 'App\Http\Controllers\LogovanjeController@login');
Route::post('/register', 'App\Http\Controllers\LogovanjeController@register');

Route::get('/followers/{id}', 'App\Http\Controllers\FollowersController@followers');

Route::post('/follow', 'App\Http\Controllers\FollowersController@follow');
Route::post('/unfollow', 'App\Http\Controllers\FollowersController@unfollow');

Route::get('/pins-paginate', 'App\Http\Controllers\PinController@paginatePins');
Route::get('/board-pins/{id}', 'App\Http\Controllers\PinController@boardPins');
Route::get('/user-boards/{id}', 'App\Http\Controllers\BoardController@userBoards');


Route::apiResource('boards', 'App\Http\Controllers\BoardController')->only(['index', 'show']);
Route::apiResource('pins', 'App\Http\Controllers\PinController')->only(['index', 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', 'App\Http\Controllers\LogovanjeController@logout');
    Route::apiResource('boards', 'App\Http\Controllers\BoardController')->only(['destroy', 'store', 'update']);
    Route::apiResource('pins', 'App\Http\Controllers\PinController')->only(['destroy', 'store', 'update']);
});