<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pin>
 */
class PinFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'pin_title' => $this->faker->sentence(3),
            'pin_description' => $this->faker->sentence(10),
            'image' => 'https://via.placeholder.com/150',
            'board_id' => rand(1, 20),
        ];
    }
}
