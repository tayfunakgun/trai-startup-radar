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
        <nav className="flex h-16 items-center justify-between">
          <Link href="/" className="text-base font-semibold text-slate-900">
            TRAI Startup Radar
          </Link>
          <ul className="flex items-center gap-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
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
