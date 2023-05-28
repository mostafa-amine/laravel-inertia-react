<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        for ($i = 0; $i < 10; $i++) {
            User::create([
                'name' => fake()->name(),
                'email' => fake()->email(),
                'password' => Hash::make("password")
            ]);
        }

        for ($i = 0; $i < 10; $i++) {
            $title = fake()->text(70);
            $slug = Str::slug($title);
            Post::create([
                'title' => $title,
                'slug' => $slug,
                'thumbnail' => 'https://cdn.educba.com/academy/wp-content/uploads/2019/09/What-is-Laravel.png',
                'content' => fake()->paragraph(),
                'is_published' => true,
                'user_id' => $i + 1
            ]);
        }
    }
}
