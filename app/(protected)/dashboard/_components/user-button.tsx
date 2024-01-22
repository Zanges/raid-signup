"use client";

import { FaUser } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { LogoutButton } from "@/components/auth/logout-button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ExitIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function UserButton() {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full">
        <div className="text-white text-xl font-bold bg-slate-600 rounded-lg p-2 flex flex-row items-center w-full hover:bg-slate-500">
          <Avatar className="w-12 h-12">
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback className="bg-yellow-700">
              <FaUser className="text-white" />
            </AvatarFallback>
          </Avatar>
          <p className="text-center px-2 w-full">{user?.name}</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        side="top"
        className="w-52"
      >
        <Button
          variant="ghost"
          className="w-full"
          asChild
        >
          <Link
            href="/dashboard/settings"
          >
            <FiSettings className="w-5 h-5" />
            <p
              className="w-full text-center"
            >
              Settings
            </p>
          </Link>
        </Button>
        <LogoutButton
          className="w-full flex flex-row items-center justify-between bg-rose-600/30 hover:bg-rose-400/80" 
        >
          <DropdownMenuItem>
            <ExitIcon className="w-5 h-5" />
            <p
              className="w-full text-center"
            >
              Logout
            </p>
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}