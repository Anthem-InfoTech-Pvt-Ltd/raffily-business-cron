import type * as React from "react"
import { colors, spacing } from "./theme"

interface HeadingProps {
  children: React.ReactNode
  level?: 1 | 2 | 3 | 4
  color?: string
  align?: "left" | "center" | "right"
  marginBottom?: string
}

export const Heading: React.FC<HeadingProps> = ({
  children,
  level = 2,
  color = colors.black,
  align = "left",
  marginBottom = spacing.md,
}) => {
  let fontSize = "24px"
  const fontWeight = "bold"
  const lineHeight = "1.2"

  switch (level) {
    case 1:
      fontSize = "28px"
      break
    case 2:
      fontSize = "24px"
      break
    case 3:
      fontSize = "20px"
      break
    case 4:
      fontSize = "18px"
      break
    default:
      break
  }

  return (
    <div
      style={{
        color,
        fontSize,
        fontWeight,
        lineHeight,
        textAlign: align,
        marginTop: "0",
        marginBottom,
      }}
    >
      {children}
    </div>
  )
}

