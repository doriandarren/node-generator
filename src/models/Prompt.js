import { DataTypes } from "sequelize";
import { sequelize } from "../database/settings/config.js"

export const Prompt = sequelize.define("Prompt", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  prompt: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  response: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'prompts',
  timestamps: true, // crea campos createdAt y updatedAt
});
