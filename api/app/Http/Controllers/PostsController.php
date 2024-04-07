<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class PostsController extends Controller
{
    public function getPosts(Request $request)
    {
        $post_id = $request->query('id');

        if (!$post_id) {

            $posts = Post::with('user:id,username', 'likes')->get();

            $posts = $posts->map(function ($post) {
                return [
                    'id' => $post->id,
                    'image' => $post->image,
                    'caption' => $post->caption,
                    'created_at'=> $post->created_at,
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
        $post->user_id = $user_id;
        $post->image = $image_name;
        $post->caption = $request->caption;
        $post->save();

        return response()->json([
            'message' => 'Post created successfully',
            'post' => $post
        ]);
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
