<?php

use App\Http\Controllers\UsersController;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\LikesController;
use App\Http\Controllers\CommentsController;
use App\Http\Controllers\AuthController;
use App\Http\Middleware\AuthMiddleware;
use Illuminate\Support\Facades\Route;

Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {

    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('register', [AuthController::class, 'register']);
});

Route::middleware([AuthMiddleware::class])->group(function () {
    Route::get('user', [UsersController::class, 'getCurrentUser']);
    Route::get('users', [UsersController::class, 'getUser']);
    Route::post('users', [UsersController::class, 'updateUser']);

    Route::get('followers', [FollowController::class, 'getFollowers']);
    Route::get('following', [FollowController::class, 'getFollowing']);
    Route::post('follow', [FollowController::class, 'followUser']);
    Route::get('follow/check', [FollowController::class, 'checkFollow']);
    Route::get('follow/recommended', [FollowController::class, 'getFollowRecommendations']);


    Route::get('posts', [PostsController::class, 'getPosts']);
    Route::post('posts', [PostsController::class, 'addPost']);
    Route::delete('posts', [PostsController::class, 'deletePost']);

    Route::post('like', [LikesController::class, 'likePost']);
    Route::post('unlike', [LikesController::class, 'unlikePost']);
    Route::get('likes', [LikesController::class, 'getLikes']);
    Route::get('like/check', [LikesController::class, 'checkLiked']);

    Route::get('comments', [CommentsController::class, 'getComments']);
    Route::post('comments', [CommentsController::class, 'addComment']);
    Route::delete('comments', [CommentsController::class, 'deleteComment']);
});