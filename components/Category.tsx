import Link from "next/link";

export default function Category() {
  return (
    <>
      <ul className="flex gap-x-11 text-[#726E8D] justify-center pt-10 sm:pt-5 max-sm:overflow-scroll max-sm:pl-[350px] max-sm:pr-10 ">
        <li>
          <Link href="/products?category=plant%20pots">Plant pots</Link>
        </li>
        <li>
          <Link href="/products?category=ceramics">Ceramics</Link>
        </li>
        <li>
          <Link href="/products?category=tables">Tables</Link>
        </li>
        <li>
          <Link href="/products?category=chairs">Chairs</Link>
        </li>
        <li>
          <Link href="/products?category=crockory">Crockory</Link>
        </li>
        <li>
          <Link href="/products?category=tableware">Tableware</Link>
        </li>
        <li>
          <Link href="/products?category=cutlery">Cutlery</Link>
        </li>
      </ul>
    </>
  );
}
