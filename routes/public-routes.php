<?php

use App\Http\Controllers\v1\ContactForm;
use App\Http\Controllers\v1\SponsorController;
use App\Http\Controllers\v1\VendorApplications;
use Illuminate\Support\Facades\Route;

// Contact Form
Route::post('contact-form', [ContactForm::class, 'send'])->name('contact-form.send');

// Vendor Applications
Route::post('/vendor-applications', [VendorApplications::class, 'store'])->name('vendor-applications.store');

Route::post('/sponsor-application', [SponsorController::class, 'store'])->name('sponsor-application.store');
