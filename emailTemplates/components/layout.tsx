import type * as React from "react"
import { colors, fonts, spacing } from "./theme"
import { Header } from "./header"
import { Footer } from "./footer"

interface LayoutProps {
  children: React.ReactNode
  preview?: string
  title?: string
  hideHeader?: boolean
  hideFooter?: boolean
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  preview,
  title = "Raffily",
  hideHeader = false,
  hideFooter = false,
}) => {
  return (
    <html>
      <head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />
        <style
          dangerouslySetInnerHTML={{
            __html: `
          @media only screen and (max-width: 600px) {
            .main-container {
              width: 100% !important;
              padding: ${spacing.md} !important;
            }
            .content {
              padding: ${spacing.md} !important;
            }
            .header {
              padding: ${spacing.md} ${spacing.md} 0 ${spacing.md} !important;
            }
            .footer {
              padding: 0 ${spacing.md} ${spacing.md} ${spacing.md} !important;
            }
            .stats-container {
              display: block !important;
            }
            .stat-box {
              width: 100% !important;
              margin-bottom: ${spacing.md} !important;
            }
            .two-column {
              display: block !important;
            }
            .column {
              width: 100% !important;
              margin-bottom: ${spacing.md} !important;
            }
          }
        `,
          }}
        />
      </head>
      <body
        style={{
          margin: "0",
          padding: "0",
          backgroundColor: "#f9fafb",
          fontFamily: fonts.sans,
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          color: colors.black,
          lineHeight: "1.5",
        }}
      >
        {preview && (
          <div
            style={{
              display: "none",
              overflow: "hidden",
              lineHeight: "1px",
              opacity: "0",
              maxHeight: "0",
              maxWidth: "0",
            }}
          >
            {preview}
          </div>
        )}
        <div
          className="main-container"
          style={{
            backgroundColor: colors.white,
            margin: "40px auto",
            padding: "0",
            maxWidth: "600px",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
        >
          {!hideHeader && <Header />}
          <div
            className="content"
            style={{
              padding: spacing.xl,
            }}
          >
            {children}
          </div>
          {!hideFooter && <Footer />}
        </div>
      </body>
    </html>
  )
}

