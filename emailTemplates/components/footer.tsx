import type * as React from "react"
import { colors, spacing } from "./theme"

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <div
      className="footer"
      style={{
        padding: `${spacing.xl} ${spacing.xl} ${spacing.xl} ${spacing.xl}`,
        borderTop: `1px solid ${colors.lightGray}`,
        textAlign: "center",
        color: colors.mediumGray,
        fontSize: "14px",
        lineHeight: "24px",
      }}
    >
      <div style={{ marginBottom: spacing.md }}>
        <div style={{ display: "flex", justifyContent: "center", gap: spacing.md, marginBottom: spacing.md }}>
          <a href="https://raffily.com/help" style={{ color: colors.primary, textDecoration: "none" }}>
            Help Center
          </a>
          <span style={{ color: colors.lightGray }}>|</span>
          <a href="https://raffily.com/terms" style={{ color: colors.primary, textDecoration: "none" }}>
            Terms
          </a>
          <span style={{ color: colors.lightGray }}>|</span>
          <a href="https://raffily.com/privacy" style={{ color: colors.primary, textDecoration: "none" }}>
            Privacy
          </a>
        </div>
        <p style={{ margin: "0 0 8px 0" }}>© {currentYear} Raffily. All rights reserved.</p>
        <p style={{ margin: "0" }}>
          If you have any questions, please contact us at{" "}
          <a href="mailto:support@raffily.com" style={{ color: colors.primary, textDecoration: "none" }}>
            support@raffily.com
          </a>
        </p>
      </div>
      <div
        style={{
          fontSize: "12px",
          color: colors.mediumGray,
          marginTop: spacing.lg,
        }}
      >
        <p style={{ margin: "0 0 8px 0" }}>Raffily Inc., 123 Raffle Street, San Francisco, CA 94103</p>
        <p style={{ margin: "0" }}>
          <a href="https://raffily.com/unsubscribe" style={{ color: colors.mediumGray, textDecoration: "underline" }}>
            Unsubscribe
          </a>
          {" • "}
          <a href="https://raffily.com/preferences" style={{ color: colors.mediumGray, textDecoration: "underline" }}>
            Email Preferences
          </a>
        </p>
      </div>
    </div>
  )
}

