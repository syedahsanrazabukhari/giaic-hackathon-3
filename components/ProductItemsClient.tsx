"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ProductItemsClient({ products }: { products: any[] }) {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");

  console.log("Selected category:", selectedCategory); 

  const filteredProducts = selectedCategory
    ? products.filter((product) => {
        const productCategory = product.category?.name?.toLowerCase();
        const queryCategory = selectedCategory.toLowerCase();
        return productCategory === queryCategory;
      })
    : products;

  console.log("Filtered products:", filteredProducts); 

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[40px] my-20 mx-10">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <Link
            href={product.slug ? `/products/${product.slug.current}` : "#"}
            key={product.name}
            className="flex flex-col gap-2 lg:gap-6 text-[#2A254B] border shadow-xl transition-transform duration-300 hover:z-10 hover:scale-105 rounded-lg"
          >
            <Image
              src={product.imageUrl || "/default-image.jpg"}
              alt={product.name}
              width={305}
              height={375}
              className="w-full h-full"
            />
            <h3 className="pl-3">{product.name}</h3>
            <p className="pl-3 pb-3">£{product.price}</p>
          </Link>
        ))
      ) : (
        <p className="text-center">No products found for the selected category.</p>
      )}
    </div>
  );
}
