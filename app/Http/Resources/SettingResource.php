<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class SettingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'logo' => $this->logo ? Storage::url($this->logo) : '/images/logo.svg',
            'icon' => $this->icon ? Storage::url($this->icon) : '/images/icon.svg',
            'site_name' => $this->site_name,
            'site_description' => $this->site_description,
            'email' => $this->email,
            'phone' => $this->phone,
            'address' => $this->address,
            'copy_text' => $this->copy_text,
            'google_client_id' => $this->google_client_id,
            'google_client_secret' => $this->google_client_secret,
            'github_client_id' => $this->github_client_id,
            'github_client_secret' => $this->github_client_secret,
            'facebook_url' => $this->facebook_url,
            'x_url' => $this->x_url,
            'instagram_url' => $this->instagram_url,
            'youtube_url' => $this->youtube_url,
            'linkedin_url' => $this->linkedin_url,
            'tiktok_url' => $this->tiktok_url,
            'discord_url' => $this->discord_url,
        ];
    }
}
