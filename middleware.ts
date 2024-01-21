import NextAuth from "next-auth"

import authConfig from "@/auth.config"
import {
  noCookieRoutes,
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT,
} from "@/routes"

const { auth } = NextAuth(authConfig)

function redirectToNoCookieError(request: any) {
  return Response.redirect(new URL("/error/no-cookies", request.nextUrl))
}

export default auth((request) => {
  const { nextUrl } = request;
  const isLoggedIn = !!request.auth;

  // console.log("middleware", request);

  const isNoCookieRoute = noCookieRoutes.includes(nextUrl.pathname);
  if (!isNoCookieRoute) {
    if (!request.cookies) {
      return redirectToNoCookieError(request);
    }
    
    const consentCookie = request.cookies.get("CookieConsent");
    if (!consentCookie || consentCookie.value !== "true") {
      return redirectToNoCookieError(request);
    }
  }

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  if (isApiAuthRoute) {
    return null;
  }

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  if (!isPublicRoute && !isLoggedIn) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return null;
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};