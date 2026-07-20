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
