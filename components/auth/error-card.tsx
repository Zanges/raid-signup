import { CardWrapper } from "./card-wrapper";

export function ErrorCard() {
  return (
    <CardWrapper
      headerMainLabel="Login Error"
      headerSubLabel="Something went wrong. Please try again."
      backButtonHref="/auth/login"
      backButtonLabel="Back to Login"
    >
      <p className="text-center text-sm text-muted-foreground">
        If the problem persists, please contact us.
      </p>
    </CardWrapper>
  );
}