import { useForm } from '@inertiajs/react';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useRef, useState } from 'react';

import InputError from '@/components/input-error';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';

interface SponsorFormProps {
    success?: string;
    error?: string;
}

interface SponsorFormData {
    [key: string]: string | null | boolean | undefined | number;
    org_name: string;
    contact_person: string;
    position: string;
    phone: string;
    email: string;
    company_addr: string;
    web_media?: string; // Optional URL

    sponsor_level: string;

    special_benefits?: string;
    why_interested: string;
    any_goal?: string;

    // Agreement
    agreement_1: boolean;
    agreement_2: boolean;
    agreement_3: boolean;
    signature: string;
    'cf-turnstile-response': string;
}

const SponsorForm = ({ success, error }: SponsorFormProps) => {
    const [currentStep, setCurrentStep] = useState(1);

    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

    const turnstileRef = useRef<TurnstileInstance | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm<SponsorFormData>({
        org_name: '',
        contact_person: '',
        position: '',
        phone: '',
        email: '',
        company_addr: '',
        web_media: '', // Optional URL

        sponsor_level: '',

        special_benefits: '',
        why_interested: '',
        any_goal: '',

        agreement_1: false,
        agreement_2: false,
        agreement_3: false,
        signature: '',
        'cf-turnstile-response': '',
    });

    const steps = [
        // Step 1: Business Information
        <>
            <div className="flex flex-col">
                <label htmlFor="business_name">
                    Company/Organization Name <span className="text-red-500">*</span>{' '}
                </label>
                <input
                    type="text"
                    name="org_name"
                    id="business_name"
                    className="bg-darkwhite focus:outline-primary font-ysabeau mb-3 rounded-sm px-4 py-2"
                    value={data.org_name}
                    onChange={(e) => setData('org_name', e.target.value)}
                    placeholder="Company/Organization Name"
                />
                <InputError className="mb-3" message={errors.org_name} />

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

                <label htmlFor="position">
                    Position <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="position"
                    id="position"
                    className="bg-darkwhite focus:outline-primary font-ysabeau mb-3 rounded-sm px-4 py-2"
                    value={data.position}
                    onChange={(e) => setData('position', e.target.value)}
                    placeholder="Title/Position"
                />
                <InputError className="mb-3" message={errors.position} />

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

                <label htmlFor="company_addr">
                    Company Address <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="company_addr"
                    id="company_addr"
                    className="bg-darkwhite focus:outline-primary font-ysabeau mb-3 rounded-sm px-4 py-2"
                    value={data.company_addr}
                    onChange={(e) => setData('company_addr', e.target.value)}
                    placeholder="Company Address"
                />
                <InputError className="mb-3" message={errors.company_addr} />

                <label htmlFor="web_media">Website/Social Media Links</label>
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
            </div>
        </>,

        // Step 2: Products & Services
        <>
            <div className="flex flex-col">
                <label>
                    Sponsor Level
                    <span className="text-red-500"> * (To learn More About Sponsorship Levels, check the link https://chatgpt.com/)</span>
                </label>
                <RadioGroup className="mt-2 ml-3" value={data.sponsor_level} onValueChange={(value) => setData('sponsor_level', value)}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Platinum" id="Platinum" />
                        <label htmlFor="Platinum">Platinum</label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Gold" id="Gold" />
                        <label htmlFor="Gold">Gold</label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Silver" id="Silver" />
                        <label htmlFor="Silver">Silver</label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Bronze" id="Bronze" />
                        <label htmlFor="Bronze">Bronze</label>
                    </div>
                </RadioGroup>
                <InputError className="mb-3" message={errors.sponsor_level} />
            </div>
        </>,

        // Step 3: Legal Requirements
        <>
            <div className="flex flex-col">
                <label htmlFor="special_benefits">Do you have specific benefits or promotional opportunities you’d like to discuss?</label>
                <textarea
                    name="special_benefits"
                    id="special_benefits"
                    className="bg-darkwhite focus:outline-primary font-ysabeau mb-3 rounded-sm px-4 py-2"
                    value={data.special_benefits}
                    onChange={(e) => setData('special_benefits', e.target.value)}
                    placeholder="Special Benefits?"
                />
                <InputError className="mb-3" message={errors.special_benefits} />

                <label htmlFor="why_interested">
                    Why are you interested in sponsoring the Scarborough Folk Fest? <span className="text-red-500"> * </span>
                </label>
                <textarea
                    name="why_interested"
                    id="why_interested"
                    className="bg-darkwhite focus:outline-primary font-ysabeau mb-3 rounded-sm px-4 py-2"
                    value={data.why_interested}
                    onChange={(e) => setData('why_interested', e.target.value)}
                    placeholder="Why are you interested in sponsoring the Scarborough Folk Fest?"
                />
                <InputError className="mb-3" message={errors.why_interested} />

                <label htmlFor="any_goal" className="mt-3">
                    Any specific goals or initiatives you’d like us to highlight during the event?
                </label>
                <textarea
                    name="any_goal"
                    id="any_goal"
                    className="bg-darkwhite focus:outline-primary font-ysabeau mb-3 rounded-sm px-4 py-2"
                    value={data.any_goal}
                    onChange={(e) => setData('any_goal', e.target.value)}
                    placeholder="Any Goals?"
                />
                <InputError className="mb-3" message={errors.any_goal} />
            </div>
        </>,

        <>
            <div className="flex flex-col">
                <div className="items-top mt-4 flex space-x-2">
                    <Checkbox
                        name="agreement_1"
                        id="agreement_1"
                        className="mt-2 mb-3"
                        checked={data.agreement_1}
                        onCheckedChange={(checked) => setData('agreement_1', checked as boolean)}
                    />

                    <div className="grid gap-1.5 leading-none">
                        <label htmlFor="agreement_1" className="font-ysabeau text-lg peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            I understand that submitting this application does not guarantee sponsorship approval.
                        </label>
                    </div>
                </div>

                <div className="items-top mt-4 flex space-x-2">
                    <Checkbox
                        name="agreement_2"
                        id="agreement_2"
                        className="mt-2 mb-3"
                        checked={data.agreement_2}
                        onCheckedChange={(checked) => setData('agreement_2', checked as boolean)}
                    />

                    <div className="grid gap-1.5 leading-none">
                        <label htmlFor="agreement_2" className="font-ysabeau text-lg peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            If accepted, I agree to fulfill the sponsorship requirements and provide all necessary materials on time.
                        </label>
                    </div>
                </div>

                <div className="items-top mt-4 flex space-x-2">
                    <Checkbox
                        name="agreement_3"
                        id="agreement_3"
                        className="mt-2 mb-3"
                        checked={data.agreement_3}
                        onCheckedChange={(checked) => setData('agreement_3', checked as boolean)}
                    />

                    <div className="grid gap-1.5 leading-none">
                        <label htmlFor="agreement_3" className="font-ysabeau text-lg peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            I release Scarborough Folk Fest and its organizers from any liability related to my sponsorship
                        </label>
                    </div>
                </div>

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

        // console.log(data);

        post(route('sponsor-application.store'), {
            preserveScroll: true,
            // forceFormData: true,

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
                <h2 className="min-w-fit text-2xl">Sponsor Application Form | SFF2025</h2>
                <div className="border-primary my-4 rounded-lg border p-4 shadow-lg">
                    <h3 className="font-ysabeau text-xl">
                        We are excited to invite you to be a sponsor of the Scarborough Folk Fest 2025, hosted by Parampara Canada. As a festival
                        dedicated to fostering cultural exchange and celebrating diversity, the Scarborough Folk Fest offers a unique platform for
                        vendor to engage with a vibrant, multicultural community.
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

export default SponsorForm;
