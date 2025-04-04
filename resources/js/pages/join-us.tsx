import ClientLayout from "@/layouts/client-layout";
import { Head } from '@inertiajs/react';

import TopSection from '@/components/client/join-us/top-section';
import Slider from '@/components/client/join-us/slider';
import BottomSection from '@/components/client/join-us/bottom-section';



export default function joinus() {
    return (
        <ClientLayout>
            <Head>
                <title>Join Us - Scarborough Folk Fest</title>
            </Head>

            <TopSection />
            <Slider />
            <BottomSection />
            {/* <Team /> */}


        </ClientLayout>
    );

}