'use client';

import Image from "next/image"
import Link from "next/link"
import Category from "./Category"
import { IoHeartOutline } from 'react-icons/io5';
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import LoginIn from "./LoginIn";

interface Product {
    _id: string;
    name: string;
    slug: { current: string };
    imageUrl: string;
    price: number;
}

const Navbar = () => {
    const [wishlistCount, setWishlistCount] = useState<number>(0);
    const [cartCount, setCartCount] = useState<number>(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
        const updateCounts = () => {
            if (typeof window !== 'undefined') {
                try {
                    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
                    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                    setWishlistCount(wishlist.length);
                    setCartCount(cart.length);
                } catch (error) {
                    console.error('Error reading from localStorage:', error);
                    setWishlistCount(0);
                    setCartCount(0);
                }
            }
        };

        window.addEventListener('cartUpdate', updateCounts);
        window.addEventListener('wishlistUpdate', updateCounts);

        updateCounts();

        return () => {
            window.removeEventListener('cartUpdate', updateCounts);
            window.removeEventListener('wishlistUpdate', updateCounts);
        };
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const searchProducts = async () => {
            if (searchTerm.trim().length < 2) {
                setSearchResults([]);
                return;
            }

            try {
                const query = `*[_type == "product" && name match "*${searchTerm}*"] {
                    _id,
                    name,
                    "imageUrl": image.asset->url,
                    price,
                    "slug": slug.current
                }[0...5]`;

                const results = await client.fetch(query);
                setSearchResults(results);
            } catch (error) {
                console.error('Error searching products:', error);
                setSearchResults([]);
            }
        };

        const debounceTimer = setTimeout(searchProducts, 300);
        return () => clearTimeout(debounceTimer);
    }, [searchTerm, mounted]);

    if (!mounted) {
        return (
            <nav className="px-6 sm:px-[28px] py-5">
                <div className="flex justify-between items-center sm:pb-5 sm:border-b border-[#0000001a]">
                    <Link href="/"><Image src="/avion-logo.png" alt="Image failed" width={65} height={30} /></Link>
                </div>
            </nav>
        );
    }

    const handleProductClick = (product: Product) => {
        console.log('Clicked product:', product);
        setShowResults(false);
        setSearchTerm('');
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <nav className="px-6 sm:px-[28px] py-5">
            <div className="flex justify-between items-center sm:pb-5 sm:border-b border-[#0000001a]">
                <div className="flex gap-x-5 max-sm:order-1 relative">
                    <div className="flex items-center bg-slate-200 rounded-full px-3 py-3 border border-transparent focus-within:border-black">
                        <Image src="/nav-search.svg" alt="Search Icon" width={16} height={16} className="mr-2" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent focus:outline-none text-sm w-full"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setShowResults(true);
                            }}
                            onFocus={() => setShowResults(true)}
                            onBlur={() => setShowResults(false)}
                        />
                    </div>
                    {showResults && searchResults.length > 0 && (
                        <div
                            className="absolute top-full left-0 mt-2 w-[300px] bg-white rounded-lg shadow-lg z-50 border border-gray-200"
                            onMouseDown={(e) => e.preventDefault()} // Prevent onBlur from firing before click
                        >
                            {searchResults.map((product) => (
                                <Link
                                    key={product._id}
                                    href={`/products/${product.slug}`}
                                    className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors cursor-pointer"
                                    onClick={() => handleProductClick(product)}
                                >
                                    <div className="relative w-12 h-12">
                                        <Image
                                            src={product.imageUrl || '/default-image.jpg'}
                                            alt={product.name}
                                            fill
                                            className="object-cover rounded"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                                        <p className="text-sm text-gray-500">£{product.price}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                    <Image src="/nav-hamburger.svg" alt="Image failed" width={16} height={16} className="sm:hidden" onClick={toggleDropdown} />
                    {dropdownOpen && (
                        <div className="absolute top-full right-0 mt-2 w-[150px] bg-white rounded-lg shadow-lg z-50 border border-gray-200">
                            <Link href="/cart" className="block p-3 hover:bg-gray-50 transition-colors">Cart</Link>
                            <Link href="/wishlist" className="block p-3 hover:bg-gray-50 transition-colors">Wishlist</Link>
                            <Link href="/about" className="block p-3 hover:bg-gray-50 transition-colors">About Us</Link>
                            <LoginIn />
                        </div>
                    )}
                </div>

                <Link href="/"><Image src="/avion-logo.png" alt="Image failed" width={65} height={30} /></Link>

                <div className="flex gap-x-4 max-sm:hidden items-center">
                    <Link href="/about">
                        <Image src="/about-us-2.jpg" alt="Image-failed" width={30} height={30} />
                    </Link>
                    <Link href="/wishlist" className="relative">
                        <IoHeartOutline size={22} className="text-[#2A254B]" />
                        {wishlistCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-[#2A254B] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                {wishlistCount}
                            </span>
                        )}
                    </Link>
                    <Link href="/cart" className="relative">
                        <Image src="/nav-cart.svg" alt="Image-failed" width={16} height={16} />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-[#2A254B] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                    <LoginIn />
                </div>
            </div>
            <div className="categories-container overflow-x-auto whitespace-nowrap">
                <Category />
            </div>
        </nav>
    )
}

export default Navbar;