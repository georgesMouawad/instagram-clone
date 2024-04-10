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

        $comments = Comment::with('user:id,username,image')->where('post_id', $post_id)->get();
        $comments = $comments->map(function ($comment) {
            return [
                'id' => $comment->id,
                'content' => $comment->content,
                'user_id' => $comment->user_id,
                'username' => $comment->user->username,
                'user_image' => $comment->user->image,
                'created_at' => $comment->created_at->format('Y-m-d H:i:s'),
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
            'user_id' => $comment->user_id,
            'username' => $comment->user->username,
            'user_image' => $comment->user->image,
            'created_at' => $comment->created_at->format('Y-m-d H:i:s'),
        ]);
    }

    public function deleteComment(Request $request)
    {
        $user_id = $request->user()->id;

        $comment_id = $request->input('id');

        $comment = Comment::where('user_id', $user_id)->find($comment_id);

        if (!$comment) {
            return response()->json([
                'error' => 'Comment not found'
            ], 404);
        }

        if ($comment->user_id !== $request->user()->id) {
            return response()->json([
                'error' => 'Unauthorized'
            ], 401);
        }

        $comment->delete();

        return response()->json([
            'message' => 'Comment deleted'
        ]);
    }
}
