<?php

namespace Database\Factories;

use App\Models\Task;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->sentence(),
            'description' => fake()->realText(),
            'due_date' => fake()->dateTimeBetween('now', '+1 year'),
            'status' => fake()
                ->randomElement([
                    Task::STATUS_PENDING,
                    Task::STATUS_IN_PROGRESS,
                    Task::STATUS_COMPLETED
                ]),
            'priority' => fake()
                ->randomElement([
                    Task::PRIORITY_LOW,
                    Task::PRIORITY_MEDIUM,
                    Task::PRIORITY_HIGH
                ]),
            'image_path' => fake()->imageUrl(),
            'assigned_user_id' => 1,
            'created_by' => 1,
            'updated_by' => 1
        ];
    }
}
