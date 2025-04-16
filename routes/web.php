<?php

use App\Http\Controllers\DashboardConroller;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

 Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
 });


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardConroller::class, 'index'])->name('dashboard');
    Route::resource('users', UserController::class);
    Route::resource('roles', RoleController::class);
    Route::resource('projects', ProjectController::class);
    Route::resource('tasks', TaskController::class);
    Route::put('/tasks/{task}/status', [TaskController::class, 'updateStatus']);
    //Settings
    Route::get('settings', [SettingsController::class, 'index'])->name('settings.index');
    Route::post('general-settings-update', [SettingsController::class, 'update_general_settings'])->name('settings.general-settings-update');
    Route::post('oauth-settings-update', [SettingsController::class, 'update_oauth_settings'])->name('settings.oauth-settings-update');
    Route::post('social-links-update', [SettingsController::class, 'update_social_links'])->name('settings.social-links-update');
    Route::post('email-settings-update', [SettingsController::class, 'update_email_settings'])->name('settings.email-settings-update');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
