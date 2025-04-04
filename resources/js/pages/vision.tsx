import ClientLayout from '@/layouts/client-layout';
import { Head } from '@inertiajs/react';

import TopSection from '@/components/client/vision/top-section';
// import Team from '@/components/client/vision/teams';

function vision() {
    return (
        <>
            <Head>
                <title>Vision</title>
            </Head>

            <TopSection />
            {/* <Team /> */}
        </>
    );
}

vision.layout = (page: React.ReactNode) => <ClientLayout>{page}</ClientLayout>;

export default vision;
