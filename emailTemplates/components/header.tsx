import type * as React from "react"
import { colors, spacing } from "./theme"

export const Header: React.FC = () => {
  return (
    <div
      className="header"
      style={{
        textAlign: "center",
        padding: `${spacing.xl} ${spacing.xl} 0 ${spacing.xl}`,
        borderBottom: `1px solid ${colors.lightGray}`,
        marginBottom: spacing.lg,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: spacing.md,
        }}
      >
        <div
          style={{
            backgroundColor: colors.primary,
            color: colors.white,
            fontWeight: "bold",
            padding: `${spacing.sm} ${spacing.md}`,
            borderRadius: "6px",
            fontSize: "24px",
            letterSpacing: "-0.5px",
          }}
        >
          Raffily
        </div>
      </div>
    </div>
  )
}

