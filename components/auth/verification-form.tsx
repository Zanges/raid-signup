"use client";

import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { verifyToken } from "@/actions/verify";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export default function VerificationForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("No token provided");
      return;
    }

    verifyToken(token)
      .then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      })
      .catch(() => {
        setError("Something went wrong");
      });
  }, [token]);
  
  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerMainLabel="Email verification"
      headerSubLabel="Confirming your verification"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error &&
          (<BeatLoader />
        )}
        <FormError errorMessage={error} />
        <FormSuccess successMessage={success} />
      </div>
    </CardWrapper>
  );
}