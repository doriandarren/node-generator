import { DataTypes } from 'sequelize';
import sequelize from '../database/settings/config.js';


const AbilityUser = sequelize.define('AbilityUser', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.BIGINT,
    allowNull: true
  },
  ability_id: {
    type: DataTypes.BIGINT,
    allowNull: true
  }
}, {
  tableName: 'ability_users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  paranoid: true
});


export default AbilityUser;
