import type { CSSProperties } from "react";
import { SMS_RULE } from "@/lib/sms-consent";

type Props = {
  className?: string;
  style?: CSSProperties;
};

/**
 * The SMS consent rule, verbatim from src/lib/sms-consent.js. The footer,
 * /privacy and /sms-terms all render this, so they cannot disagree.
 */
export function SmsConsentRule({ className, style }: Props) {
  return (
    <p className={className} style={style} data-sms-rule="">
      {SMS_RULE.join(" ")}
    </p>
  );
}
