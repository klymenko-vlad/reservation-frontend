import type { CreateUserDto, LoginDto } from '@/api/generated'
import { authControllerLogin, usersControllerCreate } from '@/api/generated'

export async function createUser(user: CreateUserDto) {
  const response = await usersControllerCreate({ body: user })
  if (response.error) {
    throw new Error((response.error as { message?: string }).message || 'Registration failed')
  }
  return response.data
}

export async function login(credentials: LoginDto) {
  const response = await authControllerLogin({ body: credentials })
  if (response.error) {
    throw new Error((response.error as { message?: string }).message || 'Login failed')
  }
  return response.data
}
