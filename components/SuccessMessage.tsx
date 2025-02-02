"use client";

import { useEffect } from "react";
import Link from "next/link";

const SuccessMessage = () => {
    useEffect(() => {
        localStorage.removeItem("cart");
    }, []);

    return (
        <>
            <h1 className="pt-[10%] ml-[30px] sm:pl-60">
                YOUR ORDER HAS BEEN PLACED SUCCESSFULLY
            </h1>
            <Link href="/">
                <button className="bg-[#2A254B] mx-[25%] sm:mx-[45%] my-10 text-white px-6 py-3 rounded hover:bg-[#393552] transition-colors">
                    Go Back
                </button>
            </Link>
        </>
    );
};

export default SuccessMessage;
