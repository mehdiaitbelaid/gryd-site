"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Hub" },
  { href: "/news", label: "News" },
  { href: "/fhs", label: "FHS" },
];

export function Nav() {
  const path = usePathname();

  return (
    <nav className="nav">
      <span className="mark">Gryd</span>
      {links.map((l) => (
        <Link
          key={l.href}
          className="link"
          href={l.href}
          aria-current={path.startsWith(l.href) ? "page" : undefined}
        >
          {l.label}
        </Link>
      ))}
      <Link className="cta" href="/site-assessment">
        <span className="lg">Request a site assessment</span>
        <span className="sm">Assessment</span>
      </Link>
    </nav>
  );
}
