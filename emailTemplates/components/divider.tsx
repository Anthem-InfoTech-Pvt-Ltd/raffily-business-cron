import type * as React from "react"
import { colors, spacing } from "./theme"

interface DividerProps {
  marginTop?: string
  marginBottom?: string
  color?: string
}

export const Divider: React.FC<DividerProps> = ({
  marginTop = spacing.md,
  marginBottom = spacing.md,
  color = colors.lightGray,
}) => {
  return (
    <div
      style={{
        height: "1px",
        width: "100%",
        backgroundColor: color,
        margin: `${marginTop} 0 ${marginBottom} 0`,
      }}
    />
  )
}

