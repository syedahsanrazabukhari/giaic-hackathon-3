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

  useEffect(() => {
    // Check if product is in wishlist
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setIsInWishlist(wishlist.some((item: any) => item.id === product._id));
  }, [product._id]);

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    if (isInWishlist) {
      // Remove from wishlist
      const updatedWishlist = wishlist.filter((item: any) => item.id !== product._id);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      setIsInWishlist(false);
    } else {
      // Add to wishlist
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
  };

  return (
    <button
      onClick={toggleWishlist}
      className="flex items-center gap-2 py-2 px-4 border border-[#2A254B] text-[#2A254B] hover:bg-[#2A254B] hover:text-white transition-colors rounded-lg"
    >
      {isInWishlist ? <IoHeart size={20} /> : <IoHeartOutline size={20} />}
      {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
    </button>
  );
};

export default AddToWishlistBtn;
