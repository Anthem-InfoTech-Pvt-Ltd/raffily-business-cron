import type * as React from "react"
import { colors, spacing } from "./theme"

interface TextProps {
  children: React.ReactNode
  size?: "small" | "medium" | "large"
  color?: string
  align?: "left" | "center" | "right"
  marginBottom?: string
  bold?: boolean
}

export const Text: React.FC<TextProps> = ({
  children,
  size = "medium",
  color = colors.darkGray,
  align = "left",
  marginBottom = spacing.md,
  bold = false,
}) => {
  let fontSize = "16px"

  switch (size) {
    case "small":
      fontSize = "14px"
      break
    case "large":
      fontSize = "18px"
      break
    default:
      break
  }

  return (
    <p
      style={{
        color,
        fontSize,
        fontWeight: bold ? "bold" : "normal",
        lineHeight: "1.5",
        textAlign: align,
        margin: `0 0 ${marginBottom} 0`,
      }}
    >
      {children}
    </p>
  )
}

