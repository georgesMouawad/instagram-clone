<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\File;

use Illuminate\Http\Request;
use App\Models\User;

class UsersController extends Controller
{
    public function getUser(Request $request)
    {
        $user_id = $request->query('id');

        if (!$user_id) {
            $users = User::all();
            return response()->json([
                'users' => $users
            ]);
        }

        $user = User::find($user_id);

        if ($user) {
            return response()->json([
                'user' => $user
            ]);
        }

        return response()->json([
            'message' => 'User not found'
        ], 404);
    }

    public function updateUser(Request $request)
    {
        $request->validate([
            'name' => 'string',
            'bio' => 'string',
            'email' => 'string|email',
            'image' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if (!auth()->check()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $user_id = auth()->user()->id;
        $user = User::find($user_id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $filename = time() . '.' . $extension;
            $file->move(public_path('/profile-pictues/'), $filename);

            if (File::exists(public_path('/profile-pictues/') . $user->image)) {
                File::delete(public_path('/profile-pictues/') . $user->image);
            }

            $user->image = $filename;
        }

        $request->name && $user->name = $request->name;
        $request->bio && $user->bio = $request->bio;
        $request->email && $user->email = $request->email;

        $user->save();

        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user,
        ]);
    }
}
