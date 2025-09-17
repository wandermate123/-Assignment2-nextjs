import { sequelize, User } from './sequelize';

// Type guard to check if sequelize has sync method
function hasSyncMethod(obj: any): obj is { sync: (options?: { force?: boolean }) => Promise<any> } {
  return obj && typeof obj.sync === 'function';
}

export async function initializeDatabase() {
  try {
    console.log('Initializing database...');
    
    // Only sync if sequelize has the sync method (not in Vercel environment)
    if (hasSyncMethod(sequelize)) {
      await sequelize.sync({ force: false });
      console.log('Database initialized successfully!');
    } else {
      console.log('Skipping database sync in Vercel environment');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
    // Don't throw error in Vercel environment to prevent deployment failures
    if (process.env.VERCEL !== '1') {
      throw error;
    }
  }
}

// Only initialize database when not in Vercel environment and not during build
if (process.env.VERCEL !== '1' && process.env.NODE_ENV !== 'production') {
  initializeDatabase().catch(console.error);
}
