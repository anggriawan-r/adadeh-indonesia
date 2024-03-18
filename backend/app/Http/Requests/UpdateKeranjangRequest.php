<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateKeranjangRequest extends FormRequest
{
    protected $stopOnFirstFailure = true;
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'jumlah' => ['bail', 'nullable', 'integer', 'min:0'],
            'produkId' => ['bail', 'nullable', 'integer', 'min:0'],
            'userId' => ['bail', 'nullable', 'integer', 'min:0']
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'jumlah' => $this->input('jumlah') ?? null,
            'produkId' => $this->input('produkId') ?? null,
            'userId' => $this->input('userId') ?? null
        ]);
    }
}
