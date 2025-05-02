<?php

namespace App\Providers;

use App\Models\EmailConfiguration;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        JsonResource::withoutWrapping();
        Gate::before(function ($user, $ability) {
            return $user->hasRole('Super Admin') ? true : null;
        });

        if (Schema::hasTable('email_configurations') && EmailConfiguration::count()) {
            $emailConfig = EmailConfiguration::first();

            Config::set('mail.default', $emailConfig->mail_mailer);
            Config::set('mail.mailers.smtp.host', $emailConfig->mail_host);
            Config::set('mail.mailers.smtp.port', $emailConfig->mail_port);
            Config::set('mail.mailers.smtp.username', $emailConfig->mail_username);
            Config::set('mail.mailers.smtp.password', $emailConfig->mail_password);
            Config::set('mail.mailers.smtp.encryption', $emailConfig->mail_encryption);
            Config::set('mail.from.address', $emailConfig->mail_from_address);
            Config::set('mail.from.name', $emailConfig->mail_from_name);
        }
    }
}
