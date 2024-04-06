<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\File;

use Illuminate\Http\Request;
use App\Models\User;

class UsersController extends Controller
{
    public function getUser()
    {
        if (!auth()->check()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $user_id = auth()->user()->id;
        $user = User::find($user_id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        
        return response()->json([
            'user' => $user
        ]);
    }

    public function updateUser(Request $request)
    {
        $request->validate([
            'image_url' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'name' => 'string',
            'bio' => 'string',
            'email' => 'string|email',
        ]);
    
        if (!auth()->check()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
    
        $user_id = auth()->user()->id;
        $user = User::find($user_id);
    
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        
    
        if ($request->hasFile('profile_picture')) {
            $file = $request->file('profile_picture');
            $extension = $file->getClientOriginalExtension();
            $filename = time() . '.' . $extension;
            $file->move(public_path('/profile_pictures/'), $filename);
    
            if (File::exists(public_path('/profile_pictures/') . $user->profile_picture)) {
                File::delete((public_path('/profile_pictures/') . $user->profile_picture));
            }
    
            $user->profile_picture = $filename;
        }
    
        // Update other user fields
        if ($request->filled('first_name')) {
            $user->first_name = $request->input('first_name');
        }
    
        if ($request->filled('last_name')) {
            $user->last_name = $request->input('last_name');
        }
    
        if ($request->filled('email')) {
            $user->email = $request->input('email');
        }
    
        if ($request->filled('lat')) {
            $user->lat = $request->input('lat');
        }
    
        if ($request->filled('lng')) {
            $user->lng = $request->input('lng');
        }
    
        // Save the user model
        $user->save();
    
        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user,
        ]);
    }
    


    public function getUserRole() {
        if (!auth()->check()) {
            return response()->json(['role' => 0]);
        }

        $user_role = auth()->user()->role_id;

        return response()->json([
            'role' => $user_role
        ]);
    }

    public function activateBranch($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Perform the activation logic here
        $user->active = true;
        $user->save();

        return response()->json(['message' => 'Branch activated successfully']);
    }

    public function shutDownBranch($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Perform the shut down logic here
        $user->active = false;
        $user->save();

        return response()->json(['message' => 'Branch shut down successfully']);
    }

    public function deleteBranch($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Perform the delete logic here
        $user->delete();

        return response()->json(['message' => 'Branch deleted successfully']);
    }
}
