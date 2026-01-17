import type { CreatePropertyDto, CreateReservationDto } from '@/api/generated/types.gen'

export interface Property extends CreatePropertyDto {
  id: string
  _id?: string
  userId?: string
  imageUrl?: string
  location?: string
}

export interface Reservation extends CreateReservationDto {
  id: string
  userId: string
  propertyId: string
}
