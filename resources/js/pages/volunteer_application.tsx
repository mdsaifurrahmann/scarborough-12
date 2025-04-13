import ClientLayout from '@/layouts/client-layout';
import { Head, usePage } from '@inertiajs/react';

import BottomSection from '@/components/client/join-us/bottom-section';
import VolunteerForm from '@/components/client/join-us/volunteer-form/volunteer-form';
import TopSection from '@/components/client/join-us/top-section';
import { Toaster } from '@/components/ui/sonner';

function VolunteerApplication() {
    const page = usePage();

    return (
        <>
            <Head>
                <title>Apply for Volunteer</title>
            </Head>

            <TopSection />
            <VolunteerForm success={page.props.success as string} error={page.props.error as string} />
            <BottomSection />

            <Toaster />
        </>
    );
}

VolunteerApplication.layout = (page: React.ReactNode) => <ClientLayout>{page}</ClientLayout>;

export default VolunteerApplication;
