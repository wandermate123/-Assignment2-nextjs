const { sequelize, User } = require('../src/lib/sequelize');

async function initializeDatabase() {
  try {
    console.log('Initializing database...');
    
    // Sync the database (create tables if they don't exist)
    await sequelize.sync({ force: false });
    
    // Check if we already have users
    const userCount = await User.count();
    
    if (userCount === 0) {
      // Create sample users
      const sampleUsers = [
        { name: 'Student 12345678', lineStatus: 'online' },
        { name: 'La Trobe University', lineStatus: 'offline' },
        { name: 'CSE3CWA/CSE5006', lineStatus: 'online' }
      ];
      
      for (const userData of sampleUsers) {
        await User.create(userData);
      }
      
      console.log('Sample users created successfully!');
    } else {
      console.log(`Database already has ${userCount} users.`);
    }
    
    console.log('Database initialization completed!');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    await sequelize.close();
  }
}

initializeDatabase();