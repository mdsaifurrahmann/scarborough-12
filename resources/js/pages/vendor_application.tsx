import ClientLayout from "@/layouts/client-layout";
import { Head, usePage } from '@inertiajs/react';

import TopSection from '@/components/client/join-us/top-section';
import BottomSection from '@/components/client/join-us/bottom-section';
import VendorForm from "@/components/client/join-us/vendor-form/vendor-form";
import { Toaster } from "@/components/ui/sonner"



function VendorApplication() {

    const page = usePage();

    return (
        <>
            <Head>
                <title>Apply for Vendor</title>
            </Head>

            <TopSection />
            <VendorForm success={page.props.success as string} error={page.props.error as string} />
            <BottomSection />
            
            
            <Toaster />


        </>
    );

}

VendorApplication.layout = (page: React.ReactNode) => <ClientLayout>{page}</ClientLayout>;

export default VendorApplication;