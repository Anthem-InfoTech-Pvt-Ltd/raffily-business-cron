import type * as React from "react"
import { spacing } from "./theme"

interface StatsContainerProps {
  children: React.ReactNode
  marginBottom?: string
}

export const StatsContainer: React.FC<StatsContainerProps> = ({ children, marginBottom = spacing.lg }) => {
  return (
    <div
      className="stats-container"
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

