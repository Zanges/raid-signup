"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function RedirectHomeButton() {
  return (
    <Button
      className="w-1/2"
      asChild
      variant="link"
    >
      <Link href="/">
        Back to Home
      </Link>
    </Button>
  );
}