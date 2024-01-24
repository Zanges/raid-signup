"use client";

import { UserButton } from "@/app/(protected)/dashboard/_components/user-button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navLinks = [
  {
    href: "/dashboard",
    label: "Overview",
  },
  {
    href: "/dashboard/characters",
    label: "Characters",
  },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 h-full bg-slate-800 justify-between items-center p-4">
      <nav
        className="flex flex-col justify-start items-center w-full h-full"
      >
        {navLinks.map(({ href, label }) => (
          <Button
            asChild
            key={cn("nav-link", href)}
            variant={pathname === href ? "default" : "link"}
            className={cn("w-full h-10", {
              "bg-slate-700 hover:bg-slate-600": pathname === href,
              "hover:bg-slate-700 text-white": pathname !== href,
            })}
          >
            <Link
              href={href}
            >
              <div className="flex items-center w-full">
                <span
                  className="ml-1 w-full text-center"
                >
                  {label}
                </span>
              </div>
            </Link>
          </Button>
        ))}
      </nav>

      <UserButton />
    </div>
  );
}