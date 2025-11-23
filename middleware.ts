import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // routers without authentication
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get("auth_token")?.value;
  const isProtectedPath = ["/profile", "/map"].includes(pathname);
  if (isProtectedPath) {
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      // TODO after loging in, redirect to original page
      // url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }

    // TODO verify jwt, if expired or invalid, redirect to login. Browser does not send cookie after it expires.
    // So in this case, jwt never expire since its expire date is same as cookie (7 days)
  }

  if (token && pathname.startsWith("/login")) {
    // if user has already loged in and visit login page, redirect to "/map"
    return NextResponse.redirect(new URL("/map", request.url));
  }

  return NextResponse.next();
}
