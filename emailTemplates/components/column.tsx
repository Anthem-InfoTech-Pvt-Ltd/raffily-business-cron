import type * as React from "react"

interface ColumnProps {
  children: React.ReactNode
  width?: string
}

export const Column: React.FC<ColumnProps> = ({ children, width = "48%" }) => {
  return (
    <div
      className="column"
      style={{
        width,
      }}
    >
      {children}
    </div>
  )
}

