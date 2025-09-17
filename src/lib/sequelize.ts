// Check if we're in a Vercel environment or production build
const isVercel = process.env.VERCEL === '1';
const isProduction = process.env.NODE_ENV === 'production';

// Conditionally import and export the appropriate implementation
let sequelize: any;
let User: any;

if (isVercel || isProduction) {
  // Use mock implementation for Vercel or production builds
  const vercelSequelize = require('./sequelize-vercel');
  sequelize = vercelSequelize.sequelize;
  User = vercelSequelize.User;
} else {
  // Use real implementation for local development
  const localSequelize = require('./sequelize-local');
  sequelize = localSequelize.sequelize;
  User = localSequelize.User;
}

export { sequelize, User };