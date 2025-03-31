import type * as React from "react"
import { colors, spacing, borders } from "./theme"

interface ButtonProps {
  href: string
  children: React.ReactNode
  variant?: "primary" | "secondary" | "accent" | "outline"
  fullWidth?: boolean
  size?: "small" | "medium" | "large"
}

export const Button: React.FC<ButtonProps> = ({
  href,
  children,
  variant = "primary",
  fullWidth = false,
  size = "medium",
}) => {
  // Define styles based on variant
  let backgroundColor = colors.primary
  let textColor = colors.white
  let borderColor = colors.primary

  switch (variant) {
    case "secondary":
      backgroundColor = colors.secondary
      borderColor = colors.secondary
      break
    case "accent":
      backgroundColor = colors.accent
      textColor = colors.black
      borderColor = colors.accent
      break
    case "outline":
      backgroundColor = "transparent"
      textColor = colors.primary
      borderColor = colors.primary
      break
    default:
      break
  }

  // Define padding based on size
  let padding = `${spacing.sm} ${spacing.lg}`
  let fontSize = "16px"

  switch (size) {
    case "small":
      padding = `${spacing.xs} ${spacing.md}`
      fontSize = "14px"
      break
    case "large":
      padding = `${spacing.md} ${spacing.xl}`
      fontSize = "18px"
      break
    default:
      break
  }

  return (
    <a
      href={href}
      target="_blank"
      style={{
        display: fullWidth ? "block" : "inline-block",
        width: fullWidth ? "100%" : "auto",
        backgroundColor,
        color: textColor,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        fontWeight: "bold",
        fontSize,
        textDecoration: "none",
        textAlign: "center",
        borderRadius: borders.radius.md,
        padding,
        margin: `${spacing.md} 0`,
        border: `1px solid ${borderColor}`,
        boxSizing: "border-box",
      }}
      rel="noreferrer"
    >
      {children}
    </a>
  )
}

