import type { Field, Item } from "./rules";

// Shared by the live builder (validating as a rep fills a requirement) and the
// backward compliance pass (re-validating a saved sign-off against the current
// rule map). Same statutory-floor logic either way — a package can't drift
// from what the engine would accept today.
export function validateItemFields(it: Item, fields: Record<string, string | boolean>): string | null {
  for (const f of it.fields) {
    const v = fields[f.k];
    if (f.type === "check") {
      if (!v) return `"${f.label}" is unchecked.`;
      continue;
    }
    if (f.req && (v === undefined || String(v).trim() === "")) {
      return `"${f.label}" is missing.`;
    }
    if (f.type === "number" && v !== undefined && String(v).trim() !== "") {
      const n = parseFloat(String(v));
      if (isNaN(n)) return `"${f.label}" must be a number.`;
      if (f.min !== undefined && n < f.min) return errMsg(f, "min");
      if (f.max !== undefined && n > f.max) return errMsg(f, "max");
    }
  }
  return null;
}

function errMsg(f: Field, kind: "min" | "max"): string {
  if (kind === "min") return f.minMsg || `"${f.label}" is below the statutory floor of ${f.min}.`;
  return f.maxMsg || `"${f.label}" is above the statutory ceiling of ${f.max}.`;
}
