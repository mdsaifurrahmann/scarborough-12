import ClientLayout from "@/layouts/client-layout";
import { Head, usePage } from '@inertiajs/react';

import TopSection from '@/components/client/join-us/top-section';
import BottomSection from '@/components/client/join-us/bottom-section';
import VendorForm from "@/components/client/join-us/vendor-form/vendor-form";
import { Toaster } from "@/components/ui/sonner"



export default function VendorApplication() {

    const page = usePage();

    return (
        <ClientLayout>
            <Head>
                <title>Apply for Vendor - Scarborough Folk Fest</title>
            </Head>

            <TopSection />
            <VendorForm success={page.props.success as string} error={page.props.error as string} />
            <BottomSection />
            
            
            <Toaster />


        </ClientLayout>
    );

}