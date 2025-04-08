<?php

namespace App\Models\v1;

use Illuminate\Database\Eloquent\Model;

class SponsorModel extends Model
{
    protected $table = 'sponsor_applications';

    protected $fillable = [
    
        'org_name',
        'contact_person',
        'position',
        'phone',
        'email',
        'company_addr',
        'web_media',
        'sponsor_level',
        'special_benefits',
        'why_interested',
        'any_goal',
        'agreement_1',
        'agreement_2',
        'agreement_3',
        'signature',

        
    ];
}
