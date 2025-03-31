import { renderAsync } from "@react-email/render"
import EntryConfirmationEmail from "./entry-confirmation"
import RaffleReminderEmail from "./raffle-reminder"
import WinnerAnnouncementEmail from "./winner-announcement"
import MerchantWelcomeEmail from "./merchant-welcome"
import RaffleCreationEmail from "./raffle-creation"
import RaffleLaunchEmail from "./raffle-launch"
import EntryMilestoneEmail from "./entry-milestone"
import RaffleEndingSoonEmail from "./raffle-ending-soon"
import RaffleResultsEmail from "./raffle-results"

// Entry Confirmation Email
export async function renderEntryConfirmationEmail(props: {
  name: string
  raffleName: string
  merchantName: string
  endDate: string
  viewEntryUrl: string
  entryId: string
  prize: string
}) {
  return await renderAsync(EntryConfirmationEmail(props))
}

// Raffle Reminder Email
export async function renderRaffleReminderEmail(props: {
  name: string
  raffleName: string
  merchantName: string
  drawingDate: string
  prize: string
  viewEntryUrl: string
  shareUrl: string
  hoursLeft: number
}) {
  return await renderAsync(RaffleReminderEmail(props))
}

// Winner Announcement Email
export async function renderWinnerAnnouncementEmail(props: {
  name: string
  raffleName: string
  merchantName: string
  prize: string
  claimUrl: string
  claimDeadline: string
  contactEmail: string
}) {
  return await renderAsync(WinnerAnnouncementEmail(props))
}

// Merchant Welcome Email
export async function renderMerchantWelcomeEmail(props: {
  name: string
  businessName: string
  loginUrl: string
  helpCenterUrl: string
  setupGuideUrl: string
}) {
  return await renderAsync(MerchantWelcomeEmail(props))
}

// Raffle Creation Email
export async function renderRaffleCreationEmail(props: {
  name: string
  businessName: string
  raffleName: string
  raffleUrl: string
  dashboardUrl: string
  startDate: string
  endDate: string
  prize: string
}) {
  return await renderAsync(RaffleCreationEmail(props))
}

// Raffle Launch Email
export async function renderRaffleLaunchEmail(props: {
  name: string
  businessName: string
  raffleName: string
  raffleUrl: string
  dashboardUrl: string
  endDate: string
  prize: string
  socialShareUrl: string
}) {
  return await renderAsync(RaffleLaunchEmail(props))
}

// Entry Milestone Email
export async function renderEntryMilestoneEmail(props: {
  name: string
  businessName: string
  raffleName: string
  dashboardUrl: string
  currentEntries: number
  milestonePercentage: number
  averageEntries: number
  daysLeft: number
  conversionRate: number
}) {
  return await renderAsync(EntryMilestoneEmail(props))
}

// Raffle Ending Soon Email
export async function renderRaffleEndingSoonEmail(props: {
  name: string
  businessName: string
  raffleName: string
  raffleUrl: string
  dashboardUrl: string
  hoursLeft: number
  currentEntries: number
  targetEntries: number
  socialShareUrl: string
}) {
  return await renderAsync(RaffleEndingSoonEmail(props))
}

// Raffle Results Email
export async function renderRaffleResultsEmail(props: {
  name: string
  businessName: string
  raffleName: string
  dashboardUrl: string
  totalEntries: number
  viewsToEntryRate: number
  winnerName: string
  winnerEmail: string
  demographicData: {
    topLocation: string
    topLocationPercentage: number
    topDevice: string
    topDevicePercentage: number
    topReferrer: string
    topReferrerPercentage: number
  }
  previousRaffleEntries?: number
  createNewRaffleUrl: string
}) {
  return await renderAsync(RaffleResultsEmail(props))
}

