import { DataTypes } from 'sequelize';
import sequelize from '../database/settings/config.js';


const RoleUser = sequelize.define('RoleUser', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.BIGINT,
    allowNull: true
  },
  role_id: {
    type: DataTypes.BIGINT,
    allowNull: true
  }
}, {
  tableName: 'role_users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  paranoid: true
});


export default RoleUser;
