<?php

namespace App\Models\v1;

use Illuminate\Database\Eloquent\Model;

class VendorModel extends Model
{
    
    protected $table = 'vendor_applications';

    protected $fillable = [
        'business_name',
        'contact_person',
        'phone_number',
        'email',
        'business_address',
        'web_media',
        'vendor_type',
        'vendor_other',


        'product_services_desc',
        'min_price',
        'max_price',
        'liability_insurance',

        'vendor_permit',
        'vendor_permit_copy',
        'comply_regulation',

        'space',
        'electricity',
        'electricity_power',
        'own_tent_table',

        'sponsore_opportunity',
        'special_request',
        'agreement',
    ];


    protected $casts = [
        'agreement' => 'boolean',
        'liability_insurance' => 'boolean',
        'vendor_permit' => 'boolean',
        'comply_regulation' => 'boolean',
        'sponsorship_opportunity' => 'boolean',
        'own_tent_table' => 'boolean',
        'electricity' => 'boolean'
    ];


}
