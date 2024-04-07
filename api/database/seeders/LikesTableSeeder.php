<?php

namespace Database\Seeders;

use Database\Factories\LikeFactory;
use Illuminate\Database\Seeder;

class LikesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        LikeFactory::new()->count(10)->create();
    }
}
