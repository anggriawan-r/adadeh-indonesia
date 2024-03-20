<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMetodePembayaranRequest extends FormRequest
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
            'nama' => ['bail', 'nullable', 'string'],
            'deskripsi' => ['bail', 'nullable', 'string']
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'nama' => strtolower($this->input('nama')) ?? null,
            'deskripsi' => strtolower($this->input('deskripsi')) ?? null,
        ]);
    }
}
