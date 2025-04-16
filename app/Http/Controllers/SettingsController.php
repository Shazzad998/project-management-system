<?php

namespace App\Http\Controllers;

use App\Http\Resources\SettingResource;
use App\Models\EmailConfiguration;
use App\Models\Setting;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SettingsController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('permission:settings-view', only: ['index']),
            new Middleware('permission:general-settings-edit', only: ['update_general_settings']),
            new Middleware('permission:oauth-settings-edit', only: ['update_oauth_settings']),
            new Middleware('permission:social-links-edit', only: ['update_social_links'])
        ];
    }
    public function index()
    {
        /** @var \App\Models\User */
        $user = Auth::user();
        $setting = new SettingResource(Setting::first());
        $emailConfig = $user->can('email-settings-edit')? EmailConfiguration::first() : null;
        return Inertia::render('Settings/Index', compact('setting', 'emailConfig'));
    }


    public function update_general_settings(Request $request)
    {
        $validatedPayload = $request->validate([
            'site_name' => 'required|string',
            'site_description' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required',
            'address' => 'required',
            'logo' => 'nullable|image',
            'icon' => 'nullable|image',
        ]);

        $setting = Setting::first();
        $imageFields = ['logo', 'icon'];

        foreach ($imageFields as $field) {
            if ($request->hasFile($field)) {
                if ($setting->$field && Storage::disk('public')->exists($setting->$field)) {
                    Storage::disk('public')->delete($setting->$field);
                }

                $validatedPayload[$field] = $request->file($field)->store('/', 'public');
            } else {
                $validatedPayload[$field] = $setting->$field;
            }
        }

        $setting->update($validatedPayload);

        return back()->with('success', 'General Settings Updated!');
    }

    public function update_oauth_settings(Request $request)
    {
        $validatedPayload = $request->validate([
            'google_client_id' => 'required|string',
            'google_client_secret' => 'required|string',
            'github_client_id' => 'required|string',
            'github_client_secret' => 'required|string',
        ]);

        Setting::first()->update($validatedPayload);

        return back()->with('success', 'Oauth Settings Updated!');
    }


    public function update_social_links(Request $request)
    {
        $validatedPayload = $request->validate([
            'facebook_url' => 'nullable|string',
            'x_url' => 'nullable|string',
            'instagram_url' => 'nullable|string',
            'youtube_url' => 'nullable|string',
            'linkedin_url' => 'nullable|string',
            'tiktok_url' => 'nullable|string',
            'discord_url' => 'nullable|string',
        ]);

        $setting = Setting::first();
        $setting->update($validatedPayload);

        return back()->with('success', 'Social Links Updated!');
    }


    public function update_email_settings(Request $request)
    {
        $request->validate([
            'mail_host' => 'required',
            'mail_port' => 'required|integer',
            'mail_username' => 'required',
            'mail_password' => 'required',
            'mail_from_address' => 'required|email',
            'mail_from_name' => 'required',
        ]);


        try{

            EmailConfiguration::updateOrCreate(
                ['id' => 1],
                $request->only([
                    'mail_mailer', 'mail_host', 'mail_port',
                    'mail_username', 'mail_password', 'mail_encryption',
                    'mail_from_address', 'mail_from_name',
                ])
            );
    
    
            // Mail::raw('This is a test email from Laravel using Gmail.', function ($message) {
            //     $message->to('webdeveloper05.coderspassion@gmail.com')
            //             ->subject('Test Email from Laravel');
            // });

            /** @var \App\Models\User */
            // $user = Auth::user();
            // Mail::to('webdeveloper05.coderspassion@gmail.com')->send( new OrderCompleteNotification($user));
    
            return back()->with('success', 'Email configuration updated successfully.');
        }catch(Exception $e){
            return back()->with('success', $e->getMessage());
        }    
    }
}
