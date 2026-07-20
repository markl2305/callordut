import { RULES as STATIC_RULES, type Section } from "./rules";

export type RuleMap = { sections: Section[]; version: string };

// Themis ships with the NM 16.8.2 NMAC rule map baked in statically. Once the
// Themis engine is live on callord.buildwithforge.app (Forge), set
// NEXT_PUBLIC_THEMIS_ENGINE_URL to its rule-map endpoint and the builder starts
// fetching the current version at runtime — the payload shape must match
// { sections: Section[], version: string }. Until that env var is set (or if
// the engine is unreachable), the builder silently falls back to the static
// map below, so the tool always works.
const ENGINE_URL = process.env.NEXT_PUBLIC_THEMIS_ENGINE_URL;

const STATIC_RULE_MAP: RuleMap = {
  sections: STATIC_RULES,
  version: "16.8.2 NMAC — static build (verify against current register before filing)",
};

export async function loadRuleMap(): Promise<RuleMap> {
  if (!ENGINE_URL) return STATIC_RULE_MAP;

  try {
    const res = await fetch(ENGINE_URL, {
      signal: AbortSignal.timeout(4000),
      headers: { accept: "application/json" },
    });
    if (!res.ok) throw new Error(`engine responded ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data?.sections) || !data?.version) {
      throw new Error("unexpected engine payload shape");
    }
    return { sections: data.sections as Section[], version: String(data.version) };
  } catch (err) {
    console.warn("[Themis] Forge engine unavailable, falling back to static rule map:", err);
    return STATIC_RULE_MAP;
  }
}

// ── Server referee ──────────────────────────────────────────────────────────
// The engine, not this browser, decides what counts as compliant. The local
// validator (validate.ts) stays for instant feedback and offline fallback,
// but whenever the engine is reachable its verdict wins. Base URL is derived
// from the rule-map endpoint so no second env var is needed.
const ENGINE_BASE = ENGINE_URL ? ENGINE_URL.split("/rulemaps/")[0] : null;

export type ServerViolation = {
  field_key: string;
  field_label: string;
  violation_message: string;
  citation: string;
};

export type ServerItemVerdict = {
  ok: boolean;
  violation: ServerViolation | null;
  rulemapVersion: string;
} | null; // null = engine unreachable; caller falls back to local validation

export type ServerPackageVerdict = {
  ready: boolean;
  counts: { compliant: number; na: number; open: number; applicable: number };
  items: Array<{ itemId: string; cite: string; status: string; ok: boolean; violation: ServerViolation | null }>;
  rulemapVersion: string;
  verifiedAt: string;
} | null;

// UI license labels → engine license-type slugs
export const LICENSE_TYPE_SLUGS: Record<string, string> = {
  "Retailer (dispensary)": "retailer",
  "Producer (cultivation)": "producer",
  "Manufacturer": "manufacturer",
  "Vertically integrated": "vertically_integrated",
  "Courier": "courier",
};

export async function evaluateItemRemote(
  itemId: string,
  fieldValues: Record<string, string | boolean>
): Promise<ServerItemVerdict> {
  if (!ENGINE_BASE) return null;
  try {
    const res = await fetch(`${ENGINE_BASE}/public/evaluate-item`, {
      method: "POST",
      signal: AbortSignal.timeout(4000),
      headers: { "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({ itemId, fieldValues }),
    });
    if (!res.ok) throw new Error(`engine responded ${res.status}`);
    return (await res.json()) as ServerItemVerdict;
  } catch (err) {
    console.warn("[Themis] engine evaluate unavailable, using local validation:", err);
    return null;
  }
}

export async function verifyPackageRemote(
  licenseLabel: string,
  items: Record<string, { status: "todo" | "done" | "na"; fields: Record<string, string | boolean>; na: string }>
): Promise<ServerPackageVerdict> {
  if (!ENGINE_BASE) return null;
  const payload = {
    licenseType: LICENSE_TYPE_SLUGS[licenseLabel] ?? "retailer",
    items: Object.fromEntries(
      Object.entries(items).map(([id, st]) => [
        id,
        st.status === "done"
          ? { status: "compliant", fieldValues: st.fields }
          : st.status === "na"
            ? { status: "na", justification: st.na }
            : { status: "open" },
      ])
    ),
  };
  try {
    const res = await fetch(`${ENGINE_BASE}/public/verify-package`, {
      method: "POST",
      signal: AbortSignal.timeout(6000),
      headers: { "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`engine responded ${res.status}`);
    return (await res.json()) as ServerPackageVerdict;
  } catch (err) {
    console.warn("[Themis] engine verify unavailable, package is locally validated only:", err);
    return null;
  }
}
