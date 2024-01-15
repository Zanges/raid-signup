"use client";

import { BiLogoDiscord } from "react-icons/bi";
import { Button } from "@/components/ui/button";

export function Social() {
  return (
    <div className="flex items-center w-full gap-x-2 justify-center">
      <Button
        variant="ghost"
        size="icon"
        className="flex items-center justify-center w-14 h-14"
        onClick={() => {}}
      >
        <BiLogoDiscord size={52} color="rgb(88, 101, 242)" />
      </Button>
    </div>
  );
}