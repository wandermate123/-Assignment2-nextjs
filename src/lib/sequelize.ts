import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

// Check if we're in a Vercel environment
const isVercel = process.env.VERCEL === '1';

// Use in-memory database for Vercel deployment
export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: isVercel ? ':memory:' : './sqlite/dev.sqlite',
  logging: false,
});

// Typed Sequelize User model
export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare lineStatus: 'online' | 'offline';
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lineStatus: {
      type: DataTypes.ENUM('online', 'offline'),
      allowNull: false,
    },
    // ✅ Optionally declare these to satisfy TypeScript
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
    timestamps: true,
  }
);
