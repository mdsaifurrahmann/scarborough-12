<?php

namespace App\Models\v1;

use Illuminate\Database\Eloquent\Model;

class VolunteerModel extends Model
{
    protected $table = 'volunteer_applications';

    protected $fillable = [
        'full_name',
        'dob',
        'email',
        'phone',
        'address',
        'em_full_name',
        'em_relationship',
        'em_phone',
        'available_days',
        'volunteering_area',
        'volunteering_area_other',
        'relevant_experience',
        'special_requirements',
        'tshirt_size',
        'signature',
    ];

    protected $casts = [
        'available_days' => 'array',
        'volunteering_area' => 'array',
        'dob' => 'date',
    ];
}
