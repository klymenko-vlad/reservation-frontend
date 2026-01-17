export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  HOTELS: '/hotels',
  HOTEL_DETAIL: (id: string) => `/hotels/${id}`,
  HOTEL_BOOK: (id: string) => `/hotels/${id}/book`,
}
