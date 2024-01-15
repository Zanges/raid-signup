import { Mukta } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Mukta({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  mainLabel: string;
  subLabel?: string;
}

export function Header({
  mainLabel,
  subLabel,
}: HeaderProps) {
  return (
    <div className="w-full flex flex-col items-center gap-y-4">
      <h1 className={cn(
        "text-5xl font-extrabold", 
        font.className
      )}>
        {mainLabel}
      </h1>
      {subLabel && (
        <p className={cn(
          "text-lg text-muted-foreground",
          font.className
        )}>
          {subLabel}
        </p>
      )}
    </div>
  );
}