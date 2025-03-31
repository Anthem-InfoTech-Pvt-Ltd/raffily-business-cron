import type * as React from "react"
import { spacing } from "./theme"

interface TwoColumnProps {
  children: React.ReactNode
  marginBottom?: string
}

export const TwoColumn: React.FC<TwoColumnProps> = ({ children, marginBottom = spacing.lg }) => {
  return (
    <div
      className="two-column"
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom,
      }}
    >
      {children}
    </div>
  )
}

