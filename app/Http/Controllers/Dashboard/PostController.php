<?php

namespace App\Http\Controllers\Dashboard;

use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;


class PostController extends Controller
{
    public function index(Request $request)
    {
        if ($request->search) {
            $searchQuery = $request->search;

            $posts = Post::with('user')
                ->where('content', 'LIKE', '%' . $request->search . '%')
                ->where('user_id', auth()->id())
                ->get();
        } else {

            $posts = Post::with('user')
                ->where('user_id', auth()->id())
                ->get();
        }

        return Inertia::render('Dashboard/Posts/Index', [
            'posts' => $posts,
            'searchQuery' => isset($searchQuery) ? $searchQuery : ''
        ]);
    }

    public function create()
    {
        return Inertia::render('Dashboard/Posts/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'thumbnail' => 'required|image',
            'content' => 'required'
        ]);

        $thumbnail = Storage::putFile('public', $request->file('thumbnail'));

        Post::create([
            'title' => $request->title,
            'thumbnail' => Storage::disk('public')->url(basename($thumbnail)),
            'slug' => Str::slug($request->title),
            'content' => $request->content,
            'is_published' => $request->is_published,
            'user_id' => auth()->user()->id
        ]);

        return to_route('posts.index')->with('message', 'Post Created Succefully');
    }

    public function edit(Post $post)
    {
        if (!Gate::allows('update_post', $post)) {
            abort(403);
        }

        return Inertia::render('Dashboard/Posts/Edit', [
            'userPost' => $post
        ]);
    }

    public function update(Request $request, Post $post)
    {
        $request->validate([
            'title' => 'required',
            'content' => 'required',
            'tumbnail' => 'image',
            'is_published' => 'required',
        ]);

        if ($request->file('thumbnail') !== null) {
            $thumbnail_path = Storage::putFile('public', $request->file('thumbnail'));
        } else {
            $thumbnail_path = $post->thumbnail;
        }

        $post->update([
            'title' => $request->title,
            'content' => $request->content,
            'thumbnail' => Storage::disk('public')->url(basename($thumbnail_path)),
            'is_published' => $request->is_published
        ]);

        return to_route('posts.index')->with('message', 'Post Updated Succefully');
    }

    public function delete(Post $post)
    {
        $post->delete();
    }
}
