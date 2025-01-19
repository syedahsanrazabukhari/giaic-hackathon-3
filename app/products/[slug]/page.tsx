import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import AddToCartBtn from "@/components/AddToCartBtn";
import AddToWishlistBtn from "@/components/AddToWishlistBtn";

interface Params {
  params: Promise<{ slug: string }>; 
}

export default async function details({ params }: Params) {
  const { slug } = await params;

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

  if (!product || product.length === 0) {
    return <div>Product not found.</div>;
  }

  const currentProduct = product[0];

  return (
    <>
      <Navbar />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Product section */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-start">
          {/* Image gallery */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={currentProduct.imageUrl || '/default-image.jpg'} 
                alt={currentProduct.name}
                fill
                className="object-cover object-center hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            {/* Product header */}
            <div className="flex flex-col border-b border-gray-200 pb-8">
              {currentProduct.category && (
                <p className="text-xl font-medium text-[#5B5676] mb-3">
                  {currentProduct.category.name}
                </p>
              )}
              <h1 className="text-5xl font-bold tracking-tight text-[#2A254B]">
                {currentProduct.name}
              </h1>
              <p className="mt-6 text-4xl font-medium text-[#2A254B]">
                £{currentProduct.price}
              </p>
            </div>

            {/* Product description */}
            <div className="mt-10">
              <h2 className="text-3xl font-medium text-[#2A254B]">Description</h2>
              <p className="mt-5 text-xl text-gray-700 text-justify leading-relaxed">
                {currentProduct.description}
              </p>
            </div>

            {/* Action buttons */}
            <div className="mt-10 space-y-5">
              <AddToCartBtn id={currentProduct._id} />
              <AddToWishlistBtn product={currentProduct} />
            </div>

            {/* Product details */}
            <div className="mt-12 border-t border-gray-200 pt-10">
              <h2 className="text-3xl font-medium text-[#2A254B] mb-8">Product Details</h2>
              
              {/* Dimensions */}
              {currentProduct.dimensions && (
                <div className="mt-8">
                  <h3 className="text-2xl font-medium text-[#2A254B] mb-5">Dimensions</h3>
                  <div className="mt-5 grid grid-cols-3 gap-8 text-xl">
                    <div>
                      <p className="font-medium">Height</p>
                      <p className="text-gray-600">{currentProduct.dimensions.height}</p>
                    </div>
                    <div>
                      <p className="font-medium">Width</p>
                      <p className="text-gray-600">{currentProduct.dimensions.width}</p>
                    </div>
                    <div>
                      <p className="font-medium">Depth</p>
                      <p className="text-gray-600">{currentProduct.dimensions.depth}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Features */}
              {currentProduct.features && currentProduct.features.length > 0 && (
                <div className="mt-10">
                  <h3 className="text-2xl font-medium text-[#2A254B] mb-5">Features</h3>
                  <ul className="mt-5 list-disc list-inside text-xl text-gray-600 space-y-3">
                    {currentProduct.features.map((feature: string, index: number) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags */}
              {currentProduct.tags && currentProduct.tags.length > 0 && (
                <div className="mt-10">
                  <h3 className="text-2xl font-medium text-[#2A254B] mb-5">Tags</h3>
                  <div className="mt-5 flex flex-wrap gap-4">
                    {currentProduct.tags.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-6 py-3 rounded-full text-lg font-medium bg-[#F9F9F9] text-[#2A254B]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
