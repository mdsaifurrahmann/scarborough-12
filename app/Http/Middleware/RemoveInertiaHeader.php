<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RemoveInertiaHeader
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        return $next($request);

        $response->headers->set('Developer', 'Codebumble');

        // Remove or replace the "Vary: X-Inertia" header
        if ($response->headers->has('Vary')) {
            $varyHeaders = explode(',', $response->headers->get('Vary'));
            $filteredHeaders = array_filter($varyHeaders, function ($header) {
                return trim($header) !== 'X-Inertia';
            });

            if (empty($filteredHeaders)) {
                $response->headers->remove('Vary');
            } else {
                $response->headers->set('Vary', 'User-Agent');
            }
        }

        if ($response->headers->has('X-Powered-By')) {
            $varyHeaders = explode(',', $response->headers->get('X-Powered-By'));
            $filteredHeaders = array_filter($varyHeaders, function ($header) {
                return trim($header) !== 'PHP/8.3.13';
            });

            if (empty($filteredHeaders)) {
                $response->headers->remove('X-Powered-By');
            } else {
                $response->headers->set('X-Powered-By', 'Unknown');
            }
        }

        return $response;
    }
}
