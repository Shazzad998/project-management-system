<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectOptionResource;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserOptionResource;
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
        $query = Project::query()->with('tasks');
        $projects = $query->latest()->get();
        $users = User::query()->whereNot('id', 1)->orderBy('name', 'asc')->get();
        return inertia('Projects/Index', [
            'projects' => ProjectResource::collection($projects),
            'users' => UserOptionResource::collection($users),
            'session' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $validatedPayload = $request->validated();
        $validatedPayload['created_by'] = Auth::id();
        $validatedPayload['updated_by'] = Auth::id();
        $project = Project::create($validatedPayload);
        if ($validatedPayload['user_ids']) {
            $project->users()->attach($validatedPayload['user_ids']);
        }
        return back()->with('success', 'Project Created Successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $query = Task::query()->where('project_id', $project->id);
        $relatedTasks = $query->get();
        $projectMembers = User::whereIn('id', $query->pluck('assigned_user_id'))->get();
        $projects = Project::query()->orderBy('name', 'asc')->get();
        $users = User::query()->whereNot('id', 1)->orderBy('name', 'asc')->get();
        return inertia('Projects/Show', [
            'project' => new ProjectResource($project),
            'tasks' => TaskResource::collection($relatedTasks),
            'members' => UserResource::collection($projectMembers),
            'projects' => ProjectOptionResource::collection($projects),
            'users' => UserOptionResource::collection($users),
            'session' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $validatedPayload = $request->validated();
        $validatedPayload['updated_by'] = Auth::id();
        $project->update($validatedPayload);
        return back()->with('success', 'Project Updated Successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        if ($project->tasks()->count()) {
            return back()->with('error', 'This project has tasks associated with it.');
        }
        $project->delete();
        return back()->with('success', 'Project Deleted Successfully');
    }
}
