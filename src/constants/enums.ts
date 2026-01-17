export const PROPERTY_CATEGORIES = ['HOTEL', 'APARTMENT', 'HOUSE', 'ROOM'] as const
export type PropertyCategory = typeof PROPERTY_CATEGORIES[number]

export const RESERVATION_STATUSES = ['PENDING', 'CONFIRMED', 'CANCELED', 'COMPLETED'] as const
export type ReservationStatus = typeof RESERVATION_STATUSES[number]
