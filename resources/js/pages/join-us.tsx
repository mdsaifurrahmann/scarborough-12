import ClientLayout from '@/layouts/client-layout';
import { Head } from '@inertiajs/react';

import BottomSection from '@/components/client/join-us/bottom-section';
import Slider from '@/components/client/join-us/slider';
import TopSection from '@/components/client/join-us/top-section';

function joinus() {
    return (
        <>
            <Head>
                <title>Join Us</title>
            </Head>

            <TopSection />
            <Slider />
            <BottomSection />
            {/* <Team /> */}
        </>
    );
}

joinus.layout = (page: React.ReactNode) => <ClientLayout>{page}</ClientLayout>;

export default joinus;
