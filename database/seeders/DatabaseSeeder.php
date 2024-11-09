<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(RolePermissionSeeder::class);

        $user = User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('admin12345'),
            'email_verified_at' => time()
        ]);
        $user->update(['tenant_id' => $user->id]);
        $roles = [];
        $roles[] = ['name' => 'Super Admin', 'tenant_id' => $user->id, 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()];
        foreach (config('roles_permissions.roles') as $role) {
            $roles[] = ['name' => $role, 'tenant_id' => $user->id, 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()];
        }
        Role::insert($roles);
        $user->assignRole('Super Admin');
        // Project::factory()->count(5)->hasTasks(3)->create();
    }
}
