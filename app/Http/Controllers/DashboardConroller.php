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
    public function index()
    {
        /** @var \App\Models\User */
        $user = Auth::user();
        $tasksQuery = Task::query()->with('project');
        $projectsQuery = Project::query();
        if (!$user->hasRole('Super Admin')) {
            $tasksQuery = $tasksQuery->where('assigned_user_id', $user->id);
            $projectIds = $tasksQuery->select('project_id')->distinct()->pluck('project_id');
            $projectsQuery = $projectsQuery->whereIn('id', $projectIds);
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
