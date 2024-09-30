<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Permission;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $roles = $this->roles->pluck('name'); 
        $isSuperAdmin = $roles->contains('Super Admin');
        $allpermissions = array_merge(...array_values(config('roles_permissions.permissions')));
 
        $permissions = $isSuperAdmin 
        ? $allpermissions
        : $this->getAllPermissions()->pluck('name');

        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'email_verified_at' => $this->email_verified_at,
            'image_path' => $this->image_path ? Storage::url($this->image_path) : '',
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'roles' => $roles, 
            'permissions' => $permissions,
        ];
    }
}
