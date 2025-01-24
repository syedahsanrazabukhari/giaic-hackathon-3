"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";

const CartProducts = () => {
    const [products, setProducts] = useState<any[]>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const cartData = window.localStorage.getItem('cart');
                const cart = cartData ? JSON.parse(cartData) : null;
                
                if (cart && cart.length > 0) {
                    let cartProducts = await client.fetch(`
                        *[_type == "product" && _id in $cart] {
                            _id,
                            name,
                            "imageUrl": image.asset->url,
                            price,
                        }
                        `,
                        { cart }
                    );
                    cartProducts = cartProducts.map((product: any) => ({ ...product, quantity: 1 }));
                    setProducts(cartProducts);
                } else {
                    setProducts([]);
                }
            } catch (error) {
                console.error('Error fetching cart products:', error);
                setProducts([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const increment = (i: number) => {
        const temp: any[] = products ? [...products] : [];
        temp[i].quantity && temp[i].quantity++;
        setProducts(temp);
    };
    const decrement = (i: number) => {
        const temp: any[] = products ? [...products] : [];
        (temp[i].quantity && temp[i].quantity > 1) && temp[i].quantity--;
        setProducts(temp);
    };

    const totalAmount = (): number => {
        return products?.reduce((acc, product) => acc + product.quantity * product.price, 0);
    };

    const handleCheckout = () => {
        localStorage.removeItem('cart');
        setProducts([]);
    };

    const removeItem = (productId: string) => {
        const updatedProducts = products?.filter(product => product._id !== productId);
        setProducts(updatedProducts);

        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const updatedCart = cart.filter((id: string) => id !== productId);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    return (
        <div className="px-4 py-8">
            {isLoading ? (
                <div className="text-center py-8">
                    <p>Loading cart...</p>
                </div>
            ) : (!products || products.length === 0) ? (
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-[#2A254B] mb-4">Your Cart is Empty</h2>
                    <Link href="/products">
                        <button className="bg-[#2A254B] text-white px-6 py-3 rounded hover:bg-[#393552] transition-colors">
                            Add Items to Cart
                        </button>
                    </Link>
                </div>
            ) : (
                <>
                    <table className="mt-12 w-full">
                        <thead className="max-sm:hidden">
                            <tr className="border-b border-[--border-gray] *:pb-4 body-sm">
                                <td>Product</td>
                                <td>Quantity</td>
                                <td>Total</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {products?.map((product: any, i: any) => (
                                <tr className="sm:*:pt-5" key={product.id}>
                                    <td>
                                        <div className="flex gap-x-[21px] sm:items-center">
                                            <Image src={product.imageUrl} alt="Failed to load" width={64} height={64} className="size-16" />
                                            <div className="space-y-2 max-sm:mt-[19px] grow">
                                                <h4 className="text-[16px] leading-[20px]">{product.name}</h4>
                                                <div>
                                                    <p>£{product.price}</p>
                                                    <div className="py-3 px-4 sm:hidden flex items-center gap-x-8">
                                                        <button onClick={() => increment(i)}>+</button>
                                                        <span>{product.quantity}</span>
                                                        <button onClick={() => decrement(i)}>-</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="py-3 px-4 max-sm:hidden flex items-center gap-x-8">
                                            <button onClick={() => increment(i)}>+</button>
                                            <span>{product.quantity}</span>
                                            <button onClick={() => decrement(i)}>-</button>
                                        </div>
                                    </td>
                                    <td className="max-sm:hidden text-center sm:w-28">£{product.quantity * product.price}</td>
                                    <td>
                                        <button 
                                            onClick={() => removeItem(product._id)}
                                            className="text-red-500 hover:text-red-700 transition-colors p-2"
                                            aria-label="Remove item"
                                        >
                                            <FaTrash size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="pt-7 pb-[55px] sm:pb-[48px] w-fit ml-auto">
                        <div className="space-y-3">
                            <div className="flex gap-x-4 items-center w-fit ml-auto">
                                <h4 className="text-[--primary]">Subtotal</h4>
                                <h3 className="text-[--dark-primary]">£{totalAmount()}</h3>
                            </div>
                            <p className="max-sm:whitespace-nowrap max-sm:w-fit ml-auto text-sm text-[--primary]">
                                Taxes and shipping are calculated at checkout
                            </p>
                        </div>
                        
                            <button
                            onClick={handleCheckout}
                                type="button"
                                className="bg-[--dark-primary] max-sm:w-full block w-fit ml-auto text-white py-4 mt-8 sm:mt-4 px-[117px] sm:px-[48px]"
                            > Go to checkout
                            </button>
                       
                    </div>
                </>
            )}
        </div>
    );
};

export default CartProducts;
