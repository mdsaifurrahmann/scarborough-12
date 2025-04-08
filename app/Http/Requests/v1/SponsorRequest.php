<?php

namespace App\Http\Requests\v1;

use App\Models\v1\SponsorModel;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Mews\Purifier\Facades\Purifier;

class SponsorRequest extends FormRequest
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
            'org_name' => [
                'required',
                'string'
            ],
            'contact_person' => [
                'required',
                'string'
            ],
            'position' => [
                'required',
                'string'
            ],
            'phone' => [
                'required',
                'string'
            ],
            'email' => [
                'required',
                'email'
            ],
            'company_addr' => [
                'required',
                'string'
            ],
            'web_media' => [
                'nullable',
                'url'
            ],
            'sponsor_level' => [
                'required',
                'string',
                'in:Platinum,Gold,Silver,Bronze'
            ],
            'special_benefits' => [
                'nullable',
                'string'
            ],
            'why_interested' => [
                'required',
                'string'
            ],
            'any_goal' => [
                'nullable',
                'string'
            ],
            'agreement_1' => [
                'required',
                'accepted'
            ],
            'agreement_2' => [
                'required',
                'accepted'
            ],
            'agreement_3' => [
                'required',
                'accepted'
            ],
            'signature' => [
                'required',
                'string'
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
                        $fail('Turnstile verification failed: ' . implode(', ', $result['error-codes'] ?? ['Unknown error']));
                    }
                },
            ]
        ];
    }


    public function messages(): array
    {
        return [

            'org_name.required' => 'Please provide your organization name.',
            'org_name.string' => 'Organization name must be text.',

            'contact_person.required' => 'Please provide a contact person.',
            'contact_person.string' => 'Contact person must be text.',

            'position.required' => 'Please provide a position.',
            'position.string' => 'Position must be text.',

            'phone.required' => 'Please provide a phone number.',
            'phone.string' => 'Phone number must be valid.',

            'email.required' => 'Please provide an email address.',
            'email.email' => 'Please provide a valid email address.',

            'company_addr.required' => 'Please provide a company address.',
            'company_addr.string' => 'Company address must be text.',

            'web_media.url' => 'Please provide a valid website or social media URL.',

            'sponsor_level.required' => 'Please select a sponsor level.',
            'sponsor_level.string' => 'Sponsor level must be text.',
            'sponsor_level.in' => 'Please select a valid sponsorship level',

            'special_benefits.string' => 'Special benefits must be text.',

            'why_interested.required' => 'Please provide why you are interested in sponsoring.',
            'why_interested.string' => 'This field must be text.',

            'any_goal.string' => 'This field must be text.',

            'agreement_1.required' => 'You must agree to the first agreement',
            'agreement_2.required' => 'You must agree to the second agreement',
            'agreement_3.required' => 'You must agree to the third agreement',

            'signature.required' => 'Please provide your signature.',
            'signature.string' => 'Signature must be text.',

            'cf-turnstile-response.required' => 'Please verify that you are not a robot.',
        ];
    }

    /**
     * Process and store the validated vendor application
     */
    public function storeApplication()
    {
        $validated = $this->validated();

        // Sanitize all string inputs
        $sanitized = array_map(function ($value) {
            return Purifier::clean($value);
        }, $validated);

        try {
            DB::beginTransaction();
            $store = SponsorModel::create($sanitized);

            DB::commit();
        } catch (\Exception $e) {
            Log::error('Error creating sponsor application from Request ' . $e->getMessage());
            DB::rollBack();
        }
    }
}
