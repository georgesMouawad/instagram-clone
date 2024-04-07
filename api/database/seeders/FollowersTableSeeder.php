<?php

namespace Database\Seeders;

use Database\Factories\FollowerFactory;
use Illuminate\Database\Seeder;

class FollowersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        FollowerFactory::new()->count(10)->create();
    }
}
