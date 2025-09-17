import { sequelize, User } from './sequelize';

export async function initializeDatabase() {
  try {
    console.log('Initializing database...');
    
    // Sync the database (create tables if they don't exist)
    await sequelize.sync({ force: false });
    
    console.log('Database initialized successfully!');
  } catch (error) {
    console.error('Error initializing database:', error);
    // Don't throw error in Vercel environment to prevent deployment failures
    if (process.env.VERCEL !== '1') {
      throw error;
    }
  }
}

// Only initialize database when not in Vercel environment
if (process.env.VERCEL !== '1') {
  initializeDatabase().catch(console.error);
}
