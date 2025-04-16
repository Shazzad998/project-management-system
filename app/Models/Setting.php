<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    protected $fillable = [
        'logo',
        'icon',
        'site_name',
        'site_description',
        'email',
        'phone',
        'address',
        'copy_text',
        'google_client_id',
        'google_client_secret',
        'facebook_url',
        'x_url',
        'instagram_url',
        'youtube_url',
        'linkedin_url',
        'tiktok_url',
        'discord_url',
    ];
}
