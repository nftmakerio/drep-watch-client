import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type AppType } from "next/dist/shared/lib/utils";

import "~/styles/globals.css";
import { MeshProvider } from "@meshsdk/react";

const queryClient = new QueryClient();

const MyApp: AppType = ({ Component, pageProps }) => {

    useEffect(() => {
        const lenis = new Lenis();

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return () => lenis.destroy();
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <MeshProvider>
                <Component {...pageProps} />
            </MeshProvider>
        </QueryClientProvider>
    );
};

export default MyApp;
