<?php

namespace App\Http\Requests\v1;

use App\Models\v1\VolunteerModel;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Mews\Purifier\Facades\Purifier;

class VolunteerRequest extends FormRequest
{
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
            'full_name' => [
                'required',
                'string',
            ],
            'dob' => [
                'required',
                'date',
            ],
            'email' => [
                'required',
                'email',
            ],
            'phone' => [
                'required',
                'string',
            ],
            'address' => [
                'required',
                'string',
            ],
            'em_full_name' => [
                'required',
                'string',
            ],
            'em_relationship' => [
                'nullable',
                'string',
            ],
            'em_phone' => [
                'required',
                'string',
            ],
            'available_days' => [
                'required',
                'array',
            ],
            'volunteering_area' => [
                'required',
                'array',
            ],
            'volunteering_area_other' => [
                'nullable',
                'string',
            ],
            'relevant_experience' => [
                'nullable',
                'string',
            ],
            'special_requirements' => [
                'required',
                'string',
            ],
            'tshirt_size' => [
                'required',
                'string',
            ],
            'signature' => [
                'required',
                'string',
            ],
            'cf-turnstile-response' => [
                'required',
                function ($attribute, $value, $fail) {
                    $response = Http::asForm()->post('https://challenges.cloudflare.com/turnstile/v0/siteverify', [
                        'secret' => env('VITE_TURNSTILE_SECRET_KEY'),
                        'response' => $value,
                        'remoteip' => $this->ip(), // Optional
                    ]);

                    $result = $response->json();

                    if (! $result['success']) {
                        $fail('Turnstile verification failed: '.implode(', ', $result['error-codes'] ?? ['Unknown error']));
                    }
                },
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'full_name.required' => 'Full name is required.',
            'full_name.string' => 'Full name must be a valid string.',

            'dob.required' => 'Date of birth is required.',
            'dob.date' => 'Date of birth must be a valid date.',

            'email.required' => 'Email address is required.',
            'email.email' => 'Please enter a valid email address.',

            'phone.required' => 'Phone number is required.',
            'phone.string' => 'Phone number must be a valid string.',

            'address.required' => 'Address is required.',
            'address.string' => 'Address must be a valid string.',

            'em_full_name.required' => 'Emergency contact name is required.',
            'em_full_name.string' => 'Emergency contact name must be a valid string.',

            'em_relationship.string' => 'Relationship must be a valid string.',

            'em_phone.required' => 'Emergency contact phone number is required.',
            'em_phone.string' => 'Emergency contact phone must be a valid string.',

            'available_days.required' => 'Please select at least one available day.',
            'available_days.array' => 'Available days must be provided in list format.',

            'volunteering_area.required' => 'Please select at least one volunteering area.',
            'volunteering_area.array' => 'Volunteering area must be provided in list format.',

            'volunteering_area_other.string' => 'Other volunteering area must be a valid string.',

            'relevant_experience.string' => 'Relevant experience must be a valid string.',

            'special_requirements.required' => 'Please specify any special requirements or write "None".',
            'special_requirements.string' => 'Special requirements must be a valid string.',

            'tshirt_size.required' => 'T-shirt size is required.',
            'tshirt_size.string' => 'T-shirt size must be a valid string.',

            'signature.required' => 'Signature is required.',
            'signature.string' => 'Signature must be a valid string.',

            'cf-turnstile-response' => 'Turnstile verification failed.',
        ];
    }

    public function storeApplication()
    {

        $validated = $this->validated();

        $sanitized = array_map(function ($value) {
            return Purifier::clean($value);
        }, $validated);

        try {
            DB::beginTransaction();

            $store = VolunteerModel::create($sanitized);

            DB::commit();
        } catch (\Exception $e) {
            Log::error('Error creating Volunteer application from Request '.$e->getMessage());
            DB::rollBack();
        }
    }
}
