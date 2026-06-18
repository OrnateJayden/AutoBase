import Link from "next/link";
import { APP_NAME, NAV_LINKS } from "@/lib/constants";

export default function Header() {
  return (
    <header className="bg-navy-dark border-b border-gray-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-extrabold tracking-tight">
              <span className="text-white">AUTO</span>
              <span className="text-accent-yellow mx-1">★</span>
              <span className="text-accent-red">BASE</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white
                           hover:bg-navy-light rounded-lg transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="md:hidden">
            <details className="relative">
              <summary className="list-none cursor-pointer p-2 text-gray-300 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </summary>
              <div className="absolute right-0 mt-2 w-48 bg-navy-light border border-gray-700 rounded-lg shadow-xl py-2">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-navy"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
}
