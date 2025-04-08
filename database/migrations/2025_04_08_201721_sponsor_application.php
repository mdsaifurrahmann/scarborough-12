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
        Schema::create('sponsor_applications', function (Blueprint $table) {
            $table->id();
            $table->string('org_name');
            $table->string('contact_person');
            $table->string('position');
            $table->string('phone');
            $table->string('email');
            $table->text('company_addr');
            $table->text('web_media')->nullable();
            $table->string('sponsor_level');
            $table->text('special_benefits')->nullable();
            $table->text('why_interested');
            $table->text('any_goal')->nullable();
            $table->boolean('agreement_1');
            $table->boolean('agreement_2');
            $table->boolean('agreement_3');
            $table->string('signature');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sponsor_applications');
    }
};
