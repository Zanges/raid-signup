"use client";

import { BiLogoDiscord } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function Social() {
  return (
    <div className="flex flex-col items-center w-full gap-y-2">
      <div className="flex items-center w-full gap-x-2 justify-center">
        <Separator orientation="horizontal" className="w-20 bg-muted-foreground/70" />
        <span className="text-md font-medium text-muted-foreground">
          OR
        </span>
        <Separator orientation="horizontal" className="w-20 bg-muted-foreground/70" />
      </div>
      <span className="text-sm font-medium text-muted-foreground">
        Sign in with
      </span>
      <div className="flex items-center w-full gap-x-2 justify-center">
      <Button
          variant="ghost"
          size="icon"
          className="flex items-center justify-center w-14 h-14"
          onClick={() => {}}
        >
          <FcGoogle size={52} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="flex items-center justify-center w-14 h-14"
          onClick={() => {}}
        >
          <BiLogoDiscord size={52} color="rgb(88, 101, 242)" />
        </Button>
      </div>
    </div>
  );
}