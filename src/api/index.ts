// Export simple wrapper hooks (use these in components)
export * from './queries';

// Export auto-generated TanStack Query hooks, options, and query keys
export * from './generated/@tanstack/vue-query.gen';

// Export types
export type * from './generated/types.gen';

// Export SDK functions if needed
export * from './generated/sdk.gen';

// Export client if needed
export { client } from './client';

