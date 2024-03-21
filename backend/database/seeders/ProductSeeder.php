<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class ProductSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $csvFilePath = Storage::path('/public/products.csv');

    if (($handle = fopen($csvFilePath, 'r')) !== false) {
      $headers = fgetcsv($handle, 0, ';');

      $data = [];

      while (($row = fgetcsv($handle, 0, ';')) !== false) {
        $data[] = array_combine($headers, $row);
      }

      fclose($handle);
    }

    foreach ($data as $dat) {
      Product::create([
        'name' => $dat['name'],
        'price' => (int)$dat['price'],
        'stock' => (int)$dat['stock'],
        'description' => mb_convert_encoding($dat['description'], 'utf8'),
        'category_id' => (int)$dat['category_id'],
        'image' => $dat['image']
      ]);
    }
  }
}
