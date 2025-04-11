<?php

namespace App\Http\Requests\v1;

use Illuminate\Foundation\Http\FormRequest;
use Mews\Purifier\Facades\Purifier;
use App\Models\v1\ArtistModel;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;


class ArtistRequest extends FormRequest
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
            'artist_name' => [
                'required',
                'string',
            ],
            'contact_person' => [
                'nullable',
                'string',
            ],
            'phone' => [
                'required',
                'string',
            ],
            'email' => [
                'required',
                'email',
            ],
            'web_media' => [
                'nullable',
                'url',
            ],
            'city' => [
                'required',
                'string',
            ],
            'province' => [
                'required',
                'string',
            ],
            'genre_performance' => [
                'required',
                'string',
            ],
            'no_performers' => [
                'required',
                'integer',
            ],
            'duration' => [
                'required',
                'string',
            ],
            'technical_requirements' => [
                'required',
                'string',
            ],
            'sound_check' => [
                'nullable',
                'boolean',
                'in:0,1,true,false'
            ],
            'artist_bio' => [
                'nullable',
                'string',
            ],
            'prev_performances' => [
                'nullable',
                'string',
            ],
            'perf_link_1' => [
                'nullable',
                'url',
            ],
            'perf_link_2' => [
                'nullable',
                'url',
            ],
            'perf_link_3' => [
                'nullable',
                'url',
            ],
            'media_interview' => [
                'required',
                'boolean',
                'in:0,1,true,false'
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
                        $fail('Turnstile verification failed: ' . implode(', ', $result['error-codes'] ?? ['Unknown error']));
                    }
                },
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'artist_name.required' => 'Artist name is required.',
            'artist_name.string' => 'Artist name must be a string.',

            'contact_person.string' => 'Contact person must be a string.',

            'phone.required' => 'Phone number is required.',
            'phone.string' => 'Phone number must be a string.',

            'email.required' => 'Email address is required.',
            'email.email' => 'Email must be a valid email address.',

            'web_media.url' => 'Web or media link must be a valid URL.',

            'city.required' => 'City is required.',
            'city.string' => 'City must be a string.',

            'province.required' => 'Province is required.',
            'province.string' => 'Province must be a string.',

            'genre_performance.required' => 'Genre of performance is required.',
            'genre_performance.string' => 'Genre must be a string.',

            'no_performers.required' => 'Number of performers is required.',
            'no_performers.integer' => 'Number of performers must be an integer.',

            'duration.required' => 'Performance duration is required.',
            'duration.string' => 'Duration must be a string.',

            'technical_requirements.required' => 'Technical requirements are required.',
            'technical_requirements.string' => 'Technical requirements must be a string.',

            'sound_check.boolean' => 'Sound check must be true or false.',

            'artist_bio.string' => 'Artist bio must be a string.',

            'prev_performances.string' => 'Previous performances must be a string.',

            'perf_link_1.url' => 'Performance link 1 must be a valid URL.',
            'perf_link_2.url' => 'Performance link 2 must be a valid URL.',
            'perf_link_3.url' => 'Performance link 3 must be a valid URL.',

            'media_interview.required' => 'Please specify if you are available for a media interview.',
            'media_interview.boolean' => 'Media interview must be true or false.',

            'media_interview.in' => 'Media interview must be in true or false.',

            'media_interview.boolean' => 'Media interview must be true or false.',

            'signature.required' => 'Signature is required.',
            'signature.string' => 'Signature must be a string.',

            'cf-turnstile-response.required' => 'Please verify that you are not a robot.',
        ];
    }


    public function storeApplication()
    {
        $validatedData = $this->validated();

        // Sanitize all string inputs
        $sanitized = array_map(function ($value) {
            return Purifier::clean($value);
        }, $validatedData);

        // dd($sanitized);

        try {
            DB::beginTransaction();
            $store = ArtistModel::create($sanitized);
            DB::commit();
        } catch (\Exception $e) {
            Log::error('Error creating artist application from Request ' . $e->getMessage());
            DB::rollBack();
        }
    }
}
