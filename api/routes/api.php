<?php

use App\Http\Controllers\UsersController;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\LikesController;
use Illuminate\Support\Facades\Route;

Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {

    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
});

Route::get('users', [UsersController::class, 'getUsers']);
Route::post('users', [UsersController::class, 'addUser']);

Route::get('followers', [FollowController::class, 'getFollowers']);
Route::get('following', [FollowController::class, 'getFollowing']);

Route::get('posts', [PostsController::class, 'getPosts']);
Route::post('posts', [PostsController::class, 'addPost']);

Route::post('like', [LikesController::class, 'likePost']);
Route::post('unlike', [LikesController::class, 'unlikePost']);
Route::get('likes', [LikesController::class, 'getLikes']);
