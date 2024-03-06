<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BoardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 20; $i++) {
            \App\Models\Board::create([
                'title' => "Board $i",
                'description' => "Description $i",
                'user_id' => rand(1,11),
            ]);
        }
    }
}
