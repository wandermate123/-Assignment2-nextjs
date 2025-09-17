// Check if we're in a Vercel environment
const isVercel = process.env.VERCEL === '1';

// Conditionally export the appropriate implementation
if (isVercel) {
  // Export mock implementation for Vercel
  export * from './sequelize-vercel';
} else {
  // Export real implementation for local development
  export * from './sequelize-local';
}