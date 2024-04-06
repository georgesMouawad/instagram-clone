<?php

namespace Database\Seeders;

use App\Models\Follower;
use Illuminate\Database\Seeder;

class FollowersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Follower::factory()->count(10)->create();
    }
}
