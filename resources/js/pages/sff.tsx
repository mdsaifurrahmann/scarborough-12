import ClientLayout from "@/layouts/client-layout";
import { Head } from '@inertiajs/react';

import Hero from '@/components/client/sff/hero';
import Location from '@/components/client/sff/location';
import JoinUs from '@/components/client/home/join-us';
import StayUpdated from '@/components/client/sff/stay-updated';



export default function Sff() {
    return (
        <ClientLayout>
            <Head>
                <title>SFF2025 - Scarborough Folk Fest</title>
            </Head>

            <Hero />
            <Location />
            <JoinUs />
            <StayUpdated />

        </ClientLayout>
    );

}