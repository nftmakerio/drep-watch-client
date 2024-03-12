import { IBM_Plex_Mono,Inter } from "next/font/google";
import localFont from 'next/font/local'

import Navbar from "~/components/navbar";

const inter_font = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    weight: ["400", "500", "600", "700", "800"],
});
const mono_font = IBM_Plex_Mono({
    subsets: ["latin"],
    variable: "--font-ibm-mono",
    weight: ["400", "500", "600"],
});

const neue_regrade_font = localFont({ 
    src: '../../public/fonts/Neue Regrade Variable.ttf', 
    variable: "--font-neue-regrade",
});

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main
            className={`relative min-h-screen w-full bg-[#f5f5f5] ${inter_font.variable} ${mono_font.variable} ${neue_regrade_font.variable} grid-lines`}
        >
            <Navbar />
            {children}
        </main>
    );
};

export default Layout;
