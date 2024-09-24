<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = User::query();
        $users = $query->orderBy('id', 'desc')->get();
        $roles = Role::all()->pluck('name');
        return inertia('Users/Index', [
            'users' => UserResource::collection($users),
            'roles' => $roles,
            'session' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {

        $validatedPayload = $request->validated();
        try {
            $image = $validatedPayload['image_path'] ?? null;
            if ($image) {
                $validatedPayload['image_path'] = $image->store('users/' . str_replace(" ", "_", $validatedPayload['name']), 'public');
            }
            User::create($validatedPayload);
            return back()->with('success', 'User Created Successfully');
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return back()->with('error', 'Something went wrong. Please try again later.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $validatedPayload = $request->validated();
        try {
            if (!$validatedPayload['password']) {
                unset($validatedPayload['password']);
            }
            $image = $validatedPayload['image_path'] ?? null;
            if ($image) {
                if ($user->image_path) {
                    Storage::disk('public')->deleteDirectory(dirname($user->image_path));
                }
                $validatedPayload['image_path'] = $image->store('users/' . strtolower(str_replace(['-', ' '], "_", $validatedPayload['name'])) , 'public');
            }
            $user->update($validatedPayload);
            return back()->with('success', 'User Updated Successfully');
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return back()->with('error', 'Something went wrong. Please try again later.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        try {
            if ($user->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($user->image_path));
            }
            $user->delete();
            return back()->with('success', 'User Deleted Successfully');
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return back()->with('error', 'Something went wrong. Please try again later.');
        }
    }
}
