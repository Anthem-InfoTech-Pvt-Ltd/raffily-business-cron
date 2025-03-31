import type * as React from "react"
import { Layout } from "./components/layout"
import { Button } from "./components/button"
import { Heading } from "./components/heading"
import { Text } from "./components/text"
import { Section } from "./components/section"
import { Divider } from "./components/divider"
import { colors } from "./components/theme"
import { StatsContainer } from "./components/stats-container"
import { StatBox } from "./components/stat-box"

interface RaffleEndingSoonEmailProps {
  name: string
  businessName: string
  raffleName: string
  raffleUrl: string
  dashboardUrl: string
  hoursLeft: number
  currentEntries: number
  targetEntries: number
  socialShareUrl: string
}

export const RaffleEndingSoonEmail: React.FC<RaffleEndingSoonEmailProps> = ({
  name,
  businessName,
  raffleName,
  raffleUrl,
  dashboardUrl,
  hoursLeft,
  currentEntries,
  targetEntries,
  socialShareUrl,
}) => {
  // Calculate percentage of target reached
  const percentageReached = Math.round((currentEntries / targetEntries) * 100)
  const isTargetReached = percentageReached >= 100

  return (
    <Layout preview={`URGENT: Your raffle "${raffleName}" ends in ${hoursLeft} hours!`}>
      {/* Hero Section */}
      <Section backgroundColor={colors.warning} padding="32px" marginBottom="32px" borderRadius="8px">
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              backgroundColor: colors.white,
              borderRadius: "50%",
              width: "64px",
              height: "64px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px auto",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{
                fontSize: "32px",
                lineHeight: "1",
              }}
            >
              ⏰
            </div>
          </div>
          <Heading level={1} align="center" color={colors.white}>
            {hoursLeft} Hours Left!
          </Heading>
          <Text align="center" size="large" color={colors.white}>
            Your raffle is ending soon
          </Text>
        </div>
      </Section>

      {/* Main Content */}
      <Text>Hi {name},</Text>

      <Text>
        This is an important reminder that your raffle <strong>"{raffleName}"</strong> will be ending in{" "}
        <strong>{hoursLeft} hours</strong>. Now is the perfect time for one final push to maximize entries!
      </Text>

      <StatsContainer>
        <StatBox label="Hours Left" value={hoursLeft} color={colors.warning} />
        <StatBox label="Current Entries" value={currentEntries} color={colors.secondary} />
        <StatBox
          label="Target %"
          value={`${percentageReached}%`}
          color={isTargetReached ? colors.success : colors.primary}
        />
      </StatsContainer>

      <Section
        backgroundColor={isTargetReached ? colors.success : colors.warning}
        padding="24px"
        marginBottom="24px"
        borderRadius="8px"
      >
        <Heading level={3} color={colors.white} align="center">
          {isTargetReached ? "Congratulations! You've reached your target entries!" : "Final Push Needed!"}
        </Heading>
        <Text align="center" color={colors.white} marginBottom="0">
          {isTargetReached
            ? "Your raffle has been a success! Let's finish strong with even more entries."
            : `You're at ${percentageReached}% of your target. Let's make one final push to reach your goal!`}
        </Text>
      </Section>

      <Heading level={3}>Last-Minute Promotion Strategies:</Heading>

      <div style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", marginBottom: "16px" }}>
          <div
            style={{
              fontSize: "24px",
              lineHeight: "1",
              marginRight: "12px",
              marginTop: "2px",
            }}
          >
            🔥
          </div>
          <div>
            <Text bold={true} marginBottom="4px">
              Create Urgency
            </Text>
            <Text size="small" marginBottom="0">
              Share a "Last Chance" post on all your social channels highlighting the deadline.
            </Text>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-start", marginBottom: "16px" }}>
          <div
            style={{
              fontSize: "24px",
              lineHeight: "1",
              marginRight: "12px",
              marginTop: "2px",
            }}
          >
            📱
          </div>
          <div>
            <Text bold={true} marginBottom="4px">
              Use Stories & Live Video
            </Text>
            <Text size="small" marginBottom="0">
              Create Instagram/Facebook stories or go live to remind followers about the raffle ending.
            </Text>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <div
            style={{
              fontSize: "24px",
              lineHeight: "1",
              marginRight: "12px",
              marginTop: "2px",
            }}
          >
            📧
          </div>
          <div>
            <Text bold={true} marginBottom="4px">
              Send a Final Email Blast
            </Text>
            <Text size="small" marginBottom="0">
              Email your customer list with a "Last Chance" message to enter the raffle.
            </Text>
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <Button href={socialShareUrl} variant="primary" size="medium">
          Get "Last Chance" Social Templates
        </Button>
      </div>

      <Section backgroundColor={colors.primaryLight} padding="24px" marginBottom="24px" borderRadius="8px">
        <Text bold={true}>
          <span style={{ color: colors.primary }}>🔗 Your Public Raffle URL:</span>
        </Text>
        <div
          style={{
            padding: "12px",
            backgroundColor: colors.white,
            borderRadius: "4px",
            border: `1px solid ${colors.lightGray}`,
            wordBreak: "break-all",
          }}
        >
          <a href={raffleUrl} style={{ color: colors.secondary, textDecoration: "none" }}>
            {raffleUrl}
          </a>
        </div>
      </Section>

      <Divider />

      <Text>
        After your raffle ends, the winner will be automatically selected, and you'll receive a notification with the
        results. You'll then be able to contact the winner and arrange prize delivery.
      </Text>

      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <Button href={dashboardUrl} size="medium">
          View Raffle Dashboard
        </Button>
      </div>

      <Text size="small" color={colors.mediumGray}>
        If you have any questions or need assistance with your raffle, please contact our support team at{" "}
        <a href="mailto:support@raffily.com" style={{ color: colors.primary }}>
          support@raffily.com
        </a>
        .
      </Text>

      <Text size="small" color={colors.mediumGray} marginBottom="0">
        Good luck with the final hours of your raffle! 🍀
      </Text>
    </Layout>
  )
}

export default RaffleEndingSoonEmail

