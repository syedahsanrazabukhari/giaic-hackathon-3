'use client';

import Image from "next/image";
import Link from "next/link";
import { IoHeartOutline, IoHeart } from 'react-icons/io5';
import { useState, useEffect } from 'react';

interface ProductCardProps {
  product: {
    name: string;
    imageUrl: string;
    price: number;
    slug: { current: string };
    _id: string;
  };
}

const getWishlistItems = () => {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem('wishlist') || '[]');
  } catch {
    return [];
  }
};

export default function ProductCard({ product }: ProductCardProps) {
  const [isInWishlist, setIsInWishlist] = useState(() => {
    const wishlist = getWishlistItems();
    return wishlist.some((item: any) => item.id === product._id);
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const wishlist = getWishlistItems();
      setIsInWishlist(wishlist.some((item: any) => item.id === product._id));
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('wishlistUpdate', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('wishlistUpdate', handleStorageChange);
    };
  }, [product._id]);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const wishlist = getWishlistItems();
    
    if (isInWishlist) {
      const updatedWishlist = wishlist.filter((item: any) => item.id !== product._id);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    } else {
      const wishlistItem = {
        id: product._id,
        name: product.name,
        imageUrl: product.imageUrl,
        price: product.price,
        slug: product.slug.current
      };
      localStorage.setItem('wishlist', JSON.stringify([...wishlist, wishlistItem]));
    }

    setIsInWishlist(!isInWishlist);
    
    window.dispatchEvent(new Event('wishlistUpdate'));
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <Link
      href={`/products/${product.slug.current}`}
      className="group flex flex-col gap-2 lg:gap-6 text-[#2A254B] border shadow-xl transition-transform duration-300 hover:z-10 hover:scale-105 rounded-lg relative"
    >
      <Image
        src={product.imageUrl || "/default-image.jpg"}
        alt={product.name}
        width={305}
        height={375}
        className="w-full h-full rounded-t-lg"
      />
      <div className="pl-3 space-y-3 pb-3">
        <h3 className="font-medium">{product.name}</h3>
        <p>£{product.price}</p>
        <button
          onClick={toggleWishlist}
          className="flex items-center gap-2 text-[#2A254B] hover:text-red-500 transition-colors"
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isInWishlist ? (
            <>
              <IoHeart size={20} className="text-red-500" />
              <span className="text-sm">Remove from Wishlist</span>
            </>
          ) : (
            <>
              <IoHeartOutline size={20} />
              <span className="text-sm">Add to Wishlist</span>
            </>
          )}
        </button>
      </div>
    </Link>
  );
}
