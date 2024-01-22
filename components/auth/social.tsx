import { Separator } from "@/components/ui/separator";
import { SocialButtons } from "./social-buttons";

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
      <SocialButtons />
    </div>
  );
}