<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;

class PostsController extends Controller
{
    public function getPosts(Request $request)
    {
        $post_id = $request->query('id');
        $user_id = $request->query('user_id');

        if (!$post_id && !$user_id) {

            $user = User::find(auth()->user()->id);

            $following = $user->following()->pluck('users.id');

            $posts = Post::whereIn('user_id', $following)->with('user:id,username,image', 'likes')->get();

            $posts = $posts->map(function ($post) {
                return [
                    'id' => $post->id,
                    'image' => $post->image,
                    'caption' => $post->caption,
                    'created_at' => $post->created_at,
                    'user_id' => $post->user_id,
                    'username' => $post->user->username,
                    'user_image' => $post->user->image,
                    'likes' => $post->likes->count(),
                ];
            });

            return response()->json([
                'posts' => $posts
            ]);
        } elseif ($user_id) {

            $posts = Post::where('user_id', $user_id)->with('user:id,username', 'likes')->get();

            $posts = $posts->map(function ($post) {
                return [
                    'id' => $post->id,
                    'image' => $post->image,
                    'caption' => $post->caption,
                    'created_at' => $post->created_at,
                    'username' => $post->user->username,
                    'likes' => $post->likes->count(),
                ];
            });

            return response()->json([
                'posts' => $posts
            ]);
        }

        $post = Post::find($post_id);

        if ($post) {
            return response()->json([
                'post' => $post
            ]);
        }

        return response()->json([
            'message' => 'Post not found'
        ], 404);
    }

    public function addPost(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'caption' => 'string'
        ]);

        $user_id = auth()->user()->id;

        $image = $request->file('image');
        $image_name = time() . '.' . $image->extension();
        $image->move(public_path('/posts/'), $image_name);

        $post = new Post();
        $post->image = $image_name;
        $post->user_id = $user_id;
        $post->caption = $request->caption;
        $post->save();

        return response()->json([
            'message' => 'Post created successfully',
            'post' => [
                'id' => $post->id,
                'image' => $post->image,
                'caption' => $post->caption,
                'created_at' => $post->created_at,
                'username' => auth()->user()->username,
                'likes' => 0
            ]
        ], 201);
    }

    public function deletePost(Request $request)
    {
        $post_id = $request->query('id');

        $post = Post::find($post_id);

        if (!$post) {
            return response()->json([
                'message' => 'Post not found'
            ], 404);
        }

        $post->delete();

        return response()->json([
            'message' => 'Post deleted successfully'
        ]);
    }
}
