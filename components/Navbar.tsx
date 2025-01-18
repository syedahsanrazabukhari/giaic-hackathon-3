import Image from "next/image"
import Link from "next/link"
import Category from "./Category"

export default function Navbar() {
    return (
        <nav className="px-6 sm:px-[28px] py-5">
            <div className="flex justify-between items-center sm:pb-5 sm:border-b border-[#0000001a]">
                <div className="flex gap-x-5 max-sm:order-1">
                    <Image src="/nav-search.svg" alt="Image failed" width={16} height={16} />
                    <Image src="/nav-hamburger.svg" alt="Image failed" width={16} height={16} className="sm:hidden" />
                </div>

                <Link href="/"><Image src="/avion-logo.png" alt="Image failed" width={65} height={30} /></Link>

                <div className="flex gap-x-4 max-sm:hidden">
                    <Link href="/about"> <Image src="/about-us-2.jpg" alt="Image-failed" width={30} height={30} /></Link>
                    <Link href="/cart"><Image src="/nav-cart.svg" alt="Image-failed" width={16} height={16} /></Link>
                    <Image src="/nav-user.svg" alt="Image-failed" width={16} height={16} />
                </div>
            </div>
            <Category />
        </nav>
    )
}