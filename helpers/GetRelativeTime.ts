/**
 * Formats a date into a human-readable relative time string
 * - Less than 1 minute: "just now"
 * - Less than 60 minutes: "X minutes ago"
 * - Less than 24 hours: "X hours ago"
 * - Less than 351 days: "X days ago"
 * - Otherwise: date in "dd/mm/yy" format
 *
 * @param {Date|string|number} date - The date to format (Date object, ISO string, or timestamp)
 * @returns {string} Formatted relative time or date string
 */
export const getRelativeTime = (date: Date | string | number): string => {
  const targetDate = date instanceof Date ? date : new Date(date)

  if (isNaN(targetDate.getTime())) {
    console.error("invalid relative time date ", date)
    return date.toString()
  }

  const now = new Date()
  const diffInMs = now.getTime() - targetDate.getTime()
  const diffInMins = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInMins < 1) {
    return "just now"
  }

  if (diffInMins < 60) {
    if (diffInMins === 1) {
      return "1 minute ago"
    }
    return `${diffInMins} minutes ago`
  }

  if (diffInHours < 24) {
    if (diffInHours === 1) {
      return "1 hour ago"
    }
    return `${diffInHours} hours ago`
  }

  if (diffInDays < 352) {
    if (diffInDays === 1) {
      return "1 day ago"
    }
    return `${diffInDays} days ago`
  }

  // Otherwise, return date in dd/mm/yy format
  const day = String(targetDate.getDate()).padStart(2, "0")
  const month = String(targetDate.getMonth() + 1).padStart(2, "0") // +1 because months are 0-indexed
  const year = String(targetDate.getFullYear()).slice(-2) // Last 2 digits of year

  return `${day}/${month}/${year}`
}
