<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\v1\ContactFormRequest;
use Illuminate\Http\RedirectResponse;

class ContactForm extends Controller
{
    public function send(ContactFormRequest $request): RedirectResponse
    {

        try {
            $request->sendEmail();

            return back()->with('success', 'Email sent successfully');
        } catch (\Exception $e) {
            \Log::error($e->getMessage());

            return back()->with('error', 'Something went wrong');
        }
    }
}
