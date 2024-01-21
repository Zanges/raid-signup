"use client";

import { Button } from "@/components/ui/button";
import CookieConsent, { resetCookieConsentValue } from "react-cookie-consent";

export function CookieConsentWrapper() {
  return (
    <CookieConsent
      overlay
      disableStyles={true}
      ButtonComponent={Button}
      enableDeclineButton
      flipButtons

      buttonText="Accept"
      declineButtonText="Decline"
      
      overlayClasses="fixed z-50 inset-0 flex flex-col justify-center items-center bg-black bg-opacity-40"
      containerClasses="flex flex-col justify-center items-center bg-white text-cyan-950 dark:bg-cyan-950 dark:text-white rounded-lg shadow-lg p-8"
      buttonWrapperClasses="flex flex-row justify-center w-full space-x-8 mt-12"

      buttonClasses="bg-green-800 dark:text-gray-950 dark:bg-green-500 hover:bg-teal-600 focus:ring-green-200"
      declineButtonClasses="bg-red-900 dark:text-gray-950 dark:bg-red-700 hover:bg-rose-700 dark:hover:bg-rose-900 focus:ring-red-200"
    >
      {/* center text horizontally and vertically */}
      <div className="flex flex-col justify-center items-center space-y-4">
        <h1 className="text-4xl font-bold">
          Cookie Consent
        </h1>
        <p className="text-lg">
          This website requires cookies and client-side code to function.
        </p>
        <p className="text-lg">
          Do you consent to the use of cookies and client-side code?
        </p>
        <p
          className="text-sm pt-8"
        >
          You can withdraw your consent at any time by clicking the &quot;Cookie Consent&quot; button below.
        </p>
      </div>
    </CookieConsent>
  );
}

export function CookieConsentButton() {
  return (
    <Button
      className='h-3/4 top-1/4'
      onClick={() => {
        resetCookieConsentValue()
        window.location.reload()
      }}
    >
      Cookie Consent
    </Button>
  );
}