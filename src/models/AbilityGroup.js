import { DataTypes } from 'sequelize';
import sequelize from '../database/settings/config.js';


const AbilityGroup = sequelize.define('AbilityGroup', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'ability_groups',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  paranoid: true
});


export default AbilityGroup;
