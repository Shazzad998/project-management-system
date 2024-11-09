<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateRoleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $tenantId = Auth::user()->tenant_id;
        return [
            'name' => ['required', 'string', 'max:20', Rule::unique('roles')->where(function ($query) use ($tenantId) {
                return $query->where('tenant_id', $tenantId);
            })->ignore($this->route('role'))],
            'permissions' => ['required', 'array'],
            'permissions.*' => 'string',
        ];
    }
}
