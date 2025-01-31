"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const AddToCartBtn = ({ id }: { id: number }) => {
    const router = useRouter();
    const { isSignedIn } = useUser(); // Get sign-in status

    const addToCart = () => {
        if (!isSignedIn) {
            alert("You need to sign in to add items to the cart.");
            return;
        }

        const cart = JSON.parse(localStorage.getItem("cart") || "[]");

        if (Array.isArray(cart)) {
            const isProductPresent = cart.find((item: number) => item === id);
            if (isProductPresent) {
                alert("This product is already in the cart.");
                return;
            }
            cart.push(id);
            localStorage.setItem("cart", JSON.stringify(cart));

            window.dispatchEvent(new Event("cartUpdate"));
            window.dispatchEvent(new Event("storage"));

            router.push("/cart");
        }
    };

    return (
        <button
            className="py-4 px-10 bg-slate-300 flex items-center gap-x-2 rounded-lg text-black hover:bg-slate-400 max-sm:w-full"
            onClick={addToCart}
        >
            <Image src="/button-cart.svg" alt="cart" width={30} height={30} />
            <p>Add to Cart</p>
        </button>
    );
};

export default AddToCartBtn;
