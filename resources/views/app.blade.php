<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!-- HTML Meta Tags -->
        <title inertia>{{ $page['props']['title'] ?? config('app.name', 'Laravel') . ' - Scarborough Folk Fest' ?? config('app.name', 'Scarborough Folk Fest') }}</title>

        <link rel="icon" type="image/x-icon" href="/images/logo/favicon.png">

        <meta name="description"
            content="The euphony of folk music from all different parts of the globe united in the city celebrated for its multiculturalism - Scarborough. Scarborough Folk Fest was a celebration of the sheer musical magnificence that is folk music - in all its myriad forms and variations.">

        <!-- Facebook Meta Tags -->
        <meta property="og:url" content="https://scarboroughfolkfest.com/sff.html">
        <meta property="og:type" content="website">
        <meta property="og:title" content="{{ $page['props']['title'] ?? config('app.name', 'Laravel') . ' - Scarborough Folk Fest' ?? config('app.name', 'Scarborough Folk Fest') }}">
        <meta property="og:description"
            content="The euphony of folk music from all different parts of the globe united in the city celebrated for its multiculturalism - Scarborough. Scarborough Folk Fest was a celebration of the sheer musical magnificence that is folk music - in all its myriad forms and variations.">
        <meta property="og:image"
            content="https://opengraph.b-cdn.net/production/images/e969f17b-d762-4921-a75b-f97985ab2101.png?token=lc5LnSI35Id6QTpHvqQwVvVE4tX4HUgP53Jybik8850&height=147&width=306&expires=33275679988">

        <!-- Twitter Meta Tags -->
        <meta name="twitter:card" content="summary_large_image">
        <meta property="twitter:domain" content="scarboroughfolkfest.com">
        <meta property="twitter:url" content="https://scarboroughfolkfest.com/sff.html">
        <meta name="twitter:title" content="{{ $page['props']['title'] ?? config('app.name', 'Laravel') . ' - Scarborough Folk Fest' ?? config('app.name', 'Scarborough Folk Fest') }}">
        <meta name="twitter:description"
            content="The euphony of folk music from all different parts of the globe united in the city celebrated for its multiculturalism - Scarborough. Scarborough Folk Fest was a celebration of the sheer musical magnificence that is folk music - in all its myriad forms and variations.">
        <meta name="twitter:image"
            content="https://opengraph.b-cdn.net/production/images/e969f17b-d762-4921-a75b-f97985ab2101.png?token=lc5LnSI35Id6QTpHvqQwVvVE4tX4HUgP53Jybik8850&height=147&width=306&expires=33275679988">


        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

        {{-- <link rel="preconnect" href="https://fonts.bunny.net"> --}}
        {{-- <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" /> --}}
        {{-- <script src="https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js"></script> --}}

        
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
        
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
