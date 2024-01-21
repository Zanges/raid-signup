import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NoCookiesPage() {
  return (
    <div className="flex flex-col justify-center items-center space-y-4 w-full h-full">
      <h1 className="text-4xl font-bold">
        Cookies Required
      </h1>
      <p className="text-lg">
        This website requires cookies and client-side code to function.
      </p>
      <p className="text-lg">
        Please enable cookies and client-side code to be able to use this website.
      </p>
      <div className="h-8" />
      <Button
        className="w-1/2 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-200"
        asChild
        variant="default"
      >
        <Link href="/">
          Back to Home
        </Link>
      </Button>
    </div>
  );
}