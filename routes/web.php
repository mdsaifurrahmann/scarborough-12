<?php

use App\Http\Controllers\v1\PublicRoutes;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [PublicRoutes::class, 'root'])->name('/');

Route::get('home', [PublicRoutes::class, 'home'])->name('home');
Route::get('sff', [PublicRoutes::class, 'sff'])->name('sff');
Route::get('vision', [PublicRoutes::class, 'vision'])->name('vision');
Route::get('contact', [PublicRoutes::class, 'contact'])->name('contact');
Route::get('join-us', [PublicRoutes::class, 'joinUs'])->name('join-us');
Route::get('join-us/apply-vendor', [PublicRoutes::class, 'applyVendor'])->name('apply-vendor');
Route::get('join-us/apply-sponsor', [PublicRoutes::class, 'applySponsor'])->name('apply-sponsor');
Route::get('join-us/apply-artist', [PublicRoutes::class, 'applyArtist'])->name('apply-artist');
Route::get('gallery', [PublicRoutes::class, 'gallery'])->name('gallery');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/public-routes.php';
