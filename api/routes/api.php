<?php

use Illuminate\Http\Request;
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




Route::get('posts', [PostsController::class, 'getPosts']);
Route::post('posts', [PostsController::class, 'addPost']);