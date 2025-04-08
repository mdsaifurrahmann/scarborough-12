<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\v1\SponsorRequest;
use Illuminate\Support\Facades\Log;

class SponsorController extends Controller
{
    public function store(SponsorRequest $request)
    {

        try {

            $request->storeApplication();

            return back()->with('success', 'Application submitted successfully');
        } catch (\Exception $e) {

            \Log::error('Error creating sponsor application from Controller ' . $e->getMessage());

            return back()->with('error', 'Something went wrong');
        }
    }
}
