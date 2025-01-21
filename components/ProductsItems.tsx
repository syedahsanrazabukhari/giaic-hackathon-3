import { client } from "@/sanity/lib/client";
import ProductItemsClient from "./ProductItemsClient";
import { Suspense } from "react";

export default async function ProductItems() {
  const data = await client.fetch(`*[_type == "product"] {
    _id,
    name,
    "imageUrl": image.asset->url,
    price,
    slug,
    category-> {
      name
    }
  }`);
  console.log(data);

  return (
    <Suspense fallback={<p>Loading products...</p>}>
      <ProductItemsClient products={data} />
    </Suspense>
  );
}
