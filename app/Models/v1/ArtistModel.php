<?php

namespace App\Models\v1;

use Illuminate\Database\Eloquent\Model;

class ArtistModel extends Model
{
    protected $table = 'artists_application';

    protected $fillable = [
        'artist_name',
        'contact_person',
        'phone',
        'email',
        'web_media',
        'city',
        'province',
        'genre_performance',
        'no_performers',
        'duration',
        'technical_requirements',
        'sound_check',
        'artist_bio',
        'prev_performances',
        'perf_link_1',
        'perf_link_2',
        'perf_link_3',
        'media_interview',
        'signature',

    ];
}
