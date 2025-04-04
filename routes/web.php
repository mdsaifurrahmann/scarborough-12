<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\v1\PublicRoutes;


Route::get('/', [PublicRoutes::class, 'root'])->name('/');

Route::get('home', [PublicRoutes::class, 'home'])->name('home');
Route::get('sff', [PublicRoutes::class, 'sff'])->name('sff');
Route::get('vision', [PublicRoutes::class, 'vision'])->name('vision');
Route::get('contact', [PublicRoutes::class, 'home'])->name('contact');
Route::get('join-us', [PublicRoutes::class, 'joinUs'])->name('join-us');
Route::get('join-us/apply-vendor', [PublicRoutes::class, 'applyVendor'])->name('apply-vendor');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});



require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/public-routes.php';
