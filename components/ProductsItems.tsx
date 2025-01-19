import { client } from "@/sanity/lib/client";
import ProductItemsClient from "./ProductItemsClient";

export default async function ProductItems() {
  const data = await client.fetch(`*[_type == "product"] {
    name,
    "imageUrl": image.asset->url,
    price,
    slug,
    category-> {
      name
    }
  }`);
  console.log(data);


  return <ProductItemsClient products={data} />;
}
