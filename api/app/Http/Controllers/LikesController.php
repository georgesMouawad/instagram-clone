<?php

namespace App\Http\Controllers;

use App\Models\Like;
use Illuminate\Http\Request;

class LikesController extends Controller
{
    public function likePost(Request $request)
    {
        $post_id = $request->post_id;
        $user_id = auth()->user()->id;

        $like = Like::where('user_id', $user_id)->where('post_id', $post_id)->first();

        if ($like) {
            return response()->json([
                'message' => 'Post already liked'
            ], 400);
        }

        $like = new Like();
        $like->user_id = $user_id;
        $like->post_id = $post_id;
        $like->save();

        return response()->json([
            'message' => 'Post liked successfully'
        ]);
    }

    public function unlikePost(Request $request)
    {
        $post_id = $request->post_id;
        $user_id = auth()->user()->id;

        $like = Like::where('user_id', $user_id)->where('post_id', $post_id)->first();

        if (!$like) {
            return response()->json([
                'message' => 'Post not liked'
            ], 400);
        }

        $like->delete();

        return response()->json([
            'message' => 'Post unliked successfully'
        ]);
    }

    public function getLikes(Request $request)
    {
        $post_id = $request->query('id');

        if (!$post_id) {
            $likes = Like::all();
            return response()->json([
                'likes' => $likes
            ]);
        }

        $likes = Like::where('post_id', $post_id)->get();

        return response()->json([
            'likes' => $likes
        ]);
    }
}
