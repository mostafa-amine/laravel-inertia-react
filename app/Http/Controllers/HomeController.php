<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $posts = Post::with('user')
            ->where('is_published', true)
            ->paginate(3);

        return Inertia::render('Home', [
            'posts' => $posts
        ]);
    }

    public function show(Post $post)
    {
        return Inertia::render('Posts/Index', [
            'post' => $post
        ]);
    }
}
