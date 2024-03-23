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
            'status' => ['bail', 'nullable', 'string', Rule::in(['pending', 'success', 'canceled'])],
            'userId' => ['bail', 'nullable', 'integer', 'min:0']
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'status' => strtolower($this->input('status')) ?? null,
            'userId' => auth()->user()->id
        ]);
    }
}
