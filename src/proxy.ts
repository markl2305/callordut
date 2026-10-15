import { NextResponse, type NextRequest } from "next/server";
import {
  consentRegion,
  isDocumentRequest,
  regionCookieValue,
  REGION_COOKIE,
  REGION_COOKIE_OPTIONS,
} from "../consent-region.mjs";

// Global Privacy Control, header form (compliance P1-1g, Mark 2026-10-12; the hiresabina.ai pattern). A browser
// that sends `Sec-GPC: 1` gets a short-lived `consent_gpc=1` cookie that public/consent/consent.js reads as a
// reject, so no analytics or advertising tag is ever created and no consent bar is shown. When the header stops
// arriving the cookie is cleared.
//
// Consent region (Mark 2026-10-14/15, shared memory 77550c45; mirrors hiresabina's proxy.js at f8ee005): every
// document response also carries the host-only `__Host-consent_region=<ask|default>.<epoch seconds>`, decided from
// Vercel's `x-vercel-ip-country` by consent-region.mjs (copied byte-for-byte from hiresabina). EU/EEA, UK, Swiss and
// unknown-country visitors are `ask` (the ask-first bar); everyone else is `default` (analytics on unless GPC or a
// stored "No"). It is re-set on every document response, so the cookie always describes THIS request, and consent.js
// honours `default` only while it is fresh, so a document that skipped this refresh asks first.
//
// "Every document" is decided by what the browser is fetching (Sec-Fetch-Dest, else Accept: text/html), not by the
// path's shape: any path can render the root layout's 404 document with the gate (/review.missing, /apiculture,
// /api.review, /_next/images ...). So the matcher exempts only the /_next/static/ subtree, and the proxy itself exempts
// only the exact /_next/image optimizer path. Images, scripts, fonts, API calls and other subresources pass through
// untouched. This replaces the earlier GPC-only matcher, which ran only on requests carrying the header or the cookie
// and skipped every path starting "api" or "_next/image".
export function proxy(request: NextRequest) {
  const res = NextResponse.next();
  if (request.nextUrl.pathname === "/_next/image") return res; // the image optimizer itself, exactly; never a document
  if (!isDocumentRequest(request.headers)) return res;
  if (request.headers.get("sec-gpc") === "1") {
    res.cookies.set("consent_gpc", "1", { path: "/", maxAge: 60 * 60 * 24, sameSite: "lax" });
  } else if (request.cookies.has("consent_gpc")) {
    res.cookies.set("consent_gpc", "", { path: "/", maxAge: 0 });
  }
  res.cookies.set(
    REGION_COOKIE,
    regionCookieValue(consentRegion(request.headers.get("x-vercel-ip-country"))),
    REGION_COOKIE_OPTIONS
  );
  return res;
}

export const config = {
  matcher: ["/((?!_next/static/).*)"],
};
