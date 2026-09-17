"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { SEGMENTS } from "@/lib/sms-consent";

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  textStyle?: CSSProperties;
  linkStyle?: CSSProperties;
  className?: string;
  linkClassName?: string;
};

/**
 * SMS consent — its own affirmative act, unchecked by default (the parent
 * starts `checked` at false and nothing here defaults it). Wording comes from
 * src/lib/sms-consent.js so the rendered text equals the stored evidence.
 */
export function SmsConsentCheckbox({ checked, onChange, textStyle, linkStyle, className, linkClassName }: Props) {
  return (
    <label className={className} style={{ display: "flex", gap: 10, alignItems: "flex-start", cursor: "pointer", ...textStyle }}>
      <input
        type="checkbox"
        name="smsConsent"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{ marginTop: 3, flexShrink: 0 }}
      />
      <span>
        {SEGMENTS.map((s, i) =>
          s.href ? (
            <Link key={i} href={s.href} className={linkClassName} style={linkStyle} target="_blank">
              {s.text}
            </Link>
          ) : (
            <span key={i}>{s.text}</span>
          )
        )}
      </span>
    </label>
  );
}
