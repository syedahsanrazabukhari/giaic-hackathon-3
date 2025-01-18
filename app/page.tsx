import { client } from "@/sanity/lib/client";
import { IoCheckmarkCircle } from "react-icons/io5";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const data = await client.fetch(`*[_type == "product"] {
    name,
    "imageUrl": image.asset->url,
    price,
    slug
  }`);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div>
        <div className='hidden lg:block lg:bg-heroImage bg-cover bg-center lg:h-[704px] lg:w-full lg:py-[130px] lg:pl-[730px] lg:pr-[80px]'>
          <div className='bg-white pl-[53px] py-[47px]'>
            <div className='mb-[157px]'>
              <h2 className='font-normal text-[32px] leading-[44.8px] text-[#22202E] mb-5'>
                Luxury homeware for people who love timeless design quality
              </h2>
              <p className='font-normal text-[18px] leading-[27px] text-[#5B5676]'>
                Shop the new Spring 2022 collection today
              </p>
            </div>
            <button className='py-4 px-8 flex gap-5 bg-[#F9F9F9] text-[#2A254B]'>
              View collection
            </button>
          </div>
        </div>
        <div className='lg:hidden w-[390px]'>
          <div className='w-[341px] mx-[23px] mt-[47px] mb-8 flex flex-col gap-8'>
            <h2 className='font-normal text-[24px] leading-[29.52px] text-[#22202E]'>
              Luxury homeware for people who love timeless design quality
            </h2>
            <p className='font-normal text-[16px] leading-[21.6px] text-[#5B5676]'>
              With our new collection, view over 400 bespoke pieces from homeware through to furniture today
            </p>
            <Link href="/products">
              <button className='w-full h-[56px] flex items-center justify-center gap-5 bg-[#F9F9F9] text-[#2A254B]'>
                View collection
              </button>
            </Link>
          </div>
          <Image src="/bg-hero.png" alt="Hero Image" width={390} height={304}></Image>
        </div>
      </div>

      {/* Our Services */}
      <div className='px-[24px] py-[49px] lg:py-[80px] lg:px-[82px]'>
        <h4 className='lg:text-center font-normal lg:text-[24px] text-[20px] lg:leading-[33.6px] leading-7 text-[#2A254B]'>
          What makes our brand different
        </h4>

        <div className='mt-[36px] lg:mt-[57px] flex flex-col lg:flex-row lg:gap-[22px] gap-[26px]'>
          {[
            { icon: "/different-1.svg", title: "Next day as standard", description: "Order before 3pm and get your order the next day as standard" },
            { icon: "/different-2.svg", title: "Made by true artisans", description: "Handmade crafted goods made with real passion and craftmanship" },
            { icon: "/different-3.svg", title: "Unbeatable prices", description: "For our materials and quality you won&apos;t find better prices anywhere" },
            { icon: "/different-4.svg", title: "Sustainable sourcing", description: "We use 100% recycled materials to ensure our footprint is more manageable" }
          ].map((item, index) => (
            <div key={index} className='lg:p-[48px] py-[28px] px-6 bg-[#F9F9F9]'>
              <div className='flex flex-col gap-3'>
                <Image src={item.icon} alt={item.title} width={24} height={24}></Image>
                <h4 className='text-[20px] text-[#2A254B] leading-7 font-normal'>{item.title}</h4>
                <p className='text-[16px] text-[#2A254B] leading-6 font-normal'>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Products Section */}
      <div className='w-390 lg:w-full pt-6 pb-7 px-6 lg:px-[80px]'>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[60px]'>
            {data.slice(0,4).map((product: any) => (
              <Link 
                href={product.slug ? `/products/${product.slug.current}` : '#'} // Check if slug exists
                key={product.slug ? product.slug.current : product.name} // Fallback to name if slug is missing
                className='flex flex-col gap-2 lg:gap-6 text-[#2A254B] border shadow-xl transition-transform duration-300 hover:z-10 hover:scale-105  rounded-lg'
              >
                {/* Render image */}
                <Image
                  src={product.imageUrl || '/default-image.jpg'} // Add fallback for missing image
                  alt={product.name}
                  width={305}
                  height={375}
                  className='w-full  h-full '
                />
                <h4 className='text-[14px] lg:text-[20px] leading-5 lg:leading-7 font-normal'>{product.name}</h4>
                <p className='text-[12px] lg:text-[18px] leading-5 lg:leading-7 font-normal'>
                  {product.price ? `£${product.price}` : 'Price not available'}
                </p>
              </Link>
            ))}
          </div>


        <Link href="/products">
          <button className='py-4 px-[100px] mt-10 lg:px-8 mx-auto lg:mt-[48px] lg:mb-3 flex lg:gap-5 gap-[10px] items-center text-[16px] leading-6 font-normal bg-[#F9F9F9] text-[#2A254B]'>
            View collection
          </button>
        </Link>
      </div>

      <Footer />
    </>
  );
}
