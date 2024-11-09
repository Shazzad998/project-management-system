<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardConroller extends Controller
{
    public $tenantId = null;

    public function __construct()
    {
        $this->tenantId = Auth::user()->tenant_id;
        if (!$this->tenantId) {
            abort(403);
        }
    }

    public function index()
    {
        /** @var \App\Models\User */
        $user = Auth::user();
        $tasksQuery = Task::query()->with('project')->where('tenant_id', $this->tenantId);

        if ($user->hasRole('Super Admin')) {
            $projectsQuery = Project::query()->where('tenant_id', $this->tenantId);
        } else {
            $tasksQuery = $tasksQuery->where('assigned_user_id', $user->id);
            $projectsQuery = $user->projects();
        }

        $totalProjectCount = $projectsQuery->count();
        $pendingProjects = $projectsQuery->where('status', 'pending')->take(5)->get();
        $pendingProjectCount = $projectsQuery->where('status', 'pending')->count();
        $overdueProjects = $projectsQuery->where('due_date', '<', now())->take(5)->get();
        $overdueProjectCount = $projectsQuery->where('due_date', '<', now())->count();



        $totalTaskCount = $tasksQuery->count();
        $pendingTasks = $tasksQuery->where('status', 'pending')->take(5)->get();
        $pendingTaskCount = $tasksQuery->where('status', 'pending')->count();
        $overdueTasks = $tasksQuery->where('due_date', '<', now())->take(5)->get();
        $overdueTaskCount = $tasksQuery->where('due_date', '<', now())->count();



        return Inertia::render('Dashboard', [
            //projects
            'totalProjectCount' => $totalProjectCount,
            'pendingProjects' => ProjectResource::collection($pendingProjects),
            'pendingProjectCount' => $pendingProjectCount,
            'overdueProjects' => ProjectResource::collection($overdueProjects),
            'overdueProjectCount' => $overdueProjectCount,
            //tasks
            'totalTaskCount' => $totalTaskCount,
            'pendingTasks' => TaskResource::collection($pendingTasks),
            'pendingTaskCount' => $pendingTaskCount,
            'overdueTasks' => TaskResource::collection($overdueTasks),
            'overdueTaskCount' => $overdueTaskCount,
        ]);
    }
}
