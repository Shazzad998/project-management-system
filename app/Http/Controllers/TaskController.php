<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\ProjectOptionResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserOptionResource;
use App\Models\Project;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Task::query()->with(['project', 'creator', 'updater','assigned_user']);
        $tasks = $query->latest()->get();
        $projects = Project::query()->orderBy('name', 'asc')->get();
        $users = User::query()->whereNot('id', 1)->orderBy('name', 'asc')->get();
        return inertia('Tasks/Index', [
            'tasks' => TaskResource::collection($tasks),
            'projects' => ProjectOptionResource::collection($projects),
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
    public function store(StoreTaskRequest $request)
    {
        $validatedPayload = $request->validated();
        $validatedPayload['created_by'] = Auth::id();
        $validatedPayload['updated_by'] = Auth::id();
        Task::create($validatedPayload);
        return back()->with('success', 'Task Created Successfully');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $validatedPayload = $request->validated();
        $validatedPayload['updated_by'] = Auth::id();
        $task->update($validatedPayload);
        return back()->with('success', 'Task Updated Successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $task->delete();
        return back()->with('success', 'Task Deleted Successfully');
    }
}
