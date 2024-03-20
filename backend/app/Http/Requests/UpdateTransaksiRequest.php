<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTransaksiRequest extends FormRequest
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
            'totalHarga' => ['bail', 'nullable', 'integer', 'min:0'],
            'status' => ['bail', 'nullable', 'string', Rule::in(['paid', 'unpaid'])],
            'userId' => ['bail', 'nullable', 'integer', 'min:0'],
            'metodePembayaranId' => ['bail', 'nullable', 'integer', 'min:0'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'totalHarga' => $this->input('totalHarga') ?? null,
            'status' => strtolower($this->input('status')) ?? null,
            'userId' => $this->input('userId') ?? null,
            'metodePembayaranId' => $this->input('metodePembayaranId') ?? null,
        ]);
    }
}
