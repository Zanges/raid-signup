"use client";

import { logout } from "@/actions/logout";
import { Button } from "../ui/button";

interface LogoutButtonProps {
  children?: React.ReactNode;
  className?: string;
};

export function LogoutButton({
  children,
  className,
}: LogoutButtonProps) {
  const onClick = () => {
    logout()
  };

  return (
    <Button
    variant="ghost"
    asChild
    onClick={onClick}
    className={className}
  >
    {children}
  </Button>
  );
}