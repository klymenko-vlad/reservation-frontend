export function formatPrice(cents?: number | null, showPerNight = false): string {
  if (cents === undefined || cents === null) return '—'
  const value = cents / 100
  const formatted = `$${value.toFixed(2)}`
  return showPerNight ? `${formatted} / night` : formatted
}

export function truncateText(text?: string | null, maxLength = 100): string {
  if (!text) return ''
  return text.length > maxLength ? text.slice(0, maxLength - 3) + '…' : text
}
