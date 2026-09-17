import { type NextRequest, NextResponse } from "next/server";

// Можем получать куки пользователя и на какой url он зашел
export default function proxy(request: NextRequest) {
  const url = request.nextUrl;

  const requestHeaders = new Headers(request.headers);

  requestHeaders.set("x-pathname", url.pathname);

  if (url.pathname.startsWith("/dashboard")) {
    const targetUrl = new URL("/auth/login", request.url);

    return NextResponse.redirect(targetUrl);
  }

  if (url.pathname === "/store/legacy") {
    const targetUrl = new URL("/store/modern", request.url);

    return NextResponse.rewrite(targetUrl, {
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
