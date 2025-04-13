<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicRoutes extends Controller
{
    public function root()
    {
        return redirect(route('sff'));
    }

    public function home(Request $request)
    {
        return Inertia::render('home', [
            'title' => 'Scarborough Folk Fest',
            'success' => $request->session()->get('success'),
            'error' => $request->session()->get('error'),
            'requiresChallenge' => $request->session()->get('requiresChallenge'),
        ]);
    }

    public function sff(Request $request)
    {
        return Inertia::render('sff', [
            'title' => 'SFF2025',
        ]);
    }

    public function vision(Request $request)
    {
        return Inertia::render('vision', [
            'title' => 'Vision',
        ]);
    }

    public function joinUs(Request $request)
    {
        return Inertia::render('join-us', [
            'title' => 'Join Us',
        ]);
    }

    public function contact(Request $request)
    {
        return Inertia::render('home', [
            'title' => 'Contact',
            'success' => $request->session()->get('success'),
            'error' => $request->session()->get('error'),
            'requiresChallenge' => $request->session()->get('requiresChallenge'),
        ]);
    }

    public function applyVendor(Request $request)
    {
        return Inertia::render('vendor_application', [
            'title' => 'Vendor Application',
            'success' => $request->session()->get('success'),
            'error' => $request->session()->get('error'),
            'requiresChallenge' => $request->session()->get('requiresChallenge'),
        ]);
    }

    public function applySponsor(Request $request)
    {
        return Inertia::render('sponsor_application', [
            'title' => 'Sponsor Application',
            'success' => $request->session()->get('success'),
            'error' => $request->session()->get('error'),
            'requiresChallenge' => $request->session()->get('requiresChallenge'),
        ]);
    }

    public function applyArtist(Request $request)
    {
        return Inertia::render('artist_application', [
            'title' => 'Artist Application',
            'success' => $request->session()->get('success'),
            'error' => $request->session()->get('error'),
            'requiresChallenge' => $request->session()->get('requiresChallenge'),
        ]);
    }

    public function applyVolunteer(Request $request)
    {
        return Inertia::render('volunteer_application', [
            'title' => 'Volunteer Application',
            'success' => $request->session()->get('success'),
            'error' => $request->session()->get('error'),
            'requiresChallenge' => $request->session()->get('requiresChallenge'),
        ]);
    }

    public function gallery(Request $request)
    {
        return Inertia::render('gallery', [
            'title' => 'Gallery',
            // 'success' => $request->session()->get('success'),
            // 'error' => $request->session()->get('error'),
            // 'requiresChallenge' => $request->session()->get('requiresChallenge'),
        ]);
    }
}
