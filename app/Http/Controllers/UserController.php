<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use Exception;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Role;

class UserController extends Controller implements HasMiddleware
{
    /**
     * Get the middleware that should be assigned to the controller.
     */
    public static function middleware(): array
    {
        return [
            new Middleware('permission:user-list', only: ['index']),
            new Middleware('permission:user-create', only: ['store']),
            new Middleware('permission:user-edit', only: ['update']),
            new Middleware('permission:user-delete', only: ['destroy']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (!request()->user()->can('user-list')) {
            return back()->with('Error', 'You are not Authorized!');
        }
        $query = User::query()->with(['roles', 'permissions']);
        $users = $query->whereNot('id', 1)->orderBy('id', 'desc')->get();
        $roles = Role::whereNot('id', 1)->get()->pluck('name');
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
        if (!request()->user()->can('user-create')) {
            return back()->with('Error', 'You are not Authorized!');
        }
        $validatedPayload = $request->validated();

        try {
            $roles = Role::whereNot('id', 1)->get()->pluck('name')->toArray();
            if (!in_array($validatedPayload['role'], $roles)) {
                return back()->with('error', 'Invalid Role Selected.');
            }
            $image = $validatedPayload['image_path'] ?? null;
            if ($image) {
                $validatedPayload['image_path'] = $image->store('users/' . str_replace(" ", "_", $validatedPayload['name']), 'public');
            }
            $user = User::create($validatedPayload);
            $user->assignRole($validatedPayload['role']);
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
        if (!request()->user()->can('user-edit')) {
            return back()->with('Error', 'You are not Authorized!');
        }
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
                $validatedPayload['image_path'] = $image->store('users/' . strtolower(str_replace(['-', ' '], "_", $validatedPayload['name'])), 'public');
            }
            $user->update($validatedPayload);
            $user->syncRoles([$validatedPayload['role']]);
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
        if (!request()->user()->can('user-delete')) {
            return back()->with('Error', 'You are not Authorized!');
        }
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
