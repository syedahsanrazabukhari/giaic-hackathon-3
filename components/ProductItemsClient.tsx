"use client";

import { useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";

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
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-[40px] my-20 mx-10">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))
      ) : (
        <p className="text-center">No products found for the selected category.</p>
      )}
    </div>
  );
}
