<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FollowerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 10; $i++) {
            \App\Models\Follower::create([
                'followed_id' => rand(1,10),
                'follower_id' => rand(1,10),
            ]);
        }
    }
}
