<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use App\Http\Resources\RoleResource;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;

class RoleController extends Controller implements HasMiddleware
{

    /**
     * Get the middleware that should be assigned to the controller.
     */
    public static function middleware(): array
    {
        return [
            new Middleware('permission:role-list', only: ['index']),
            new Middleware('permission:role-create', only: ['store']),
            new Middleware('permission:role-edit', only: ['update']),
            new Middleware('permission:role-delete', only: ['destroy']),
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $query = Role::query()->with('permissions')->where('tenant_id', Auth::user()->tenant_id);
        $roles = $query->whereNot('name', 'Super Admin')->get();
        return inertia('Roles/Index', [
            'roles' => RoleResource::collection($roles),
            'session' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $permissions = config('roles_permissions.permissions');
        return inertia('Roles/Create', compact('permissions'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRoleRequest $request)
    {
        $validatedPayload = $request->validated();
        $validatedPayload['tenant_id'] = Auth::user()->tenant_id;

        $role = Role::create($validatedPayload);
        $role->givePermissionTo($validatedPayload['permissions']);
        return to_route('roles.index')->with('success', 'Role Created Successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Role $role)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role)
    {
        $permissions = config('roles_permissions.permissions');
        return inertia('Roles/Edit', [
            'permissions' => $permissions,
            'role' => new RoleResource($role)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRoleRequest $request, Role $role)
    {
        $validatedPayload = $request->validated();
        $role->update($validatedPayload);
        $role->syncPermissions($validatedPayload['permissions']);
        return to_route('roles.index')->with('success', 'Role Updated Successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        $role->delete();
        return back()->with('success', 'Role Deleted Successfully');
    }
}
