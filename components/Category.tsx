import Link from "next/link";

export default function Category() {
  return (
    <>
      <ul className="flex gap-x-11 text-[#726E8D] justify-center pt-5 max-sm:hidden">
        <li>
          <Link href="/products?category=plant-pots">Plant pots</Link>
        </li>
        <li>
          <Link href="/products?category=ceramic">Cerami</Link>
        </li>
        <li>
          <Link href="/products?category=tables">Tables</Link>
        </li>
        <li>
          <Link href="/products?category=chairs">Chairs</Link>
        </li>
        <li>
          <Link href="/products?category=crockery">Crockery</Link>
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
