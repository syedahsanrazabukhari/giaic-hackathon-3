// app/cancel/page.tsx
import CancelMessage from "@/components/CancelMessage";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";


export default function CancelPage() {
    return (
        <>
            <Navbar />
            <CancelMessage />
            <Footer />
        </>
    );
}
