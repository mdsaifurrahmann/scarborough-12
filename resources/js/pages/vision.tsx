import ClientLayout from "@/layouts/client-layout";
import { Head } from '@inertiajs/react';

import TopSection from '@/components/client/vision/top-section';
// import Team from '@/components/client/vision/teams';



export default function vision() {
    return (
        <ClientLayout>
            <Head>
                <title>Vision - Scarborough Folk Fest</title>
            </Head>

            <TopSection />
            {/* <Team /> */}


        </ClientLayout>
    );

}