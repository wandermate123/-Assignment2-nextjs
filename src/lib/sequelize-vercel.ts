// Mock Sequelize implementation for Vercel environment
export const sequelize = {};

export class User {
  static async findAll() { 
    return [
      { id: 1, name: 'Demo User', lineStatus: 'online', createdAt: new Date(), updatedAt: new Date() }
    ]; 
  }
  
  static async findByPk(id: number) { 
    return { id, name: 'Demo User', lineStatus: 'online', createdAt: new Date(), updatedAt: new Date() }; 
  }
  
  static async create(data: any) { 
    return { 
      id: Math.floor(Math.random() * 1000), 
      ...data, 
      createdAt: new Date(), 
      updatedAt: new Date() 
    }; 
  }
  
  async save() { return this; }
  async destroy() { return true; }
}
