<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Setting::updateOrCreate(['id' => 1], [
            'logo' => '',
            'icon' => '',
            'site_name' => 'Qwirk',
            'site_description' => "Manage tasks and projects easily with an all-in-one platform designed for seamless collaboration",
            'email' => 'info@qwirk.com',
            'phone' => '+880 1992327887',
            'address' => '100 Smith Street, Collingwood VIC 3066',
            'copy_text' => 'Copyright by Qwirk. All rights reserved.',
            'google_client_id' => '840092568980-l04omcdc9cis11kt3u9jlpv70s9r3khm.apps.googleusercontent.com',
            'google_client_secret' => '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',
            'facebook_url' => 'https://www.facebook.com/qwirk',
            'x_url' => 'https://www.x.com/qwirk',
            'instagram_url' => 'https://www.instagram.com/qwirk',
            'youtube_url' => 'https://www.youtube.com/qwirk',
            'linkedin_url' => 'https://www.linkedin.com/qwirk',
            'tiktok_url' => 'https://www.tiktok.com/qwirk',
            'discord_url' => 'https://www.discord.com/qwirk',
        ]);
    }
}
