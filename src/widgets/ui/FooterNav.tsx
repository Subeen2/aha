import Link from "next/link";

function FooterNav() {
  return (
    <nav>
      <ul className="flex items-center gap-3 font-medium text-[16px] text-gray-3">
        <li>
          <Link href="/"></Link>
        </li>
        <li>|</li>
        <li>
          <Link href="/"></Link>
        </li>
      </ul>
    </nav>
  );
}

export default FooterNav;
