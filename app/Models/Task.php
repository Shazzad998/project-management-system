<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    const STATUS_PENDING = 'pending';
    const STATUS_IN_PROGRESS = 'in_progress';
    const STATUS_COMPLETED = 'completed';

    const PRIORITY_LOW = 'low';
    const PRIORITY_MEDIUM = 'medium';
    const PRIORITY_HIGH = 'high';



    protected $fillable = [
        'name',
        'description',
        'status',
        'priority',
        'due_date',
        'project_id',
        'assigned_user_id',
        'tenant_id',
        'created_by',
        'updated_by',
    ];


    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function assigned_user(){
        return $this->belongsTo(User::class, 'assigned_user_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updater()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
