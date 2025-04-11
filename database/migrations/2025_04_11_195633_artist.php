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
        Schema::create('artists_application', function (Blueprint $table) {
            
            $table->id();
            
            $table->string('artist_name');
            $table->string('contact_person')->nullable();
            $table->string('phone');
            $table->string('email');
            $table->text('web_media')->nullable();
            $table->string('city');
            $table->string('province');

            $table->string('genre_performance');
            $table->integer('no_performers');
            $table->string('duration');
            $table->string('technical_requirements');
            $table->boolean('sound_check')->nullable();

            $table->text('artist_bio')->nullable();
            $table->text('prev_performances')->nullable();
            $table->string('perf_link_1')->nullable();
            $table->string('perf_link_2')->nullable();
            $table->string('perf_link_3')->nullable();

            $table->boolean('media_interview');
            
            $table->string('signature');
            
            $table->timestamps();   


        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('artists_application');
    }
};
