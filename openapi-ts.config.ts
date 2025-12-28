import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  client: 'axios',
  input: 'http://localhost:3001/api-json',
  output: './src/api/generated',
  plugins: [
    '@tanstack/vue-query',
  ],
});

