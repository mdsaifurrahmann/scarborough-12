import { useForm } from '@inertiajs/react';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useRef, useState } from 'react';

import InputError from '@/components/input-error';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';

interface VolunteerFormProps {
    success?: string;
    error?: string;
}

interface VolunteerFormData {
    [key: string]: string | null | boolean | undefined | number | string[];
    full_name: string;
    dob: string;
    email: string;
    phone: string;
    address: string;

    em_full_name: string;

    em_relationship?: string;
    em_phone: string;

    available_days: string[];

    volunteering_area: string[];

    volunteering_area_other: string;

    relevant_experience?: string;
    special_requirements: string;
    tshirt_size: string;

    signature: string;
    'cf-turnstile-response': string;
}

const VolunteerForm = ({ success, error }: VolunteerFormProps) => {
    const [currentStep, setCurrentStep] = useState(1);

    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

    const turnstileRef = useRef<TurnstileInstance | null>(null);

    const { data, setData, post, processing, errors, reset, setError, clearErrors } = useForm<VolunteerFormData>({
        full_name: '',
        dob: '',
        email: '',
        phone: '',
        address: '',

        em_full_name: '',

        em_relationship: '',
        em_phone: '',

        available_days: [],

        volunteering_area: [],

        volunteering_area_other: '',

        relevant_experience: '',
        special_requirements: '',
        tshirt_size: '',

        signature: '',
        'cf-turnstile-response': '',
    });

    const validateStep = (step: number): Record<string, string> => {
        const errors: Record<string, string> = {};
        switch (step) {
            case 1:
                if (!data.full_name.trim()) errors.full_name = 'Full Name is required';
                if (!data.dob) errors.dob = 'Date of Birth is required';
                if (!data.phone.trim()) errors.phone = 'Phone Number is required';
                if (!data.email.trim()) {
                    errors.email = 'Email is required';
                } else if (!/\S+@\S+\.\S+/.test(data.email)) {
                    errors.email = 'Invalid email format';
                }
                if (!data.address.trim()) errors.address = 'Address is required';
                break;
            case 2:
                if (!data.em_full_name.trim()) errors.em_full_name = 'Emergency Contact Name is required';
                if (!data.em_phone.trim()) errors.em_phone = 'Emergency Phone Number is required';
                break;
            case 3:
                if (data.available_days.length === 0) errors.available_days = 'Please select at least one available day';
                if (data.volunteering_area.length === 0) {
                    errors.volunteering_area = 'Please select at least one volunteering area';
                } else if (data.volunteering_area.includes('Other') && !data.volunteering_area_other.trim()) {
                    errors.volunteering_area_other = 'Please specify your volunteering area';
                }
                break;
            case 4:
                if (!data.special_requirements.trim()) errors.special_requirements = 'This field is required (enter "None" if applicable)';
                if (!data.tshirt_size) errors.tshirt_size = 'Please select a t-shirt size';
                if (!data.signature.trim()) errors.signature = 'Signature is required';
                if (!data['cf-turnstile-response']) errors['cf-turnstile-response'] = 'Please complete the CAPTCHA';
                break;
        }
        return errors;
    };

    const handleCheckboxChange = (field: 'available_days' | 'volunteering_area', value: string, checked: boolean) => {
        // For safety, ensure that the field is indeed an array
        const currentValues: string[] = data[field] || [];
        if (checked) {
            // Add the value if it's not already in the array
            if (!currentValues.includes(value)) {
                setData(field, [...currentValues, value]);
            }
        } else {
            // Filter the value out if unchecked
            setData(
                field,
                currentValues.filter((item) => item !== value),
            );
        }
    };

    const steps = [
        // Step 1: Business Information
        <>
            <div className="flex flex-col">
                <label htmlFor="full_name">
                    Full Name <span className="text-red-500">*</span>{' '}
                </label>
                <input
                    type="text"
                    name="full_name"
                    id="full_name"
                    className="bg-darkwhite focus:outline-primary font-ysabeau mb-3 rounded-sm px-4 py-2"
                    value={data.full_name}
                    onChange={(e) => setData('full_name', e.target.value)}
                    placeholder="Full Name"
                />
                <InputError className="mb-3" message={errors.full_name} />

                <label htmlFor="dob">
                    Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    name="dob"
                    id="dob"
                    className="bg-darkwhite focus:outline-primary font-ysabeau mb-3 rounded-sm px-4 py-2"
                    value={data.dob}
                    onChange={(e) => setData('dob', e.target.value)}
                />
                <InputError className="mb-3" message={errors.dob} />

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

                <label htmlFor="address">
                    Company Address <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="address"
                    id="address"
                    className="bg-darkwhite focus:outline-primary font-ysabeau mb-3 rounded-sm px-4 py-2"
                    value={data.address}
                    onChange={(e) => setData('address', e.target.value)}
                    placeholder="Your Address"
                />
                <InputError className="mb-3" message={errors.address} />
            </div>
        </>,

        // Step 2: Products & Services
        <>
            <h5>Emergency Contact</h5>
            <p className="font-ysabeau mb-3">
                Please provide the name and contact details of someone who can be reached in case of an emergency during the event. This information
                will be used only if necessary to ensure your safety.{' '}
            </p>

            <div className="flex flex-col">
                <label>
                    Full Name
                    <span className="text-red-500"> * </span>
                </label>

                <input
                    type="text"
                    name="em_full_name"
                    id="em_full_name"
                    className="bg-darkwhite focus:outline-primary font-ysabeau mb-3 rounded-sm px-4 py-2"
                    value={data.em_full_name}
                    onChange={(e) => setData('em_full_name', e.target.value)}
                    placeholder="Full name of emergency contact"
                />
                <InputError className="mb-3" message={errors.em_full_name} />

                <label>Relationship to you</label>

                <input
                    type="text"
                    name="em_relationship"
                    id="em_relationship"
                    className="bg-darkwhite focus:outline-primary font-ysabeau mb-3 rounded-sm px-4 py-2"
                    value={data.em_relationship}
                    onChange={(e) => setData('em_relationship', e.target.value)}
                    placeholder="Relationship to you"
                />
                <InputError className="mb-3" message={errors.em_relationship} />

                <label>
                    Phone Number
                    <span className="text-red-500"> * </span>
                </label>

                <input
                    type="text"
                    name="em_phone"
                    id="em_phone"
                    className="bg-darkwhite focus:outline-primary font-ysabeau mb-3 rounded-sm px-4 py-2"
                    value={data.em_phone}
                    onChange={(e) => setData('em_phone', e.target.value)}
                    placeholder="Phone Number of emergency contact"
                />
                <InputError className="mb-3" message={errors.em_phone} />
            </div>
        </>,

        // Step 3: Legal Requirements
        <>
            <div className="flex flex-col">
                <label>
                    Which day(s) are you available to volunteer?
                    <span className="text-red-500"> * </span>
                </label>

                <div className="ml-3">
                    <div className="items-top mt-4 flex space-x-2">
                        <Checkbox
                            name="available_days"
                            id="available_days_1"
                            className="mt-2 mb-2"
                            checked={data.available_days.includes('Friday, July 25')}
                            onCheckedChange={(checked) => handleCheckboxChange('available_days', 'Friday, July 25', checked as boolean)}
                        />

                        <div className="grid gap-1.5 leading-none">
                            <label
                                htmlFor="available_days_1"
                                className="font-ysabeau text-lg peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Friday, July 25
                            </label>
                        </div>
                    </div>

                    <div className="items-top mt-4 flex space-x-2">
                        <Checkbox
                            name="available_days"
                            id="available_days_2"
                            className="mt-2 mb-2"
                            checked={data.available_days.includes('Saturday, July 26')}
                            onCheckedChange={(checked) => handleCheckboxChange('available_days', 'Saturday, July 26', checked as boolean)}
                        />

                        <div className="grid gap-1.5 leading-none">
                            <label
                                htmlFor="available_days_2"
                                className="font-ysabeau text-lg peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Saturday, July 26
                            </label>
                        </div>
                    </div>

                    <div className="items-top mt-4 flex space-x-2">
                        <Checkbox
                            name="available_days"
                            id="available_days_3"
                            className="mt-2 mb-2"
                            value="Sunday, July 27"
                            checked={data.available_days.includes('Sunday, July 27')}
                            onCheckedChange={(checked) => handleCheckboxChange('available_days', 'Sunday, July 27', checked as boolean)}
                        />

                        <div className="grid gap-1.5 leading-none">
                            <label
                                htmlFor="available_days_3"
                                className="font-ysabeau text-lg peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Sunday, July 27
                            </label>
                        </div>
                    </div>

                    <InputError className="mb-3" message={errors.available_days} />
                </div>

                <label className="mt-4">
                    Which areas of the festival would you be interested in volunteering for? (Max 3 selections)
                    <span className="text-red-500"> * </span>
                </label>

                <div className="ml-3">
                    <div className="items-top mt-4 flex space-x-2">
                        <Checkbox
                            name="volunteering_area"
                            id="volunteering_area_1"
                            className="mt-2 mb-3"
                            checked={data.volunteering_area.includes('Event Setup/Teardown')}
                            onCheckedChange={(checked) => handleCheckboxChange('volunteering_area', 'Event Setup/Teardown', checked as boolean)}
                        />

                        <div className="grid gap-1.5 leading-none">
                            <label
                                htmlFor="volunteering_area_1"
                                className="font-ysabeau text-lg peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Event Setup/Teardown
                            </label>
                        </div>
                    </div>

                    <div className="items-top mt-4 flex space-x-2">
                        <Checkbox
                            name="volunteering_area"
                            id="volunteering_area_2"
                            className="mt-2 mb-3"
                            checked={data.volunteering_area.includes('Information Booth')}
                            onCheckedChange={(checked) => handleCheckboxChange('volunteering_area', 'Information Booth', checked as boolean)}
                        />

                        <div className="grid gap-1.5 leading-none">
                            <label
                                htmlFor="volunteering_area_2"
                                className="font-ysabeau text-lg peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Information Booth
                            </label>
                        </div>
                    </div>

                    <div className="items-top mt-4 flex space-x-2">
                        <Checkbox
                            name="volunteering_area"
                            id="volunteering_area_3"
                            className="mt-2 mb-3"
                            checked={data.volunteering_area.includes('Registration/Survey')}
                            onCheckedChange={(checked) => handleCheckboxChange('volunteering_area', 'Registration/Survey', checked as boolean)}
                        />

                        <div className="grid gap-1.5 leading-none">
                            <label
                                htmlFor="volunteering_area_3"
                                className="font-ysabeau text-lg peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Registration/Survey
                            </label>
                        </div>
                    </div>

                    <div className="items-top mt-4 flex space-x-2">
                        <Checkbox
                            name="volunteering_area"
                            id="volunteering_area_4"
                            className="mt-2 mb-3"
                            checked={data.volunteering_area.includes('Stage Management')}
                            onCheckedChange={(checked) => handleCheckboxChange('volunteering_area', 'Stage Management', checked as boolean)}
                        />

                        <div className="grid gap-1.5 leading-none">
                            <label
                                htmlFor="volunteering_area_4"
                                className="font-ysabeau text-lg peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Stage Management
                            </label>
                        </div>
                    </div>

                    <div className="items-top mt-4 flex space-x-2">
                        <Checkbox
                            name="volunteering_area"
                            id="volunteering_area_5"
                            className="mt-2 mb-3"
                            checked={data.volunteering_area.includes('Hospitality (e.g., assisting performers)')}
                            onCheckedChange={(checked) =>
                                handleCheckboxChange('volunteering_area', 'Hospitality (e.g., assisting performers)', checked as boolean)
                            }
                        />

                        <div className="grid gap-1.5 leading-none">
                            <label
                                htmlFor="volunteering_area_5"
                                className="font-ysabeau text-lg peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Hospitality (e.g., assisting performers)
                            </label>
                        </div>
                    </div>

                    <div className="items-top mt-4 flex space-x-2">
                        <Checkbox
                            name="volunteering_area"
                            id="volunteering_area_6"
                            className="mt-2 mb-3"
                            checked={data.volunteering_area.includes('Food & Beverage')}
                            onCheckedChange={(checked) => handleCheckboxChange('volunteering_area', 'Food & Beverage', checked as boolean)}
                        />

                        <div className="grid gap-1.5 leading-none">
                            <label
                                htmlFor="volunteering_area_6"
                                className="font-ysabeau text-lg peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Food & Beverage
                            </label>
                        </div>
                    </div>

                    <div className="items-top mt-4 flex space-x-2">
                        <Checkbox
                            name="volunteering_area"
                            id="volunteering_area_7"
                            className="mt-2 mb-3"
                            checked={data.volunteering_area.includes('Marketing & Communication')}
                            onCheckedChange={(checked) => handleCheckboxChange('volunteering_area', 'Marketing & Communication', checked as boolean)}
                        />

                        <div className="grid gap-1.5 leading-none">
                            <label
                                htmlFor="volunteering_area_7"
                                className="font-ysabeau text-lg peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Marketing & Communication
                            </label>
                        </div>
                    </div>

                    <div className="items-top mt-4 flex space-x-2">
                        <Checkbox
                            name="volunteering_area"
                            id="volunteering_area_8"
                            className="mt-2 mb-3"
                            checked={data.volunteering_area.includes('Photography/Videography')}
                            onCheckedChange={(checked) => handleCheckboxChange('volunteering_area', 'Photography/Videography', checked as boolean)}
                        />

                        <div className="grid gap-1.5 leading-none">
                            <label
                                htmlFor="volunteering_area_8"
                                className="font-ysabeau text-lg peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Photography/Videography
                            </label>
                        </div>
                    </div>

                    <div className="items-top mt-4 flex space-x-2">
                        <Checkbox
                            name="volunteering_area"
                            id="volunteering_area_9"
                            className="mt-2 mb-3"
                            checked={data.volunteering_area.includes('Other')}
                            onCheckedChange={(checked) => handleCheckboxChange('volunteering_area', 'Other', checked as boolean)}
                        />

                        <div className="grid gap-1.5 leading-none">
                            <label
                                htmlFor="volunteering_area_9"
                                className="font-ysabeau text-lg peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Other
                            </label>
                        </div>
                    </div>

                    <InputError className="mb-3" message={errors.volunteering_area} />
                </div>

                {data.volunteering_area.includes('Other') && (
                    <>
                        <label htmlFor="volunteering_area_other" className="mt-3">
                            Other Value <span className="text-red-500">* (Required if "Other" is selected)</span>
                        </label>
                        <input
                            type="text"
                            name="volunteering_area_other"
                            id="volunteering_area_other"
                            className="bg-darkwhite focus:outline-primary font-ysabeau mb-3 rounded-sm px-4 py-2"
                            value={data.volunteering_area_other}
                            onChange={(e) => setData('volunteering_area_other', e.target.value)}
                            placeholder="Other Value of Volunteering Area"
                        />
                        <InputError className="mb-3" message={errors.volunteering_area_other} />
                    </>
                )}

                <label htmlFor="relevant_experience" className="mt-3">
                    Do you have any relevant experience or skills? (e.g., customer service, event planning, first aid)
                </label>
                <input
                    type="text"
                    name="relevant_experience"
                    id="relevant_experience"
                    className="bg-darkwhite focus:outline-primary font-ysabeau mb-3 rounded-sm px-4 py-2"
                    value={data.relevant_experience}
                    onChange={(e) => setData('relevant_experience', e.target.value)}
                    placeholder="Relevant Experience"
                />
                <InputError className="mb-3" message={errors.relevant_experience} />
            </div>
        </>,

        <>
            <div className="flex flex-col">
                <label htmlFor="special_requirements" className="mt-3">
                    Do you have any allergies, health concerns, or special requirements? <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="special_requirements"
                    id="special_requirements"
                    className="bg-darkwhite focus:outline-primary font-ysabeau mb-3 rounded-sm px-4 py-2"
                    value={data.special_requirements}
                    onChange={(e) => setData('special_requirements', e.target.value)}
                    placeholder="Special Requirements or Any health concerns"
                />
                <InputError className="mb-3" message={errors.special_requirements} />

                <label htmlFor="tshirt_size" className="mt-3">
                    T-Shirt Size
                    <span className="text-red-500">*</span>
                </label>

                <RadioGroup className="mt-2 ml-3" value={data.tshirt_size} onValueChange={(value) => setData('tshirt_size', value)}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Small" id="Small" />
                        <label htmlFor="Small">Small</label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Medium" id="Medium" />
                        <label htmlFor="Medium">Medium</label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Large" id="Large" />
                        <label htmlFor="Large">Large</label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Extra Large" id="Extra Large" />
                        <label htmlFor="Extra Large">Extra Large</label>
                    </div>
                </RadioGroup>

                <InputError className="mb-3" message={errors.tshirt_size} />

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
        const stepErrors = validateStep(currentStep);

        if (Object.keys(stepErrors).length > 0) {
            clearErrors();
            Object.entries(stepErrors).forEach(([field, message]) => {
                setError(field, message);
            });
            return;
        }

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

        const stepErrors = validateStep(totalSteps);
        if (Object.keys(stepErrors).length > 0) {
            clearErrors();
            Object.entries(stepErrors).forEach(([field, message]) => {
                setError(field, message);
            });
            return;
        }

        post(route('volunteer-application.store'), {
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
                <h2 className="min-w-fit text-2xl">Volunteer Application Form | SFF2025</h2>
                <div className="border-primary my-4 rounded-lg border p-4 shadow-lg">
                    <h3 className="font-ysabeau text-xl">
                        We are excited to invite you to be a Volunteer of the Scarborough Folk Fest 2025, hosted by Parampara Canada. As a festival
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
                                    ) : !turnstileToken ? (
                                        'Verifying...'
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

export default VolunteerForm;
