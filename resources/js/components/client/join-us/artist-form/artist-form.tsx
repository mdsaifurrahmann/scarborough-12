import { useForm } from '@inertiajs/react';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useRef, useState } from 'react';

import InputError from '@/components/input-error';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';

interface ArtistFormProps {
    success?: string;
    error?: string;
}

interface ArtistFormData {
    [key: string]: string | null | boolean | undefined | number;
    artist_name: string;
    contact_person?: string;
    phone: string;
    email: string;
    web_media?: string;

    city: string;
    province: string;
    genre_performance: string;
    no_performers: number;
    duration: string;
    technical_requirements: string;

    sound_check: boolean | undefined;
    artist_bio?: string;
    prev_performances?: string;
    perf_link_1: string;
    perf_link_2: string;
    perf_link_3: string;

    media_interview: boolean | undefined;
    signature: string;
    'cf-turnstile-response': string;
}

const ArtistForm = ({ success, error }: ArtistFormProps) => {
    const [currentStep, setCurrentStep] = useState(1);

    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

    const turnstileRef = useRef<TurnstileInstance | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm<ArtistFormData>({
        artist_name: '',
        contact_person: '',
        phone: '',
        email: '',
        web_media: '',

        city: '',
        province: '',
        genre_performance: '',
        no_performers: 0,
        duration: '',
        technical_requirements: '',

        sound_check: undefined,
        artist_bio: '',
        prev_performances: '',
        perf_link_1: '',
        perf_link_2: '',
        perf_link_3: '',

        media_interview: undefined,
        signature: '',
        'cf-turnstile-response': '',
    });

    const steps = [

        <>
            <div className="flex flex-col">
                <label htmlFor="artist_name">
                    Artist/Group Name <span className="text-red-500">*</span>{' '}
                </label>
                <input
                    type="text"
                    name="artist_name"
                    id="artist_name"
                    className="bg-darkwhite focus:outline-primary font-ysabeau mb-3 rounded-sm px-4 py-2"
                    value={data.artist_name}
                    onChange={(e) => setData('artist_name', e.target.value)}
                    placeholder="Artist/Group Name"
                />
                <InputError className="mb-3" message={errors.artist_name} />

                <label htmlFor="contact_person">
                    Contact Person <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="contact_person"
                    id="contact_person"
                    className="bg-darkwhite focus:outline-primary font-ysabeau mb-3 rounded-sm px-4 py-2"
                    value={data.contact_person}
                    onChange={(e) => setData('contact_person', e.target.value)}
                    placeholder="Contact Person"
                />
                <InputError className="mb-3" message={errors.contact_person} />




                <label htmlFor="phone">
                    Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="phone"
                    id="phone"
                    className="bg-darkwhite focus:outline-primary font-ysabeau mb-3 rounded-sm px-4 py-2"
                    value={data.phone}
                    onChange={(e) => setData('phone', e.target.value)}
                    placeholder="Phone Number"
                />
                <InputError className="mb-3" message={errors.phone} />

                <label htmlFor="email">
                    Email <span className="text-red-500">*</span>
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-darkwhite focus:outline-primary font-ysabeau mb-3 rounded-sm px-4 py-2"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    placeholder="Email"
                />
                <InputError className="mb-3" message={errors.email} />



                <label htmlFor="web_media">Website/Social Media Links (If applicable)</label>
                <input
                    type="text"
                    name="web_media"
                    id="web_media"
                    className="bg-darkwhite focus:outline-primary font-ysabeau mb-3 rounded-sm px-4 py-2"
                    value={data.web_media}
                    onChange={(e) => setData('web_media', e.target.value)}
                    placeholder="https://example.com"
                />
                <InputError className="mb-3" message={errors.web_media} />

                <label htmlFor="city">
                    City <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="city"
                    id="city"
                    className="bg-darkwhite focus:outline-primary font-ysabeau mb-3 rounded-sm px-4 py-2"
                    value={data.city}
                    onChange={(e) => setData('city', e.target.value)}
                    placeholder="City"
                />
                <InputError className="mb-3" message={errors.city} />


                <label htmlFor="province">
                    Province <span className="text-red-500">*</span>
                </label>

                <select name="province" id="province" className='bg-darkwhite focus:outline-primary font-ysabeau mb-3 rounded-sm px-4 py-2' value={data.province} onChange={e => setData('province', e.target.value)}>
                    <option value="">Select Province</option>
                    <option value="Alberta">Alberta</option>
                    <option value="British Columbia">British Columbia</option>
                    <option value="Manitoba">Manitoba</option>
                    <option value="New Brunswick">New Brunswick</option>
                    <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
                    <option value="Nova Scotia">Nova Scotia</option>
                    <option value="Ontario">Ontario</option>
                    <option value="Prince Edward Island">Prince Edward Island</option>
                    <option value="Quebec">Quebec</option>
                    <option value="Saskatchewan">Saskatchewan</option>
                </select>

                <InputError className="mb-3" message={errors.province} />


            </div>
        </>,

        // Step 2: Products & Services
        <>
            <div className="flex flex-col">
                <label htmlFor="genre_performance">
                    Genre/Style of Music or Performance
                    <span className="text-red-500"> * </span>
                </label>
                <input type="text" className="bg-darkwhite focus:outline-primary font-ysabeau mb-3 rounded-sm px-4 py-2" value={data.genre_performance} onChange={(e) => setData('genre_performance', e.target.value)} />
                <InputError className="mb-3" message={errors.genre_performance} />

                <label htmlFor="no_performers">
                    Number of Performers:
                    <span className="text-red-500"> * </span>
                </label>
                <input type="number" className="bg-darkwhite focus:outline-primary font-ysabeau mb-3 rounded-sm px-4 py-2" value={data.no_performers} onChange={(e) => setData('no_performers', parseInt(e.target.value))} />
                <InputError className="mb-3" message={errors.no_performers} />

                <label htmlFor="duration">
                    Duration of Performance (in minutes):
                    <span className="text-red-500"> * </span>
                </label>
                <input type="number" className="bg-darkwhite focus:outline-primary font-ysabeau mb-3 rounded-sm px-4 py-2" value={data.duration} onChange={(e) => setData('duration', e.target.value)} />
                <InputError className="mb-3" message={errors.duration} />

                <label htmlFor="technical_requirements">
                    Technical Requirements (e.g., sound, lighting, instruments):
                    <span className="text-red-500"> * </span>
                </label>
                <input type="text" className="bg-darkwhite focus:outline-primary font-ysabeau mb-3 rounded-sm px-4 py-2" value={data.technical_requirements} onChange={(e) => setData('technical_requirements', e.target.value)} />
                <InputError className="mb-3" message={errors.technical_requirements} />


                <label htmlFor="sound_check">
                    Do you require a soundcheck? (Applicable for Musicians or Bands)
                </label>

                <RadioGroup
                    className="mt-2 ml-3"
                    onValueChange={(value) => setData('sound_check', value === '1' ? true : value === '0' ? false : undefined)}
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1" id="1" />
                        <label htmlFor="1">Yes</label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="0" id="0" />
                        <label htmlFor="0">No</label>
                    </div>
                </RadioGroup>

                <InputError className="mb-3" message={errors.sound_check} />
            </div>
        </>,

        // Step 3: Legal Requirements
        <>
            <div className="flex flex-col">
                <label htmlFor="artist_bio">Artist/Group Bio (max 200 words):</label>
                <textarea
                    name="artist_bio"
                    id="artist_bio"
                    className="bg-darkwhite focus:outline-primary font-ysabeau mb-3 rounded-sm px-4 py-2"
                    value={data.artist_bio}
                    onChange={(e) => setData('artist_bio', e.target.value)}
                    placeholder="Artist Bio within 200 words..."
                />
                <InputError className="mb-3" message={errors.artist_bio} />

                <label htmlFor="prev_performances">
                    Previous Performance Experience (venues, festivals, etc.):
                </label>
                <textarea
                    name="prev_performances"
                    id="prev_performances"
                    className="bg-darkwhite focus:outline-primary font-ysabeau mb-3 rounded-sm px-4 py-2"
                    value={data.prev_performances}
                    onChange={(e) => setData('prev_performances', e.target.value)}
                    placeholder="Previous Performance Experience..."
                />
                <InputError className="mb-3" message={errors.prev_performances} />

                <h5>Links to previous performance</h5>
                <p>
                    Providing links to your portfolio or past performances allows us to better understand your style, experience, and unique contributions as an artist. Sharing your previous work helps showcase your talent and can significantly enhance your chances of being selected for Scarborough Folk Fest 2025.
                </p>


                <label htmlFor="perf_link_1">
                    Link 1:
                </label>
                <input
                    type="url"
                    name="perf_link_1"
                    id="perf_link_1"
                    className="bg-darkwhite focus:outline-primary font-ysabeau mb-3 rounded-sm px-4 py-2"
                    value={data.perf_link_1}
                    onChange={(e) => setData('perf_link_1', e.target.value)}
                    placeholder="URL"
                />
                <InputError className="mb-3" message={errors.perf_link_1} />

                <label htmlFor="perf_link_2">
                    Link 2:
                </label>
                <input
                    type="url"
                    name="perf_link_2"
                    id="perf_link_2"
                    className="bg-darkwhite focus:outline-primary font-ysabeau mb-3 rounded-sm px-4 py-2"
                    value={data.perf_link_2}
                    onChange={(e) => setData('perf_link_2', e.target.value)}
                    placeholder="URL"
                />
                <InputError className="mb-3" message={errors.perf_link_2} />


                <label htmlFor="perf_link_3">
                    Link 3:
                </label>
                <input
                    type="url"
                    name="perf_link_3"
                    id="perf_link_3"
                    className="bg-darkwhite focus:outline-primary font-ysabeau mb-3 rounded-sm px-4 py-2"
                    value={data.perf_link_3}
                    onChange={(e) => setData('perf_link_3', e.target.value)}
                    placeholder="URL"
                />
                <InputError className="mb-3" message={errors.perf_link_3} />
            </div>
        </>,

        <>
            <div className="flex flex-col">
                <label htmlFor="media_interview">
                    Are you interested in participating in media interviews or promotional campaigns?
                </label>

                <RadioGroup
                    className="mt-2 ml-3"
                    onValueChange={(value) => setData('media_interview', value === '1' ? true : value === '0' ? false : undefined)}
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1" id="m1" />
                        <label htmlFor="m1">Yes</label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="0" id="m0" />
                        <label htmlFor="m0">No</label>
                    </div>
                </RadioGroup>

                <InputError className="mb-3" message={errors.media_interview} />

                <label htmlFor="signature" className="mt-3">
                    Signature <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="signature"
                    id="signature"
                    className="bg-darkwhite focus:outline-primary font-ysabeau mb-3 rounded-sm px-4 py-2"
                    value={data.signature}
                    onChange={(e) => setData('signature', e.target.value)}
                    placeholder="Signature"
                />
                <InputError className="mb-3" message={errors.signature} />

                <Turnstile
                    ref={turnstileRef}
                    siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                    onSuccess={(token) => {
                        setData('cf-turnstile-response', token);
                        setTurnstileToken(token);
                    }}
                    onError={() => {
                        toast.error('Turnstile verification failed. Please try again.');
                        setTurnstileToken(null);
                    }}
                    className="my-4"
                />

                <InputError message={errors['cf-turnstile-response']} />
            </div>
        </>,
    ];

    const totalSteps = steps.length; // Adjust based on your step division

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep((prev) => prev + 1);
            window.scrollTo(0, 330);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1);
            window.scrollTo(0, 330);
        }
    };

    const submit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        console.log(data);

        post(route('artist-application.store'), {
            preserveScroll: true,
            forceFormData: true,

            onSuccess: (response) => {
                // console.log('success:', response);
                if (response.props.success) {
                    toast.success('Success', {
                        duration: 5000,
                        description: () => <p className="text-black">{response.props.success as string}</p>,
                        richColors: true,
                        style: {
                            background: '#fff',
                            color: '#000',
                            fontFamily: 'Aboreto',
                        },
                    });
                    reset();
                    setData('cf-turnstile-response', ''); // Clear the old token
                    if (turnstileRef.current) {
                        turnstileRef.current.reset(); // Reset Turnstile widget
                    }
                    setTurnstileToken(null); // Add this line
                    setCurrentStep(1);
                } else if (response.props.error) {
                    // console.log('else if error:', data);
                    toast.error('Error', {
                        duration: 5000,
                        description: () => <p className="text-red-500">{response.props.error as string}</p>,
                        richColors: true,
                        style: {
                            background: '#fff',
                            color: 'oklch(0.637 0.237 25.331)',
                            fontFamily: 'Aboreto',
                        },
                    });
                }
            },
            onError: (errors) => {
                // console.log('errors:', errors);
                Object.values(errors).forEach((msg) => {
                    toast.error(msg, {
                        duration: 5000,
                        richColors: true,
                        style: {
                            // background: '#fff',
                            // color: 'red',
                            fontFamily: 'Aboreto',
                        },
                    });
                });
            },
        });
    };

    return (
        <section className="my-4 overflow-hidden">
            <div className="container">
                <h2 className="min-w-fit text-2xl">Artist Application Form | SFF2025</h2>
                <div className="border-primary my-4 rounded-lg border p-4 shadow-lg">
                    <h3 className="font-ysabeau text-xl">
                        We are excited to invite you to be a artist of the Scarborough Folk Fest 2025, hosted by Parampara Canada. As a festival
                        dedicated to fostering cultural exchange and celebrating diversity, the Scarborough Folk Fest offers a unique platform for
                        artist to engage with a vibrant, multicultural community.
                    </h3>

                    <form onSubmit={submit}>
                        {/* Current Step Content */}
                        <div className="my-8">{steps[currentStep - 1]}</div>

                        {/* Navigation Buttons */}
                        <div className="flex gap-4">
                            {currentStep >= 1 && (
                                <button type="button" onClick={handleBack} className="bg-offwhite hover:bg-primary cursor-pointer rounded px-4 py-2">
                                    Go Back
                                </button>
                            )}

                            {currentStep < totalSteps ? (
                                <>
                                    {/* {currentStep} - {totalSteps} */}
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className="bg-primary hover:bg-primary-dark cursor-pointer rounded px-4 py-2"
                                    >
                                        Next
                                    </button>
                                </>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={!turnstileToken || processing}
                                    className={`bg-primary hover:bg-primary-dark cursor-pointer rounded px-4 py-2 ${processing || !turnstileToken ? 'cursor-not-allowed opacity-50' : ''}`}
                                >
                                    {/* {processing && <LoaderCircle className="h-4 w-4 animate-spin" />} */}
                                    {success ? (
                                        'Submitted'
                                    ) : error ? (
                                        'Try Again'
                                    ) : processing ? (
                                        <LoaderCircle className="h-4 w-4 animate-spin" />
                                    ) : (
                                        'Submit'
                                    )}
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ArtistForm;
