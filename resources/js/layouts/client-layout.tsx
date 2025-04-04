import "../../css/client.css";
import { motion } from "framer-motion";
import { usePage } from "@inertiajs/react";
import { PropsWithChildren, Suspense } from "react";

import ClientHeader from "@/components/client-header";
import ClientFooter from "@/components/client-footer";

interface AppLayoutProps {
    children: React.ReactNode;
}

const AppLayout = ({ children }: PropsWithChildren<AppLayoutProps>) => {
    const { url } = usePage(); // Get current page URL for animation

    return (
        <>
            <ClientHeader />
            <motion.div
                key={url} // Triggers animation on page change
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                <Suspense fallback={null}>{children}</Suspense>
                {/* {children} */}
            </motion.div>
            <ClientFooter />
        </>
    );
};

export default AppLayout;
