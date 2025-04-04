<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\v1\ContactForm;
use App\Http\Controllers\v1\VendorApplications;


// Contact Form
Route::post('contact-form', [ContactForm::class, 'send'])->name('contact-form.send');

// Vendor Applications
Route::post('/vendor-applications', [VendorApplications::class, 'store'])->name('vendor-applications.store');

