"use client";

import { UserButton } from "@/app/(protected)/dashboard/_components/user-button";

export function Navbar() {
  return (
    <div className="flex flex-col w-64 h-full bg-slate-800 justify-between items-center p-4">
      <div />
      <UserButton />
    </div>
  );
}