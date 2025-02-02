import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import ProductItems from "@/components/ProductsItems";

export default async function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section
          className="h-[146px] sm:h-[209px] bg-cover bg-center sm:pl-20 pb-8 sm:pb-9 content-end text-white max-sm:text-center"
          style={{ backgroundImage: "url(/product-hero-bg.jpeg)" }}
        >
          <h1>All products</h1>
        </section>

        {/* Categories */}
        <section className="px-6 sm:px-6 py-5 sm:py-2 flex justify-between items-center">
          <ul className="flex gap-x-4 sm:gap-x-3">
            <li className="flex gap-x-2 items-center py-3 px-6 max-sm:hidden">
              <p>Category</p>
              <Image src="/caret-down.svg" alt="Failed to load" width={16} height={16} />
            </li>
            <li className="flex gap-x-2 items-center py-3 px-6 max-sm:hidden">
              <p>Product type</p>
              <Image src="/caret-down.svg" alt="Failed to load" width={16} height={16} />
            </li>
            <li className="flex gap-x-2 items-center py-3 sm:px-6 max-sm:bg-[--light-gray] max-sm:w-full max-sm:shrink-0 max-sm:justify-center">
              <p className="max-sm:hidden">Price</p>
              <p className="sm:hidden">Filters</p>
              <Image src="/caret-down.svg" alt="Failed to load" width={16} height={16} />
            </li>
            <li className="flex gap-x-2 items-center py-3 sm:px-6 max-sm:bg-[--light-gray] max-sm:w-full max-sm:shrink-0 max-sm:justify-center">
              <p className="max-sm:hidden">Brand</p>
              <p className="sm:hidden">Sorting</p>
              <Image src="/caret-down.svg" alt="Failed to load" width={16} height={16} />
            </li>
          </ul>

          <div className="flex items-center gap-x-4 max-sm:hidden">
            <span className="body-sm">Sorting by:</span>
            <div className="flex gap-x-2 items-center py-4 px-6">
              <p>Date added</p>
              <Image src="/caret-down.svg" alt="Failed to load" width={16} height={16} />
            </div>
          </div>
        </section>

        {/* Products */}
        <ProductItems />
      </main>
      <Footer />
    </>
  );
}
