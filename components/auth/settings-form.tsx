import { 
  Card,
  CardHeader,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { SocialButtons } from "@/components/auth/social-buttons";

export function SettingsForm() {
  return (
    <Card className="w-[450px] shadow-md">
      <CardHeader>
        <h1>
          Settings
        </h1>
      </CardHeader>
      <CardContent>
        <div></div>
      </CardContent>
      <CardFooter>
        <SocialButtons />
      </CardFooter>
    </Card>
  );
}