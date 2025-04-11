import ClientLayout from '@/layouts/client-layout';
import { Head, usePage } from '@inertiajs/react';

import BottomSection from '@/components/client/join-us/bottom-section';
import TopSection from '@/components/client/join-us/top-section';
import ArtistForm from '@/components/client/join-us/artist-form/artist-form';
import { Toaster } from '@/components/ui/sonner';

function ArtistApplication() {
    const page = usePage();

    return (
        <>
            <Head>
                <title>Apply for Artist</title>
            </Head>

            <TopSection />
            <ArtistForm success={page.props.success as string} error={page.props.error as string} />
            <BottomSection />

            <Toaster />
        </>
    );
}

ArtistApplication.layout = (page: React.ReactNode) => <ClientLayout>{page}</ClientLayout>;

export default ArtistApplication;
