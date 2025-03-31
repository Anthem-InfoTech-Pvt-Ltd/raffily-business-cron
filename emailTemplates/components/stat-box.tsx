import type * as React from "react"
import { colors, spacing, borders } from "./theme"

interface StatBoxProps {
  label: string
  value: string | number
  icon?: React.ReactNode
  color?: string
}

export const StatBox: React.FC<StatBoxProps> = ({ label, value, icon, color = colors.primary }) => {
  return (
    <div
      className="stat-box"
      style={{
        backgroundColor: colors.white,
        borderRadius: borders.radius.md,
        padding: spacing.md,
        border: `1px solid ${colors.lightGray}`,
        textAlign: "center",
        width: "30%",
      }}
    >
      <div
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          color,
          marginBottom: spacing.xs,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: "14px",
          color: colors.mediumGray,
        }}
      >
        {label}
      </div>
    </div>
  )
}

