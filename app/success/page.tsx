import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar"; 
import Link from "next/link";

function success() {
    return (
        <>
            <Navbar />
            <h1 className="pt-[10%] pl-60 w-full">YOUR ORDER HAS BEEN PLACED SUCCESSFULLY </h1>
            <Link href="/">
                <button className="bg-[#2A254B] w-28 mx-[45%] my-10 text-white px-6 py-3 rounded hover:bg-[#393552] transition-colors">
                    Go Back
                </button>
            </Link>
            <Footer />
        </>
    )
}

export default success