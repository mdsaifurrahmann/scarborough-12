<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\v1\VendorApplicationsRequest;

class VendorApplications extends Controller
{
    public function store(VendorApplicationsRequest $request)
    {

        try {
            $request->storeApplication();

            return back()->with('success', 'Application submitted successfully');
        } catch (\Exception $e) {
            \Log::error('Error creating vendor application from Controller '.$e->getMessage());

            return back()->with('error', 'Something went wrong');
        }
    }
}
