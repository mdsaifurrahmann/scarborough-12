import ClientLayout from "@/layouts/client-layout";
import { Head, usePage } from '@inertiajs/react';
import { useEffect } from "react";

import Hero from '@/components/client/home/hero';
import AfterHero from '@/components/client/home/after-hero';
import Roots from '@/components/client/home/roots';
import SupportedBy from '@/components/client/home/supported-by';
import Why from '@/components/client/home/why';
import JoinUs from '@/components/client/home/join-us';
import GetInTouch from '@/components/client/home/get-in-touch-v3';
// import GetInTouch from '@/components/client/home/get-in-touch';
import { Toaster } from "@/components/ui/sonner"



export default function Home() {

    const page = usePage();

    useEffect(() => {
        const scrollTo = sessionStorage.getItem('scrollTo');
        if (scrollTo === 'contact') {
            const section = document.getElementById(scrollTo);
            section?.scrollIntoView({ behavior: 'smooth' });
            sessionStorage.removeItem('scrollTo');
        }
    }, []);

    return (
        <ClientLayout>
            <Head>
                <title>Home - Scarborough Folk Fest</title>
            </Head>

            <Hero />
            <AfterHero />
            <Roots />
            <SupportedBy />
            <Why />
            <JoinUs />
            <GetInTouch success={page.props.success as string} error={page.props.error as string} />

            <Toaster/>

        </ClientLayout>
    );

}