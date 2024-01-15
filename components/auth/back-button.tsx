"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BackButtonProps {
  label: string;
  href: string;
}

export function BackButton({
  label, href
}: BackButtonProps) {
  return (
    <Button
      variant="link"
      size="sm"
      className="w-full font-normal"
      asChild
    >
      <Link href={href}>
        {label}
      </Link>
    </Button>
  );
}