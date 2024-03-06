<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PinSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 100; $i++) {
            \App\Models\Pin::create([
                'pin_title' => "Pin $i",
                'pin_description' => "Description $i",
                'image' => "https://via.placeholder.com/150",
                'board_id' => rand(1,20),
            ]);
        }
    }
}
