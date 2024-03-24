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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->string("order_id");
            $table->string("payment_type")->nullable();
            $table->unsignedBigInteger('user_id');
            $table->unsignedInteger('jumlah');
            $table->string('status')->default('pending');
            $table->string('snap_token')->nullable();
            $table->string('payment_url')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
