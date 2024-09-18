<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Models\Task;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Project::query();
        $projects = $query->orderBy('id', 'desc')->get();
        return inertia('Projects/Index', [
            'projects' => ProjectResource::collection($projects),
            'success' => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Projects/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $validatedPayload = $request->validated();
        dd($validatedPayload);
        $validatedPayload['created_by'] = Auth::id();
        $validatedPayload['updated_by'] = Auth::id();
        Project::create($validatedPayload);
        return to_route('projects.index')->with('success', 'Project Created Successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $query = Task::query()->where('project_id', $project->id);
        $relatedTasks = $query->get();
        $projectMembers = User::whereIn('id', $query->pluck('assigned_user_id'))->get();
        return inertia('Projects/Show', [
            'project' => new ProjectResource($project),
            'tasks' => TaskResource::collection($relatedTasks),
            'members' => UserResource::collection($projectMembers)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //
    }
}
