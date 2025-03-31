import type * as React from "react"
import { colors, spacing, borders } from "./theme"

interface SectionProps {
  children: React.ReactNode
  backgroundColor?: string
  border?: boolean
  padding?: string
  marginBottom?: string
  marginTop?: string
  borderRadius?: string
}

export const Section: React.FC<SectionProps> = ({
  children,
  backgroundColor = colors.white,
  border = false,
  padding = spacing.lg,
  marginBottom = spacing.lg,
  marginTop = "0",
  borderRadius = borders.radius.md,
}) => {
  return (
    <div
      style={{
        backgroundColor,
        padding,
        marginBottom,
        marginTop,
        borderRadius,
        border: border ? `1px solid ${colors.lightGray}` : "none",
      }}
    >
      {children}
    </div>
  )
}

