<?php

namespace Database\Seeders;

use App\Models\EmailConfiguration;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EmailConfigurationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        EmailConfiguration::updateOrCreate(
            ['id' => 1], 
            [
                'mail_mailer' => 'smtp',
                'mail_host' => 'smtp.gmail.com',
                'mail_port' => 587,
                'mail_username' => 'shazzadulislam998@gmail.com', 
                'mail_password' => 'defa gkvw sgcm cqsb', 
                'mail_encryption' => 'tls',
                'mail_from_address' => 'shazzadulislam998@gmail.com', 
                'mail_from_name' => 'Coders Passion', 
            ]
        );
    }
}
