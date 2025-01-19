'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { IoTrashOutline } from 'react-icons/io5';

interface WishlistItem {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  slug: string;
}

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    // Load wishlist from localStorage when component mounts
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist));
    }
  }, []);

  const removeFromWishlist = (id: string) => {
    const updatedWishlist = wishlistItems.filter(item => item.id !== id);
    setWishlistItems(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen px-4 py-8 lg:px-[82px]">
        <h1 className="text-2xl lg:text-3xl font-normal text-[#2A254B] mb-8">My Wishlist</h1>
        
        {wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600 mb-4">Your wishlist is empty</p>
            <Link href="/products">
              <button className="py-4 px-8 bg-[#F9F9F9] text-[#2A254B] hover:bg-[#2A254B] hover:text-white transition-colors">
                Browse Products
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="border p-4 rounded-lg">
                <div className="relative aspect-square mb-4">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-lg font-medium mb-2">{item.name}</h3>
                <p className="text-[#2A254B] mb-4">${item.price}</p>
                <div className="flex justify-between items-center">
                  <Link href={`/products/${item.slug}`}>
                    <button className="py-2 px-4 bg-[#F9F9F9] text-[#2A254B] hover:bg-[#2A254B] hover:text-white transition-colors">
                      View Details
                    </button>
                  </Link>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="p-2 text-red-500 hover:text-red-700"
                    aria-label="Remove from wishlist"
                  >
                    <IoTrashOutline size={24} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;