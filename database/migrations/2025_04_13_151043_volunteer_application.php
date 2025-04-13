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
        Schema::create('volunteer_applications', function (Blueprint $table) {

            $table->id();

            $table->string('full_name');
            $table->date('dob');
            $table->string('email');
            $table->string('phone');
            $table->string('address');

            $table->string('em_full_name');
            $table->string('em_relationship')->nullable();
            $table->string('em_phone');

            $table->json('available_days');
            $table->json('volunteering_area');
            $table->string('volunteering_area_other')->nullable();

            $table->text('relevant_experience')->nullable();

            $table->text('special_requirements');
            $table->string('tshirt_size');
            $table->string('signature');

            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('volunteer_applications');
    }
};
