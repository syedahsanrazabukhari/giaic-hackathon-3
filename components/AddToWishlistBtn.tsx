'use client';

import React, { useState, useEffect } from 'react';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';

interface AddToWishlistBtnProps {
  product: {
    _id: string;
    name: string;
    imageUrl: string;
    price: number;
    slug: { current: string };
  };
}

const AddToWishlistBtn: React.FC<AddToWishlistBtnProps> = ({ product }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      try {
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        setIsInWishlist(wishlist.some((item: any) => item.id === product._id));
      } catch (error) {
        console.error('Error reading wishlist:', error);
        setIsInWishlist(false);
      }
    }
  }, [product._id]);

  const toggleWishlist = () => {
    if (!mounted) return;
    
    try {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      
      if (isInWishlist) {
        const updatedWishlist = wishlist.filter((item: any) => item.id !== product._id);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        setIsInWishlist(false);
      } else {
        const wishlistItem = {
          id: product._id,
          name: product.name,
          imageUrl: product.imageUrl,
          price: product.price,
          slug: product.slug.current
        };
        const updatedWishlist = [...wishlist, wishlistItem];
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        setIsInWishlist(true);
      }

      window.dispatchEvent(new Event('wishlistUpdate'));
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

  if (!mounted) {
    return (
      <button className="flex items-center gap-2 py-2 px-4 border border-[#2A254B] text-[#2A254B] hover:bg-[#2A254B] hover:text-white transition-colors rounded-lg">
        <IoHeartOutline size={20} />
        <span className="text-sm">Add to Wishlist</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleWishlist}
      className="flex items-center gap-2 py-2 px-4 border border-[#2A254B] text-[#2A254B] hover:bg-[#2A254B] hover:text-white transition-colors rounded-lg"
      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      {isInWishlist ? <IoHeart size={20} className="text-red-500" /> : <IoHeartOutline size={20} />}
      <span className="text-sm">{isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
    </button>
  );
};

export default AddToWishlistBtn;
