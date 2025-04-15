import { useForm } from '@inertiajs/react';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { Facebook, Instagram, Linkedin, LoaderCircle, Youtube } from 'lucide-react';
import { FormEventHandler, useRef } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface GetInTouchProps {
    success?: string;
    error?: string;
}

interface FormData {
    [key: string]: string;
    email: string;
    name: string;
    phone: string;
    message: string;
    'cf-turnstile-response': string;
}

export default function GetInTouch({ success, error }: GetInTouchProps) {
    const { data, setData, post, processing, errors, reset } = useForm<FormData>({
        email: '',
        name: '',
        phone: '',
        message: '',
        'cf-turnstile-response': '',
    });

    const turnstileRef = useRef<TurnstileInstance | null>(null);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        console.log(data);

        post(route('contact-form.send'), {
            preserveScroll: true,
            onSuccess: (response) => {
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
                } else if (response.props.error) {
                    toast.error('Error', {
                        duration: 5000,
                        description: () => <p className="text-red-500">{response.props.error as string}</p>,
                        richColors: true,
                        style: {
                            // background: '#fff',
                            // color: 'oklch(0.637 0.237 25.331)',
                            fontFamily: 'Aboreto',
                        },
                    });
                }
            },
            onError: (errors) => {
                toast.error('Error', {
                    duration: 5000,
                    description: () => <p className="text-red-500">{errors.error}</p>,
                    richColors: true,
                    style: {
                        // background: '#fff',
                        // color: 'oklch(0.637 0.237 25.331)',
                        fontFamily: 'Aboreto',
                    },
                });
            },
        });
    };

    return (
        <section className="get-in-touch" id="contact">
            <div className="4xl:px-32 container">
                <h2 className="section-title">get in touch</h2>
                <div className="mx-auto grid w-9/10 grid-cols-8 gap-4 lg:w-full">
                    <div className="border-primary bg-offwhite col-span-8 w-full rounded-xl border p-6 xl:col-span-5">
                        <form className="relative flex flex-col" onSubmit={submit}>
                            <label htmlFor="full_name">full name</label>
                            <input
                                type="text"
                                autoComplete="true"
                                className="bg-darkwhite mb-2 rounded-lg px-4 py-2"
                                name="name"
                                id="full_name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            <InputError message={errors.name} />

                            <label htmlFor="email">email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="bg-darkwhite mb-2 rounded-lg px-4 py-2"
                                autoComplete="true"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} />

                            <label htmlFor="phone">phone</label>
                            <input
                                type="text"
                                name="phone"
                                id="phone"
                                className="bg-darkwhite mb-2 rounded-lg px-4 py-2"
                                autoComplete="true"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                            />
                            <InputError message={errors.phone} />

                            <label htmlFor="message">message</label>
                            <textarea
                                id="message"
                                className="bg-darkwhite mb-1 rounded-lg px-4 py-2"
                                name="message"
                                rows={5}
                                onChange={(e) => setData('message', e.target.value)}
                            ></textarea>
                            <InputError message={errors.message} />

                            <Turnstile
                                ref={turnstileRef}
                                siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                                onSuccess={(token) => setData('cf-turnstile-response', token)}
                                onError={() => toast.error('Turnstile verification failed. Please try again.', { richColors: true })}
                                className="mb-2"
                            />
                            <InputError message={errors['cf-turnstile-response']} />

                            <Button
                                className="bg-primary absolute -bottom-[2.8rem] left-2/4 z-10 mx-auto mt-4 w-7/10 -translate-x-2/4 transform cursor-pointer rounded-md py-2"
                                type="submit"
                                disabled={processing}
                            >
                                {/* {processing && <LoaderCircle className="h-4 w-4 animate-spin" />} */}
                                {success ? success : error ? error : processing ? <LoaderCircle className="h-4 w-4 animate-spin" /> : 'send message'}
                            </Button>
                        </form>
                    </div>
                    <div className="col-span-8 mt-28 flex flex-col gap-4 xl:col-span-3 xl:mt-0">
                        <h3 className="text-center text-[1.5rem]">contact</h3>
                        <div className="bg-primary rounded-lg p-6 text-center break-words">
                            <div className="mb-2">
                                <h5 className="block">phone</h5>
                                <span className="font-ysabeau block text-xl">647-780-0785</span>
                            </div>
                            <div className="mb-2">
                                <h5 className="block">email</h5>
                                <span className="font-ysabeau block text-xl">info@paramparacanada.ca</span>
                            </div>

                            <div className="">
                                <h5 className="block">location</h5>
                                <span className="font-ysabeau block text-xl">Scarborough, ON</span>
                            </div>
                        </div>

                        <div className="mt-28 xl:mt-auto">
                            <h3 className="mb-4 text-center text-[1.5rem] xl:mb-auto">social</h3>
                            <div className="border-primary mx-auto flex w-fit items-center justify-center gap-12 rounded-lg bg-transparent p-6 md:border xl:w-full">
                                <a href="https://www.facebook.com/Scarboroughfolkfest" target="_blank">
                                    {/* <img src="./images/social/fb.png" alt="facebook" loading="lazy" /> */}
                                    <Facebook size={32} />
                                </a>
                                <a href="https://www.linkedin.com/company/paramparacanada/" target="_blank">
                                    {/* <img src="./images/social/linkdedin.png" alt="linkedin" loading="lazy" /> */}
                                    <Linkedin size={32} />
                                </a>
                                <a href="https://www.instagram.com/paramparacanada/" target="_blank">
                                    {/* <img src="./images/social/insta.png" alt="instagram" loading="lazy" /> */}
                                    <Instagram size={32} />
                                </a>
                                <a href="https://www.youtube.com/@scarboroughfolkfest" target="_blank">
                                    {/* <img src="./images/social/yt.png" alt="youtube" loading="lazy" /> */}
                                    <Youtube size={32} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
