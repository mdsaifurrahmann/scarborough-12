import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useRef, useState } from 'react';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';

import { Input } from '@/components/ui/input';
import { Checkbox } from "@/components/ui/checkbox"
import InputError from '@/components/input-error';
// import { Label } from '@/components/ui/label';
// import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


interface VendorFormProps {
    success?: string;
    error?: string;
}

interface VendorFormData {
    [key: string]: string | null | boolean | File | undefined | number;
    business_name: string;
    contact_person: string;
    phone_number: string;
    email: string;
    business_address: string;
    web_media?: string; // Optional URL
    vendor_type: string;
    vendor_other?: string; // Conditional

    // Products & Services
    product_services_desc: string;
    min_price: number | undefined;
    max_price: number | undefined;

    // Legal Requirements
    liability_insurance: boolean | undefined;
    vendor_permit: boolean | undefined;
    vendor_permit_copy?: File | null; // File during upload, string (path) after
    comply_regulation: boolean | undefined;

    // Event Requirements
    space: string;
    electricity: boolean | undefined;
    electricity_power?: string; // Conditional
    own_tent_table: boolean | undefined;

    // Sponsorship
    sponsore_opportunity: boolean | undefined;

    // Additional Info
    special_request?: string;

    // Agreement
    agreement: boolean;
    'cf-turnstile-response': string;
}


