<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class FollowController extends Controller
{
    public function getFollowers(Request $request)
    {
        $user_id = $request->query('id');

        if (!$user_id) {
            $followers = auth()->user()->followers;
            return response()->json([
                'followers' => $followers
            ]);
        }

        $user = User::find($user_id);

        if (!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }

        $followers = $user->followers;

        return response()->json([
            'followers' => $followers
        ]);
    }

    public function getFollowing(Request $request)
    {
        $user_id = $request->query('id');

        if (!$user_id) {
            $following = auth()->user()->following;
            return response()->json([
                'following' => $following
            ]);
        }

        $user = User::find($user_id);

        if (!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }

        $following = $user->following;

        return response()->json([
            'following' => $following
        ]);
    }


}
