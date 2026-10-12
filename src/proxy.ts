import { NextResponse, type NextRequest } from "next/server";

// Global Privacy Control, header form (compliance P1-1g, Mark 2026-10-12; the hiresabina.ai pattern). A browser
// that sends `Sec-GPC: 1` gets a short-lived `consent_gpc=1` cookie that public/consent/consent.js reads as a
// reject, so no analytics or advertising tag is ever created and no consent bar is shown. When the header stops
// arriving the cookie is cleared. The matcher runs this ONLY on requests that carry the header, or that carry the
// cookie without it, so every other request is untouched.
// Unlike hiresabina's first version, dotted paths are NOT excluded: its review (anvil r1 F1) found a static HTML
// alias with a dot in its path skipped the proxy and so missed the signal. Only API and Next's own assets are out.
export function proxy(request: NextRequest) {
  const res = NextResponse.next();
  if (request.headers.get("sec-gpc") === "1") {
    res.cookies.set("consent_gpc", "1", { path: "/", maxAge: 60 * 60 * 24, sameSite: "lax" });
  } else if (request.cookies.has("consent_gpc")) {
    res.cookies.set("consent_gpc", "", { path: "/", maxAge: 0 });
  }
  return res;
}

export const config = {
  matcher: [
    { source: "/((?!api|_next/static|_next/image).*)", has: [{ type: "header", key: "sec-gpc", value: "1" }] },
    {
      source: "/((?!api|_next/static|_next/image).*)",
      has: [{ type: "cookie", key: "consent_gpc" }],
      missing: [{ type: "header", key: "sec-gpc", value: "1" }],
    },
  ],
};
