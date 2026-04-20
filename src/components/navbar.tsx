import Link from "next/link";

import { LayoutContainer } from "@/components/layout-container";

const links = [
  { href: "/", label: "Home" },
  { href: "/add-startup", label: "Add Startup" },
];

export function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <LayoutContainer>
        <nav className="flex flex-col gap-3 py-3 sm:h-16 sm:flex-row sm:items-center sm:justify-between sm:py-0">
          <Link href="/" className="text-base font-semibold text-slate-900">
            TRAI Startup Radar
          </Link>
          <ul className="flex w-full items-center gap-2 sm:w-auto">
            {links.map((link) => (
              <li key={link.href} className="flex-1 sm:flex-none">
                <Link
                  href={link.href}
                  className="block rounded-md px-3 py-2 text-center text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 sm:text-left"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </LayoutContainer>
    </header>
  );
}
