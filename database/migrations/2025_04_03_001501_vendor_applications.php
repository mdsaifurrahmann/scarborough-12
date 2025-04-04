<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vendor_applications', function (Blueprint $table) {
            $table->id();
            
            $table->string('business_name');
            $table->string('contact_person');
            $table->string('phone_number');
            $table->string('email');
            $table->text('business_address');
            $table->text('web_media')->nullable();
            $table->string('vendor_type');
            $table->string('vendor_other')->nullable();
            $table->text('product_services_desc');
            $table->decimal('min_price', 10, 2);
            $table->decimal('max_price', 10, 2);
            $table->boolean('liability_insurance');
            $table->boolean('vendor_permit')->nullable();
            $table->text('vendor_permit_copy')->nullable();
            $table->boolean('comply_regulation')->nullable();
            $table->string('space');
            $table->boolean('electricity');
            $table->string('electricity_power')->nullable();
            $table->boolean('own_tent_table');
            $table->boolean('sponsore_opportunity');
            $table->text('special_request')->nullable();
            $table->boolean('agreement');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vendor_applications');
    }
};
