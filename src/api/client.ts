import { client } from './generated/client.gen'

client.setConfig({
  credentials: 'include',
})

export { client }
