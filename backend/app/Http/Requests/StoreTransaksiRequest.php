<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTransaksiRequest extends FormRequest
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
            'userId' => ['bail', 'required', 'integer', 'min:0'],
            'detailTransaksi' => ['bail', 'required']
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'userId' => auth()->user()->id,
            'detailTransaksi' => json_decode($this->input('detailTransaksi')) ?? null,
        ]);
    }
}
