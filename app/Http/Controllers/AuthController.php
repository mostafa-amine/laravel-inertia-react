<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function loginRender()
    {
        return Inertia::render('Auth/Login');
    }

    public function registerRender()
    {
        return Inertia::render('Auth/Register');
    }

    public function login(Request $request)
    {
        $credintials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:4'
        ]);

        if (Auth::attempt($credintials)) {
            $request->session()->regenerate();
            return to_route('home')->with('message', 'You are Logged in succefully');
        }
    }

    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|min:10',
            'email' => 'required|email',
            'password' => 'required',
            'confirmPassword' => 'required|same:password'
        ]);

        $user = User::create($data);

        Auth::login($user);

        return to_route('home');
    }
}
