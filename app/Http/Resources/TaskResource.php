<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'image_path' => $this->image_path,
            'status' => $this->status,
            'priority' => $this->priority,
            'due_date' => (new Carbon($this->due_date))->format('Y-m-d'),
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'updated_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'created_by' => [
              'id' => $this->creator->id,  
              'name' => $this->creator->name,  
              'email' => $this->creator->email,  
            ],
            'updated_by' => [
                'id' => $this->updater->id,  
                'name' => $this->updater->name,  
                'email' => $this->updater->email,  
              ],
            'assigned_user' => $this->assigned_user? [
                'id' => $this->assigned_user->id,  
                'name' => $this->assigned_user->name,  
                'email' => $this->assigned_user->email,  
              ] : null,
            'project' => new ProjectResource($this->project),
            'project_id' => $this->project_id,
            'assigned_user_id' => $this->assigned_user_id,
        ];
    }
}
