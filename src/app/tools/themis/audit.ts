import type { Section } from "./rules";
import { validateItemFields } from "./validate";

export type SavedItemState = { status: "todo" | "done" | "na"; fields: Record<string, string | boolean>; na: string };
export type SavedPackage = {
  client?: string;
  lic?: string;
  premise?: string;
  items: Record<string, SavedItemState>;
  savedAt?: string;
  ruleMap?: string;
};

export type DriftKind = "ok" | "na" | "drift" | "new" | "removed" | "incomplete";

export type DriftEntry = {
  id: string;
  cite: string;
  title: string;
  kind: DriftKind;
  message?: string;
};

export type PortfolioResult = {
  fileName: string;
  client: string;
  lic: string;
  premise: string;
  savedAt: string;
  ruleMapAtSave: string;
  entries: DriftEntry[];
  clean: boolean;
  driftCount: number;
  newCount: number;
  removedCount: number;
  incompleteCount: number;
};

const NEEDS_REVIEW: DriftKind[] = ["drift", "new", "removed", "incomplete"];

// The backward compliance pass: re-run a package that was already signed off
// against the rule map as it stands *today*. A statutory floor that moved
// since sign-off (a retention period extended, a resolution floor raised)
// turns a previously "done" requirement into "drift" — the exact scenario a
// rule-change amendment creates. Runs entirely client-side against whatever
// saved packages the operator uploads; there is no server-side portfolio yet
// (see engine.ts) — this proves the mechanism against your own record set.
export function auditPackage(sections: Section[], fileName: string, pkg: SavedPackage): PortfolioResult {
  const currentIds = new Set<string>();
  const entries: DriftEntry[] = [];

  for (const sec of sections) {
    for (const it of sec.items) {
      currentIds.add(it.id);
      const saved = pkg.items?.[it.id];

      if (!saved) {
        entries.push({ id: it.id, cite: it.cite, title: it.title, kind: "new", message: "Added to the rule map since this package was signed off — not yet addressed." });
        continue;
      }

      if (saved.status === "na") {
        entries.push({ id: it.id, cite: it.cite, title: it.title, kind: "na", message: saved.na || "Marked not applicable at sign-off." });
        continue;
      }

      if (saved.status === "todo") {
        entries.push({ id: it.id, cite: it.cite, title: it.title, kind: "incomplete", message: "Left unresolved in the saved package." });
        continue;
      }

      const err = validateItemFields(it, saved.fields || {});
      entries.push(
        err
          ? { id: it.id, cite: it.cite, title: it.title, kind: "drift", message: err }
          : { id: it.id, cite: it.cite, title: it.title, kind: "ok" }
      );
    }
  }

  for (const id of Object.keys(pkg.items || {})) {
    if (!currentIds.has(id)) {
      entries.push({ id, cite: "—", title: id, kind: "removed", message: "This requirement no longer appears in the current rule map (renumbered or removed) — review manually." });
    }
  }

  const driftCount = entries.filter((e) => e.kind === "drift").length;
  const newCount = entries.filter((e) => e.kind === "new").length;
  const removedCount = entries.filter((e) => e.kind === "removed").length;
  const incompleteCount = entries.filter((e) => e.kind === "incomplete").length;

  return {
    fileName,
    client: pkg.client || "[Unnamed client]",
    lic: pkg.lic || "—",
    premise: pkg.premise || "—",
    savedAt: pkg.savedAt || "—",
    ruleMapAtSave: pkg.ruleMap || "unknown",
    entries,
    clean: entries.every((e) => !NEEDS_REVIEW.includes(e.kind)),
    driftCount,
    newCount,
    removedCount,
    incompleteCount,
  };
}

export function needsReview(kind: DriftKind): boolean {
  return NEEDS_REVIEW.includes(kind);
}
