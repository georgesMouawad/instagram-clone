<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentsController extends Controller
{
    public function getComments(Request $request)
    {
        $post_id = $request->query('id');

        $post = Post::find($post_id);

        if (!$post) {
            return response()->json([
                'error' => 'Post not found'
            ], 404);
        }

        $comments = Comment::with('user:id,username')->where('post_id', $post_id)->get();
        $comments = $comments->map(function ($comment) {
            return [
                'id' => $comment->id,
                'content' => $comment->content,
                'username' => $comment->user->username
            ];
        });

        return response()->json([
            'comments' => $comments
        ]);
    }

    public function addComment(Request $request)
    {
        $post_id = $request->input('post_id');
        $content = $request->input('content');

        $post = Post::find($post_id);

        if (!$post) {
            return response()->json([
                'error' => 'Post not found'
            ], 404);
        }

        $comment = new Comment();
        $comment->content = $content;
        $comment->user_id = $request->user()->id;
        $comment->post_id = $post_id;
        $comment->save();

        return response()->json([
            'id' => $comment->id,
            'content' => $comment->content,
            'username' => $comment->user->username
        ]);
    }
}
