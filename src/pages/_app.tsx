import { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type AppType } from "next/dist/shared/lib/utils";

import "~/styles/globals.css";
import { MeshProvider } from "@meshsdk/react";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

const MyApp: AppType = ({ Component, pageProps }) => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const lenis = new Lenis();

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
        setIsMounted(true);
        return () => lenis.destroy();
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <MeshProvider>
                {isMounted && <Toaster position="top-center" />}
                <Component {...pageProps} />
            </MeshProvider>
        </QueryClientProvider>
    );
};

export default MyApp;
