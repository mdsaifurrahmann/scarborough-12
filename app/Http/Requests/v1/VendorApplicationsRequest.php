<?php

namespace App\Http\Requests\v1;

use App\Models\v1\VendorModel;
use App\Services\FileUpload;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Http;

class VendorApplicationsRequest extends FormRequest
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
            'business_name' => ['string', 'required'],
            'contact_person' => ['string', 'required'],
            'phone_number' => ['string', 'required'],
            'email' => ['email', 'required'],
            'business_address' => ['string', 'required'],
            'web_media' => ['url', 'nullable'],
            'vendor_type' => ['string', 'required'],
            'vendor_other' => [
                'nullable',
                'string',
                'required_if:vendor_type,Other',
                'exclude_unless:vendor_type,Other',
            ],
            'product_services_desc' => ['string', 'required'],
            'min_price' => ['required', 'regex:/^\d+(\.\d{1,2})?$/'],
            'max_price' => ['required', 'regex:/^\d+(\.\d{1,2})?$/'],
            'liability_insurance' => ['required', 'boolean', 'in:0,1,true,false'],
            'vendor_permit' => ['nullable', 'boolean', 'in:0,1,true,false'],
            'vendor_permit_copy' => [
                'nullable',
                'file',
                'mimes:pdf,jpg,jpeg,png,doc,docx',
                'max:9216',
                'required_if:vendor_permit,true',
                'exclude_unless:vendor_permit,true',
            ],
            'comply_regulation' => ['nullable', 'boolean', 'in:0,1,true,false'],
            'space' => ['string', 'required'],
            'electricity' => ['required', 'boolean', 'in:0,1,true,false'],
            'electricity_power' => [
                'nullable',
                'string',
                'required_if:electricity,true',
                'exclude_unless:electricity,true',
            ],
            'own_tent_table' => ['required', 'boolean', 'in:0,1,true,false'],
            'sponsore_opportunity' => ['required', 'boolean', 'in:0,1,true,false'],
            'special_request' => ['string', 'nullable'],
            'agreement' => ['required', 'boolean', 'in:0,1,true,false'],
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
            // General required fields
            // '*.required' => 'The :attribute field is required.',
            // '*.required_if' => 'The :attribute field is required when :other is :value.',

            // Business Information
            'business_name.required' => 'Please provide your business name.',
            'business_name.string' => 'Business name must be text.',

            'contact_person.required' => 'Please provide a contact person.',
            'contact_person.string' => 'Contact person must be text.',

            'phone_number.required' => 'A phone number is required for contact.',
            'phone_number.string' => 'Phone number must be valid.',

            'email.required' => 'An email address is required.',
            'email.email' => 'Please provide a valid email address.',

            'business_address.required' => 'A business address is required.',
            'business_address.string' => 'Address must be text.',

            'web_media.url' => 'Please provide a valid website or social media URL.',

            // Vendor Type
            'vendor_type.required' => 'Please select a vendor type.',
            'vendor_type.string' => 'Vendor type must be text.',

            'vendor_other.required_if' => 'Please specify vendor type details when selecting "other".',
            'vendor_other.string' => 'Vendor details must be text.',

            // Products/Services
            'product_services_desc.required' => 'Please describe your products/services.',
            'product_services_desc.string' => 'Description must be text.',

            // Pricing
            'min_price.required' => 'Minimum price is required.',
            'min_price.regex' => 'The minimum price must be a valid number with up to 2 decimal places or a whole number.',

            'max_price.required' => 'Maximum price is required.',
            'max_price.regex' => 'The maximum price must be a valid number with up to 2 decimal places or a whole number.',

            // Legal Requirements
            'liability_insurance.required' => 'Please specify if you have liability insurance.',

            'vendor_permit.required' => 'Please specify if you have a vendor permit.',

            'vendor_permit_copy.required_if' => 'Vendor permit copy is required when permit is claimed.',
            'vendor_permit_copy.file' => 'Vendor permit must be a file upload.',
            'vendor_permit_copy.mimes' => 'Permit must be PDF, JPG, PNG, DOC, or DOCX format.',
            'vendor_permit_copy.max' => 'Permit file cannot exceed 5MB in size.',

            'comply_regulation.required' => 'Please confirm compliance with regulations.',

            // Event Requirements
            'space.required' => 'Please specify your space requirements.',
            'space.string' => 'Space requirements must be text.',

            'electricity.required' => 'Please specify if you need electricity.',

            'electricity_power.required_if' => 'Please specify your power requirements when electricity is needed.',
            'electricity_power.string' => 'Power requirements must be text.',

            'own_tent_table.required' => 'Please specify if you have your own tent/table.',

            // Sponsorship
            'sponsore_opportunity.required' => 'Please specify interest in sponsorship opportunities.',

            // Special Requests
            'special_request.string' => 'Special requests must be text.',

            // Agreement
            'agreement.required' => 'You must agree to the terms and conditions.',
            'agreement.in' => 'You must explicitly agree to the terms.',
            'cf-turnstile-response.required' => 'Please complete the Turnstile verification.',
        ];
    }

    /**
     * Process and store the validated vendor application
     */
    public function storeApplication()
    {
        $validated = $this->validated();

        // Create without the file field
        $store = VendorModel::create(
            collect($validated)->except('vendor_permit_copy')->toArray()
        );

        if ($store && $store->id) {
            // Handle file upload
            $fileName = $this->handleFileUpload();

            // Update the record
            $store->update(['vendor_permit_copy' => $fileName]);
        }
    }

    /**
     * Handle the permit file upload
     */
    protected function handleFileUpload(): ?string
    {
        if (! $this->validated('vendor_permit')) {
            return null;
        }

        return FileUpload::upload(
            key: 'vendor_permit_copy',
            path: 'vendor-permits'
        );
    }

    /**
     * Clean up conditional fields
     */
    protected function cleanConditionalFields(array $data): array
    {
        return [
            ...$data,
            'vendor_other' => $data['vendor_type'] === 'other' ? $data['vendor_other'] : null,
            'electricity_power' => $data['electricity'] ? $data['electricity_power'] : null,
            'vendor_permit_copy' => $data['vendor_permit'] ? $data['vendor_permit_copy'] : null,
        ];
    }
}
