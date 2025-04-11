<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\v1\ArtistRequest;

class ArtistController extends Controller
{
    public function store(ArtistRequest $request)
    {
        try {
            $request->storeApplication();

            return back()->with('success', 'Application submitted successfully');
        } catch (\Exception $e) {
            \Log::error('Error creating artist application from Controller ' . $e->getMessage());

            return back()->with('error', 'Something went wrong');
        }
    }
}