const VendorForm = ({ success, error }: VendorFormProps) => {

    const [currentStep, setCurrentStep] = useState(1);


    const turnstileRef = useRef<TurnstileInstance | null>(null);


    const { data, setData, post, processing, errors, reset } = useForm<VendorFormData>({
        business_name: '',
        contact_person: '',
        phone_number: '',
        email: '',
        business_address: '',
        web_media: '',
        vendor_type: '',
        vendor_other: '',

        // Products & Services
        product_services_desc: '',
        min_price: undefined,
        max_price: undefined,

        // Legal Requirements
        liability_insurance: undefined,
        vendor_permit: undefined,
        vendor_permit_copy: null,
        comply_regulation: undefined,

        // Event Requirements
        space: '',
        electricity: undefined,
        electricity_power: '',
        own_tent_table: undefined,

        // Sponsorship
        sponsore_opportunity: undefined,

        // Additional Info
        special_request: '',

        // Agreement
        agreement: false,

        // ReCAPTCHA
        'cf-turnstile-response': '',
    });



    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        const validTypes = [
            'application/pdf',
            'image/jpeg',
            'image/png',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];

        if (!validTypes.includes(file.type)) {
            toast.error('Invalid file type. Please upload PDF, DOC, DOCX, JPG, or PNG files.');
            return;
        }

        // Validate file size (5MB max)
        if (file.size > 9 * 1024 * 1024) {
            toast.error('File size exceeds 9MB limit');
            return;
        }

        setData('vendor_permit_copy', file);
    };





    const steps = [
        // Step 1: Business Information
        <>
            <div className='flex flex-col'>
                <label htmlFor='business_name'>Business Name <span className='text-red-500'>*</span> </label>
                <input type="text" name="business_name" id='business_name' className='rounded-sm bg-darkwhite py-2 px-4 mb-3 focus:outline-primary'
                    value={data.business_name}
                    onChange={e => setData('business_name', e.target.value)} placeholder='Business Name' />
                <InputError className='mb-3' message={errors.business_name} />

                <label htmlFor='contact_person'>Contact Person <span className='text-red-500'>*</span></label>
                <input type="text" name="contact_person" id='contact_person' className='rounded-sm bg-darkwhite py-2 px-4 mb-3 focus:outline-primary'
                    value={data.contact_person}
                    onChange={e => setData('contact_person', e.target.value)} placeholder='Contact Person' />
                <InputError className='mb-3' message={errors.contact_person} />


                <label htmlFor='phone_number'>Phone Number <span className='text-red-500'>*</span></label>
                <input type="text" name="phone_number" id='phone_number' className='rounded-sm bg-darkwhite py-2 px-4 mb-3 focus:outline-primary'
                    value={data.phone_number}
                    onChange={e => setData('phone_number', e.target.value)} placeholder='Phone Number' />
                <InputError className='mb-3' message={errors.phone_number} />

                <label htmlFor='email'>Email <span className='text-red-500'>*</span></label>
                <input type="email" name="email" id='email' className='rounded-sm bg-darkwhite py-2 px-4 mb-3 focus:outline-primary'
                    value={data.email}
                    onChange={e => setData('email', e.target.value)} placeholder='Email' />
                <InputError className='mb-3' message={errors.email} />

                <label htmlFor='business_address'>Business Address <span className='text-red-500'>*</span></label>
                <input type="text" name="business_address" id='business_address' className='rounded-sm bg-darkwhite py-2 px-4 mb-3 focus:outline-primary'
                    value={data.business_address}
                    onChange={e => setData('business_address', e.target.value)} placeholder='Business Address' />
                <InputError className='mb-3' message={errors.business_address} />

                <label htmlFor='web_media'>Website/Social Media Links</label>
                <input type="text" name="web_media" id='web_media' className='rounded-sm bg-darkwhite py-2 px-4 mb-3 focus:outline-primary'
                    value={data.web_media}
                    onChange={e => setData('web_media', e.target.value)} placeholder='https://example.com' />
                <InputError className='mb-3' message={errors.web_media} />


                <label>Vendor Type <span className='text-red-500'>*</span></label>
                <RadioGroup className='ml-3 mt-2' onValueChange={(value) => setData('vendor_type', value)}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Food Vendor" id="food_vendor" />
                        <label htmlFor="food_vendor">Food Vendor</label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Beverage Vendor" id="beverage_vendor" />
                        <label htmlFor="beverage_vendor">Beverage Vendor</label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Arts & Crafts" id="arts_crafts" />
                        <label htmlFor="arts_crafts">Arts & Crafts</label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Clothing & Accessories" id="clothing_accessories" />
                        <label htmlFor="clothing_accessories">Clothing & Accessories</label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Health & Wellness Products" id="health_wellness" />
                        <label htmlFor="health_wellness">Health & Wellness Products</label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Other" id="other" />
                        <label htmlFor="other">Other</label>
                    </div>
                </RadioGroup>

                {data.vendor_type === 'Other' && (
                    <div className='flex flex-col mt-3'>
                        <label>What is your other vendor type? <span className='text-red-500'>* (required if you choose "Other")</span></label>
                        <input type="text" name="vendor_other" id='vendor_other' className='rounded-sm bg-darkwhite py-2 px-4 mb-3 focus:outline-primary'
                            value={data.vendor_other}
                            onChange={e => setData('vendor_other', e.target.value)} placeholder='Footware' />
                        <InputError className='mb-3' message={errors.vendor_other} />
                    </div>
                )}

            </div>
        </>,

        // Step 2: Products & Services
        <>
            <div className='flex flex-col'>
                <label htmlFor='product_services_desc'>Brief Description of Products/Services <span className='text-red-500'>*</span></label>
                <textarea name="product_services_desc" className='rounded-sm bg-darkwhite py-2 px-4 mb-3 focus:outline-primary'
                    value={data.product_services_desc}
                    onChange={e => setData('product_services_desc', e.target.value)}
                />
                <InputError className='mb-3' message={errors.product_services_desc} />


                <label htmlFor='min_price'>Price Range<span className='text-red-500'>*</span></label>
                <div className='flex gap-x-3 lg:items-center lg:flex-row flex-col'>
                    <div className="flex flex-col">
                        <input type="number" step={0.01} name="min_price" id='min_price' className='rounded-sm bg-darkwhite py-2 px-4 mb-3 focus:outline-primary'
                            value={data.min_price}
                            onChange={e => setData('min_price', parseFloat(e.target.value))} placeholder='Minimum' />
                        <InputError className='mb-3' message={errors.min_price} />
                    </div>

                    <span className='mb-3'> to </span>
                    <div className="flex flex-col">
                        <input type="number" step={0.01} name="max_price" id='max_price' className='rounded-sm bg-darkwhite py-2 px-4 mb-3 focus:outline-primary'
                            value={data.max_price}
                            onChange={e => setData('max_price', parseFloat(e.target.value))} placeholder='Maximum' />
                        <InputError className='mb-3' message={errors.max_price} />
                    </div>
                </div>

                <label>Do you have liability insurance?<span className='text-red-500'> * (Proof of insurance may be required upon approval.)</span></label>
                <RadioGroup className='ml-3 mt-2' onValueChange={(value) => setData('liability_insurance', value === "1" ? true : value === "0" ? false : undefined)}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1" id="1" />
                        <label htmlFor="1">Yes</label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="0" id="0" />
                        <label htmlFor="0">No</label>
                    </div>
                </RadioGroup>
                <InputError className='mb-3' message={errors.liability_insurance} />
            </div>
        </>,

        // Step 3: Legal Requirements
        <>
            <div className='flex flex-col'>
                <span className='mb-3 text-red-500'>Required for food/Beverage vendors only</span>

                <label>Do you have a valid food vendor permit</label>
                <RadioGroup className='ml-3 my-3' onValueChange={(value) => setData('vendor_permit', value === "1" ? true : value === "0" ? false : undefined)}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1" id="permit-1" />
                        <label htmlFor="permit-1">Yes</label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="0" id="permit-0" />
                        <label htmlFor="permit-0">No</label>
                    </div>
                </RadioGroup>
                <InputError className='mb-3' message={errors.vendor_permit} />


                <label>Do you comply with all local health and safety regulations?</label>
                <RadioGroup className='ml-3 mt-2' onValueChange={(value) => setData('comply_regulation', value === "1" ? true : value === "0" ? false : undefined)}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1" id="comply-1" />
                        <label htmlFor="comply-1">Yes</label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="0" id="comply-0" />
                        <label htmlFor="comply-0">No</label>
                    </div>
                </RadioGroup>
                <InputError className='mb-3' message={errors.comply_regulation} />

                <label htmlFor='vendor_permit_copy' className='mt-3'>Attach a copy of your permit if available. <span className='text-red-500'>(5MB max)</span> </label>
                <Input type='file' onChange={handleFileChange} name="vendor_permit_copy" id='vendor_permit_copy' className='rounded-sm bg-offwhite border-none mb-3 focus:outline-primary' accept='.pdf,.jpg,.jpeg,.png,.doc,.docx' />
                <InputError className='mb-3' message={errors.vendor_permit_copy} />
            </div>
        </>,

        // Step 4: Event Requirements
        <>
            <div className='flex flex-col'>

                <label htmlFor='space'>Space Required <span className='text-red-500'>(e.g. 10’ x 10’)</span></label>
                <input type="text" name="space" id='space' className='rounded-sm bg-darkwhite py-2 px-4 mb-3 focus:outline-primary'
                    value={data.space}
                    onChange={e => setData('space', e.target.value)} placeholder='10’ x 10’' />
                <InputError className='mb-3' message={errors.space} />


                <label>Do you require electricity?</label>
                <RadioGroup className='ml-3 my-2' onValueChange={(value) => setData('electricity', value === "1" ? true : value === "0" ? false : undefined)}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1" id="comply-1" />
                        <label htmlFor="comply-1">Yes</label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="0" id="comply-0" />
                        <label htmlFor="comply-0">No</label>
                    </div>
                </RadioGroup>
                <InputError className='mb-3' message={errors.electricity} />

                {data.electricity === true &&
                    <>
                        <label htmlFor='electricity_power'>Electricity Power Needs <span className='text-red-500'>(e.g. 110V, 220V)</span></label>
                        <input type="text" name="electricity_power" id='electricity_power' className='rounded-sm bg-darkwhite py-2 px-4 mb-3 focus:outline-primary'
                            value={data.electricity_power}
                            onChange={e => setData('electricity_power', e.target.value)} placeholder='220V' />
                        <InputError className='mb-3' message={errors.electricity_power} />
                    </>
                }

                <label>Do you have your own tent/table setup?</label>
                <RadioGroup className='ml-3 my-2' onValueChange={(value) => setData('own_tent_table', value === "1" ? true : value === "0" ? false : undefined)}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1" id="tent-1" />
                        <label htmlFor="tent-1">Yes</label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="0" id="tent-0" />
                        <label htmlFor="tent-0">No</label>
                    </div>
                </RadioGroup>
                <InputError className='mb-3' message={errors.own_tent_table} />

            </div>
        </>,

        <>
            <div className='flex flex-col'>




                <label>Are you interested in sponsorship opportunities? <span className='text-red-500'>*</span></label>
                <RadioGroup className='ml-3 my-2' onValueChange={(value) => setData('sponsore_opportunity', value === "1" ? true : value === "0" ? false : undefined)}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1" id="sponsor-1" />
                        <label htmlFor="sponsor-1">Yes</label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="0" id="sponsor-0" />
                        <label htmlFor="sponsor-0">No</label>
                    </div>
                </RadioGroup>
                <InputError className='mb-3' message={errors.sponsore_opportunity} />


                <label htmlFor='special_request'>Special Requests or Comments</label>
                <input type="text" name="special_request" id='special_request' className='rounded-sm bg-darkwhite py-2 px-4 mb-3 focus:outline-primary'
                    value={data.special_request}
                    onChange={e => setData('special_request', e.target.value)} />
                <InputError className='mb-3' message={errors.special_request} />


                <div className="items-top flex space-x-2 mt-4">

                    <Checkbox
                        name='agreement'
                        id='agreement'
                        className='mb-3'
                        checked={data.agreement}
                        onCheckedChange={(checked) => setData('agreement', checked as boolean)}
                    />

                    <div className="grid gap-1.5 leading-none">
                        <label htmlFor="agreement" className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            By submitting this application, I understand that acceptance as a vendor for the Scarborough Folk Fest 2025 is not guaranteed. If selected, I agree to comply with all event guidelines and regulations.
                        </label>
                        <p className=' text-muted-foreground'>
                            I authorize Parampara Canada to use the provided information for event-related purposes only, ensuring confidentiality and not sharing it with third parties without consent, unless required by law.
                        </p>
                        <p className=' text-muted-foreground'>
                            I also agree to hold Parampara Canada harmless from any liability or damages arising from my participation in the event.
                        </p>


                    </div>



                </div>




                <Turnstile
                    ref={turnstileRef}
                    siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                    onSuccess={(token) => setData('cf-turnstile-response', token)}
                    onError={() => toast.error('Turnstile verification failed. Please try again.')}
                    className="my-4"
                />
                <InputError message={errors['cf-turnstile-response']} />

            </div>


        </>
    ];

    const totalSteps = steps.length; // Adjust based on your step division

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(prev => prev + 1);
            window.scrollTo(0, 250);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
            window.scrollTo(0, 250);
        }
    };






    const submit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        // console.log(data);


        post(route('vendor-applications.store'), {
            preserveScroll: true,
            forceFormData: true,

            onSuccess: (response) => {
                console.log('success:', response);
                if (response.props.success) {
                    toast.success("Success", {
                        duration: 5000,
                        description: () => <p className='text-black'>{response.props.success as string}</p>,
                        richColors: true,
                        style: {
                            background: '#fff',
                            color: '#000',
                            fontFamily: 'Aboreto',
                        }
                    });
                    reset();
                    setData('cf-turnstile-response', ''); // Clear the old token
                    if (turnstileRef.current) {
                        turnstileRef.current.reset(); // Reset Turnstile widget
                    }
                    // setCurrentStep(1);

                } else if (response.props.error) {
                    console.log('else if error:', data);
                    toast.error("Error", {
                        duration: 5000,
                        description: () => <p className='text-red-500'>{response.props.error as string}</p>,
                        richColors: true,
                        style: {
                            background: '#fff',
                            color: 'oklch(0.637 0.237 25.331)',
                            fontFamily: 'Aboreto',
                        }
                    });
                }
            },
            onError: (errors) => {
                console.log('errors:', errors);
                Object.values(errors).forEach((msg) => {
                    toast.error(msg, {
                        duration: 5000,
                        richColors: true,
                        style: {
                            // background: '#fff',
                            // color: 'red',
                            fontFamily: 'Aboreto',
                        }
                    });
                });
            }
        });
    }



    return (
        <section className="my-4 overflow-hidden">
            <div className="container">
                <h2 className="text-2xl min-w-fit">Vendor Application Form | SFF2025</h2>
                <div className="border border-primary rounded-lg shadow-lg p-4 my-4">
                    <h3 className='font-ysabeau text-xl'>We are excited to invite you to be a vendor of the Scarborough Folk Fest 2025, hosted by Parampara Canada. As a festival dedicated to fostering cultural exchange and celebrating diversity, the Scarborough Folk Fest offers a unique platform for vendor to engage with a vibrant, multicultural community.</h3>

                    {/* <div className="flex justify-center mb-8">
                        {[...Array(totalSteps)].map((_, index) => (
                            <div key={index} className={`mx-2 w-8 h-8 rounded-full 
                            ${currentStep > index + 1 ? 'bg-primary' : 'bg-gray-300'}
                            ${currentStep === index + 1 ? 'border-2 border-primary' : ''}`}
                            />
                        ))}
                    </div> */}

                    <form onSubmit={submit}>
                        {/* Current Step Content */}
                        <div className="my-8">
                            {steps[currentStep - 1]}
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex gap-4">
                            {currentStep >= 1 && (
                                <button
                                    type='button'
                                    onClick={handleBack}
                                    className="bg-offwhite px-4 py-2 rounded cursor-pointer hover:bg-primary"
                                >
                                    Go Back
                                </button>
                            )}

                            {currentStep < totalSteps ? (
                                <>
                                    {/* {currentStep} - {totalSteps} */}
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className="bg-primary px-4 py-2 rounded hover:bg-primary-dark cursor-pointer"
                                    >
                                        Next
                                    </button>
                                </>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-primary px-4 py-2 rounded hover:bg-primary-dark cursor-pointer"
                                >
                                        {/* {processing && <LoaderCircle className="h-4 w-4 animate-spin" />} */}
                                        {success ? 'Submitted' : error ? 'Try Again' : processing ? <LoaderCircle className="h-4 w-4 animate-spin" /> : 'Submit'}
                                </button>
                            )}
                        </div>
                    </form>



                </div>
            </div>
        </section >
    );
}

export default VendorForm;