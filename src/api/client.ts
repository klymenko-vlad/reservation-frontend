import { client } from './generated/client.gen'

client.setConfig({
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  credentials: 'include',
})

export { client }
