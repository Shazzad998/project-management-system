<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        DB::transaction(function () use ($request) {

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);
            $user->update(['tenant_id' => $user->id]);
            $user->refresh();
            $roles = [];

            foreach (config('roles_permissions.roles') as $role) {
                $roles[] = ['name' => $role, 'tenant_id' => $user->id, 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()];
            }

            Role::insert($roles);

            $admin = Role::where('tenant_id', $user->id)->first();

            $permissions = [];

            foreach (config('roles_permissions.permissions') as $permission_group) {
                foreach ($permission_group as $permission) {
                    $permissions[] =  $permission;
                }
            }

            $admin->givePermissionTo($permissions);
            $user->givePermissionTo($permissions);
            // $user->assignRole($admin);
            event(new Registered($user));

            Auth::login($user);
        });



        return redirect(route('dashboard', absolute: false));
    }
}
