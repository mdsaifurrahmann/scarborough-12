import ClientLayout from '@/layouts/client-layout';
import { Head, usePage } from '@inertiajs/react';

import BottomSection from '@/components/client/join-us/bottom-section';
import SponsorForm from '@/components/client/join-us/sponsor-form/sponsor-form';
import TopSection from '@/components/client/join-us/top-section';
import { Toaster } from '@/components/ui/sonner';

function SponsorApplication() {
    const page = usePage();

    return (
        <>
            <Head>
                <title>Apply for Sponsor</title>
            </Head>

            <TopSection />
            <SponsorForm success={page.props.success as string} error={page.props.error as string} />
            <BottomSection />

            <Toaster />
        </>
    );
}

SponsorApplication.layout = (page: React.ReactNode) => <ClientLayout>{page}</ClientLayout>;

export default SponsorApplication;
