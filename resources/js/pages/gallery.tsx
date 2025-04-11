import ClientLayout from '@/layouts/client-layout';
import { Head } from '@inertiajs/react';

function Gallery() {

    return (
        <>
            <Head>
                <title>Gallery</title>
            </Head>
        </>
    );
}

// Attach the persistent layout to the page component.
Gallery.layout = (page: React.ReactNode) => <ClientLayout>{page}</ClientLayout>;

export default Gallery;
