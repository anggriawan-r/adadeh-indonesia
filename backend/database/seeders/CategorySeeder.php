<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {

    $categories = [
      'Lifestyle',
      'Running',
      'Outdoor',
      'Basket',
      'Slides',
      'Tennis',
      'Sepak Bola',
      'Training',
    ];

    foreach ($categories as $cat) {
      Category::create([
        'name' => $cat
      ]);
    }
  }
}
