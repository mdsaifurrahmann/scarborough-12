<?php

namespace App\Http\Requests\v1;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Mail;
use Mews\Purifier\Facades\Purifier;
use Illuminate\Support\Facades\Http;

class ContactFormRequest extends FormRequest
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
            'name' => ['required', 'string', 'min:3'],
            'email' => ['required', 'email'],
            'phone' => ['required', 'string', 'min:4'],
            'message' => ['required', 'string', 'max:150'],
            'cf-turnstile-response' => [
                'required',
                function ($attribute, $value, $fail) {
                    $response = Http::asForm()->post('https://challenges.cloudflare.com/turnstile/v0/siteverify', [
                        'secret' => env('VITE_TURNSTILE_SECRET_KEY'),
                        'response' => $value,
                        'remoteip' => $this->ip(), // Optional
                    ]);

                    $result = $response->json();

                    if (!$result['success']) {
                        $fail('Turnstile verification failed: ' . implode(', ', $result['error-codes'] ?? ['Unknown error']));
                    }
                },
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Please provide your name.',
            'name.string' => 'Name must be text.',
            'name.min' => 'Name must be at least 3 characters.',
            'email.required' => 'Please provide an email address.',
            'email.email' => 'Please provide a valid email address.',
            'phone.required' => 'Please provide a phone number.',
            'phone.string' => 'Phone number must be text.',
            'phone.min' => 'Phone number must be at least 4 characters.',
            'message.required' => 'Please provide a message.',
            'message.string' => 'Message must be text.',
            'message.max' => 'Message must be less than 150 characters.',
            'cf-turnstile-response.required' => 'Please complete the Turnstile verification.',
        ];
    }





    public function sendEmail(): void
    {

        $data = $this->validated();

        $data['name'] = Purifier::clean($data['name']);
        $data['email'] = Purifier::clean($data['email']);
        $data['phone'] = Purifier::clean($data['phone']);
        $data['message'] = Purifier::clean($data['message']);

        Mail::send('emails.contact', ['data' => $data], function ($message) use ($data) {
            $message->to(env('CONTACT_EMAIL'))
                ->subject('Contact Request from ' . $data['name']);
        });
    }
}
