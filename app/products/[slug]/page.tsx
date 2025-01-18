import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import AddToCartBtn from "@/components/AddToCartBtn";

interface Params {
  params: Promise<{ slug: string }>; 
}

export default async function details({ params }: Params) {
  const { slug } = await params;

  console.log('Fetching details for product with slug:', slug);

  const product = await client.fetch(
    `*[_type == "product" && slug.current == $slug] {
      _id,
      name,
      slug,
      "imageUrl": image.asset->url,
      price,
      quantity,
      tags,
      description,
      features,
      dimensions {
        height,
        width,
        depth
      },
      category-> {
        name
      }
    }`,
    { slug }
  );

  console.log('Fetched product data:', product);

  if (!product || product.length === 0) {
    return <div>Product not found.</div>;
  }

  const currentProduct = product[0];

  return (
    <>
      <Navbar />
      <section className="sm:flex items-center gap-x-16 py-12 sm:py-24 px-10 max-sm:space-y-6">
        {/* Display product image */}
        <Image
          src={currentProduct.imageUrl || '/default-image.jpg'} 
          alt={currentProduct.name}
          width={305}
          height={375}
          className="w-full"
        />
        <div className="space-y-4 flex flex-col items-start">
          <h1 className="text-[37px] sm:text-[50px]">{currentProduct.name}</h1>

          <p className="text-black text-[20px] text-justify">
            <b>Details:</b> {currentProduct.description}
          </p>

         

          <div className="text-[20px]">
            <b>Tags:</b> {currentProduct.tags.join(", ")}
          </div>

          {currentProduct.dimensions && (
            <div className="text-[20px]">
              <b>Dimensions:</b>
              <p>Height: {currentProduct.dimensions.height}</p>
              <p>Width: {currentProduct.dimensions.width}</p>
              <p>Depth: {currentProduct.dimensions.depth}</p>
            </div>
          )}

          {currentProduct.features && (
            <div className="text-[20px]">
              <b>Features:</b>
              <ul>
                {currentProduct.features.map((feature: string, index: number) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
          {currentProduct.category && (
            <div className="text-[20px]">
              <b>CATEGORY:</b> {currentProduct.category.name}
            </div>
          )}
           <div className="flex gap-x-4 text-[20px]">
            <p className="font-bold">Price:</p>
            <p>£{currentProduct.price}</p>
          </div>

          <AddToCartBtn id={currentProduct._id} />
        </div>
      </section>
      <Footer />
    </>
  );
}
