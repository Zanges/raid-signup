"use client";

import { BiLogoDiscord } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { providerLogin } from "@/actions/login";

export function SocialButtons() {
  return (
    <div className="flex flex-col items-center w-full gap-y-2">
      <div className="flex items-center w-full gap-x-2 justify-center">
        <Button
          variant="ghost"
          size="icon"
          className="flex items-center justify-center w-14 h-14"
          onClick={() => providerLogin("google")}
        >
          <FcGoogle size={52} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="flex items-center justify-center w-14 h-14"
          onClick={() => providerLogin("discord")}
        >
          <BiLogoDiscord size={52} color="rgb(88, 101, 242)" />
        </Button>
      </div>
    </div>
  );
}