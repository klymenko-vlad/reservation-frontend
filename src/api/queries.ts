import {
  authControllerLogin,
  authControllerLogout,
  type CreatePropertyDto,
  type CreateReservationDto,
  type CreateUserDto,
  type LoginDto,
  propertiesControllerCreateProperty,
  propertiesControllerDeletePropertyById,
  propertiesControllerGetAllProperties,
  propertiesControllerGetPropertyById,
  propertiesControllerUpdatePropertyById,
  reservationsControllerCreateReservation,
  reservationsControllerDeleteReservation,
  reservationsControllerGetAllReservations,
  reservationsControllerGetReservationById,
  reservationsControllerUpdateReservation,
  usersControllerCreate,
  usersControllerGetMe,
} from '@/api/generated'
import { useToastStore } from '@/stores/toast'

interface ApiResponse<T> {
  data?: T
  error?: { message?: string } | unknown
}

function handleResponse<T>(response: ApiResponse<T>, fallbackMessage: string): T {
  if (response.error) {
    const errorMessage = (response.error as { message?: string }).message || fallbackMessage
    const toast = useToastStore()
    toast.error(errorMessage)
    throw new Error(errorMessage)
  }
  return response.data as T
}

export async function createUser(user: CreateUserDto) {
  const response = await usersControllerCreate({ body: user })
  return handleResponse(response, 'Registration failed')
}

export async function login(credentials: LoginDto) {
  const response = await authControllerLogin({ body: credentials })
  return handleResponse(response, 'Login failed')
}

export async function getMe() {
  const response = await usersControllerGetMe()
  return handleResponse(response, 'Failed to fetch user')
}

export async function getAllProperties() {
  const response = await propertiesControllerGetAllProperties()
  return handleResponse(response, 'Failed to fetch properties')
}

export async function getPropertyById(id: string) {
  const response = await propertiesControllerGetPropertyById({ path: { id } })
  return handleResponse(response, `Failed to fetch property ${id}`)
}

export async function createProperty(payload: CreatePropertyDto) {
  const response = await propertiesControllerCreateProperty({ body: payload })
  return handleResponse(response, 'Failed to create property')
}

export async function updatePropertyById(id: string, payload: Partial<CreatePropertyDto>) {
  const response = await propertiesControllerUpdatePropertyById({
    path: { id },
    body: payload as any,
  })
  return handleResponse(response, `Failed to update property ${id}`)
}

export async function updateReservationById(id: string, payload: Partial<CreateReservationDto>) {
  const response = await reservationsControllerUpdateReservation({
    path: { id },
    body: payload as any,
  })
  return handleResponse(response, `Failed to update reservation ${id}`)
}

export async function deletePropertyById(id: string) {
  const response = await propertiesControllerDeletePropertyById({ path: { id } })
  return handleResponse(response, `Failed to delete property ${id}`)
}

export async function deleteReservationById(id: string) {
  const response = await reservationsControllerDeleteReservation({ path: { id } })
  return handleResponse(response, `Failed to delete reservation ${id}`)
}

export async function getAllReservations() {
  const response = await reservationsControllerGetAllReservations()
  return handleResponse(response, 'Failed to fetch reservations')
}

export async function getReservationById(id: string) {
  const response = await reservationsControllerGetReservationById({ path: { id } })
  return handleResponse(response, `Failed to fetch reservation ${id}`)
}

export async function createReservation(payload: CreateReservationDto) {
  const response = await reservationsControllerCreateReservation({ body: payload })
  return handleResponse(response, 'Failed to create reservation')
}

export async function logout() {
  const response = await authControllerLogout()
  return handleResponse(response, 'Failed to logout')
}
