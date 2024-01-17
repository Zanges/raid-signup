import NextAuth from "next-auth"

import authConfig from "@/auth.config"
import { 
  puplicRoutes,
  authRoutes,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT,
} from "@/routes"

const { auth } = NextAuth(authConfig)

export default auth((request) => {
  const { nextUrl } = request;
  const isLoggedIn = !!request.auth;

  // console.log("middleware", request);
  // console.log("pathname", nextUrl.pathname);
  // console.log("isLoggedIn", isLoggedIn);

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

  const isPublicRoute = puplicRoutes.includes(nextUrl.pathname);

  if (!isPublicRoute && !isLoggedIn) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return null;
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};