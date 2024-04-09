<?php

namespace App\Http\Controllers;

use App\Models\Follower;
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

    public function followUser(Request $request)
    {
        $user_id = $request->input('id');
        $follower_id = auth()->user()->id;

        $user = User::find($user_id);

        if (!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }

        $is_following = Follower::where('user_id', $user_id)
            ->where('follower_id', $follower_id)
            ->first();


        if ($is_following) {
            $is_following->delete();
            return response()->json([
                'message' => 'User unfollowed'
            ]);
        }


        $follower = new Follower();
        $follower->user_id = $user_id;
        $follower->follower_id = $follower_id;
        $follower->save();

        return response()->json([
            'message' => 'User followed'
        ]);
    }

    public function checkFollow(Request $request)
    {
        $user_id = $request->query('id');
        $follower_id = auth()->user()->id;

        $is_following = Follower::where('user_id', $user_id)
            ->where('follower_id', $follower_id)
            ->first();

        if ($is_following) {
            return response()->json([
                'following' => true
            ]);
        }

        return response()->json([
            'following' => false
        ]);
    }

    public function getFollowRecommendations()
    {
        $user_auth = auth()->user();

        $user = User::find($user_auth->id);

        $following = $user->following()->pluck('users.id');

        $firstLevelFollowers = Follower::whereIn('follower_id', $following)->where('user_id', '!=', $user_auth->id)->pluck('user_id');

        $secondLevelFollowers = Follower::whereIn('follower_id', $firstLevelFollowers)->pluck('user_id');

        $recommendations = $secondLevelFollowers->reject(function ($userId) use ($user) {
            return $userId === $user->id;
        });

        $recommendedUsers = User::whereIn('id', $recommendations)->get();

        return response()->json([
            'users' => $recommendedUsers
        ]);
    }
}
