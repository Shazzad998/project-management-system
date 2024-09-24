<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [];
        foreach(config('roles_permissions.permissions') as $permission_group){
            foreach($permission_group as $permission){
                $permissions [] = ['name' => $permission, 'guard_name' => 'web', 'created_at'=> now(), 'updated_at' => now()];
            }
        }
        Permission::insert($permissions);

        $roles = [];
        foreach(config('roles_permissions.roles') as $role){
            $roles [] = ['name' => $role, 'guard_name' => 'web', 'created_at'=> now(), 'updated_at' => now()];
        }

        Role::insert($roles);
    }
}
