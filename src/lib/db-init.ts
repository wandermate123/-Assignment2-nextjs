import { sequelize, User } from './sequelize';

export async function initializeDatabase() {
  try {
    console.log('Initializing database...');
    
    // Sync the database (create tables if they don't exist)
    await sequelize.sync({ force: false });
    
    console.log('Database initialized successfully!');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

// Initialize database when this module is imported
initializeDatabase().catch(console.error);
